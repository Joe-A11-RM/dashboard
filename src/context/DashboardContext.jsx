import React, { createContext, useState } from "react";
export const dashboardcontext = createContext();
export default function DashboardContext({ children }) {
	const [editMode, setEditMode] = useState(false);
	const [isCancel, setIsCancelled] = useState(false);
	const [dashboardMenu, setDashboardMenu] = useState(false);
	const [modal, setModal] = useState({ type: "", value: false });
	const [dashboardInf, setDashboardInf] = useState();
	const [dashboardTypeWidget, setDashboardTypeWidget] = useState({
		type: "",
		value: false,
	});
	const [saveChanges, setSaveChanges] = useState(false);
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
					dashboardTypeWidget,
					setDashboardTypeWidget,
					saveChanges,
					setSaveChanges,
					isCancel,
					setIsCancelled,
				}}
			>
				{children}
			</dashboardcontext.Provider>
		</>
	);
}
