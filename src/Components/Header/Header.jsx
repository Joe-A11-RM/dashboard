import React from "react";

const Header = ({ children, title, subTitle }) => {
  return (
    <div className="bg-white p-8 border-bottom">
      <div className="flex-between">
        <div>
          <h1 className="fs-24 fw-600 text-capitalize">{title}</h1>
          <p>{subTitle}</p>
        </div>
        <div className="flex-between">{children}</div>
      </div>
    </div>
  );
};

export default Header;
