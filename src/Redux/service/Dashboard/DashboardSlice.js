import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
	name: "dashboards",
	initialState: {
		draggableIds: [],
		draggableItems: [],
		position: { x: 0, y: 0 },
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
			state.draggableItems = state.draggableItems.filter(
				(item) => item.id !== idToRemove
			);
		},
		addPosition: (state, action) => {
			state.position.x = action.payload.x;
			state.position.y = action.payload.y;
		},
	},
});

export const {
	addDraggableIds,
	addDraggableItems,
	removeDraggableItem,
	addPosition,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
