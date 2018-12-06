import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';

let images = [];
const width = Dimensions.get('window').width

class AddFilm extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Film Ekle'
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            loadingPoster: false,
            loadingImage: false,
            poster: '',
            images: [],
            title: '',
            year: '',
            genre: '',
            imdbRating: '',
            kinopoiskRating: '',
            plot: '',
            director: '',
            writer: '',
            actors: '',
            awards: '',
        }
    }

    componentWillMount() {
        if (this.props.navigation.getParam('filmDetals')) {
            const { title, year, genre, director, writer, actors, Plot, awards, poster, imdbRating, kinopoiskRating, Images } = this.props.navigation.getParam('filmDetals')
            this.setState({ plot: Plot,
                            poster,
                            title,
                            year,
                            genre,
                            imdbRating,
                            images: Images,
                            kinopoiskRating,
                            director,
                            writer,
                            actors,
                            awards })
        }
    }

    openPoster(){
        this.setState({ loadingPoster: true })
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        //const { uid } = this.state.user
        const uid = "12345"
        ImagePicker.openPicker({
          width: 100,
          height: 144,
          cropping: true,
          mediaType: 'photo'
        }).then(image => {
            console.log(image);
          const imagePath = image.path
    
          let uploadBlob = null
    
          const imageRef = firebase.storage().ref('MoviePoster').child(`${new Date().getTime()}.jpg`)
          let mime = 'image/jpg'
          fs.readFile(imagePath, 'base64')
            .then((data) => {
              //console.log(data);
              return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
              uploadBlob = blob
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
            })
            .then((url) => {
                this.setState({ poster: url });
                this.setState({ loadingPoster: false });
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
      }

      openImage(){
        this.setState({ loadingImage: true })
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        ImagePicker.openPicker({
          multiple: true,
          width: 500,
          height: 200,
          cropping: true,
          includeExif: true,
          mediaType: 'photo'
        }).then(image => {
            for (let i = 0; i < image.length; i++) {
                const element = image[i];

                console.log(image);
                const imagePath = element.path
                  
                let uploadBlob = null
              
                const imageRef = firebase.storage().ref('MovieImage').child(`${new Date().getTime()}${i}.jpg`)
                let mime = 'image/jpg'
                fs.readFile(imagePath, 'base64')
                  .then((data) => {
                    //console.log(data);
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                  })
                  .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                  })
                  .then((url) => {
                      images.push(url)
                      this.setState({ images });
                      this.setState({ loadingImage: false });
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                
            }
        })
        .catch((error) => {
          console.log(error)
        })
      }

    posterView() {
        if (this.state.poster === '') {
            return (
                <TouchableOpacity
                    style={{ backgroundColor: '#333333', width: 100, height: 144, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: 'gray' }}
                    onPress={() => this.openPoster()}
                    >
                        {this.state.loadingPoster ? 
                        <ActivityIndicator animating size="large" /> 
                        : 
                        <Icon 
                        name='plus'
                        size={35}
                        color='white'
                        />}
                </TouchableOpacity>
            )
        } else {
            return (
                <Image 
                source={{uri: this.state.poster}}
                style={{ backgroundColor: '#333333', width: 100, height: 144, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: 'gray' }} />
            )
        }
    }

    imageView() {
        if (this.state.images.length === 0) {
            return (
                <TouchableOpacity
                    style={{ backgroundColor: '#333333', width: width - 20, height: 200, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: 'gray' }}
                    onPress={() => this.openImage()}
                    >
                        {this.state.loadingImage ? 
                        <ActivityIndicator animating size="large" /> 
                        : 
                        <Icon 
                        name='plus'
                        size={35}
                        color='white'
                        />}
                </TouchableOpacity>
            )
        } else {
            return (
                <FlatList 
                data={this.state.images}
                horizontal
                style={{ height: 200, width: width - 20 }}
                keyExtractor={item => item}
                renderItem={({item}) => <Image source={{uri: item}} style={styles.filmImages} />}
                />
            )
        }
    }

    uploadFilm() {
        const { title, year, genre, imdbRating, kinopoiskRating, director, writer, actors, awards, poster, images, plot } = this.state;
        // title.length > 0 && year.length > 3 && genre.length > 0 && imdbRating.length > 0 && kinopoiskRating.length > 0 && director.length > 0 && writer.length > 0 && actors.length > 0 && awards.length > 0 && poster.length > 0 && images.length > 0 && plot.length > 0
        if (true) {
            return (
                <TouchableOpacity
                    style={{ backgroundColor: '#85B958', width: width - 20, height: 50, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: 'gray' }}
                    onPress={() => this.uploadFilm()}
                    >
                        <Text style={{ fontSize: 17, color: 'white' }}> Filmi Yükle </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    disabled={true}
                    style={{ backgroundColor: '#CC0611', width: width - 20, height: 50, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: 'gray' }}
                    onPress={() => this.uploadFilm()}
                    >
                        <Text style={{ fontSize: 17, color: 'white' }}> Tüm Bilgileri Doldurun </Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                    {this.posterView()}
                    <View style={{ marginLeft: 10 }}>
                        <TextInput
                        style={styles.textInputStyle}
                        placeholder='Filmin Adı'
                        placeholderTextColor='grey'
                        onChangeText={(title) => this.setState({title})}
                        value={this.state.title}
                        />
                        <TextInput
                        style={styles.textInputStyle}
                        placeholder='Filmin Yılı'
                        placeholderTextColor='grey'
                        onChangeText={(year) => this.setState({year})}
                        value={this.state.year}
                        />
                        <TextInput
                        style={styles.textInputStyle}
                        placeholder='Filmin Türü'
                        placeholderTextColor='grey'
                        onChangeText={(genre) => this.setState({genre})}
                        value={this.state.genre}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                    style={styles.textInputOtherStyle}
                    placeholder='Imdb Rating'
                    placeholderTextColor='grey'
                    onChangeText={(imdbRating) => this.setState({imdbRating})}
                    value={this.state.imdbRating}
                    />
                    <TextInput
                    style={styles.textInputOtherStyle}
                    placeholder='Kinopoist Rating'
                    placeholderTextColor='grey'
                    onChangeText={(kinopoiskRating) => this.setState({kinopoiskRating})}
                    value={this.state.kinopoiskRating}
                    />
                    <TextInput
                    style={styles.textInputOtherStyle}
                    placeholder='Filmin Yönetmeni'
                    placeholderTextColor='grey'
                    onChangeText={(director) => this.setState({director})}
                    value={this.state.director}
                    />
                    <TextInput
                    style={styles.textInputOtherStyle}
                    placeholder='Filmin Yazarı'
                    placeholderTextColor='grey'
                    onChangeText={(writer) => this.setState({writer})}
                    value={this.state.writer}
                    />
                    <TextInput
                    style={styles.textInputOtherStyle}
                    placeholder='Filmin Oyuncuları'
                    placeholderTextColor='grey'
                    onChangeText={(actors) => this.setState({actors})}
                    value={this.state.actors}
                    />
                    <TextInput
                    style={styles.textInputOtherStyle}
                    placeholder='Filmin Ödülleri'
                    placeholderTextColor='grey'
                    onChangeText={(awards) => this.setState({awards})}
                    value={this.state.awards}
                    />
                    <TextInput
                    multiline={true}
                    numberOfLines={10}
                    style={styles.textInputOtherStyle}
                    placeholder='Filmin Hikayesi'
                    placeholderTextColor='grey'
                    onChangeText={(plot) => this.setState({plot})}
                    value={this.state.plot}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    {this.imageView()}
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    {this.uploadFilm()}
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
    textInputStyle: {
        padding: 10,
        width: width - 140,
        fontSize: 17,
        color: '#F0F0F0',
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    textInputOtherStyle: {
        padding: 10,
        width: width - 20,
        fontSize: 17,
        color: '#F0F0F0',
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    filmImages: {
        width: width,
        height: 200,
        margin: 10,
    }
});

export default AddFilm;