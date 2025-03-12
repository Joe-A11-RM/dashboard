import React, { createContext, useState } from "react";
export const geospatialcontext = createContext();
export default function GeoSpatialContext({ children }) {
	let [minimize, setMinimize] = useState(false);
	return (
		<>
			<geospatialcontext.Provider value={{ minimize, setMinimize }}>
				{children}
			</geospatialcontext.Provider>
		</>
	);
}
