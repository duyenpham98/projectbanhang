﻿/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import saveToken from '../../api/saveToken';
import global from '../global';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import signIn from '../../api/signIn';
import { GoogleSignin } from 'react-native-google-signin';
export default class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            accessToken: null,
            user: null,
            userInfo: {},
        }
    }
    componentWillMount() {
        try {
            GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            GoogleSignin.configure({
                webClientId: '731795877247-4t9lancq3e2ld93491t83o7sio58mmhe.apps.googleusercontent.com',
                offlineAccess: true,
            })
        } catch (err) {
            console.log('Something wrong with google play service!', { err })
        }
    }
    handleSigninGoogle() {
        GoogleSignin.signIn().then((googleUser) => {
            this.setState({
                userInfo: googleUser.user,
            })
            global.onSignIn(this.state.userInfo);
            console.log('email', this.state.userInfo.email);
            console.log('name', this.state.userInfo.name);
            console.log('photo', this.state.userInfo.photo);
            this.props.goBackToMain();
        }).catch((err) => {
            alert('WRONG SIGNIN', err);
        }).done();

    }

    async fbAuth() {
        try {
            let result = await LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
            if (result.isCancelled) {
                alert("Log in cancelled");
            }
            else {
                AccessToken
                    .getCurrentAccessToken()
                    .then((user) => {
                        console.log(user);
                        const processRequest = new GraphRequest(
                            '/me?fields=name,picture.type(large)',
                            null,
                            get_Response_Info = (error, result) => {
                                if (error) {
                                    Alert.alert('Error fetching data: ' + error.toString());
                                } else {
                                    global.onSignIn(result);
                                    console.log(result);
                                }
                            }
                        );
                        new GraphRequestManager().addRequest(processRequest).start();
                        this.props.goBackToMain();
                        saveToken(user.accessToken);
                        return user;
                    })
            }
        } catch (error) {
            alert("Login failed with error" + error);
        }
    }
    onSignIn() {
        const { email, password } = this.state;
        if (email == '') {
            Alert.alert(
                'Notification',
                'Email must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        if (password == '') {
            Alert.alert(
                'Notification',
                'Password must not be empty',
                [
                    { text: 'OK' },
                ],
            );
        }
        else {
            signIn(email, password)
                .then(res => {
                    global.onSignIn(res.user);
                    this.props.goBackToMain();
                    saveToken(res.token);
                })
                .catch(err => alert(err));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infocontainer}>
                    <TextInput style={styles.username}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        placeholder='Email'
                        placeholderTextColor='#1C1C1C'
                        autoFocus={true}
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.password.focus()}
                    />
                    <TextInput style={styles.passwrod}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder='Password'
                        placeholderTextColor='#1C1C1C'
                        returnKeyType='next'
                        secureTextEntry={true}
                        autoCorrect={false}
                    />
                    <View style={styles.button}>
                        <View style={styles.btndangnhap}>
                            <TouchableOpacity onPress={this.onSignIn.bind(this)}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingTop: 5 }}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textOr}>
                            <Text style={styles.dangnhap}>--------------Or You can login through--------------</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={styles.btndangnhapfb}>
                                <TouchableOpacity onPress={this.fbAuth.bind(this)}>
                                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingTop: 5 }}>Facebook</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btndangnhapgg}>
                                <TouchableOpacity onPress={() => this.handleSigninGoogle()}>
                                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingTop: 5 }}>Google +</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>

            </View >

        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },

    infocontainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 80,
        height: 200,
        marginBottom: 15,
    },
    username: {
        borderColor: 'gray',
        marginTop: 5,
        borderWidth: 1,
        marginBottom: 5,
        margin: 20,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,

    },
    passwrod: {
        borderColor: 'gray',
        marginTop: 5,
        borderWidth: 1,
        margin: 20,
        height: 40,
        marginBottom: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,

    },
    button: {
        alignItems: 'center',
    },
    btndangnhap: {
        borderColor: 'gray',
        marginTop: 5,
        borderWidth: 1,
        margin: 20,
        height: 40,
        marginBottom: 5,
        backgroundColor: '#5CACEE',
        width: 150,
        alignItems: 'center',
    },
    btndangnhapfb: {
        borderColor: 'gray',
        marginTop: 5,
        borderWidth: 1,
        margin: 20,
        height: 40,
        marginBottom: 5,
        backgroundColor: '#0066CC',
        width: 130
    },

    btndangnhapgg: {
        borderColor: 'gray',
        marginTop: 5,
        borderWidth: 1,
        margin: 20,
        height: 40,
        marginBottom: 5,
        backgroundColor: '#FF3030',
        width: 130
    },
    dangnhap: {
        fontSize: 15,
        color: '#0066CC',
    },
    textOr: {
        marginBottom: 5,
        marginTop: 10,
    },
});