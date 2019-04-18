import React from "react";
class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStriked: false
    };
  }
  render() {
    return (
      <div onClick={this.props.handleStrikeGrocery}>
        {this.props.name} <span >{this.props.quantity}</span>  {this.props.isStriked}{" "}
        <button className={this.props.buttonClassName} onClick={this.props.handleRemoveGrocery}>-</button>
      </div>
    );
  }
}
export default Basket;
