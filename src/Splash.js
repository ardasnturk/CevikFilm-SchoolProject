import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import firebase from 'firebase';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                backgroundColor="#191919"
                barStyle="light-content"
                />
                <Text style={{ color: 'white' }}>Çevik Film</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919'
    }
});

export default Splash;