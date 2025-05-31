import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import type {RootState} from "../../app/store.ts";
import type {MemberGroup} from "../../types";

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
