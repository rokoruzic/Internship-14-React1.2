import React, { Component } from "react";
import Grocery from "./Components/Grocery";
import GroceryList from "./Constants/GroceryList";
import Basket from "./Components/Basket";
import "./Components/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: GroceryList,
      basketList: [{ name: "", quantity: 0, isStriked: false }]
    };
  }
  handleAddGrocery = grocery => {
    grocery.quantity += 1;
    const groceryToEdit = {
      name: grocery.name,
      quantity: grocery.quantity,
      isStriked: false
    };
    var groceryList = this.state.groceryList;
    grocery.isStriked = false;
    groceryList.forEach((groceryItem, index) => {
      if (groceryItem.name === grocery.name) groceryList[index] = grocery;
    });
    var basketList = this.state.basketList.concat(grocery);
    basketList.forEach((basketItem, index) => {
      if (basketItem.name === grocery.name) {
        if (!basketItem.isStriked) basketList[index] = groceryToEdit;
        basketList = basketList.concat(groceryToEdit);
      }
    });
    var filter = function(value, index) {
      return this.indexOf(value) === index;
    };
    basketList = basketList.filter(filter, basketList);
    this.setState({
      basketList: basketList
    });
  };
  handleRemoveGrocery = (event, grocery) => {
    grocery.quantity -= 1;
    var groceryList = this.state.groceryList;
    groceryList.forEach((groceryItem, index) => {
      if (groceryItem.name === grocery.name) groceryList[index] = grocery;
    });
    var basketList = this.state.basketList;
    basketList.forEach((basketItem, index) => {
      if (basketItem.name === grocery.name) {
        basketList[index] = grocery;
        if (grocery.quantity === 0) basketList.splice(index, 1);
      }
    });
    event.stopPropagation();
    this.setState({
      groceryList: groceryList,
      basketList: basketList
    });
  };
  handleRemoveAllGroceries = () => {
    this.setState({
      basketList: []
    });
  };

  handleStrikeGrocery = (event, grocery) => {
    var groceryToAdd = { name: grocery.name, quantity: 0, isStriked: false };
    if (!grocery.isStriked)
      grocery.name =`${grocery.name} ${grocery.quantity}`;
    grocery.isStriked = true;
    event.currentTarget.style.textDecoration = "line-through";
    var groceryList = this.state.groceryList;
    groceryList.forEach((groceryItem, index) => {
      if (groceryItem.name === groceryToAdd.name) {
        groceryList[index] = groceryToAdd;
      }
    });
    this.setState({
      groceryList: groceryList
    });
  };
  componentDidMount() {
    var basketList = this.state.basketList;
    basketList.shift();
    this.setState({
      basketList: basketList
    });
  }
  render() {
    
    const groceries = this.state.groceryList.map((grocery, index) => (
      <div key={index}>
        <Grocery
          name={grocery.name}
          quantity={grocery.quantity}
          handleAddGrocery={() => this.handleAddGrocery(grocery)}
        />
      </div>
    ));

    const basketGroceries = this.state.basketList.map((grocery, index) => (
      <div key={index}>
        <Basket
          name={grocery.name}
          quantity={grocery.quantity}
          isStriked={false}
          handleStrikeGrocery={e => this.handleStrikeGrocery(e, grocery)}
          handleRemoveGrocery={e => this.handleRemoveGrocery(e, grocery)}
          buttonClassName={
            grocery.isStriked ? "button__basket__hide" : "button__basket"
          }
          quantityClassName={
            grocery.isStriked ? "quantity__item__hide" : "quantity__item"
          }
        />
      </div>
    ));

    return (
      <>
        <div>
          <h1>Groceries</h1>
          {groceries}
        </div>
        <div>
          <h1>Basket</h1>
          {this.state.basketList.length === 0 ? (
            <button className="empty__basket__item__hide" />
          ) : (
            <button
              onClick={this.handleRemoveAllGroceries}
              className="empty__basket__item"
            >
              Empty basket
            </button>
          )}
          {this.state.basketList.length === 0
            ? "Kosarka s jednim kosom is empty"
            : basketGroceries}
        </div>
      </>
    );
  }
}

export default App;
