import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DashboardWidgetsApi = createApi({
	reducerPath: "dashboardwidgets",
	baseQuery: fetchBaseQuery({
		baseUrl: `https://weak-rabbits-crash.loca.lt/api/v1`,
	}),
	endpoints: (builder) => ({
		getAllDashboardsWidgets: builder.query({
			query: () => "/dashboards/2/widget",
		}),
	}),
});

export const { useGetAllDashboardsWidgetsQuery } = DashboardWidgetsApi;
