import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 10);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                backgroundColor="#191919"
                barStyle="light-content"
                />
                <Text style={{ color: 'white' }}>Splash</Text>
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