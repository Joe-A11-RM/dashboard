import React, { createContext, useState } from "react";
export const dashboardcontext = createContext();
export default function DashboardContext({ children }) {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			<dashboardcontext.Provider value={{ editMode, setEditMode }}>
				{children}
			</dashboardcontext.Provider>
		</>
	);
}
