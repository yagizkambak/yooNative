import React, { Component } from 'react';
import colors from '../styles/colors';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    ImageBackground,
    BackHandler,
    Alert
} from 'react-native';
import backgrounds from '../styles/backgrounds';
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundedButton from '../components/buttons/RoundedButton';
import { withNavigationFocus } from 'react-navigation';

class LoggedOut extends React.Component {

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

    onCreateButtonPressed = () => {
        this.props.navigation.navigate('SignUp')
    }
    
    onLoginButtonPressed =() => {
        this.props.navigation.navigate('Login')
    }
    onMoreOptionsPress() {
        alert('More Options Button Pressed');
    }
    render() {
        return (
            <ImageBackground
                source={backgrounds.Home}
                style={styles.imageContainer}
                imageStyle={styles.image}
            >
                <View style={styles.wrapper}>
                    <View style={styles.welcomeWrapper}>
                        <Image source={require('../img/yoologo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.welcomeText}>Welcome to Yoo Lifestyle</Text>
                        <RoundedButton
                            text="Create a Yoo Account"
                            textColor={colors.gray}
                            background={colors.white}
                            icon={<Icon name="sign-in-alt" size={20} style={styles.signInIcon} />}
                            handleOnPress={this.onCreateButtonPressed}
                        />

                        <RoundedButton
                            text="I Already Have An Account"
                            textColor={colors.white}
                            icon={<Icon name="sign-in-alt" size={20} style={styles.signInIcon} />}
                            handleOnPress={this.onLoginButtonPressed}
                        />
                        <TouchableHighlight style={styles.moreOptionsButton}
                            onPress={this.onMoreOptionsPress}
                        >
                            <Text style={styles.moreOptionsButtonText}>More Options</Text>
                        </TouchableHighlight>
                        <View style={styles.termsAndConditions}>
                            <Text style={styles.termsText}>
                                This Application created by Speedio Technologies Mobile Department. Yoo is Speedio Technologies brand and product.</Text>

                            <Text style={styles.termsText}>
                                By tapping Create a Yoo Account or More options, </Text>
                            <Text style={styles.termsText}>
                                I agree Yoo's </Text>
                            <TouchableHighlight style={styles.linkButton}>
                                <Text style={styles.termsText}>Terms of Service.</Text>
                            </TouchableHighlight>
                            <Text style={styles.termsText}>
                                and </Text>
                            <TouchableHighlight style={styles.linkButton}>
                                <Text style={styles.termsText}>Privacy Policy.</Text>
                            </TouchableHighlight>
                        </View>
                    </View>


                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
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
    signInIcon: {
        color: colors.black,
        position: 'relative',
        left: 20,
        zIndex: 8,
    },
    moreOptionsButton: {
        marginTop: 15,
    },
    moreOptionsButtonText: {
        color: colors.white,
        fontSize: 16,
    },
    termsAndConditions: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 30,
    },
    termsText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    linkButton: {
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
    }
})

export default withNavigationFocus(LoggedOut);