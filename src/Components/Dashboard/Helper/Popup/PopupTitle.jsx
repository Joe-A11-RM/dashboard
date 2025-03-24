import React from "react";

export default function PopupTitle({ image, title, subtitle }) {
  return (
    <>
      <div className="flex-between">
        <div className={`${image ? "me-3" : "me-1"}`}>
          {image && <img src={`${image}`} alt="" className="popup-image" />}
        </div>
        <div>
          <div className="popup-title">{title}</div>
          <div className="popup-subtitle">{subtitle}</div>
        </div>
      </div>
    </>
  );
}
