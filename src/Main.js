import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './Navigation';
import firebase from 'firebase';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyA-EwciP932flw5npm-bD3VP0_pdxTLSgc",
            authDomain: "worktask-ardasnturk.firebaseapp.com",
            databaseURL: "https://worktask-ardasnturk.firebaseio.com",
            projectId: "worktask-ardasnturk",
            storageBucket: "worktask-ardasnturk.appspot.com",
            messagingSenderId: "833035605016"
        });
    }

    render() {
        return (
            <Navigation />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

export default Main;