/* eslint-disable no-unused-vars */
import "./App.css";

import DashboardContext from "./context/DashboardContext";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import ProtectedRoutes from "./Components/Layouts/ProtectedRoutes.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import GeoSpatial from "./Components/GeoSpatial/GeoSpatial.jsx";
import GeoSpatialContext from "./context/GeoSpatialContext.jsx";
import MainLayout from "./Components/Layouts/MainLayout.jsx";
import { ToastContainer } from "react-toastify";

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
			/*{ 
				path: `/`,
				element: (
					<ProtectedRoutes>
						<MainLayout />
					</ProtectedRoutes>
				),
			},*/
			{
				path: `/`,
				element: (
					<ProtectedRoutes>
						<Dashboard />
					</ProtectedRoutes>
				),
			},
			{
				path: `/geospatial`,
				element: (
					<ProtectedRoutes>
						<GeoSpatial />
					</ProtectedRoutes>
				),
			}
		],
		{
			basename: "/dash",
		}
	);

	return (
		<>
			<DashboardContext>
				<GeoSpatialContext>
					<RouterProvider router={routes} />
				</GeoSpatialContext>
			</DashboardContext>
			<ToastContainer theme="colored" />
		</>
	);
}

export default App;
