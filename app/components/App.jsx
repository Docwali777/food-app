import React, {Component} from "react"




//React.Component for TableOfFood
class TableOfFood extends React.Component {
  render() {

    return (
      <table>
        <TableHead/>
          {this.props.listOfFoods}
      </table>
    )
  }
}

//Table Header
const TableHead = () => {

  return (
    <thead>
      <tr>
        <th>Food Name</th>
        <th>Food Ingredients</th>
      </tr>
    </thead>
  )
}

class TableBody extends React.Component{
constructor(props){
  super(props)
this.state = {
  shoppingList: this.props.shoppingList
}
}
deleteItem = () =>{
var {foodName, ingredients} = this.props;
  this.props.deleteFoodItem(foodName)
}

  render(){
var {foodName, ingredients} = this.props;
    return(
      <tbody>
          <tr>
            <td>{foodName}</td>
            <td>{ingredients}</td>
            <td><button>Edit</button></td>
            <td><button onClick={this.deleteItem} >Delete</button></td>
          </tr>
      </tbody>
    )
  }
}
class FoodForm extends React.Component{
constructor(props){
  super(props)
}

enterAddFood = (e) => {
e.preventDefault()
let food = {}
food.foodName = this.refs.foodName.value;
food.ingredients = this.refs.ingredients.value;
if(this.refs.foodName.value.length >  0){

  this.props.enterFood(food)
  this.refs.foodName.value = "";
  this.refs.ingredients.value = ""
}
}

  render(){

  return(
      <form onSubmit={this.enterAddFood}>
        <input
        ref="foodName"
      placeholder="Enter Food Name"
      />
      <br />
      <input
      ref="ingredients"
    placeholder="Enter Ingredients"/>
  <br />
        <button>Save</button>
      </form>
    )
  }
}
const shoppingList = [
      {foodName: "Beef and da Brocolli",
        ingredients: "good stuff"},
        {foodName: "Chicken",
          ingredients: "Broth"}
]

//Main compoenent to be rendered
export default class App extends React.Component {
constructor(props){
  super(props)
  this.state = {
    shoppingList: shoppingList
  }
}

enterFood = (food) =>{
this.state.shoppingList.push(food)
this.setState({shoppingList: this.state.shoppingList})
}
deleteFoodItem = (food) =>{
let newFoods = this.state.shoppingList.filter(foods=> foods.foodName !== food)
this.setState({shoppingList: newFoods})

}


  render() {
    return (
      <div>
      <FoodForm  enterFood={this.enterFood} />
        <TableOfFood listOfFoods={this.state.shoppingList.map((foods, key)=>
              <TableBody key={key} {...foods} shoppingList={this.state.shoppingList} deleteFoodItem={this.deleteFoodItem.bind(this)}  />) }/>
      </div>
    )
  }
}
