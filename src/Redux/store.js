import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DashboardApi } from "./service/Dashboard";
import { GeoSpatialApi } from "./service/GeoSpatial/GeoSpatial";
import { geoSpatialSlice } from "./service/GeoSpatial/GeoSpatialSlice";
import { dashboardSlice } from "./service/Dashboard/DashboardSlice";

export const store = configureStore({
	reducer: {
		[DashboardApi.reducerPath]: DashboardApi.reducer,
		[GeoSpatialApi.reducerPath]: GeoSpatialApi.reducer,
		geospatial: geoSpatialSlice.reducer,
		dashboards: dashboardSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			DashboardApi.middleware,
			GeoSpatialApi.middleware
		),
});

setupListeners(store.dispatch);
