import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GeoSpatialApi = createApi({
	reducerPath: "GeoSpatialApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_GEOSPATIAL}/map`,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getPoints: builder.query({
			query: ({ type, search, sortType, page, total }) =>
				`/points?type=${type}&search=${search}&sort=0&sortType=${sortType}&page=${page}&total=${total}`,
		}),
	}),
});

export const { useGetPointsQuery } = GeoSpatialApi;
