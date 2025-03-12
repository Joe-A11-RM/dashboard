import React from "react";

export default function ModalsButtons({ close, text, danger, id, action }) {
	const handleClick = () => {
		action(id);
		close();
	};
	return (
		<div className="d-flex align-items-center">
			<button
				type="button"
				className="modal-button modal-button-cancel"
				onClick={close}
			>
				cancel
			</button>
			<button
				type="submit"
				className={`modal-button modal-button-create ${danger}`}
				onClick={action && handleClick}
			>
				{text}
			</button>
		</div>
	);
}
