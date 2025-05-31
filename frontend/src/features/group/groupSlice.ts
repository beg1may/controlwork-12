import type {IGroup} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createGroup} from "./groupThunks.ts";

interface GroupsState {
    items: IGroup[];
    createLoading: boolean;
}

const initialState: GroupsState = {
    items: [],
    createLoading: false,
}

export const GroupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {},
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
    },
})

export const groupsReducer = GroupSlice.reducer;