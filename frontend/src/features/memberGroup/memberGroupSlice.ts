import type {MemberGroup} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import {fetchGroupMembers, joinMemberGroup} from "./memberGroupThunks.ts";

interface MemberGroupState {
    items: MemberGroup[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: MemberGroupState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
}

export const MemberGroupSlice = createSlice({
    name: "memberGroups",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(joinMemberGroup.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(joinMemberGroup.fulfilled, (state, {payload: member}) => {
                state.items.push(member);
                state.createLoading = false;
            })
            .addCase(joinMemberGroup.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(fetchGroupMembers.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchGroupMembers.fulfilled, (state, {payload: members}) => {
                state.items = members;
                state.fetchLoading = false;
            })
            .addCase(fetchGroupMembers.rejected, (state) => {
                state.fetchLoading = false;
            })
    },
});

export const memberGroupReducer = MemberGroupSlice.reducer;

export const selectMemberGroup = (state: RootState) => state.memberGroups.items;
export const selectMemberGroupFetchLoading = (state: RootState) => state.memberGroups.fetchLoading;