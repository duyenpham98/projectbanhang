import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import bannerImage from '../../../../media/temp/h5.jpg';
const { height } = Dimensions.get('window');
export default class Collection extends React.Component {
    gotoListProduct() {
        const { navigator } = this.props;
        navigator.push({ name: 'LIST_PRODUCT', category: { name: 'SPRING COLLECTION', id: 'COLLECTION' } });
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{ flex: 1, padding: 5, paddingLeft: 0 }}>
                    <Text style={styles.textStyle}> SUMMER COLLECTION</Text>
                </View>
                <TouchableOpacity style={styles.viewImage} onPress={this.gotoListProduct.bind(this)}>
                    <Image source={bannerImage} style={styles.imageBanner} />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        height: height / 3.2,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    imageBanner: {
        width: '100%',
        height: '100%'
    },
    viewImage: {
        flex: 8,
        justifyContent: 'flex-end',
    },
    textStyle: {
        fontSize: 15,
        color: '#d6d5d6',
    }

});