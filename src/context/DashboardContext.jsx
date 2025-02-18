import React, { createContext, useState } from "react";
export const dashboardcontext = createContext();
export default function DashboardContext({ children }) {
	const [editMode, setEditMode] = useState(false);
	const [dashboardMenu, setDashboardMenu] = useState(false);
	const [modal, setModal] = useState({ type: "", value: false });
	const [dashboardInf, setDashboardInf] = useState();
	console.log(modal);
	return (
		<>
			<dashboardcontext.Provider
				value={{
					editMode,
					setEditMode,
					dashboardMenu,
					setDashboardMenu,
					modal,
					setModal,
					dashboardInf,
					setDashboardInf,
				}}
			>
				{children}
			</dashboardcontext.Provider>
		</>
	);
}
