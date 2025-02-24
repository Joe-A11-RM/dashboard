import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DashboardApi } from "./service/Dashboard";

export const store = configureStore({
	reducer: {
		[DashboardApi.reducerPath]: DashboardApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(DashboardApi.middleware),
});

setupListeners(store.dispatch);
