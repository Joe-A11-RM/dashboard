import { Space, DatePicker } from "antd";
import { CalendarFilled } from "@ant-design/icons";

import dayjs from "dayjs";
import React from "react";

export default function DashboardDate() {
	const { RangePicker } = DatePicker;
	return (
		<div className="dashboard-date">
			<Space direction="vertical" size={12}>
				<RangePicker
					ranges={{
						Today: [dayjs().startOf("day"), dayjs().endOf("day")],
						Yesterday: [
							dayjs().subtract(1, "day").startOf("day"),
							dayjs().subtract(1, "day").endOf("day"),
						],
						"Last Week": [
							dayjs().subtract(7, "day").startOf("day"),
							dayjs().endOf("day"),
						],
						"Last Month": [
							dayjs().subtract(1, "month").startOf("month"),
							dayjs().subtract(1, "month").endOf("month"),
						],
					}}
					value={[dayjs().startOf("day"), dayjs().endOf("day")]}
					suffixIcon={
						<CalendarFilled style={{ color: "#757575CC", fontSize: "16px" }} />
					}
				/>
			</Space>
		</div>
	);
}
