import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Marker, Polygon } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { geospatialcontext } from "../../../context/GeoSpatialContext";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function GeoSpatialPoints() {
  const geospatial = useSelector((state) => state.geospatial.geospatial);
  const memoizedGeospatial = useMemo(() => geospatial, [geospatial]);
  let { type } = useContext(geospatialcontext);

  let [polygons, setPolygons] = useState();

  useEffect(() => {
    if (type === "polygons" || type === "lines") {
      const parsedPolygons = geospatial
        .filter((item) => item.coordinates) // Ensure it exists
        .map((item) => {
          try {
            return {
              id: item.id,
              name: item.name,
              coordinates: JSON.parse(item.coordinates),
            };
          } catch (error) {
            console.error(
              `Error parsing coordinates for item ${item.id}:`,
              error
            );
            return null; // Skip invalid items
          }
        })
        .filter((item) => item !== null); // Remove invalid entries

      console.log("Parsed Polygons:", parsedPolygons);
      setPolygons(parsedPolygons);
    }
  }, [type, geospatial]);
  return (
    <>
      {type === "points" && (
        <MarkerClusterGroup chunkedLoading>
          {memoizedGeospatial.map((point) => {
            if (!point.lat || !point.lng) {
              return null;
            }

            return (
              <Marker
                key={point?.id}
                position={[point.lat, point.lng]}
                icon={customIcon}
              />
            );
          })}
        </MarkerClusterGroup>
      )}
      {(type === "polygons" || type === "lines") && (
        <>
          {polygons?.map((i) => (
            <Polygon
              key={i.id}
              positions={i.coordinates.map((coord) => [coord.lat, coord.lng])}
              color="blue"
              weight={4}
              fillColor="blue"
              fillOpacity={0.3}
              dashArray="8"
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    color: "red",
                    weight: 6,
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    color: "blue",
                    weight: 4,
                  });
                },
              }}
            ></Polygon>
          ))}
        </>
      )}
    </>
  );
}
