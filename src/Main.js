import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './Navigation';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillMount() {
        
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