import React, { Component } from 'react';
import { View, 
    Text, 
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    TouchableWithoutFeedback,
    ActivityIndicator,
    StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import exampleFilms from '../../Example/Film.json';

let width = Dimensions.get('window').width;

class Main extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('Search')}
                >
                    <Icon
                    name="search"
                    size={20}
                    color='white'
                    />
                </TouchableOpacity>
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            headData: [],
            loading: false,
            error: null,
            currentUser: null,
            userRole: null,
            refreshing: false,
        }
    }

    componentWillMount() {
        const { currentUser } = firebase.auth()
        if (currentUser !== null) {
            this.setState({ currentUser })
        }
        //this.makeRemoteRequest();
        this.getFilm();
    }

    async userRole(userRole) {
        AsyncStorage.setItem('userRole', userRole);
    } 

    getFilm() {
        this.setState({ loading: true });
        
        firebase.database().ref('/Films/')
        .once('value', snap => {
            let arr = Object.values(snap.val())
            this.setState({ headData: arr.reverse().slice(0, 5),
                            data: arr.reverse().slice(5, arr.reverse().length),
                            refreshing: false,
                            loading: false })
        })
        .catch(error => {
            this.setState({ error, loading: false })
            alert(error.message);
        })
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        if (currentUser !== null) {
            firebase.database().ref(`/Users/${this.state.currentUser.uid}/`)
            .once('value', (snap) => {
            })
            .then((res) => this.setState({ userRole: res.val().role }))
            .then((res) => this.userRole(this.state.userRole))
        } else {
            this.userRole('notAuth');
        }
    }

    makeRemoteRequest = () => {
        const url = `https://murmuring-dusk-96380.herokuapp.com/movies.json`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ headData: res.slice(0, 5),
                    data: res.slice(5, res.length),
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

    handlerRefresh = () => {
        this.setState({
            refreshing: true,
        }, () => {
            this.getFilm();
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <FlatList 
                        ListFooterComponent={this.renderFooter}
                        keyExtractor={item => item.imdbID}
                        data={this.state.headData}
                        horizontal
                        renderItem={({item}) => <FilmListItem item={item} navigation={this.props.navigation} />}
                    />
                </View>
                <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, marginTop: 20, width: width / 2 }}>
                    <Text style={{ color: 'white', fontSize: 27 }}> Tüm Filmler </Text>
                </View>
                <View>
                    <FlatList 
                        ListFooterComponent={this.renderFooter}
                        keyExtractor={item => item.imdbID}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handlerRefresh}
                        data={this.state.data}
                        renderItem={({item}) => <FilmListItem item={item} navigation={this.props.navigation} />}
                    />
                </View>
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
                    <Image source={{uri: this.props.item.poster}} style={styles.imageStyle} />
                    <View>
                        <Text style={styles.filmNameStyle} numberOfLines={2}> {this.props.item.title} </Text>
                        <Text style={styles.filmOtherStyle} numberOfLines={1}> Yıl : {this.props.item.year} </Text>
                        <Text style={[styles.filmOtherStyle, { width: width - 120 }]} numberOfLines={2}> Tür : {this.props.item.genre}</Text>
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

export default Main;