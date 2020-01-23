import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView
} from 'react-native';
import GridList from '../ui/GridList';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { addFood, updateFood, uploadFood } from '../api/FoodsApi';
import YooImagePicker from './YooImagePicker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const FoodForm = (props) => {

  setFoodImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <YooImagePicker image={props.food.image} onImagePicked={setFoodImage} />
      </View>
      <View style={styles.container}>
        <TextInput
          value={props.values.name}
          style={styles.longFormInput}
          placeholder='Name'
          placeholderTextColor="white"
          onChangeText={text => { props.setFieldValue('name', text) }}
        />
        <Text style={styles.validationText}> {props.errors.name}</Text>
        <TextInput
          value={props.values.category}
          style={styles.longFormInput}
          placeholder='Category'
          placeholderTextColor='white'
          onChangeText={text => { props.setFieldValue('category', text) }}
        />
        <Text style={styles.validationText}> {props.errors.category}</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.formInput}
            onChangeText={text => { props.setSubIngredients(text) }}
            placeholder='Sub-ingredient'
            placeholderTextColor='white'
          />
          <Button
            icon={{
              name: 'add',
              size: 15,
              color: "white"
            }}
            buttonStyle={{
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
              width: '55%',
              backgroundColor: 'green',
            }}
            type='solid'
            title='Add'
            onPress={() => { props.submitSubIngredients() }} />
        </View>
        <GridList
          items={props.food.subIngredients} />
        <Button
          icon={{
            name: 'send',
            size: 15,
            color: "white"
          }}
          iconRight
          buttonStyle={{
            marginLeft: 10,
            marginTop: 10,
            alignItems: 'center',
            width: '35%',
            backgroundColor: 'blue',
          }}
          type='solid'
          title='Submit'
          onPress={() => props.handleSubmit()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  formInput: {
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    padding: 10,
    height: 50,
    color: 'white',
    width: '75%',
    marginTop: 10,
    fontWeight: '300',
  },
  validationText: {
    color: 'red',
    fontWeight: '300',
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'white',
    fontWeight: '300',
    borderColor: 'white',
    borderWidth: 3,
    padding: 10,
    marginTop: 6,
    borderRadius: 30,
  },

});

export default withFormik({
  mapPropsToValues: ({ food }) => ({
    name: food.name,
    category: food.category,
    imageUri: null
  }),
  enableReinitialize: true,
  validationSchema: (props) => yup.object().shape({
    name: yup.string().max(30).required(),
    category: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
    console.log(props);
    
    values.subIngredients = props.food.subIngredients;

    console.log(values);

    if (props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      values.image = props.food.image;
      uploadFood(values, props.onFoodUpdated, { updating: true });
      
    } else {
      uploadFood(values, props.onFoodAdded, { updating: false });
    }
    
  },
})(FoodForm);
