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
    grocery.quantity = grocery.quantity + 1;
    var groceryList = this.state.groceryList;
    groceryList.forEach((groceryItem, index) => {
      if (groceryItem.name === grocery.name) groceryList[index] = grocery;
    });
    var basketList = this.state.basketList.concat(grocery);
    basketList.forEach((basketItem, index) => {
      if (basketItem.name === grocery.name) basketList[index] = grocery;
    });
    var filter = function(value, index) {
      return this.indexOf(value) === index;
    };

    basketList = basketList.filter(filter, basketList);

    basketList.forEach(basketItem => {
      if (basketItem.name === grocery.name && basketItem.isStriked)
        basketList.push(grocery);
    });

    this.setState({
      groceryList: groceryList,
      basketList: basketList
    });
  };
  handleRemoveGrocery = (event, grocery) => {
    grocery.quantity = grocery.quantity - 1;
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

  handleStrikeGrocery = (event, grocery) => {
    grocery.isStriked = true;
    event.currentTarget.style.textDecoration = "line-through";
    var basketList = this.state.basketList;
    basketList.forEach((basketItem, index) => {
      if (basketItem.name === grocery.name) basketList[index] = grocery;
    });
    
    event.stopPropagation();

    this.setState({
      groceryList: this.state.groceryList,
      basketList: basketList
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
    var groceries = this.state.groceryList.map((grocery, index) => (
      <div key={index}>
        <Grocery
          name={grocery.name}
          quantity={grocery.quantity}
          handleAddGrocery={() => this.handleAddGrocery(grocery)}
        />
      </div>
    ));

    var basketGroceries = this.state.basketList.map((grocery, index) => (
      <div key={index}>
        <Basket
          name={grocery.name}
          quantity={grocery.quantity}
          isStriked={grocery.isStriked}
          handleStrikeGrocery={e => this.handleStrikeGrocery(e, grocery)}
          handleRemoveGrocery={e => this.handleRemoveGrocery(e, grocery)}
          buttonClassName={
            grocery.isStriked ? "button__basket__hide" : "button__basket"
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
          {basketGroceries}
        </div>
      </>
    );
  }
}

export default App;
