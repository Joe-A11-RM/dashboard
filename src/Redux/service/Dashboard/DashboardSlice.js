import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
	name: "dashboards",
	initialState: {
		draggableIds: [],
		draggableItems: [],
	},
	reducers: {
		addDraggableIds: (state, action) => {
			state.draggableIds = action.payload;
		},
		addDraggableItems: (state, action) => {
			state.draggableItems = action.payload;
		},
        removeDraggableItem: (state, action) => {
			const idToRemove = action.payload;
			state.draggableIds = state.draggableIds.filter((id) => id !== idToRemove);
			state.draggableItems = state.draggableItems.filter((item) => item.id !== idToRemove);
		},
	},
});

export const { addDraggableIds, addDraggableItems , removeDraggableItem} = dashboardSlice.actions;

export default dashboardSlice.reducer;
