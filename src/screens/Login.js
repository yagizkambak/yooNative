import React from 'react';
import colors from '../styles/colors';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    ImageBackground,
    TextInput,
    ToastAndroid,

} from 'react-native';
import backgrounds from '../styles/backgrounds';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';

export default class Login extends React.Component {

    state = { email: '', password: '', errorMessage: null };
    handleLogin = () => {
        if (this.state.email && this.state.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('Home'))
                .catch(error => this.setState({ errorMessage: error.message }));
        } else {
            ToastAndroid.show('Please fill all the fields!', ToastAndroid.LONG);
        }
    };

    render() {
        return (

            <ImageBackground
                source={backgrounds.Home}
                style={styles.imageContainer}
                imageStyle={styles.image}
            >
            <Image source={require('../img/yoologo.png')}
                            style={styles.logo}
                        />
                <KeyboardAvoidingView style={styles.wrapper}>
                    <View style={styles.scrollView}>
                        <ScrollView style={styles.scrollViewWrapper}>
                            <Text style={styles.loginHeader}> Log In</Text>
                            <TextInput
                                style={styles.textInput}
                                autoCapitalize="none"
                                placeholder="Email"
                                placeholderTextColor='white'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                            <TextInput
                                secureTextEntry
                                style={styles.textInput}
                                autoCapitalize="none"
                                placeholder="Password"
                                placeholderTextColor='white'
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />

                            {this.state.errorMessage && (
                                <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
                            )}


                        </ScrollView>
                        <View style={styles.nextButton}>
                            <Button
                                buttonStyle={{
                                    marginTop: 10,
                                    borderRadius:50,
                                    alignItems: 'center',
                                    width: '65%',
                                    backgroundColor: '#d5a034',
                                }}
                                title="Login"
                                onPress={this.handleLogin} />


                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
    },
    wrapper: {
        display: 'flex',
        flex: 1,
    },
    scrollViewWrapper: {
        marginTop: 10,
        flex: 1,
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 50,
        left:20,
        top:30,
    },
    loginHeader: {
        fontSize: 34,
        color: colors.white,
        fontWeight: '400',
        marginBottom: 40,
        left: -10,
        flex: 1,
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        flex: 1,
    },
    nextButton: {
        position: 'absolute',
        //alignItems: "flex-end",
        right:-20,
        top: 300,
    },
    textInput: {
        height: 60,
        fontSize: 20,
        color: colors.white,
        width: '100%',
        borderColor: colors.white,
        borderBottomWidth: 1,
        marginTop: 8,
        marginVertical: 15,
    },
})