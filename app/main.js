import React from "react"
import ReactDOM from "react-dom"
import css from "style-loader!css-loader!./App.css"


class TableOfFood extends React.Component {
  render() {

    return (
      <div>
           {this.props.listOfFoods}
        </div>
    )
  }
}

class TableBody extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        shoppingList: this.props.shoppingList,
        isEditing: false
      }
    }
    deleteItem() {
      var {
        foodName,
        ingredients
      } = this.props;
      this.props.deleteFoodItem(foodName)
    }

    editFoodItem() {

        var {
          foodName,
          ingredients
        } = this.props;
        foodName = foodName.split(" ").map(letter => letter[0].toUpperCase() + letter.slice(1)).join(" ")

        if (!this.state.isEditing) {

          return (
            <div className="foodGroup">
          <tr> <td><h3><span className="foodTitle"><em> {foodName} </em></span></h3>
            <p> <h3> Ingredients: </h3> {ingredients} </p> </td> </tr>
        <button className="btn btn-info"   onClick={this.edit.bind(this)}>Edit</button>
<button className="btn btn-danger" onClick={this.deleteItem.bind(this)} >Delete</button>
             <br />
          </div>
          )
        } else {
          return (

              <tr>
          <td>
            <h3>Food Title Name:
              <input size="35"
          ref="foodName"
        defaultValue={foodName}
                 onKeyPress={e=>{
                  if(e.key==="Enter"){this.saveEdit()}
                }
                }/>
            </h3>
            <p> <h3> Edit Ingredients: </h3>
              <textarea
                cols="80"
                rows="7"
          ref="ingredients"
          defaultValue={ingredients}
               onKeyPress={e=>{
                  if(e.key==="Enter"){this.saveEdit()}
                }}
        />
            </p>
       <button className="btn btn-success"   onClick={this.saveEdit.bind(this)}>Save</button>
      </td><
          /tr>)

        }
      }
      edit() {
        this.setState({
          isEditing: true
        })
      }
      saveEdit() {
        this.setState({
          isEditing: false
        })

        var {
          foodName,
          ingredients
        } = this.props

        foodName = this.refs.foodName.value
        ingredients = this.refs.ingredients.value
        var food = {
          foodName,
          ingredients
        }

        this.props.onSaveEdit(this.props.foodName, food)

      }

      render() {

        return (
          <tbody>{this.editFoodItem()}</tbody>
        )
      }
    }

    class FoodForm extends React.Component {
      constructor(props) {
        super(props)
      }

      enterAddFood(e) {
        e.preventDefault()
        let food = {}
        food.foodName = this.refs.foodName.value;
        food.ingredients = this.refs.ingredients.value;
        if (this.refs.foodName.value.length > 0) {

          this.props.enterFood(food)
          this.refs.foodName.value = "";
          this.refs.ingredients.value = ""
        }
      }

      render() {

        return (
         <div className="foodForm form-group">
             <form onSubmit={this.enterAddFood.bind(this)}>
            <h4> Title of Food </h4> <input
      className="form-control text-center"
        ref="foodName"
      placeholder="Enter Food Name"
      />
      <br />
            <h4>Enter Primary Ingredient</h4>
               <input
                 className="form-control text-center"
      ref="ingredients"
    placeholder="Main Ingredient"/>
  <br />
        <button className="btn btn-warning">Save</button>
      </form>
            </div>
        )
      }
    }
    const shoppingList = [
      {
      foodName: "Chicken y las Verduras",
      ingredients: "In a bowl, combine 2 tablespoons cornstarch, 2 tablespoons water and garlic powder until smooth. Add beef and toss. In a large skillet or wok over medium high heat, stir-fry beef in 1 tablespoon oil until beef reaches desired doneness; remove and keep warm. Stir-fry broccoli and onion in remaining oil for 4-5 minutes. Return beef to pan. Combine soy sauce, brown sugar, ginger and remaining cornstarch and water until smooth; add to the pan. Cook and stir for 2 minutes. Serve over rice."
    },
                      {
      foodName: "Beef and da Brocolli",
      ingredients: "Whisk together the soy sauce, sesame oil, honey, garlic and ginger.Place the beef in a Ziploc bag (or glass bowl), pouring in half of the sauce mixture to coat the beef. Marinate for either 20 minutes on the counter or covered overnight in the fridge.  Whisk the cornstarch and water together and add to the remaining sauce mixture. Heat a wok or large sauté pan over high heat, add 2 teaspoons oil and add the beef. Cook for 4 minutes and remove beef to a clean bowl.  Add the remaining 1 teaspoon of oil to the pan and cook the broccoli for 2 minutes.  Add the beef back into the pan. Make a well in the center and pour in the sauce. Cook until the sauce is thick and everything is heated through, about 2 minutes. Serve over brown rice."
    }]


    class App extends React.Component {
      constructor(props) {
        super(props)

        var fromStorage = JSON.parse(localStorage.getItem("_Docwali777_recipes"))

        if (fromStorage !== undefined && fromStorage !== null) {
          this.state = {
            shoppingList: fromStorage
          }
        } else {
          this.state = {
            shoppingList: shoppingList
          }
        }
        var toStorage = localStorage.setItem("_Docwali777_recipes", JSON.stringify(this.state.shoppingList))
      }

      enterFood(food) {
        this.state.shoppingList.push(food)
        this.setState({
          shoppingList: this.state.shoppingList
        })
      }
      deleteFoodItem(food) {
        let newFoods = this.state.shoppingList.filter(foods => foods.foodName !== food)
        this.setState({
          shoppingList: newFoods
        })

      }
      saveEdit(previous, curr) {
        var edit = this.state.shoppingList.filter(foods => {
          return foods.foodName === previous
        })
        var index = this.state.shoppingList.indexOf(edit[0])
        this.state.shoppingList.splice(index, 1, curr)
        this.setState({
          shoppingList: this.state.shoppingList
        })
      }

      localStorage() {
        var toStorage = localStorage.setItem("_Docwali777_recipes", JSON.stringify(this.state.shoppingList))
        var fromStorage = JSON.parse(localStorage.getItem("_Docwali777_recipes"))

        return (
          <div>
    <FoodForm  enterFood={this.enterFood.bind(this)} />
            <br />
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

    ReactDOM.render(<App />, document.getElementById('root'))
