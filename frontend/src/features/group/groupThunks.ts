import {createAsyncThunk} from "@reduxjs/toolkit";
import type {GroupMutation} from "../../types";
import type {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosApi.ts";

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