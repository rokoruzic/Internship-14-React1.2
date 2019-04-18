import React from "react";
import "./style.css";

function Grocery(props) {
  return (
    <div className="item">
      {props.name}{" "}
      <button id="item__button" onClick={props.handleAddGrocery}>
        +
      </button>{" "}
      <span className="grocery__quantity__item">{props.quantity}</span>
    </div>
  );
}
export default Grocery;
