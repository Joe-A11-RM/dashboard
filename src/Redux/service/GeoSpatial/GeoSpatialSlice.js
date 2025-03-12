import { createSlice } from "@reduxjs/toolkit";

export const geoSpatialSlice = createSlice({
	name: "geospatial",
	initialState: {
		geospatial: [],
	},
	reducers: {
		addGeofence: (state, action) => {
			state.geospatial = [action.payload];
		},
	},
});

export const { addGeofence } = geoSpatialSlice.actions;

export default geoSpatialSlice.reducer;
