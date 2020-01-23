import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { getFoods, signout } from '../api/FoodsApi';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class FoodList extends Component {

  state = {
    foodList: [],
    selectedIndex: 0
  }

  onFoodAdded = (food) => {
    this.setState(prevState => ({
      foodList: [...prevState.foodList, food]
    }));
    this.props.navigation.navigate("Home");
  }

  onFoodDeleted = () => {

    var newFoodList = [...this.state.foodList];
    newFoodList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      foodList: prevState.foodList = newFoodList
    }));

    this.props.navigation.navigate("Home");
  }

  onFoodsReceived = (foodList) => {
    this.setState(prevState => ({
      foodList: prevState.foodList = foodList
    }));
  }

  componentDidMount() {
    getFoods(this.onFoodsReceived);
  }

  showActionButton = () =>
    <ActionButton
      buttonColor='green'
      onPress={() => this.props.navigation.navigate('FoodFormScreen', { foodAddedCallback: this.onFoodAdded })}
    />

  render() {
    return this.state.foodList.length > 0 ?
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                containerStyle={styles.listItem}
                title={item.name}
                subtitle={`Category: ${item.category}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
                leftAvatar={{
                  size: 'large',
                  rounded: true,
                  source: item.image && { uri: item.image }
                }}
                onPress={() => {
                  this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                  this.props.navigation.navigate('FoodDetailScreen', { food: item, foodDeletedCallback: this.onFoodDeleted })
                }
                }

              />
            );
          }
          }
        />
        {this.showActionButton()}
      </SafeAreaView> :
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Foods found</Text>
        <Text style={styles.emptySubtitle}>Add a new food using the + button below</Text>
        {this.showActionButton()}
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'green',
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
  listItem: {
    borderColor:'gray',
    borderBottomWidth:0.5,
    backgroundColor:'darkgreen',
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
    fontWeight:'bold',
    color:'white',
  },
  subtitleStyle: {
    fontSize: 18,
    fontWeight:'300',
    fontStyle:'italic',
    color:'white',
  },
  emptyTitle: {
    fontSize: 32,
    color:'black',
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default FoodList;