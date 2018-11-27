import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            passwordAgain: '',
            registerButton: false,
        }
    }

    componentWillMount() {
        // setTimeout(() => {
        //     this.props.navigation.navigate('Main');
        // }, 1000);
    }

    login() {
        this.props.navigation.navigate('Main');
    }

    register() {

    }

    loginSwitch() {
        this.setState({ registerButton: false });
    }

    registerSwitch() {
        this.setState({ registerButton: true });
    }

    render() {
        if (!this.state.registerButton) {
            return (
                <View style={styles.container}>
                    <Text style={styles.mainTextStyle}> Giriş Yap </Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='e-Mail'
                        placeholderTextColor='grey'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.text}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Şifre'
                        secureTextEntry
                        placeholderTextColor='grey'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.text}
                    />
                    <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.login()}>
                        <Text style={styles.loginButtonTextStyle}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButtonStyle} onPress={() => this.registerSwitch()}>
                        <Text style={styles.registerButtonTextStyle}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.mainTextStyle}> Kayıt Ol </Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Kullanıcı Adı'
                        placeholderTextColor='grey'
                        onChangeText={(userName) => this.setState({userName})}
                        value={this.state.text}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='e-Mail'
                        placeholderTextColor='grey'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.text}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Şifre'
                        secureTextEntry
                        placeholderTextColor='grey'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.text}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Şifre Tekrar'
                        secureTextEntry
                        placeholderTextColor='grey'
                        onChangeText={(passwordAgain) => this.setState({passwordAgain})}
                        value={this.state.text}
                    />
                    <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.loginSwitch()}>
                        <Text style={styles.loginButtonTextStyle}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButtonStyle} onPress={() => this.register()}>
                        <Text style={styles.registerButtonTextStyle}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919'
    },
    mainTextStyle: {
        fontSize: 50,
        color: '#F0F0F0',
        marginBottom: 25,
    },
    textInputStyle: {
        width: width - 40,
        height: 40,
        fontSize: 17,
        color: '#F0F0F0',
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        textAlign: 'center'
    },
    loginButtonStyle: {
        width: width / 2,
        height: 40,
        backgroundColor: '#E8B706',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    loginButtonTextStyle: {
        color: 'black',
        fontSize: 17
    },
    registerButtonStyle: {
        width: width / 2,
        height: 40,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    registerButtonTextStyle: {
        color: 'black',
        fontSize: 17
    }
});

export default Login;