import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'react-native-fetch-blob';
import icLogo from '../../media/appIcon/logo.png';
const back = require('../../media/appIcon/back.png');
const options = {
    title: 'Select a photo',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1,
};
class AddProduct extends Component {
    constructor() {
        super()
        this.state = {
            imageSource: null,
            data: null,
            name: "",
            id_type: "",
            price: "",
            color: "",
            material: "",
            description: "",
            news: "",
            collection: "",
        }
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    add_product() {
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
        if (this.state.news == "") {
            Alert.alert(
                'Notification',
                'Product news must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (this.state.collection == "") {
            Alert.alert(
                'Notification',
                'Product collection must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (this.state.imageSource == null) {
            Alert.alert(
                'Notification',
                'Please select a product image to add',
                [
                    { text: 'OK' },
                ],
            );
        }
        else {
            fetch('http://192.168.100.5/react-native/app/add_product.php', {
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
                }),
            })
                .then((responseJson) => {
                    this.setState({ name: "" });
                    this.setState({ id_type: "" });
                    this.setState({ price: "" });
                    this.setState({ color: "" });
                    this.setState({ material: "" });
                    this.setState({ description: "" });
                    this.setState({ news: "" });
                    this.setState({ collection: "" });
                    onPress = this.uploadPhoto();
                    Alert.alert(
                        'Notification',
                        'Add product success',
                        [
                            { text: 'OK' },
                        ],
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    success_add_product() {
        Alert.alert(
            'Add Product',
            'Do you want add product?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.add_product() },
            ],
            { cancelable: false },
        );
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
        RNFetchBlob.fetch('POST', 'http://192.168.100.5/react-native/app/upload_file.php', {
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
            mapContainer, wrapper
            , imageStyle, mapContainer1
        } = styles;
        return (
            <ScrollView style={styles.wrapper1}>
                <View style={styles.headr}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={styles.backStyle} source={back} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 25 }}> ADD PRODUCT </Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <View style={wrapper}>
                    <Image style={imageStyle} source={this.state.imageSource != null ? this.state.imageSource : require('./image/download.jpeg')} />
                    <TouchableOpacity style={mapContainer} onPress={this.selectPhoto.bind(this)}>
                        <Text>SELECT</Text>
                    </TouchableOpacity>
                    <Text style={styles.textHead}>Name Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                    <Text style={styles.textHead}>id_Type Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(id_type) => this.setState({ id_type })}
                        value={this.state.id_type}
                    />
                    <Text style={styles.textHead}>Price Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(price) => this.setState({ price })}
                        value={this.state.price}
                    />
                    <Text style={styles.textHead}>Color Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(color) => this.setState({ color })}
                        value={this.state.color}
                    />
                    <Text style={styles.textHead}>Material Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(material) => this.setState({ material })}
                        value={this.state.material}
                    />
                    <Text style={styles.textHead}>Description Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                    />
                    <Text style={styles.textHead}>New Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(news) => this.setState({ news })}
                        value={this.state.news}
                        placeholder='0 or 1'
                        placeholderTextColor='#1C1C1C'
                    />
                    <Text style={styles.textHead}>inCollection Product*</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={(collection) => this.setState({ collection })}
                        value={this.state.collection}
                        placeholder='0 or 1'
                        placeholderTextColor='#1C1C1C'
                    />
                    <TouchableOpacity style={mapContainer1} onPress={this.success_add_product.bind(this)}>
                        <Text>ADD PRODUCT</Text>
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
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        width: 210,
        marginTop: 10,
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
    textHead: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold'
    },
});

export default AddProduct;