import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('window').width;

class FilmDetailPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('film').Title,
            headerRight: (
                <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('AddFilm', {filmDetals: navigation.getParam('film')})}
                >
                    <Icon
                    name="edit"
                    size={20}
                    color='white'
                    />
                </TouchableOpacity>
            ),
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }

    componentWillMount() {
        this.setState({ data: this.props.navigation.getParam('film').Images })
    }

    render() {
        const { title, year, genre, director, writer, actors, Plot, awards, poster, imdbRating, kinopoiskRating  } = this.props.navigation.getParam('film');
        return (
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
                    <View style={{ alignItems: 'center', marginHorizontal: 5 }}> 
                        <Text style={{ color: 'white' }}> Metascore </Text>
                        <Text style={{ fontSize: 20, color: 'white' }}>{kinopoiskRating}</Text>
                    </View>
                </View>
                <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{uri: poster}} style={{ width: 100, height: 144, borderRadius: 10 }} />
                        <View style={{ marginLeft: 10, width: width - 120 }}>
                            <View style={{ borderColor: '#E8B706', borderBottomWidth: 2, width: width / 2 }}>
                                <Text style={{ fontSize: 20, color: 'grey' }}>Hikayesi</Text>
                            </View>
                            <Text numberOfLines={6} style={{ fontSize: 15, color: 'white' }}>{Plot}</Text>
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
                </View>
            </ScrollView>
        );
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