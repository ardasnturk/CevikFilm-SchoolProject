import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillMount() {
        
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Action'})} >
                        <Image source={(require('../../Images/Category/action.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Adventure'})} >
                        <Image source={(require('../../Images/Category/adventure.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Animation'})} >
                        <Image source={(require('../../Images/Category/animation.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Comedy'})} >
                        <Image source={(require('../../Images/Category/comedy.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Crime'})} >
                        <Image source={(require('../../Images/Category/crime.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Drama'})} >
                        <Image source={(require('../../Images/Category/drama.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Fantasy'})} >
                        <Image source={(require('../../Images/Category/fantasy.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Horror'})} >
                        <Image source={(require('../../Images/Category/horror.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Mystery'})} >
                        <Image source={(require('../../Images/Category/mystery.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Romance'})} >
                        <Image source={(require('../../Images/Category/romance.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Sci-Fi'})} >
                        <Image source={(require('../../Images/Category/sci-fi.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategorySection', { selectCat: 'Superhero'})} >
                        <Image source={(require('../../Images/Category/superhero.jpg'))} style={{ borderRadius: 4, width: 170, height: 100, marginHorizontal: 10 }} />
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919'
    }
});

export default Category;