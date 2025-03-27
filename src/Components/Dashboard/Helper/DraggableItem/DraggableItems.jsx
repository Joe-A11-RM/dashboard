import React from "react";
import Draggable from "react-draggable";
import GeoMap from "../../../Map/Map";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MapPopup from "../../Map/Popup/MapPopup";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { removeDraggableItem } from "../../../../Redux/service/Dashboard/DashboardSlice";

export default function DraggableItems({ item, nodesRef }) {
	const dispatch = useDispatch();

	const handleClose = (id) => {
		dispatch(removeDraggableItem(id)); // ✅ Dispatch action to remove from Redux store
	};
	const pos = useSelector((state) => state.dashboards.position);
	return (
		<Draggable
			key={item?.id}
			axis="both"
			handle=".handle"
			defaultPosition={{ x: pos?.x, y: pos?.y }}
			grid={[35, 35]}
			scale={1}
			nodeRef={nodesRef.current[item.id]}
			cancel=".map-container"
		>
			<div ref={nodesRef.current[item.id]} className="draggable-item  handle">
				<div className="draggable-head">
					<div>{item?.vehicleName}</div>
					<IoIosClose
						className="draggable-closebtn"
						size={32}
						onClick={() => handleClose(item.id)}
					/>
				</div>
				<div>
					<GeoMap
						lat={item?.latitude ? item?.latitude : 33.33}
						lon={item?.longitude ? item?.longitude : 33.33}
						mapheight="dashboard-draggable-map"
					>
						<Marker
							key={item?.vehicleUniqueId}
							position={[
								item?.latitude ? item?.latitude : 33.33,
								item?.longitude ? item?.longitude : 33.33,
							]}
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
							<Popup closeButton={false}>
								<MapPopup data={item} />
							</Popup>
						</Marker>
					</GeoMap>
				</div>
			</div>
		</Draggable>
	);
}
