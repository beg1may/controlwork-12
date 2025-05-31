import type {IGroup} from "../../types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {createGroup, fetchAllGroups, fetchGroupById, groupDeleted, groupIsPublished} from "./groupThunks.ts";
import type {RootState} from "../../app/store.ts";

interface GroupsState {
    items: IGroup[];
    item: IGroup | null;
    createLoading: boolean;
    fetchLoading: boolean;
    isPublishedLoading: boolean;
    myGroups: boolean;
    deleteLoading: boolean;
}

const initialState: GroupsState = {
    items: [],
    item: null,
    createLoading: false,
    fetchLoading: false,
    isPublishedLoading: false,
    myGroups: false,
    deleteLoading: false,
}

export const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setMyGroups(state, action: PayloadAction<boolean>) {
            state.myGroups = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createGroup.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createGroup.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(fetchGroupById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchGroupById.fulfilled, (state, {payload: group}) => {
                state.item = group;
                state.fetchLoading = false;
            })
            .addCase(fetchGroupById.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchAllGroups.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllGroups.fulfilled, (state, {payload: groups}) => {
                state.items = groups;
                state.fetchLoading = false;
            })
            .addCase(fetchAllGroups.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(groupIsPublished.pending, (state) => {
                state.isPublishedLoading= true;
            })
            .addCase(groupIsPublished.fulfilled, (state) => {
                state.isPublishedLoading = false;
            })
            .addCase(groupIsPublished.rejected, (state) => {
                state.isPublishedLoading = false;
            })

            .addCase(groupDeleted.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(groupDeleted.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(groupDeleted.rejected, (state) => {
                state.deleteLoading = false;
            });
    },
})

export const groupsReducer = groupSlice.reducer;

export const selectGroup = (state: RootState) => state.groups.items;
export const selectOneGroup = (state: RootState) => state.groups.item;
export const selectGroupFetchLoading = (state: RootState) => state.groups.fetchLoading;
export const selectMyGroup = (state: RootState) => state.groups.myGroups;
export const {setMyGroups} = groupSlice.actions;