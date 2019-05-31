import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
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
class ThemSanPham extends Component {
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
        if(this.state.name == "")
        {
            alert("Product name must not be empty");
        }
        if(this.state.price == "")
        {
            alert("Product price must not be empty");
        }
        if(this.state.color == "")
        {
            alert("Product color must not be empty");
        }
        if(this.state.material == "")
        {
            alert("Product material must not be empty");
        }
        if(this.state.description == "")
        {
            alert("Product description must not be empty");
        }
        else{
        fetch('http://192.168.100.4/react-native/app/add_product.php', {
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
                new: this.state.news,
                inCollection: this.state.collection,
            }),
        })
            .then((responseJson) => {
                alert("add product success");
                this.setState({ name: "" });
                this.setState({ id_type: "" });
                this.setState({ price: "" });
                this.setState({ color: "" });
                this.setState({ material: "" });
                this.setState({ description: "" });
                this.setState({ news: "" });
                this.setState({ collection: "" });
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

                // You can also display the image using data:
                //const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageSource: source,
                    data: response.data,
                });
            }
        });
    }
    uploadPhoto() {
        RNFetchBlob.fetch('POST', 'http://192.168.100.4/react-native/app/upload_file.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [                
            // custom content type
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
            ]).then((resp) => {
                alert("upload success");
            }).catch((err) => {
                // ...
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
                    <Text style={{ color: 'white', fontSize: 25 }}> SHOP SPACE </Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>


                <View style={wrapper}>
                    <Image style={imageStyle} source={this.state.imageSource != null ? this.state.imageSource : require('./image/contact0.png')} />
                    <TouchableOpacity style={mapContainer} onPress={this.selectPhoto.bind(this)}>
                        <Text>SELECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={mapContainer} onPress={this.uploadPhoto.bind(this)}>
                        <Text>UPLOAD</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.textInput}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        placeholder='Name Product'
                        placeholderTextColor='#CD8500'
                        autoFocus={true}
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.id_type.focus()}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={(id_type) => this.setState({ id_type })}
                        value={this.state.id_type}
                        placeholder='id_type Product'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.color.focus()}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={(price) => this.setState({ price })}
                        value={this.state.price}
                        placeholder='Price Product'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.color.focus()}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={(color) => this.setState({ color })}
                        value={this.state.color}
                        placeholder='color product'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.material.focus()}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={(material) => this.setState({ material })}
                        value={this.state.material}
                        placeholder='material product'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.description.focus()}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                        placeholder='description product'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.new.focus()}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={(news) => this.setState({ news })}
                        value={this.state.news}
                        placeholder='new product(0 or 1)'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.collection.focus()}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={(collection) => this.setState({ collection })}
                        value={this.state.collection}
                        placeholder='collection product(0 or 1)'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                    />
                    <TouchableOpacity style={mapContainer1} onPress={this.add_product.bind(this)}>
                        <Text>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#FFFFCC', alignItems: 'center' },
    wrapper1: { flex: 1, backgroundColor: '#FFFFCC' },
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
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33FFCC',
        margin: 10,
        width: 70,
        height: 30,
        borderRadius: 5,
    },
    mapContainer1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33FFCC',
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
});

export default ThemSanPham;
