import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import exampleFilms from '../../Example/Film.json';
 
const width = Dimensions.get('window').width
 
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favData: [],
            loading: false
        }
    };

    componentWillMount() {
        this.setState({ favData: exampleFilms });
        // this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `https://murmuring-dusk-96380.herokuapp.com/movies.json`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ favData: res,
                    loading: false })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            });
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
 
    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#333333', width: width, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('AddFilm')}
                    style={{ width: 35, height: 35, position: 'absolute', right: 10, top: 10 }}
                    >
                        <Icon 
                        name='plus'
                        size={35}
                        color='white'
                        />
                    </TouchableOpacity>
                    <Icon 
                    name='user-circle'
                    size={70}
                    color='grey'
                    />
                    <Text style={styles.userNameTextStyle}>Kullanıcı Adı</Text>
                </View>
                <View style={{ backgroundColor: '#333333', borderBottomWidth: 1, borderColor: '#E8B706', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, color: 'white' }}>Favori Filmlerim</Text>
                </View>
                <FlatList 
                ListFooterComponent={this.renderFooter}
                keyExtractor={item => item.imdbID}
                data={this.state.favData}
                renderItem={({item}) => <FavListItem item={item} navigation={this.props.navigation} />}
                />
            </View>
        );
    }
}

class FavListItem extends Component {
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
                    <Image source={{uri: this.props.item.poster}} style={styles.imageStyle} />
                    <View>
                        <Text style={styles.filmNameStyle} numberOfLines={2}> {this.props.item.title} </Text>
                        <Text style={styles.filmOtherStyle} numberOfLines={1}> Yıl : {this.props.item.year} </Text>
                        <Text style={[styles.filmOtherStyle, { width: width - 120 }]} numberOfLines={2}> Tür : {this.props.item.genre}</Text>
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
    container:{
        flex: 1,
        backgroundColor: '#191919'
    },
    scene: {
        flex: 1,
        backgroundColor: '#191919'
    },
    userNameTextStyle: {
        fontSize: 25,
        color: 'white',
        marginTop: 10,
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