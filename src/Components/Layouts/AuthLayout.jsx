import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthLayout() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	useEffect(() => {
		const token = searchParams.get("token");

		if (token) {
			//localStorage.setItem("token", token);
			navigate("/dashboard", { replace: true });
		}
	}, [searchParams, navigate]);
	return (
		<div>
			<h1>Loading.....</h1>
		</div>
	);
}
