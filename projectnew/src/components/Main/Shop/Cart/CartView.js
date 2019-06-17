import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    Dimensions, StyleSheet, Image, FlatList, Alert
} from 'react-native';

import global from '../../../global';
import sendOrder from '../../../../api/sendOrder';
import sendOrdercard from '../../../../api/sendOrdercard';
import getToken from '../../../../api/getToken';
import checkLogin from '../../../../api/checkLogin';
const url = 'http://192.168.100.8/react-native/app/images/product/';
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class CartView extends Component {
    gotoDetail(product) {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL', product });
    }
    incrQuantity(id) {
        global.incrQuantity(id);
    }
    decrQuantity(id) {
        global.decrQuantity(id);
    }
    removeProduct(id) {
        global.removeProduct(id);
    }
    removeProduct_Cart(id) {
        Alert.alert(
            'Confirm',
            'Do you want remove product from the shopping cart?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.removeProduct(id) },
            ],
            { cancelable: false },
        );
    }
    async onSendOrder() {
        if (this.props.user != null) {
            try {
                const token = await getToken();
                const arrayDetail = this.props.cartArray.map(e => ({
                    id: e.product.id,
                    quantity: e.quantity
                }));
                if (arrayDetail.length == 0) {
                    Alert.alert(
                        'Notification',
                        'No product to order',
                        [
                            { text: 'OK' },
                        ],
                    );
                } else {
                    const kq = await sendOrder(token, arrayDetail);
                    if (kq === 'THEM_THANH_CONG') {
                        Alert.alert(
                            'Notification',
                            'Order Success',
                            [
                                { text: 'OK' },
                            ],
                        );
                    } else {
                        Alert.alert(
                            'Notification',
                            'Added the order of failure',
                            [
                                { text: 'OK' },
                            ],
                        );
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
        else{
            Alert.alert(
                'Notification',
                'Please login',
                [
                    { text: 'OK' },
                ],
            );
        }
    }


    async onSendOrdercard() {
        if (this.props.user != null) {
            try {
                const token = await getToken();
                const arrayDetail = this.props.cartArray.map(e => ({
                    id: e.product.id,
                    quantity: e.quantity
                }));
                if (arrayDetail.length == 0) {
                    Alert.alert(
                        'Notification',
                        'No product to order',
                        [
                            { text: 'OK' },
                        ],
                    );
                } else {
                    const kq = await sendOrdercard(token, arrayDetail);
                    if (kq === 'THEM_THANH_CONG') {
                        Alert.alert(
                            'Notification',
                            'Order Success',
                            [
                                { text: 'OK' },
                            ],
                        );
                    } else {
                        Alert.alert(
                            'Notification',
                            'Added the order of failure',
                            [
                                { text: 'OK' },
                            ],
                        );
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
        else {
            Alert.alert(
                'Notification',
                'Please login',
                [
                    { text: 'OK' },
                ],
            );
        }
    }

    sendOrder() {
        Alert.alert(
            'Confirm',
            'Choose a Payment Method',
            [
                {
                    text: 'Payment by card',
                    onPress: this.onSendOrdercard.bind(this)
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },

                { text: 'payment upon receipt', onPress: this.onSendOrder.bind(this) },

            ],

            { cancelable: false },
        );
    }
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer, txtcalcu } = styles;
        const { cartArray } = this.props;
        const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={wrapper}>
                <FlatList
                    contentContainerStyle={main}
                    enableEmptySections
                    data={cartArray}
                    renderItem={({ item }) =>
                        <View style={productStyle}>
                            <Image source={{ uri: `${url}${item.product.images}` }} style={productImage} />
                            <View style={[mainRight]}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={txtName}>{toTitleCase(item.product.name)}</Text>
                                    <TouchableOpacity onPress={() => this.removeProduct_Cart(item.product.id)}>
                                        <Text style={{ fontFamily: 'Avenir', color: 'red' }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={txtPrice}>{item.product.price}$</Text>
                                    <View style={{ height: 15, width: 15, backgroundColor: item.product.color.toLowerCase(), borderRadius: 15, marginRight: 35, borderWidth: 1, borderColor: '#C21C70', marginTop: 3 }} />
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                        <TouchableOpacity onPress={() => this.incrQuantity(item.product.id)}>
                                            <Text style={txtcalcu}>+</Text>
                                        </TouchableOpacity>
                                        <Text>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => this.decrQuantity(item.product.id)}>
                                            <Text style={txtcalcu}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoDetail(item.product)}>
                                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={({ id }, index) => id}
                />
                <TouchableOpacity style={checkoutButton} onPress={this.sendOrder.bind(this)}>
                    <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    txtcalcu: {
        fontSize: 16
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
});

export default CartView;
