import React, { useEffect, useState } from "react";
import {
	useCreateDashboardMutation,
	useDeleteDashboardMutation,
	useEditDashboardMutation,
	useGetAllDashboardsQuery,
} from "../../../Redux/service/Dashboard";
import AddDashboard from "../../DashboardModals/AddDashboard/AddDashboard";
import DeleteDashboard from "../../DashboardModals/DeleteDashboard/DeleteDashboard";
import * as Yup from "yup";
import { useFormik } from "formik";
export default function DashboardDropdownMenu({ ref, setModal, modal }) {
	const [id, setId] = useState();
	const [inf, setInf] = useState();
	let { data, error, refetch } = useGetAllDashboardsQuery();
	let [createDashboard, { status: CreationStatus }] =
		useCreateDashboardMutation();
	let [editDashboard, { status: EditStatus }] = useEditDashboardMutation();
	let [deleteDashboard, { status: DeletionStatus }] =
		useDeleteDashboardMutation();

	const initialValues = {
		name: inf ? inf?.name : "",
	};
	const validSchema = Yup.object({
		name: Yup.string().required("Name is required"),
	});
	const dashboardFormAction = useFormik({
		initialValues,
		validationSchema: validSchema,
		onSubmit: (val) => {
			if (!inf) {
				createDashboard(val).unwrap();
			} else {
				editDashboard({ id, val }).unwrap();
			}
		},
	});
	const handleSubmit = (e) => {
		dashboardFormAction.handleSubmit(e);
		//dashboardFormAction.resetForm();
	};
	useEffect(() => {
		if (
			CreationStatus === "fulfilled" ||
			EditStatus === "fulfilled" ||
			DeletionStatus === "fulfilled"
		) {
			refetch();
			setModal({ type: "", value: false });
		}
	}, [CreationStatus, EditStatus, DeletionStatus, refetch, setModal]);
	useEffect(() => {
		if (inf) {
			dashboardFormAction.setValues({
				name: inf.name || "",
			});
		}
	}, [inf]);
	if (error) return <div>error</div>;
	return (
		<>
			<div ref={ref} className="dashboard-dropdown-menu">
				<div className="dashboard-dropdown-values-layout ">
					{data?.response?.data.map((i) => (
						<div
							key={i.id}
							className="dashboard-dropdown-value"
							onClick={() => console.log(i)}
						>
							<div> {i.name} </div>
							<div>
								<img
									src="assets/Dark/Edit.svg"
									alt="edit"
									className="me-1"
									onClick={() => {
										setModal({ type: "add", value: true });
										setId(i.id);
										setInf(i);
									}}
								/>
								<img
									src="assets/Dark/Delete.svg"
									alt="delete"
									onClick={() => {
										setModal({ type: "delete", value: true });
										setId(i.id);
									}}
								/>
							</div>
						</div>
					))}
				</div>
				<div
					className="dashboard-dropdown-value-new"
					onClick={() => setModal({ type: "add", value: true })}
				>
					create new dashboard
				</div>
			</div>
			<AddDashboard
				show={modal.value && modal.type === "add"}
				onHide={() => {
					setModal({ type: "add", value: false });
					dashboardFormAction.resetForm();
				}}
				handleSubmit={handleSubmit}
				dashboardFormAction={dashboardFormAction}
				name={dashboardFormAction.values.name}
			/>
			<DeleteDashboard
				show={modal.value && modal.type === "delete"}
				onHide={() => {
					setModal({ type: "delete", value: false });
				}}
				text="dashboard"
				id={id}
				deleteDashboard={deleteDashboard}
			/>
		</>
	);
}
