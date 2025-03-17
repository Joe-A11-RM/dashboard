import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GeoSpatialApi = createApi({
	reducerPath: "GeoSpatialApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_GEOSPATIAL}/map`,
		prepareHeaders: (headers) => {
			let token =
				sessionStorage.getItem("token") || localStorage.getItem("token");
			console.log("Token", token);
			console.log("Session Token", sessionStorage.getItem("token"));
			console.log("Local Token", localStorage.getItem("token"));
			if (token) {
				headers.set("Authorization", ` ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getPoints: builder.query({
			query: ({ type, search, sortType, page, total }) =>
				`/points?type=${type}&search=${search}&sort=0&sortType=${sortType}&page=${page}&total=${total}`,
		}),
		deletePoints: builder.mutation({
			query: ({ type, ids }) => ({
				url: `/${type}?id=${ids}`,
				method: "DELETE",
			}),
		}),
		addPoints: builder.mutation({
			query: (val) => ({
				url: "/upload",
				method: "POST",
				body: { file: val },
			}),
		}),
	}),
});

export const {
	useGetPointsQuery,
	useDeletePointsMutation,
	useAddPointsMutation,
} = GeoSpatialApi;
