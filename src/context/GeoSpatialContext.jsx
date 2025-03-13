import React, { createContext, useState } from "react";
export const geospatialcontext = createContext();
export default function GeoSpatialContext({ children }) {
  let [minimize, setMinimize] = useState(false);
  let [type, setType] = useState("points");
  let [sortType, setSortType] = useState("desc");
  let [search, setSearch] = useState("");
  let [selectedIds, setSelectedIds] = useState([]);
  return (
    <>
      <geospatialcontext.Provider
        value={{
          minimize,
          setMinimize,
          type,
          setType,
          sortType,
          setSortType,
          search,
          setSearch,
          selectedIds,
          setSelectedIds,
        }}
      >
        {children}
      </geospatialcontext.Provider>
    </>
  );
}
