/* eslint-disable no-unused-vars */
import "./App.css";
import { useState } from "react";

import Header from "./Components/DashboardHeader/Header";
import DashBoardMenu from "./Components/DashBoardMenu/DashBoardMenu";
import WidgetSettings from "./Components/WidgetSettings/WidgetSettings";
import DashboardContext from "./context/DashboardContext";
import Gridthree from "./Components/Grid/Gridthree.jsx";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import AuthLayout from "./Components/Layouts/AuthLayout.jsx";
import ProtectedRoutes from "./Components/Layouts/ProtectedRoutes.jsx";
import MainLayout from "./Components/Layouts/MainLayout.jsx";

function App() {
	const routes = createBrowserRouter(
		[
			/**			{
				path: "/",
				element: (
					<Navigate
						to={`/dashboard/auth?token=${localStorage.getItem("token")}`}
						replace
					/>
				),
			},
			{
				path: "/dashboard/auth",
				element: <AuthLayout />,
			},*/
			{
				path: `/`,
				element: (
					<ProtectedRoutes>
						<MainLayout />
					</ProtectedRoutes>
				),
			},
		],
		{
			basename: "/dash",
		}
	);

	return (
		<>
			<DashboardContext>
				<RouterProvider router={routes} />
			</DashboardContext>
		</>
	);
}

export default App;
