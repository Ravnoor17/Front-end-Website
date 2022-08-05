import React from "react";
import "../Styles/textstyle1";
const Textstyle1 = (props) => {
  return (
    <div className="textstyle1-god">
      <h1 class="textstyle1 --debug">
        <span class="textstyle1__row">
          <span class="textstyle1__text">{props.text}</span>
        </span>
        <span
          class="textstyle1__row textstyle1__row--sibling"
          aria-hidden="true"
        >
          <span class="textstyle1__text">{props.text}</span>
        </span>
        <span
          class="textstyle1__row textstyle1__row--sibling"
          aria-hidden="true"
        >
          <span class="jt__text">{props.text}</span>
        </span>
        <span
          class="textstyle1__row textstyle1__row--sibling"
          aria-hidden="true"
        >
          <span class="textstyle1__text">{props.text}</span>
        </span>
      </h1>
    </div>
  );
};

export default Textstyle1;
