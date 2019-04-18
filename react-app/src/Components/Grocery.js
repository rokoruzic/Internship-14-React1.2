import React from "react"
import "./style.css";

function Grocery(props){
    return <div> 
        {props.name} <button onClick = {props.handleAddGrocery}>+</button> <span className="grocery__quantity__item">{props.quantity}</span> 
    </div>
}
export default Grocery;