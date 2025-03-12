import React from "react";

export default function DashboardDiagrams({ title, img, setShown }) {
	return (
		<div
			className="col-lg-4"
			onClick={() => setShown({ value: true, type: title })}
		>
			<div className="item-card pointer">
				<img src={img} alt={img} />
				<div className="text-center mt-3">{title}</div>
			</div>
		</div>
	);
}
