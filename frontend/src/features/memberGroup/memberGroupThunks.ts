import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import type {RootState} from "../../app/store.ts";
import type {IGroup, MemberGroup} from "../../types";

export const joinMemberGroup = createAsyncThunk<MemberGroup, string, { state: RootState }>(
    'memberGroups/joinMemberGroup',
    async (groupId, {getState}) => {
        try {
            const token = getState().users.user?.token;
            const response = await axiosAPI.post(`/members/join/${groupId}`, null, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const fetchGroupMembers = createAsyncThunk<MemberGroup[], string, { state: RootState }>(
    'memberGroups/fetchGroupMembers',
    async (groupId, {getState}) => {
        try {
            const token = getState().users.user?.token;
            const response = await axiosAPI.get(`/members/${groupId}`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
);

export const leaveMemberGroup = createAsyncThunk(
    'memberGroup/leaveMemberGroup',
    async (groupId: string) => {
        await axiosAPI.delete(`/members/leave/${groupId}`);
    }
);

export const deleteGroupMember = createAsyncThunk<
    { groupId: string; userId: string },
    { groupId: string; userId: string },
    { state: RootState }
>(
    'memberGroups/deleteGroupMember',
    async ({ groupId, userId }, { getState }) => {
        try {
            const token = getState().users.user?.token;
            await axiosAPI.delete(`/members/${groupId}/${userId}`, {
                headers: {
                    'Authorization': token,
                },
            });
            return { groupId, userId };
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
);

export const fetchMyGroups = createAsyncThunk<IGroup[]>(
    "groups/fetchMyGroups",
    async ( ) => {
        try {
            const response = await axiosAPI.get("/members");
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
);

