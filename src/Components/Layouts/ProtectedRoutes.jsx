import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
	let token = localStorage.getItem("token");
	try {
		if (token) {
			console.log("done");
			return children;
		} else {
			return <div>Session Expired</div>;
		}
	} catch (error) {
		return <Navigate to="/" />;
	}
}
