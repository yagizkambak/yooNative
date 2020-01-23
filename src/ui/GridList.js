import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';

const GridList = (props) => {
  return (
    <>
    <View style={styles.container}>
    <Text style={styles.textStyle}>Ingredients</Text>
      <FlatList
        contentContainerStyle={styles.grid}
        numColumns={3}
        data={props.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          console.log(item);
          return <Text style={styles.item}>{item}</Text>
        }
        }
      />
      </View>
    </>
  )
}

var styles = StyleSheet.create({
  item: {
    backgroundColor: 'green',
    margin: 3,
    width: 90,
    padding: 8,
    position:'relative',
    color: 'white',
    borderRadius:20,
  },
  grid: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: 'center'
  },
  textStyle:{
    color:'white',
    fontSize:20,
    fontStyle:'italic',
    fontWeight:'bold',
    textDecorationLine:'underline',
    textAlign:'center'
  },
  container:{
    flex:1,
  }
})

export default GridList;