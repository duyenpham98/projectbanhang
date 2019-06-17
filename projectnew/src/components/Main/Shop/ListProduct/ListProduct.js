import React, { Component } from 'react';
import {
    View, TouchableOpacity,
    Text, StyleSheet, FlatList,
    Image
} from 'react-native';
import getListProduct from '../../../../api/getListProduct';

import backList from '../../../../media/appIcon/backList.png';

const url = 'http://192.168.100.5/react-native/app/images/product/';
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: null,
        };
        this.arr = [];
    }

    componentDidMount() {
        const idType = this.props.category.id;
        getListProduct(idType)
            .then(arrProduct => {
                this.arr = arrProduct;
                this.setState({ listProducts: (this.arr) });
            })
            .catch(err => console.log(err));
    }

    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }

    gotoDetail(product) {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL', product });
    }

    render() {
        const {
            header, wrapper, backStyle, titleStyle,
            productContainer, productImage, productInfo, lastRowInfo,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail
        } = styles;
        const { category } = this.props;
        return (

            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image source={backList} style={backStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>{category.name}</Text>
                    <View style={{ width: 30 }} />
                </View>
                <FlatList
                    data={this.state.listProducts}
                    renderItem={({ item }) =>
                        <View style={productContainer}>
                            <Image style={productImage} source={{ uri: `${url}${item.images}` }} />
                            <View style={productInfo}>
                                <Text style={txtName}>{toTitleCase(item.name)}</Text>
                                <View style={lastRowInfo}>
                                    <Text style={txtPrice}>{item.price}$</Text>
                                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.gotoDetail(item)}>
                                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={txtMaterial}>Material:{item.material}</Text>
                                <View style={lastRowInfo}>
                                    <Text style={txtColor}>Color:{item.color}</Text>
                                    <View style={{ backgroundColor: item.color.toLowerCase(), height: 16, width: 16, borderRadius: 8, marginRight: 35 }} />
                                </View>
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
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 6
    },
    backStyle: {
        width: 30,
        height: 30
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 2
    },
    titleStyle: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 20
    },
    productImage: {
        width: 90,
        height: (90 * 452) / 361
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '400'
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#B10D65',
    },
    txtMaterial: {
        fontFamily: 'Avenir'
    },
    txtColor: {
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 11
    },
});