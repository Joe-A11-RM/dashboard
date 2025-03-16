import React, { useRef } from "react";
import { useAddPointsMutation } from "../../../../../Redux/service/GeoSpatial/GeoSpatial";
import { toast } from "react-toastify";

export default function GesSpatialBulk({ refetch }) {
	let [addPoints, { data, isLoading }] = useAddPointsMutation();
	const fileInputRef = useRef(null);

	const handleClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file && file.name.endsWith(".kmz")) {
			const reader = new FileReader();
			reader.onload = () => {
				const base64String = reader.result.split(",")[1];
				if (base64String) {
					addPoints(base64String)
						.unwrap()
						.then(() => {
							refetch();
							event.target.value = "";
						})
						.catch((e) => console.log(e));
				}
			};
			reader.readAsDataURL(file);
		} else {
			alert("Please upload a valid KMZ file.");
			event.target.value = "";
		}
	};
	console.log(data);
	if (isLoading) {
		toast.info("Loading....", { autoClose: false });
	} else if (data) {
		toast.dismiss();
	}
	return (
		<div className="geo-bulk" onClick={handleClick}>
			Bulk Upload
			<input
				type="file"
				accept=".kmz"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</div>
	);
}
