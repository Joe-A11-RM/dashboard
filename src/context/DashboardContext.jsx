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
  const [currentWidgets, setCurrentWidgets] = useState([]);
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
          setCurrentWidgets,
          currentWidgets,
        }}
      >
        {children}
      </dashboardcontext.Provider>
    </>
  );
}
