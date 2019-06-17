import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList
} from 'react-native';

const url = 'http://192.168.100.5/react-native/app/images/product/';

export default class TopProduct extends Component {
    gotoDetail(product) {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL', product });
    }
    render() {
        const {
            container, titleContainer, title,
            body, productContainer, productImage,
            produceName, producePrice
        } = styles;
        const { topProducts } = this.props;
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}>TOP PRODUCT</Text>
                </View>
                <FlatList
                    contentContainerStyle={body}
                    enableEmptySections
                    data={topProducts}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={productContainer} onPress={() => this.gotoDetail(item)}>
                            <Image source={{ uri: `${url}${item.images}` }} style={productImage} />
                            <Text style={produceName}>{item.name.toUpperCase()}</Text>
                            <Text style={producePrice}>{item.price}$</Text>
                        </TouchableOpacity>
                    }
                    keyExtractor={({ id }, index) => id}
                />
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: '#D3D3CF',
        fontSize: 20
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    productContainer: {
        width: produtWidth,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: produtWidth,
        height: productImageHeight
    },
    produceName: {
        marginVertical: 7,
        paddingLeft: 10,
        fontFamily: 'Avenir',
        color: '#778899',
        fontWeight: '500'
    },
    producePrice: {
        marginBottom: 5,
        paddingLeft: 50,
        fontFamily: 'Avenir',
        color: '#CD5C5C'
    }
});
