import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage, TouchableWithoutFeedback, TouchableHighlight, ActivityIndicator, Dimensions, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import { TextInput } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

class FilmDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            userRole: null,
            commit: null,
            comData: [],
            loading: false,
            error: null,
            favorite: null,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('film').title,
        }
    }

    componentWillMount() {
        this.setState({ data: this.props.navigation.getParam('film').images })
        this.userRole();
        this.getCommit();
        const { id } = this.props.navigation.getParam('film');
        const { currentUser } = firebase.auth();
        if (currentUser !== null) {
            firebase.database().ref(`Users/${currentUser.uid}/favFilms/`)
            .once('value', snap => {
                if (snap.val() !== undefined && snap.val() !== null) {
                    console.log(snap.val()[id]);
                    if (snap.val()[id] !== undefined) {
                        this.setState({ favorite: 'favori' });
                    }
                }
            })
        }
    }

    async userRole() {
        AsyncStorage.getItem('userRole')
        .then(value => this.setState({ userRole: value }));
    }

    getCommit() {
        this.setState({ loading: true });
        const { id } = this.props.navigation.getParam('film');
        firebase.database().ref(`Films/${id}/commits/`)
        .once('value', snap => {
            if (snap.val() !== undefined && snap.val() !== null) {
                let comArr = Object.values(snap.val());
                this.setState({ comData: comArr.reverse(),
                                loading: false });
            }
        })
        .catch(error => {
            this.setState({ error, loading: false })
            alert(error.message);
        });
    }

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    user() {
        const { navigate, getParam } = this.props.navigation;
        if (this.state.userRole === 'admin') {
            return (
                <View style={{ backgroundColor: '#E8B706', width: 50, height: 50, zIndex: 2, position: 'absolute', right: 0, bottom: 100, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <TouchableWithoutFeedback
                    style={{ marginRight: 10 }}
                    onPress={() => navigate('AddFilm', {filmDetals: getParam('film')})}
                    >
                        <Icon
                        name="edit"
                        size={20}
                        color='black'
                        />
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }

    commit() {
        const { currentUser } = firebase.auth();
        const { id } = this.props.navigation.getParam('film');
        let date = new Date().getTime();
        if (currentUser !== null) {
            if (this.state.commit !== null || this.state.commit !== '') {
                firebase.database().ref(`/Films/${id}/commits/${date}`)
                .set({ id: date, uid: currentUser.uid, commit: this.state.commit, filmId: id })
                .then(() => this.setState({ commit: null }))
                .catch((error) => alert(error.message));
            }
        }
    }

    commits() {
        if (this.state.comData.length !== 0) {
            return (
                <View>
                    <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, marginTop: 20, width: width / 2 }}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>Yorumlar</Text>
                    </View>
                    <FlatList 
                    data={this.state.comData}
                    style={{ height: 150 }}
                    ListFooterComponent={this.renderFooter}
                    keyExtractor={item => item}
                    renderItem={({item}) => <CommitListItem item={item} navigation={this.props.navigation} />}
                    />
                </View>
            )
        }
    }

    renderRow(rowData) {
        let swipeBtns = [{
          text: 'Delete',
          backgroundColor: 'red',
          underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
          onPress: () => { this.deleteNote(rowData) }
        }];
        return (
            <Swipeout right={swipeBtns}
            autoClose
            backgroundColor= 'transparent'>
            <TouchableHighlight
                underlayColor='rgba(192,192,192,1,0.6)'
                onPress={this.viewNote.bind(this, rowData)} >
                <View>
                <View style={styles.rowContainer}>
                    <Text style={styles.note}> {rowData} </Text>
                </View>
                <Separator />
                </View>
            </TouchableHighlight>
            </Swipeout>
        )
    }

    favoriteFilm() {
        const { id } = this.props.navigation.getParam('film');
        const { currentUser } = firebase.auth();
        if (this.state.favorite !== null) {
            return (
                <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                    <TouchableWithoutFeedback
                    onPress={() => {
                        firebase.database().ref(`Users/${currentUser.uid}/favFilms/${id}`)
                        .remove()
                        .then(() => alert('Film Favorilerinizden Silindi.'))
                        .then(() => this.setState({ favorite: null }));
                    }}
                    >
                        <Icon5 
                        style={{ marginLeft: 20 }}
                        name='heart'
                        size={40}
                        color='#E8B706'
                        />
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            return (
                <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                    <TouchableWithoutFeedback
                    onPress={() => {
                        firebase.database().ref(`Users/${currentUser.uid}/favFilms/${id}`)
                        .set({ id: id })
                        .then(() => alert('Film Favorilerinize Eklendi.'))
                        .then(() => this.setState({ favorite: 'favori' }));
                    }}
                    >
                        <Icon 
                        style={{ marginLeft: 20 }}
                        name='heart'
                        size={40}
                        color='#E8B706'
                        />
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }

    render() {
        const { title, year, genre, director, writer, actors, plot, awards, poster, imdbRating } = this.props.navigation.getParam('film');
        const { currentUser } = firebase.auth();
        return (
            <View style={{ flex: 1 }}>
                {this.user()}
                <ScrollView style={styles.container}>
                    <FlatList 
                    data={this.state.data}
                    horizontal
                    style={{ height: 200 }}
                    keyExtractor={item => item}
                    renderItem={({item}) => <Image source={{uri: item}} style={styles.filmImages} />}
                    />
                    <Text numberOfLines={1} style={{ fontSize: 35, color: 'white', marginLeft: 10 }}>{title}</Text>
                    <View style={{ borderColor: '#E8B706', borderWidth: 1, width: width / 2 }} />
                    <Text style={{ marginTop: 5, fontSize: 15, color: 'grey', marginLeft: 10 }}>{year}</Text>
                    <Text style={{ fontSize: 15, color: 'grey', marginLeft: 10 }}>{genre}</Text>
                    <View style={{ borderColor: 'grey', borderBottomWidth: 0.5, borderTopWidth: 0.5, margin: 10, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                            <Image source={(require('../../Images/star.png'))} style={{ width: 16, height: 16 }} />
                            <Text style={{ fontSize: 20, color: 'white' }}>{imdbRating}</Text>
                        </View>
                        {this.favoriteFilm()}
                    </View>
                    <View style={{ margin: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{uri: poster}} style={{ width: 100, height: 144, borderRadius: 10 }} />
                            <View style={{ marginLeft: 10, width: width - 120 }}>
                                <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, width: width / 2 }}>
                                    <Text style={{ fontSize: 20, color: 'grey' }}>Hikayesi</Text>
                                </View>
                                <Text numberOfLines={6} style={{ fontSize: 15, color: 'white' }}>{plot}</Text>
                            </View>
                        </View>
                        <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, marginTop: 20, width: width / 2 }}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Yönetmen</Text>
                        </View>
                        <Text style={{ fontSize: 20, color: 'white' }}>{director}</Text>
                        <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, marginTop: 20, width: width / 2 }}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Senaryo</Text>
                        </View>
                        <Text style={{ fontSize: 20, color: 'white' }}>{writer}</Text>
                        <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, marginTop: 20, width: width / 2 }}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Oyuncular</Text>
                        </View>
                        <Text style={{ fontSize: 20, color: 'white' }}>{actors}</Text>
                        <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, marginTop: 20, width: width / 2 }}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Ödüller</Text>
                        </View>
                        <Text style={{ fontSize: 20, color: 'white' }}>{awards}</Text>
                        <View>
                            {this.commits()}
                        </View>
                    </View>
                    <View style={{ height: 50}} />
                </ScrollView>
                <KeyboardAvoidingView keyboardVerticalOffset={0} style={{ width: width, backgroundColor: '#333333'}} behavior="height" enabled>
                    <TextInput
                    onFocus={() => {
                        if (currentUser === null){
                            alert('Lütfen Giriş Yapınız!')
                        }
                    }}
                    underlineColorAndroid={'rgba(1,1,1,0)'}
                    style={{ left: 0, right: 0, bottom: 0, height: 45, position: 'absolute', backgroundColor: '#333333', color: 'white' }}
                    placeholder='Yorum Yazın'
                    placeholderTextColor='grey'
                    onChangeText={(commit) => this.setState({commit})}
                    onSubmitEditing={() => this.commit()}
                    value={this.state.commit}
                    />
                </KeyboardAvoidingView>
                <KeyboardSpacer style={{ backgroundColor: 'rgba(1,1,1,0)'}} topSpacing={-50}/>
            </View>
        );
    }
}

class CommitListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            userRole: null,
        }
    }
    componentWillMount() {
        this.userName();
        this.userRole();
    }

    async userRole() {
        AsyncStorage.getItem('userRole')
        .then(value => this.setState({ userRole: value }));
    }

    userName() {
        firebase.database().ref(`/Users/${this.props.item.uid}/`)
        .once('value', snap => {
            this.setState({ userName: snap.val().userName });
        });
    }

    deleteCom() {
        firebase.database().ref(`/Films/${this.props.item.filmId}/commits/${this.props.item.id}`)
        .remove()
        .catch(error => alert(error.message));
    }

    render() {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteCom() }
        }];
        if (this.state.userRole === 'admin') {
            return (
                <Swipeout right={swipeBtns} autoClose='true' backgroundColor='transparent'>            
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: 'grey', margin: 10 }}>
                        <Icon 
                        style={{ margin: 10 }}
                        name='user-circle'
                        size={30}
                        color='grey'
                        />
                        <View style={{ margin: 5 }}>
                            <Text style={{ color: 'grey', fontSize: 15 }}>{this.state.userName}</Text>
                            <Text style={{ color: 'white', fontSize: 17 }}>{this.props.item.commit}</Text>
                        </View>
                    </View>
                </Swipeout>
            );
        } else{
            return (
                <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: 'grey', margin: 10 }}>
                    <Icon 
                    style={{ margin: 10 }}
                    name='user-circle'
                    size={30}
                    color='grey'
                    />
                    <View style={{ margin: 5 }}>
                        <Text style={{ color: 'grey', fontSize: 15 }}>{this.state.userName}</Text>
                        <Text style={{ color: 'white', fontSize: 17 }}>{this.props.item.commit}</Text>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919'
    },
    filmImages: {
        width: width,
        height: 200
    }
});

export default FilmDetailPage;