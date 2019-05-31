import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import icLogo from '../../media/appIcon/logo.png';

const url = 'http://192.168.100.4/react-native/app/images/product/';
const back = require('../../media/appIcon/back.png');
class Bill_Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            state: false,
        }
    }
   
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    componentDidMount() {
        return fetch('http://192.168.100.4/react-native/app/bill_detail_product.php')
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
                    <Text style={{ color: 'white', fontSize: 25 }}> SHOP SPACE </Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <View style={styles.body}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.wrapper}>
                            
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Order id:</Text>
                                    <Text style={{ color: '#2ABB9C' }}>{item.id}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Name Product:</Text>
                                    <Text style={{ color: '#C21C70' }}>{item.name.toUpperCase()}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Price:</Text>
                                    <Text style={{ color: '#2ABB9C' }}>{item.price}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Amount:</Text>
                                    <Text style={{ color: '#C21C70' }}>{item.quantity}</Text>
                                </View>
                                <View style={{ borderBottomColor: 'gray',borderBottomWidth: 1,paddingBottom: 10}}/>
                            </View>
                        
                    }
                    keyExtractor={({ id }, index) => id}

                />
                </View>
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
    body: { flex: 10, backgroundColor: '#F6F6F6' },
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
        padding: 10
    },
    backStyle: {
        width: 25,
        height: 25
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 40
    },
    footer: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 5,
        alignItems: 'center',
    },
   
});

export default Bill_Detail;
