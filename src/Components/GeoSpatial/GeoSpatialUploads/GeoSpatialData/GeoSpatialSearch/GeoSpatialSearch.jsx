import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { geospatialcontext } from "../../../../../context/GeoSpatialContext";

export default function GeoSpatialSearch() {
  let { search, setSearch } = useContext(geospatialcontext);

  return (
    <div className="geoSearch">
      <FaSearch />
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="geo-search-input"
      />
    </div>
  );
}
