import React from "react";

const Widget = ({ editMode, handleDelete, children, title, subTitle, id }) => {
	return (
		<div
			className={`dashboard-Pie`}
			style={{ cursor: editMode ? "move" : "default" }}
		>
			<div className="dashboard-label-body">
				<div className="d-flex justify-content-between align-items-center">
					<h5 className="widgetTitle">{title}</h5>

					{editMode && (
						<div className="d-flex">
							<div className="bin cancelSelectorName" onClick={handleDelete}>
								<img src="assets/Dark/Delete.svg" alt="delete" />
							</div>
						</div>
					)}
				</div>
				{subTitle && <p className="widgetSubTitle">{subTitle}</p>}
			</div>
			{children}
		</div>
	);
};

export default Widget;
