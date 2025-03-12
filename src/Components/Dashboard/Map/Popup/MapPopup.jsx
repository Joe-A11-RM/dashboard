import React from "react";
import PopupHeader from "./PopupHeader";
import PopupBody from "./PopupBody";

export default function MapPopup({ data }) {
	return (
		<div>
			<PopupHeader item={data} />
			<PopupBody item={data} />
		</div>
	);
}
