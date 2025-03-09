import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DashboardApi = createApi({
	reducerPath: "dashboard",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_URL}/api/v1`,
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
} = DashboardApi;
