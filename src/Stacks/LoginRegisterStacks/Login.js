import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

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

    login() {
        const { email, password } = this.state
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => alert(error.message))
    }

    register() {
        // const formData = new FormData();
        // formData.append('username', this.state.userName);
        // formData.append('email', this.state.email);
        // formData.append('password', this.state.password);
        // return fetch('http://example.com/api/v1/registration', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json());
        const { email, userName, password, passwordAgain } = this.state;
        if (email === '') {
            alert('Lütfen Mail Adresinizi Yazınız')
        } else if (userName === '') {
            alert('Lütfen Kullanıcı Adınızı Yazınız')
        } else if (password !== passwordAgain) {
            alert('Şifreleriniz Aynı Değil. Lütfen Kontrol Ediniz')
        } else {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => alert(error.message))
            .then((res) => {
                if (res === true) {
                    const { currentUser } = firebase.auth()
                    this.setState({ currentUser })
                    console.log(this.state.currentUser.uid)
                    firebase.database().ref(`/Users/${currentUser.uid}/`)
                    .update({ email, userName, role: 'user' })
                    .catch((error) => alert(error.message));
                }
            });
        }
    }

    loginSwitch() {
        this.setState({ registerButton: false });
    }

    registerSwitch() {
        this.setState({ registerButton: true });
    }
    
    forgotPassword() {
        if (this.state.email === '') {
            alert('Lütfen Email adresinizi giriniz.')
        } else {
            firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => alert('Şifre yenileme bağlantınız mail adresinize gönderildi.'))
            .catch((error) => alert(error.message))
        }
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
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Şifre'
                        secureTextEntry
                        placeholderTextColor='grey'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.login()}>
                        <Text style={styles.loginButtonTextStyle}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButtonStyle} onPress={() => this.registerSwitch()}>
                        <Text style={styles.registerButtonTextStyle}>Kayıt Ol</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('Main')}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Giriş Yapmadan Devam Et</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.forgotPassword()}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Şifremi Unuttum</Text>
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
                        value={this.state.userName}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='e-Mail'
                        placeholderTextColor='grey'
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Şifre'
                        secureTextEntry
                        placeholderTextColor='grey'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Şifre Tekrar'
                        secureTextEntry
                        placeholderTextColor='grey'
                        onChangeText={(passwordAgain) => this.setState({passwordAgain})}
                        value={this.state.passwordAgain}
                    />
                    <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.loginSwitch()}>
                        <Text style={styles.loginButtonTextStyle}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButtonStyle} onPress={() => this.register()}>
                        <Text style={styles.registerButtonTextStyle}>Kayıt Ol</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('Main')}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Giriş Yapmadan Devam Et</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => this.forgotPassword()}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Şifremi Unuttum</Text>
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