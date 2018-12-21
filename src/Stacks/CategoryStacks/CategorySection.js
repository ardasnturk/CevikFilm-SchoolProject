import React, { Component } from 'react';
import { View, 
    Text, 
    FlatList,
    Image,
    ActivityIndicator,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
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
            loading: false,
        }
    }

    componentWillMount() {
        // let catArray = [];
        // for (let i = 0; i < exampleFilms.length; i++) {
        //     if (exampleFilms[i].Genre.includes(this.props.navigation.getParam('selectCat'))) {
        //         catArray.push(exampleFilms[i]);
        //     }
        // }
        // this.setState({ data: catArray });
        this.getFilm();
        //this.makeRemoteRequest();
    }

    getFilm() {
        let catArr = [];
        this.setState({ loading: true });
        const filmCategory = this.props.navigation.getParam('selectCat');
        firebase.database().ref('/Films/')
        .once('value', snap => {
            let arr = Object.values(snap.val())
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (element.genre.includes(filmCategory)) {
                    catArr.push(element);
                }
            }
            this.setState({ data: catArr,
                            loading: false })
        })
        .catch(error => {
            this.setState({ error, loading: false })
            alert(error.message);
        })
    }

    makeRemoteRequest = () => {
        const filmCategory = this.props.navigation.getParam('selectCat');
        const url = `https://murmuring-dusk-96380.herokuapp.com/category/${filmCategory}.json`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
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

    render() {
        if (this.state.data.length === 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#191919' }}>
                    <Text style={{ color: 'white', fontSize: 24 }}> Bu Kategoride Film Bulunamadı </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList 
                        ListFooterComponent={this.renderFooter}
                        keyExtractor={item => item.imdbID}
                        data={this.state.data}
                        renderItem={({item}) => <FilmListItem item={item} navigation={this.props.navigation} />}
                    />
                </View>
            );
        }
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

export default CategorySection;