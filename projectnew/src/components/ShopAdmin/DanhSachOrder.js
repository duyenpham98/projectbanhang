import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import icLogo from '../../media/appIcon/logo.png';

const url = 'http://192.168.100.4/react-native/app/images/product/';
const back = require('../../media/appIcon/back.png');
class DanhSachOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            state: false,
        }
    }
    gotoDetail() {
        const { navigator } = this.props;
        navigator.push({ name: 'Bill_Order' });
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    // Phương thuc xoa dư lieu
    Delete_bill(id) {
        fetch('http://192.168.100.4/react-native/app/delete_bill.php', {
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
    componentDidMount() {
        return fetch('http://192.168.100.4/react-native/app/bill_product.php')
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
                

                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) =>
                            <View style={styles.wrapper}>
                                <TouchableOpacity onPress={this.gotoDetail.bind(this)}>
                                    <TouchableOpacity style={styles.touch} onPress={() => this.Delete_bill(item.id)} >
                                        <Text style={{ fontSize: 20, color: '#EE2C2C' }}>x</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Order id:</Text>
                                        <Text style={{ color: '#2ABB9C' }}>{item.id}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>OrderTime:</Text>
                                        <Text style={{ color: '#C21C70' }}>{item.date_order}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Name:</Text>
                                        <Text style={{ color: '#2ABB9C' }}>{item.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A' ,fontWeight: 'bold'}}>Phone:</Text>
                                        <Text style={{ color: '#C21C70' }}>{item.phone}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A',fontWeight: 'bold' }}>Address:</Text>
                                        <Text style={{ color: '#C21C70' }}>{item.address}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Total:</Text>
                                        <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{item.total}$</Text>
                                    </View>
                                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 10 }} />
                                </TouchableOpacity>
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
        padding: 10
    },
    backStyle: {
        width: 25,
        height: 25
    },
    footer: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 5,
        alignItems: 'center',
    },
    touch: {
        marginLeft: 310,
    },
});

export default DanhSachOrder;
