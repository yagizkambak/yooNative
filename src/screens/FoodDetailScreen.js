import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { deleteFood } from '../api/FoodsApi'
import backgrounds from '../styles/backgrounds';


class FoodDetailScreen extends Component {

  render() {
    const food = this.props.navigation.getParam('food');

    const onFoodDeleted = this.props.navigation.getParam('foodDeletedCallback');

    console.log(food);
    return (
      <ImageBackground
      source={backgrounds.Home}
      style={styles.imageContainer}
      imageStyle={styles.imageTwo}
    >
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name='ios-create'
            type='ionicon'
            onPress={() =>
              this.props.navigation.navigate('FoodFormScreen', {
                food: food
              })
            }
          />
          <Icon
            reverse
            name='ios-trash'
            type='ionicon'
            color='#CA300E'
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  { text: 'Cancel' },
                  { text: 'OK', onPress: () => { deleteFood(food, onFoodDeleted) } }
                  
                ],
                { cancelable: false },
              )
            }
          />
        </View>
        <Image style={styles.image} source={food.image && { uri: food.image }} />
        <Text style={styles.headerText}>{food.name}</Text>
        <Text style={styles.categoryText}>Category: {food.category}</Text>

        <Text style={styles.ingredientText}>Ingredients</Text>
        {
          food.subIngredients === undefined || food.subIngredients.length == 0 ?
            <Text>None</Text> : <FlatList
              data={food.subIngredients}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() =>
                <Divider style={{ backgroundColor: 'black' }} />}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={styles.ingredientItemText}>{item}</Text>
              }
            />
        }
      </View >
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    color:'white',
    fontWeight:'bold',
    marginBottom: 32
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16
  },
  imageContainer: {
    flex: 1,
  },
  imageTwo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  categoryText: {
    fontSize: 20,
    fontStyle:'italic',
    color:'white',
    fontWeight:'300',
    marginBottom: 32
  },
  ingredientText: {
    fontStyle: 'italic',
    color:'white',
    fontWeight:'300',
    textDecorationLine:'underline',
    fontSize: 18,
    marginBottom: 32
  },
  ingredientItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
    color:'white'
  },
  container: {
    alignItems: 'center'
  },
  listContainer: {
    borderWidth: 1,
    width: 300,
    borderColor: 'white'
  }
});

export default FoodDetailScreen;