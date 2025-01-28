import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export default function Cards({ id, item }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};
	return (
		<div
			key={item.id}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
 		>
			<div className="item-card">{item}</div>
		</div>
	);
}
