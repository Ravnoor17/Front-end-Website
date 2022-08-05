import React from "react";
import "../Styles/Iconholder.css";
const Iconholder = (props) => {
  return (
    <div className="iconholder-god">
      <div class="iconholder upar">{props.title}</div>
      <div
        class="iconholder andar"
        style={{
          backgroundImage: `url(${props.icon})`,
          backgroundSize: "80px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "var(--primary)",
        }}
      ></div>
    </div>
  );
};

export default Iconholder;
