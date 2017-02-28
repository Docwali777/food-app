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
  shoppingList: this.props.shoppingList,
  isEditing: false
}
}
deleteItem = () =>{
var {foodName, ingredients} = this.props;
  this.props.deleteFoodItem(foodName)
}

editFoodItem = ()=>{

  var {foodName, ingredients} = this.props;



  if(!this.state.isEditing){
        return(

              <tr>
                <td>{foodName}</td>
                <td>{ingredients}</td>
                <td><button className="btn btn-info"   onClick={()=>this.edit()}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={this.deleteItem} >Delete</button></td>
              </tr>
          )
}
else {
return(    <tr>
      <td>
        <input
          ref="foodName"
        defaultValue={foodName} />
      </td>
      <td>
        <input
          ref="ingredients"
          defaultValue={ingredients}
        />
      </td>
      <td><button className="btn btn-success"   onClick={this.saveEdit.bind(this)}>Save</button></td>
    </tr>)

}
}
edit = () => {
  this.setState({isEditing: true})
}
saveEdit = ()=>{
  this.setState({isEditing: false})

var {foodName, ingredients} = this.props


foodName = this.refs.foodName.value
ingredients = this.refs.ingredients.value
var food = {foodName, ingredients}

this.props.onSaveEdit(this.props.foodName, food)

}

  render(){
// var {foodName, ingredients} = this.state;

    return(
      <tbody>{this.editFoodItem()}</tbody>
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



// -----------
//Main compoenent to be rendered
export default class App extends React.Component {
constructor(props){
  super(props)
  this.state = {
    shoppingList: JSON.parse(localStorage.getItem("_Docwali777_recipes"))

  }
  var toStorage = localStorage.setItem("_Docwali777_recipes", JSON.stringify(this.state.shoppingList))

  var fromStorage = JSON.parse(localStorage.getItem("_Docwali777_recipes"))
}

enterFood = (food) =>{
this.state.shoppingList.push(food)
this.setState({shoppingList: this.state.shoppingList})
}
deleteFoodItem = (food) =>{
let newFoods = this.state.shoppingList.filter(foods=> foods.foodName !== food)
this.setState({shoppingList: newFoods})

}
saveEdit(previous, curr){
var edit = this.state.shoppingList.filter(foods=>{
  return    foods.foodName === previous
})
var index = this.state.shoppingList.indexOf(edit[0])
this.state.shoppingList.splice(index, 1, curr)
this.setState({shoppingList: this.state.shoppingList})
}

localStorage(){
  var toStorage = localStorage.setItem("_Docwali777_recipes", JSON.stringify(this.state.shoppingList))

  var fromStorage = JSON.parse(localStorage.getItem("_Docwali777_recipes"))

  return(
    <div>
    <FoodForm  enterFood={this.enterFood} />
      <TableOfFood listOfFoods={fromStorage.map((foods, key)=>
            <TableBody onSaveEdit={this.saveEdit.bind(this)} key={key} {...foods} shoppingList={this.state.shoppingList} deleteFoodItem={this.deleteFoodItem.bind(this)}  />) }/>
    </div>
  )
}

  render() {

    return (
  <div>
    {this.localStorage()}
  </div>
    )
  }
}
