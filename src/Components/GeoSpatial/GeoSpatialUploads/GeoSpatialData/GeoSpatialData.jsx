import React, { useEffect, useState } from "react";
import GeoSpatialSearch from "./GeoSpatialSearch/GeoSpatialSearch";
import GesSpatialBulk from "./GeoSpatialBulk/GesSpatialBulk";
import GeoTable from "./GeoTable/Table";
import Pagination from "../../../Dashboard/Helper/Pagination";
import { useGetPointsQuery } from "../../../../Redux/service/GeoSpatial/GeoSpatial";
import { useDispatch } from "react-redux";
import { addGeofence } from "../../../../Redux/service/GeoSpatial/GeoSpatialSlice";

export default function GeoSpatialData() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data , refetch} = useGetPointsQuery({
    type: "points",
    sortType: "desc",
    search: "",
    page: currentPage,
    total: 100,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.response?.data) {
      dispatch(addGeofence(data.response.data));
    }
  }, [data, dispatch]);
  return (
    <>
      <div className="geospatial-data">
        <GeoSpatialSearch />
        <GesSpatialBulk refetch={refetch}/>
      </div>
      <div className="geo-filters">
        <div className="geo-filter">Points</div>
        <div className="geo-filter">Polygons</div>
        <div className="geo-filter">Lines</div>
      </div>
      <GeoTable data={data} />
      <Pagination
        page={1}
        totalPages={data?.totalCount ? Math.round(data?.totalCount / 100) : 1}
        onPageChange={(page) => setCurrentPage(page - 1)}
        unit="items"
        containerStyle={"h-10"}
      />
    </>
  );
}
