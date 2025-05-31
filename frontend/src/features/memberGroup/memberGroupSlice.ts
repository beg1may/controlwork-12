import type {IGroup, MemberGroup} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import {
    deleteGroupMember,
    fetchGroupMembers, fetchMyGroups,
    joinMemberGroup,
    leaveMemberGroup,
} from "./memberGroupThunks.ts";

interface MemberGroupState {
    items: MemberGroup[];
    myGroups: IGroup[];
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
}

const initialState: MemberGroupState = {
    items: [],
    myGroups: [],
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
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

            .addCase(leaveMemberGroup.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(leaveMemberGroup.fulfilled, (state) => {
                state.fetchLoading = false;
            })
            .addCase(leaveMemberGroup.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(deleteGroupMember.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteGroupMember.fulfilled, (state, {payload}) => {
                state.deleteLoading = false;
                state.items = state.items.filter(
                    member => member.user._id !== payload.userId
                );
            })
            .addCase(deleteGroupMember.rejected, (state) => {
                state.deleteLoading = false;
            })

            .addCase(fetchMyGroups.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchMyGroups.fulfilled, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchMyGroups.rejected, (state) => {
                state.fetchLoading = false;
            });
    },
});

export const memberGroupReducer = MemberGroupSlice.reducer;

export const selectMemberGroup = (state: RootState) => state.memberGroups.items;
export const selectMyGroup = (state: RootState) => state.memberGroups.myGroups;
export const selectMemberGroupFetchLoading = (state: RootState) => state.memberGroups.fetchLoading;