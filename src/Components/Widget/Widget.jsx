import React from "react";

const Widget = ({ editMode, handleDelete, children, title, subTitle }) => {
  return (
    <div className={`dashboard-Pie`}>
      {editMode && (
        <div className="d-flex">
          <div className="edit cancelSelectorName" onClick={handleDelete}>
            <img src="assets/Dark/Edit.svg" alt="edit" />
          </div>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <img src="assets/Dark/Delete.svg" alt="delete" />
          </div>
        </div>
      )}
      <div className="dashboard-label-body">
        <h5 className="widgetTitle">{title}</h5>
        {subTitle && <p className="widgetSubTitle">{subTitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default Widget;
