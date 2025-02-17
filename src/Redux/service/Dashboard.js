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
	}),
});

export const {
	useGetAllDashboardsQuery,
	useCreateDashboardMutation,
	useEditDashboardMutation,
	useDeleteDashboardMutation,
} = DashboardApi;
