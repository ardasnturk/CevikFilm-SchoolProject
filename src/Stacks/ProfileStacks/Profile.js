import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, AsyncStorage, TouchableOpacity, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
 
const width = Dimensions.get('window').width
 
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            userRole: null,
            userName: null,
            refreshing: false,
        }
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => firebase.auth().signOut()}
                >
                    <Icon
                    style={{ marginLeft: 10 }}
                    name="sign-out-alt"
                    size={20}
                    color='white'
                    />
                </TouchableOpacity>
            ),
        };
    };

    componentWillMount() {
        this.userRole();
        this.getFilm();
        //this.makeRemoteRequest();
    }

    getFilm() {
        const { currentUser } = firebase.auth();
        this.setState({ loading: true });
        firebase.database().ref(`/Users/${currentUser.uid}/favFilms/`)
        .once('value', snap => {
            if (snap.val() !== null && snap.val() !== undefined) {
                let arr = Object.values(snap.val());
                this.setState({ data: arr,
                                refreshing: false,
                                loading: false })
            } else {
                this.setState({ data: [{id: null}],
                                refreshing: false,
                                loading: false })
            }
        })
        .catch(error => {
            this.setState({ error, loading: false })
            alert(error.message);
        })
    }

    async userRole() {
        AsyncStorage.getItem('userRole')
        .then(value => this.setState({ userRole: value }));
    }

    componentDidMount() {
        const { currentUser } = firebase.auth();
        if (currentUser !== null) {
            firebase.database().ref(`/Users/${currentUser.uid}/`)
            .once('value', snap => {
            })
            .then((res) => this.setState({ userName: res.val().userName }));
        }
    }

    user() {
        if (this.state.userRole === 'admin') {
            return (
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
            )
        }
    }

    makeRemoteRequest = () => {
        const url = `https://murmuring-dusk-96380.herokuapp.com/movies.json`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res,
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
        const { currentUser } = firebase.auth();
        if (currentUser === null) {
            return (
                <View style={{ backgroundColor: '#191919', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}> Lütfen Giriş Yapın </Text>
                    <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.loginButtonTextStyle}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={{ backgroundColor: '#333333', width: width, height: 150, justifyContent: 'center', alignItems: 'center' }}>
                        {this.user()}
                        <Icon 
                        name='user-circle'
                        size={70}
                        color='grey'
                        />
                        <Text style={styles.userNameTextStyle}>{this.state.userName}</Text>
                    </View>
                    <View style={{ backgroundColor: '#333333', borderBottomWidth: 1, borderColor: '#E8B706', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, color: 'white' }}>Favori Filmlerim</Text>
                    </View>
                    <FlatList 
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handlerRefresh}
                    keyExtractor={item => item.imdbID}
                    data={this.state.data}
                    renderItem={({item}) => <FavListItem item={item} navigation={this.props.navigation} />}
                    />
                </View>
            );
        }
    }
}

class FavListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: '',
            title: '',
            year: '',
            genre: '',
            imdbRating: '',
            filmDetail: [],
        }
    }

    componentWillMount() {
        firebase.database().ref(`/Films/${this.props.item.id}/`)
        .once('value', snap => {
            if (snap.val() !== null && snap.val() !== undefined) {
                const { title, year, genre, poster, imdbRating } = snap.val();
                this.setState({ title, year, genre, poster, imdbRating, filmDetail: snap.val() });
            } else {
                this.setState({ filmDetail: null });
            }
        });
    }

    render() {
        if (this.state.filmDetail !== null) {
            return (
                <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('FilmDetail', {
                    film: this.state.filmDetail
                })}
                >
                    <View style={{ alignSelf: 'center', flexDirection: 'row', width: width - 20, margin: 10, paddingBottom: 10, borderColor: 'grey', borderBottomWidth: 1 }}>
                        <Image source={{uri: this.state.poster}} style={styles.imageStyle} />
                        <View>
                            <Text style={styles.filmNameStyle} numberOfLines={2}> {this.state.title} </Text>
                            <Text style={styles.filmOtherStyle} numberOfLines={1}> Yıl : {this.state.year} </Text>
                            <Text style={[styles.filmOtherStyle, { width: width - 120 }]} numberOfLines={2}> Tür : {this.state.genre}</Text>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Image source={(require('../../Images/star.png'))} style={{ width: 16, height: 16 }} />
                                <Text style={styles.filmOtherStyle}>{this.state.imdbRating}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}> Favori Filminiz Bulunamadı </Text>
                </View>
            );
        }
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
});