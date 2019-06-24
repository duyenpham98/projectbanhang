import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import icLogo from '../../media/appIcon/logo.jpeg';
const back = require('../../media/appIcon/back.png');
class ListOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }
    gotoDetail(bill) {
        const { navigator } = this.props;
        navigator.push({ name: 'BILL_DETAIL', bill });
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    Delete_bill(id) {
        fetch('http://192.168.100.9/react-native/app/delete_bill.php', {
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
                Alert.alert(
                    'Notification',
                    'Delete success',
                    [
                        { text: 'OK' },
                    ],
                );
                const newOrder = this.state.dataSource.filter(e => e.id !== id);
                this.setState({
                    dataSource: newOrder
                },
                );
            })
            .catch((error) => {
                console.error(error);
            });

    }
    Delete(id) {
        Alert.alert(
            'Delete Bill',
            'Do you want delete this bill?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.Delete_bill(id) },
            ],
            { cancelable: false },
        );
    }
    componentDidMount() {
        return fetch('http://192.168.100.9/react-native/app/bill_product.php')
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
                    <Text style={{ color: 'white', fontSize: 25 }}> LIST ORDER </Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.wrapper}>
                            <TouchableOpacity onPress={() => this.gotoDetail(item)} >
                                <TouchableOpacity style={styles.touch} onPress={() => this.Delete(item.id)} >
                                    <Text style={{ fontSize: 20, color: '#EE2C2C' }}>x</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold',fontSize: 18 }}>Order id:</Text>
                                    <Text style={{ color: '#528B8B', fontWeight: 'bold', fontSize: 18 }}>{item.id}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold',fontSize: 18 }}>OrderTime:</Text>
                                    <Text style={{ color: '#528B8B' ,fontSize: 18}}>{item.date_order}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold',fontSize: 18 }}>Name:</Text>
                                    <Text style={{ color: '#528B8B' ,fontSize: 18}}>{item.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold' ,fontSize: 18}}>Phone:</Text>
                                    <Text style={{ color: '#528B8B',fontSize: 18 }}>{item.phone}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold',fontSize: 18 }}>Address:</Text>
                                    <Text style={{ color: '#528B8B' ,fontSize: 18}}>{item.address}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold',fontSize: 18 }}>Payment Method:</Text>
                                    <Text style={{ color: '#528B8B' ,fontSize: 18}}>{item.note}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#9A9A9A', fontWeight: 'bold' ,fontSize: 18}}>Total:</Text>
                                    <Text style={{ color: '#528B8B', fontWeight: 'bold' ,fontSize: 18}}>{item.total}$</Text>
                                </View>
                                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 10 }} />
                            </TouchableOpacity>
                        </View>

                    }
                    keyExtractor={(id, index) => id}
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

export default ListOrder;