import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Films from '../../Example/Film.json';


const width = Dimensions.get('window').width

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            data: []
        }
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                    <Icon
                    style={{ marginLeft: 10 }}
                    name="chevron-left"
                    size={20}
                    color='white'
                    />
                </TouchableOpacity>
            ),
            title: 'Filmleri Ara',
            headerRight: (
                <Icon
                style={{ marginRight: 10 }}
                name="search"
                size={20}
                color='white'
                />
            ),
        };
    };

    componentWillMount() {
        
    }

    search() {
        let searchArray = [];
        for (let i = 0; i < Films.length; i++) {
            const element = Films[i];
            if (element.Title.toLowerCase().includes(this.state.title.toLowerCase())) {
                searchArray.push(element)
            }
        }
        this.setState({ data: searchArray });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', borderBottomWidth: 1, borderColor: '#E8B706' }} >
                    <TextInput
                    placeholder='Film Ara...'
                    placeholderTextColor='#E8B706'
                    underlineColorAndroid='#00000000'
                    autoFocus
                    style={{ width: width - 20, height: 35, marginTop: 10, color: 'white', borderRadius: 5 }}
                    onSubmitEditing={() => this.search()}
                    onChangeText={(title) => this.setState({title})}
                    />
                </View>
                <View>
                    <FlatList 
                    keyExtractor={item => item.imdbID}
                    data={this.state.data}
                    renderItem={({item}) => <SearchListItem item={item} navigation={this.props.navigation} />}
                    />
                </View>
            </View>
        );
    }
}

class SearchListItem extends Component {
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

export default Search;