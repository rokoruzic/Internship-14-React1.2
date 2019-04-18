import React from "react";
function Basket(props) {
  return (
    <div className="item" onClick={props.handleStrikeGrocery}>
      {props.name}{" "}
      <span className={props.quantityClassName}>{props.quantity}</span>{" "}
      {props.isStriked}{" "}
      <button
        id="item__basket"
        className={props.buttonClassName}
        onClick={props.handleRemoveGrocery}
      >
        -
      </button>
    </div>
  );
}

export default Basket;
