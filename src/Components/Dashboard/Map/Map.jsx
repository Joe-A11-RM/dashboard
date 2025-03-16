import React, { useContext, useEffect } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	ZoomControl,
} from "react-leaflet";
import "leaflet-rotatedmarker";
import { useGetMapDataQuery } from "../../../Redux/service/Dashboard";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Icon } from "leaflet";
import MapPopup from "./Popup/MapPopup";
import { dashboardcontext } from "../../../context/DashboardContext";
function MapControl({ editMode }) {
	const map = useMap();

	useEffect(() => {
		map.dragging[editMode ? "disable" : "enable"]();
	}, [editMode, map]);

	return null;
}
export default function Map() {
	const { data, refetch, isUninitialized } = useGetMapDataQuery();
	let { editMode } = useContext(dashboardcontext);
	useEffect(() => {
		if (isUninitialized) return;
		const interval = setInterval(() => {
			refetch();
		}, 30000);

		return () => clearInterval(interval);
	}, [refetch, isUninitialized]);
	return (
		<div className="map">
			<MapContainer
				id="map-container"
				center={[23.8859, 45.0792]}
				zoomControl={false}
				zoom={4}
				scrollWheelZoom={true}
				minZoom={4.5}
				maxZoom={18}
				zoomAnimation={true}
				zoomSnap={0.5}
				className="map-container"
			>
				<MapControl editMode={editMode} />

				<ZoomControl position="bottomright" />
				<MarkerClusterGroup chunkedLoading>
					{data?.response?.data?.data?.map((item) => (
						<Marker
							key={item?.vehicleUniqueId}
							position={[item?.latitude, item?.longitude]}
							rotationAngle={item?.course || 0}
							rotationOrigin="center"
							interactive={true}
							icon={
								new Icon({
									iconUrl: "https://freesvg.org/img/glibersat_Nioubiteul.png",
									iconSize: [48, 48],
									shadowAnchor: [4, 62],
									popupAnchor: [-3, -20],
								})
							}
						>
							<Popup autoPan={true} closeButton={false}>
								<MapPopup data={item} />
							</Popup>
						</Marker>
					))}
				</MarkerClusterGroup>
				<TileLayer url="https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga" />
			</MapContainer>
		</div>
	);
}
