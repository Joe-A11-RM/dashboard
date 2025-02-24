import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DashboardApi } from "./service/Dashboard";
import { DashboardWidgetsApi } from "./service/DashboardWidgets";

export const store = configureStore({
	reducer: {
		[DashboardApi.reducerPath]: DashboardApi.reducer,
		[DashboardWidgetsApi.reducerPath]: DashboardWidgetsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			DashboardApi.middleware,
			DashboardWidgetsApi.middleware
		),
});

setupListeners(store.dispatch);
