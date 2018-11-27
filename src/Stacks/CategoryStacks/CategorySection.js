import React, { Component } from 'react';
import { View, 
    Text, 
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import exampleFilms from '../../Example/Film.json';

let width = Dimensions.get('window').width;

class CategorySection extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('selectCat')
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentWillMount() {
        let catArray = [];
        for (let i = 0; i < exampleFilms.length; i++) {
            if (exampleFilms[i].Genre.includes(this.props.navigation.getParam('selectCat'))) {
                catArray.push(exampleFilms[i]);
            }
        }
        this.setState({ data: catArray });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    keyExtractor={item => item.imdbID}
                    data={this.state.data}
                    renderItem={({item}) => <FilmListItem item={item} navigation={this.props.navigation} />}
                />
            </View>
        );
    }
}

class FilmListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('FilmDetail', {
                film: this.props.item
            })}
            >
                <View style={{ alignSelf: 'center', flexDirection: 'row', width: width - 20, margin: 10, paddingBottom: 10, borderColor: 'grey', borderBottomWidth: 1 }}>
                    <Image source={{uri: this.props.item.Poster}} style={styles.imageStyle} />
                    <View>
                        <Text style={styles.filmNameStyle} numberOfLines={2}> {this.props.item.Title} </Text>
                        <Text style={styles.filmOtherStyle} numberOfLines={1}> Yıl : {this.props.item.Released} </Text>
                        <Text style={styles.filmOtherStyle} numberOfLines={1}> Tür : {this.props.item.Genre}</Text>
                        <Text style={styles.filmOtherStyle} numberOfLines={1}> Derece :  {this.props.item.imdbRating}</Text>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <Image source={(require('../../Images/star.png'))} style={{ width: 16, height: 16 }} />
                            <Text style={styles.filmOtherStyle}>{this.props.item.imdbRating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919'
    },
    imageStyle: {
        width: 100,
        height: 144,
        borderRadius: 10,
    },
    filmNameStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: '400',
        marginLeft: 5,
    },
    filmOtherStyle: {
        color: 'white',
        fontSize: 17,
        fontWeight: '300',
        marginLeft: 5,
    }
});

export default CategorySection;