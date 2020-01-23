import React, { Component } from 'react';
import FoodForm from '../ui/FoodForm';
import {StyleSheet, ImageBackground} from 'react-native';
import backgrounds from '../styles/backgrounds';


export default class FoodFormScreen extends Component {

  state = {
    food: {
      name: '',
      category: '',
      subIngredients: []
    },
    currentSubIngredient: null,
  }

  componentDidMount() {
    const currentFood = this.props.navigation.getParam('food');

    if (currentFood) {
      this.setState(prevState => ({ food: prevState.food = currentFood }))
    }
  }

  onFoodUpdated = (food) => {
    console.log(food);
    this.props.navigation.navigate("Home");
  }

  setCurrentSubIngredient = (text) => {
    this.setState(prevState => ({
      currentSubIngredient: prevState.currentSubIngredient = text
    }));
  }

  submitSubIngredients = () => {
    let ingredient = this.state.currentSubIngredient;

    if (ingredient && ingredient.length > 2) {
      this.setState(prevState => ({
        food: { ...prevState.food, subIngredients: [...prevState.food.subIngredients, ingredient] },
      }))
    }
  }

  render() {
    return (
      <ImageBackground
      source={backgrounds.Home}
      style={styles.imageContainer}
      imageStyle={styles.image}
    >
      <FoodForm
        setSubIngredients={this.setCurrentSubIngredient}
        submitSubIngredients={this.submitSubIngredients}
        food={this.state.food}
        onFoodAdded={this.props.navigation.getParam('foodAddedCallback')}
        onFoodUpdated={this.onFoodUpdated}
        
      />
      </ImageBackground>
    );
  }
}

const styles=StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

})