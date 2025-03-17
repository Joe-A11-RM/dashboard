import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DashboardApi = createApi({
	reducerPath: "dashboard",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_URL}/api/v1`,
		prepareHeaders: (headers) => {
			let token =
				sessionStorage.getItem("token") || localStorage.getItem("token");

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getAllDashboards: builder.query({
			query: () => "/dashboard",
		}),

		createDashboard: builder.mutation({
			query: (val) => ({
				url: "/dashboard",
				method: "POST",
				body: val,
			}),
		}),

		editDashboard: builder.mutation({
			query: ({ id, val }) => ({
				url: `/dashboard/${id}`,
				method: "PATCH",
				body: val,
			}),
		}),

		deleteDashboard: builder.mutation({
			query: (val) => ({
				url: `/dashboard/${val}`,
				method: "DELETE",
				body: val,
			}),
		}),

		getAllDashboardsWidgets: builder.query({
			query: ({ id }) => `/dashboards/${id}/widget`,
		}),

		editDashboardWidgets: builder.mutation({
			query: ({ id, val }) => ({
				url: `/widget/${id}`,
				method: "PATCH",
				body: { position: val },
			}),
		}),
		deleteDashboardWidgets: builder.mutation({
			query: (val) => ({
				url: `/widget/${val}`,
				method: "DELETE",
				body: val,
			}),
		}),
		createWidget: builder.mutation({
			query: ({ id, val }) => ({
				url: `/dashboards/${id}/widget/replace`,
				method: "POST",
				body: { widgets: val },
			}),
		}),
		getSingleWidget: builder.query({
			query: ({ id }) => `/widget/${id}`,
		}),

		getMapData: builder.query({
			query: () => "/getTrackingMapData",
		}),
		getDistanceCoverageData: builder.query({
			query: ({ offset, limit }) =>
				`/getDistanceCoverageData?offset=${offset}&limit=${limit}`,
		}),
		getEngineHoursData: builder.query({
			query: ({ offset, limit }) =>
				`/getEngineHoursData?offset=${offset}&limit=${limit}`,
		}),
		getSpeedDetails: builder.query({
			query: ({ offset, limit }) =>
				`/getSpeedDetails?offset=${offset}&limit=${limit}`,
		}),
		getVehicleDetails: builder.query({
			query: ({ offset, limit }) =>
				`/getVehiclesDetails?offset=${offset}&limit=${limit}`,
		}),
	}),
});

export const {
	useGetAllDashboardsQuery,
	useCreateDashboardMutation,
	useEditDashboardMutation,
	useDeleteDashboardMutation,
	useGetAllDashboardsWidgetsQuery,
	useEditDashboardWidgetsMutation,
	useDeleteDashboardWidgetsMutation,
	useCreateWidgetMutation,
	useLazyGetSingleWidgetQuery,
	useGetMapDataQuery,
	useLazyGetDistanceCoverageDataQuery,
	useLazyGetEngineHoursDataQuery,
	useLazyGetSpeedDetailsQuery,
	useLazyGetVehicleDetailsQuery,
} = DashboardApi;
