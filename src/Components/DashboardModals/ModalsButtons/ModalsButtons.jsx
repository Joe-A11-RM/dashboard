import React from "react";

export default function ModalsButtons({ close, text, danger }) {
	return (
		<div className="d-flex align-items-center">
			<div className="modal-button modal-button-cancel" onClick={close}>
				cancel
			</div>
			<div className={`modal-button modal-button-create ${danger}`}>{text}</div>
		</div>
	);
}
