import React, { useContext } from "react";
import { useDeletePointsMutation } from "../../../../../Redux/service/GeoSpatial/GeoSpatial";
import { geospatialcontext } from "../../../../../context/GeoSpatialContext";

const GeoSpitalDelete = ({ refetch }) => {
  const { type, selectedIds, setSelectedIds } = useContext(geospatialcontext);
  const [deletePoints] = useDeletePointsMutation();

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    // Show confirmation alert
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} item(s)?`
    );

    if (!isConfirmed) return;

    try {
      await deletePoints({ type, ids: selectedIds.join(",") })
        .unwrap()
        .then(() => refetch())
        .catch((e) => console.error(e));
      alert("Deletion successful!");
      setSelectedIds([]);
    } catch (error) {
      alert("Error deleting items. Please try again.");
    }
  };

  return (
    <div className="geo-bulk-delete" onClick={handleDelete}>
      Delete All
    </div>
  );
};

export default GeoSpitalDelete;
