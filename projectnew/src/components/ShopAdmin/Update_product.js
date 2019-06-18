import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions ,Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'react-native-fetch-blob';
import icLogo from '../../media/appIcon/logo.png';
const back = require('../../media/appIcon/back.png');
const url = 'http://192.168.100.9/react-native/app/images/product/';
const options = {
    title: 'Select a photo',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1,
};
class Update_product extends Component {
    constructor(props) {
        super(props)
        const { name, id_type, price, color, material, description, news, inCollection, link } = props.product;
        this.state = {
            imageSource: null,
            data: null,
            name: name,
            id_type: id_type,
            price: price,
            color: color,
            material: material,
            description: description,
            news: news,
            collection: inCollection,
            image: link,
        }
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    update_product(id) {
        if (this.state.name == "") {
            Alert.alert(
                'Notification',
                'Product name must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (this.state.price == "") {
            Alert.alert(
                'Notification',
                'Product price must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (this.state.color == "") {
            Alert.alert(
                'Notification',
                'Product color must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (this.state.material == "") {
            Alert.alert(
                'Notification',
                'Product material must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (this.state.description == "") {
            Alert.alert(
                'Notification',
                'Product description must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (this.state.imageSource == null) {
            fetch('http://192.168.100.9/react-native/app/update_product.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    id_type: this.state.id_type,
                    price: this.state.price,
                    color: this.state.color,
                    material: this.state.material,
                    description: this.state.description,
                    news: this.state.news,
                    inCollection: this.state.collection,
                    id
                }),

            })
                .then((responseJson) => {
                    Alert.alert(
                        'Notification',
                        'Update product success',
                        [
                            { text: 'OK' },
                        ],
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            fetch('http://192.168.100.9/react-native/app/update_product_image.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    id_type: this.state.id_type,
                    price: this.state.price,
                    color: this.state.color,
                    material: this.state.material,
                    description: this.state.description,
                    news: this.state.news,
                    inCollection: this.state.collection,
                    id
                }),

            })
                .then((responseJson) => {
                    onPress = this.uploadPhoto();
                    alert("update product success");

                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }
    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    imageSource: source,
                    data: response.data,
                });
            }
        });
    }
    uploadPhoto() {
        RNFetchBlob.fetch('POST', 'http://192.168.100.9/react-native/app/upload_file_update_product.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
                // custom content type
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
            ]).then((resp) => {
                console.log("upload success");
            }).catch((err) => {
                alert("error".err);
            })
    }
    render() {
        const {
            wrapper, imageStyle, mapContainer
            , signInContainer
        } = styles;

        return (
            <ScrollView style={styles.wrapper1}>
                <View style={styles.headr}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={styles.backStyle} source={back} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 25 }}> UPDATE PRODUCT </Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <View style={wrapper}>
                    <Image style={imageStyle} source={this.state.imageSource != null ? this.state.imageSource : { uri: `${url}${this.state.image}` }} />
                    <TouchableOpacity style={mapContainer} onPress={this.selectPhoto.bind(this)}>
                        <Text>SELECT</Text>
                    </TouchableOpacity>
                    <Text style={styles.textUpdate}>Name Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={name => this.setState({ ...this.state, name })}
                        value={this.state.name}
                        placeholderTextColor='#CD8500'
                        autoFocus={true}
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.id_type.focus()}
                    />
                    <Text style={styles.textUpdate}>id_Type Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={id_type => this.setState({ ...this.state, id_type })}
                        value={this.state.id_type}
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.color.focus()}
                    />
                    <Text style={styles.textUpdate}>Price Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={price => this.setState({ ...this.state, price })}
                        value={this.state.price}
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.color.focus()}
                    />
                    <Text style={styles.textUpdate}>Color Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={color => this.setState({ ...this.state, color })}
                        value={this.state.color}
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.material.focus()}
                    />
                    <Text style={styles.textUpdate}>Material Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={material => this.setState({ ...this.state, material })}
                        value={this.state.material}
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.description.focus()}
                    />
                    <Text style={styles.textUpdate}>Description Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={description => this.setState({ ...this.state, description })}
                        value={this.state.description}
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.new.focus()}
                    />
                    <Text style={styles.textUpdate}>New Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={news => this.setState({ ...this.state, news })}
                        value={this.state.news}
                        placeholder='0 or 1'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.collection.focus()}
                    />
                    <Text style={styles.textUpdate}>inCollection Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={collection => this.setState({ ...this.state, collection })}
                        value={this.state.collection}
                        placeholder='0 or 1'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={signInContainer} onPress={() => this.update_product(this.props.product.id)}>
                        <Text style={styles.textUpdate}>UPDATE PRODUCT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#F0FFFF', alignItems: 'center' },
    wrapper1: { flex: 1, backgroundColor: '#F0FFFF' },
    headr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#329576',
        padding: 10
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        width: 220,
        marginTop: 10,
    },
    iconStyle: {
        height: 25,
        width: 25
    },
    mapStyle: {
        width: width - 40,
        height: 230,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backStyle: {
        width: 25,
        height: 25
    },
    imageStyle: {
        marginTop: 15,
        width: 70,
        height: 70,
    },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E8B57',
        margin: 10,
        width: 70,
        height: 30,
        borderRadius: 5,
    },
    mapContainer1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E8B57',
        margin: 10,
        width: 70,
        height: 30,
        borderRadius: 5,
        marginLeft: 200
    },
    textInput: {
        borderColor: 'gray',
        margin: 20,
        marginTop: 5,
        borderWidth: 1,
        marginBottom: 5,
        width: 300,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
    },
    textUpdate: {
        fontWeight: 'bold'
    }
});

export default Update_product;