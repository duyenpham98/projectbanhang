import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import icLogo from '../../media/appIcon/logo.png';

const url = 'http://192.168.100.6/react-native/app/images/product/';
const back = require('../../media/appIcon/back.png');
class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            state: false,
        }
    }

    // Phương thuc xoa dư lieu
    Delete_product(id) {
        fetch('http://192.168.100.6/react-native/app/delete_product.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            }),
        })
            .then((responseJson) => {
                alert("Xóa thành công");
            })
            .catch((error) => {
                console.error(error);
            });

    }

    Delete(id){
        Alert.alert(
            'Delete Product',
            'Do you want delete this product?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: ()=>this.Delete_product(id)},
            ],
            {cancelable: false},
          );
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    componentDidMount() {
        return fetch('http://192.168.100.6/react-native/app/listproduct.php')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (

            <View style={styles.wrapper}>
                <View style={styles.headr}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={styles.backStyle} source={back} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 25 }}> LIST PRODUCT </Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.wrapper1}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.touch} onPress={() => this.Delete(item.id)} >
                                    <Text style={{ fontSize: 20, color: '#EE2C2C' }}>x</Text>
                                </TouchableOpacity>
                                <Image source={{ uri: `${url}${item.link}` }} style={styles.imageStyle} />
                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>{item.price}$</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={({ id }, index) => id}

                />

            </View>
        );

    }
}


const styles = StyleSheet.create({

    imageStyle: {
        width: 150,
        height: 150,
        marginHorizontal: 5
    },
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
    wrapper: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 10,

    },
    wrapper1: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    backStyle: {
        width: 25,
        height: 25
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,

    },
    footer: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 5,
        alignItems: 'center',
    },
    name: {
        backgroundColor: '#F6F6F6',
        fontSize: 20,
    },
    price: {
        color: '#006666',
    },
    touch: {
        marginLeft: 250,
    },
});

export default ListProduct;