import {createAsyncThunk} from "@reduxjs/toolkit";
import type {GroupMutation, IGroup} from "../../types";
import type {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosApi.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchAllGroups = createAsyncThunk<IGroup[], {user?: string}>(
    'groups/fetchAllGroups',
    async ({user}) => {
        const url = user ? `/groups?user=${user}` : '/groups';
        const response = await axiosAPI.get<IGroup[]>(url);
        return response.data;
    }
);

export const fetchGroupById = createAsyncThunk<IGroup, string>(
    'groups/fetchGroupById',
    async (group_id) => {
        const response = await axiosApi.get<IGroup>(`/groups/${group_id}`);
        return response.data || null;
    }
);

export const createGroup = createAsyncThunk<void, GroupMutation, { state: RootState }>(
    'groups/createGroup',
    async (groupToAdd, {getState}) => {
        const token = getState().users.user?.token;
        const formData = new FormData();

        formData.append('title', groupToAdd.title);
        formData.append('description', groupToAdd.description);

        if (groupToAdd.image) {
            formData.append('image', groupToAdd.image);
        }

        await axiosAPI.post('groups', formData, {
            headers: {
                'Authorization': token,
            },
        });
    }
);


export const groupIsPublished = createAsyncThunk<void, string, { state: RootState }>(
    'groups/groupIsPublished',
    async (groupId, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.patch(`/groups/${groupId}/togglePublished`, null, {
            headers: {
                'Authorization': token,
            },
        });
    }
);


export const groupDeleted = createAsyncThunk<void, string, { state: RootState }>(
    'groups/groupDeleted',
    async (groupId, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete(`/groups/${groupId}`, {
            headers: {
                'Authorization': token,
            },
        });
    }
);