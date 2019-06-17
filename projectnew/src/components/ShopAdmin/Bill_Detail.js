import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions,Alert } from 'react-native';
import icLogo from '../../media/appIcon/logo.png';
import bill_order from '../../api/bill_order';
const { width } = Dimensions.get('window');
const back = require('../../media/appIcon/back.png');
class Bill_Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [],
        }
    }

    Delete_bill_detail(id) {
        fetch('http://192.168.100.5/react-native/app/delete_bill_detail.php', {
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
                alert("Delete success");
            })
            .catch((error) => {
                console.error(error);
            });

    }
    Delete(id){
        Alert.alert(
            'Delete Bill Detail',
            'Do you want delete this bill detail?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: ()=>this.Delete_bill_detail(id)},
            ],
            {cancelable: false},
          );
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    componentDidMount() {
        const id_bill = this.props.bill.id;
        bill_order(id_bill)
            .then(arrProduct => {
                this.setState({ listProducts: arrProduct });
            })
            .catch(err => console.log(err));
    }
    render() {
        return (

            <View style={styles.wrapper}>
                <View style={styles.headr}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={styles.backStyle} source={back} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 25 }}> BILL DETAIL </Text>
                    <Image source={icLogo} style={styles.iconStyle} />
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={this.state.listProducts}
                        renderItem={({ item }) =>
                            <View style={styles.wrapper}>

                                <View style={styles.orderRow}>
                                    <View>
                                        <TouchableOpacity style={styles.touch} onPress={() => this.Delete(item.id)} >
                                            <Text style={{ fontSize: 20, color: '#EE2C2C' }}>x</Text>
                                        </TouchableOpacity>
                                    </View>
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Material:</Text>
                                        <Text style={{ color: '#C21C70' }}>{item.material}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Color:</Text>
                                        <View style={{ height: 15, width: 15, backgroundColor: item.color.toLowerCase(), borderRadius: 15, marginLeft: 5, borderWidth: 1, borderColor: '#C21C70', marginTop: 3 }} />
                                        <Text style={{ color: '#2ABB9C' }}>{item.color}</Text>
                                    </View>
                                </View>
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
    orderRow: {
        height: width / 3,
        backgroundColor: '#FFF',
        margin: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 5,
        borderRadius: 2,
        justifyContent: 'space-around'
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
    touch: {
        marginLeft: 290,
    },

});

export default Bill_Detail;