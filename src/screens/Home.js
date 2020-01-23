import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  BackHandler,
  Alert,

} from 'react-native';
import firebase from 'react-native-firebase';
import backgrounds from '../styles/backgrounds';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import Icon from 'react-native-vector-icons/FontAwesome';




export default class Home extends React.Component {

  state = { currentUser: null };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.props.isFocused) {
      Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    }
  };


  render() {
    const { currentUser } = this.state;
    return (
      <ImageBackground
        source={backgrounds.Login}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
      <View style={styles.container}>
              <Text style={styles.welcomeUserText}>Welcome </Text>
              <Text style={styles.userText}>
                {currentUser && currentUser.email}
              </Text>
        <View style={styles.wrapper}>
          <View style={styles.welcomeWrapper}>
            <Image source={require('../img/yoologo.png')}
              style={styles.logo}
            />
            <Text style={styles.welcomeText}>This is your kitchen</Text>
              <RoundedButton text="Add a New Food Recipe"
                textColor={colors.gray}
                background={colors.white}
                title="Food Details"
                handleOnPress={() => this.props.navigation.navigate('FoodFormScreen')} />
              <RoundedButton text="Show All Food Recipes"
                textColor={colors.gray}
                background={colors.white}
                title="Food Details"
                handleOnPress={() => this.props.navigation.navigate('FoodListScreen')} />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    // backgroundColor: colors.gray,
  },
  imageContainer: {
    flex: 1,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: -10,
},
welcomeText: {
  fontSize: 30,
  color: colors.white,
  fontWeight: '300',
  marginBottom: 40,
},
welcomeUserText: {
  fontSize: 20,
  color: colors.white,
  fontWeight: '300',
  marginTop:10,
  marginBottom: 5,
  marginRight:10,
},
userText: {
  fontSize: 18,
  color: colors.white,
  fontWeight: '300',
  marginRight:15,
},
});
