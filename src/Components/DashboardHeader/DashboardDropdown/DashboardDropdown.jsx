/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";
import DashboardDropdownEditMode from "./DashboardDropdownEditMode";
import DashboardDropdownMenu from "./DashboardDropdownMenu";
import AddDashboard from "../../DashboardModals/AddDashboard/AddDashboard";
import DeleteDashboard from "../../DashboardModals/DeleteDashboard/DeleteDashboard";
import {
  useCreateDashboardMutation,
  useDeleteDashboardMutation,
  useEditDashboardMutation,
  useGetAllDashboardsQuery,
} from "../../../Redux/service/Dashboard";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function DashboardDropdown() {
	let { data, error, refetch } = useGetAllDashboardsQuery();
	let [createDashboard, { status: CreationStatus, reset: ResetCreate }] =
		useCreateDashboardMutation();
	let [editDashboard, { status: EditStatus, reset: ResetEdit }] =
		useEditDashboardMutation();
	let [deleteDashboard, { status: DeletionStatus, reset: ResetDelete }] =
		useDeleteDashboardMutation();
	let {
		editMode,
		setEditMode,
		modal,
		setModal,
		dashboardInf,
		setDashboardInf,
	} = useContext(dashboardcontext);
	const [shown, setIsShown] = useState(false);
	const [title, setTitle] = useState();
	const isFirstLoad = useRef(true);
	console.log(dashboardInf);
	useEffect(() => {
		if (data) setDashboardInf(data?.response?.data[0]);
	}, [data]);
	const initialValues = {
		name: dashboardInf ? dashboardInf?.name : "",
	};
  const validSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(45, "Name must be at most 45 characters")
      .matches(/^(?!\s+$).*$/, "Name cannot be only spaces")
      .matches(/^(?!.*\s{2,}).*$/, "Name cannot have consecutive spaces"),
  });

  const dashboardFormAction = useFormik({
    initialValues,
    validationSchema: validSchema,
    onSubmit: async (val) => {
      try {
        if (modal.type === "add") {
          await createDashboard(val).unwrap();
          dashboardFormAction.resetForm();
        } else if (modal.type === "edit" && dashboardInf?.id) {
          await editDashboard({ id: dashboardInf?.id, val }).unwrap();
          dashboardFormAction.resetForm();
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  });
  const handleSubmit = (e) => {
    dashboardFormAction.handleSubmit(e);
  };
  useEffect(() => {
    if (isFirstLoad.current && data?.response?.data?.length > 0) {
      setTitle(data.response.data[0].name);
      isFirstLoad.current = false;
    }
    if (editMode) {
      setIsShown(false);
    }
  }, [data, editMode]);

  useEffect(() => {
    if (modal.type === "edit" && modal.value === true && dashboardInf) {
      dashboardFormAction.setValues({ name: dashboardInf.name || "" });
    }
  }, [modal, dashboardInf, editMode]);

  useEffect(() => {
    if (CreationStatus === "fulfilled") {
      refetch();
      ResetCreate();
      setModal({ type: modal.type, value: false });
    } else if (EditStatus === "fulfilled") {
      refetch().then((updatedData) => {
        if (dashboardInf?.id && updatedData?.data?.response?.data) {
          const updatedDashboard = updatedData.data.response.data.find(
            (i) => i.id === dashboardInf.id
          );

          if (updatedDashboard) {
            setTitle(updatedDashboard.name);
            setDashboardInf(updatedDashboard);
          }
        }
        ResetEdit();
        setModal({ type: modal.type, value: false });
      });
    } else if (DeletionStatus === "fulfilled") {
      refetch();
      setEditMode(false);
      setTitle(data.response.data[0].name);
      ResetDelete();
      setModal({ type: modal.type, value: false });
    }
  }, [
    CreationStatus,
    EditStatus,
    DeletionStatus,
    refetch,
    setModal,
    modal.type,
  ]);

  const handleClick = () => {
    setIsShown(!shown);
  };
  const handleSelect = (val) => {
    setTitle(val);
    setDashboardInf(val);
  };
  const truncateText = (text, maxLength = 18) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="dashboard-dropdown-layout">
      <div className="dashboard-dropdown-main-title-layout">
        <div className="dashboard-dropdown-main-title" title={title}>
          {truncateText(title)}
        </div>
        {editMode && <DashboardDropdownEditMode />}
      </div>
      {!editMode && (
        <div className="dropdown-arrow" onClick={handleClick}>
          <img
            src="assets/Dark/DownArrow.svg"
            alt="arrow"
            className={`dashboard-arrow ${shown && "dashboard-arrow-rotated"}`}
          />
        </div>
      )}
      {shown && (
        <DashboardDropdownMenu
          handleSelect={handleSelect}
          data={data}
          error={error}
          refetch={refetch}
          truncateText={truncateText}
        />
      )}
      <DeleteDashboard
        show={modal.value && modal.type === "delete"}
        onHide={() => {
          setModal({ type: "delete", value: false });
        }}
        text="dashboard"
        id={dashboardInf?.id}
        deleteDashboard={deleteDashboard}
      />
      <AddDashboard
        show={
          (modal.value === true && modal.type === "add") ||
          (modal.value === true && modal.type === "edit")
        }
        onHide={() => {
          dashboardFormAction.resetForm();
          if (modal.type === "add") {
            setModal({ type: "add", value: false });
          } else if (modal.type === "edit") {
            setModal({ type: "edit", value: false });
          }
        }}
        modal={modal}
        handleSubmit={handleSubmit}
        dashboardFormAction={dashboardFormAction}
      />
    </div>
  );
}
