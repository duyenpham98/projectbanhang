import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import profileIcon from '../../media/temp/profile.png';

import global from '../global';
import saveToken from '../../api/saveToken';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        alignItems: 'center',
    },
    imageProfile: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: 13
    },
    viewImage: {
        flex: 2,
        width: '80%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    buttonStyle: {
        backgroundColor: 'white',
        width: 200,
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5
    },
    viewButton: {
        margin: 10,
        alignItems: 'center',
        flex: 6,
        marginTop: 30
    },
    textButton: {
        color: '#34B089',
        fontSize: 18,

    },
    nameUser: {
        marginBottom: '50%',
        color: 'white'
    },


});


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
        global.onSignIn = this.onSignIn.bind(this);
    }

    onSignIn(user) {
        this.setState({ user });
    }
    gotoAuthentication() {
        const { navigator } = this.props;
        navigator.push({ name: 'AUTHENTICATION' });
    }
    gotoAddProduct() {
        const { navigator } = this.props;
        navigator.push({ name: 'ADD_PRODUCT' });
    }
    gotoListProduct() {
        const { navigator } = this.props;
        navigator.push({ name: 'LIST_PRODUCT' });
    }
    gotoListOrder() {
        const { navigator } = this.props;
        navigator.push({ name: 'LIST_ORDER' });
    }
    gotoChangeInfo() {
        const { navigator } = this.props;
        navigator.push({ name: 'CHANGE_INFO', user: this.state.user });
    }
    gotoOrderHistory() {
        const { navigator } = this.props;
        navigator.push({ name: 'ORDER_HISTORY' });
    }
    onSignOut() {
        this.setState({ user: null });
        saveToken('');
    }
    render() {
        const logoutJSX = (
            <View style={styles.buttonStyle}>
                <TouchableOpacity style={{ marginTop: 4, alignItems: 'center' }} onPress={this.gotoAuthentication.bind(this)}>
                    <Text style={styles.textButton}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
        const { user } = this.state;
        const loginJSX = (
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#fff', marginTop: 20, fontSize: 20 }}>{user ? user.name : ""}</Text>
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.gotoOrderHistory.bind(this)}>
                        <Text style={styles.textButton}>Order History</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.gotoChangeInfo.bind(this)}>
                        <Text style={styles.textButton}>Change Info</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.gotoAddProduct.bind(this)}>
                        <Text style={styles.textButton}>Add Products</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.gotoListProduct.bind(this)}>
                        <Text style={styles.textButton}>List Products</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.gotoListOrder.bind(this)}>
                        <Text style={styles.textButton}>List Order</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.onSignOut.bind(this)}>
                        <Text style={styles.textButton}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        const mainJSX = this.state.user ? loginJSX : logoutJSX;
        return (
            <View style={styles.container}>
                <Image source={profileIcon} style={styles.imageProfile} />
                {mainJSX}
            </View>
        );
    }
}

export default Menu;