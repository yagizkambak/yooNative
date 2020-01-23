import React from 'react';
import colors from '../styles/colors';

import {View, Text, ActivityIndicator, StyleSheet,Image} from 'react-native';
//import firebase from 'react-native-firebase';
export default class SplashPage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      
        this.props.navigation.navigate('LoggedOut');
    
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
      <Image source={require('../img/slogowhite.png')}
                            style={styles.logo}
                        />
        <ActivityIndicator color="blue" size="small" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: colors.gray,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 40,
},
});
