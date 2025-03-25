import React, { useState } from "react";
import Count from "./Count";
import Popup from "../../Helper/Popup/Popup";
import CountPopupBody from "./CountPopup/CountPopupBody";

const CountsOverview = ({ data }) => {
  const [openPopup, setOpenPopup] = useState();

  return (
    <div className="countsOverview">
      {data?.map((i, index) => (
        <div key={index}>
          <Count
            title={i?.label}
            number={i?.totalCount}
            setOpenPopup={setOpenPopup}
            tableData={i?.tableData}
          />
        </div>
      ))}

      <Popup
        size="lg"
        title={openPopup?.title}
        subtitle={`Total ${openPopup?.title}: ${openPopup?.number}`}
        handleClose={() => setOpenPopup()}
        show={!!openPopup}
      >
        <CountPopupBody
          tableData={openPopup?.tableData}
          title={openPopup?.title}
        />
      </Popup>
    </div>
  );
};

export default CountsOverview;
