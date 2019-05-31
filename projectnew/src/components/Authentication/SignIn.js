﻿/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import saveToken from '../../api/saveToken';
import global from '../global';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import signIn from '../../api/signIn';

import { GoogleSignin } from 'react-native-google-signin';
export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            accessToken: null,
            user: null
        }
    }
    componentWillMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true });
        GoogleSignin.configure({
          webClientId: '731795877247-4t9lancq3e2ld93491t83o7sio58mmhe.apps.googleusercontent.com'
        })
      }
    handleSigninGoogle() {
        GoogleSignin.signIn().then((user) => { 
          console.log(user);
          global.onSignIn(user.email);
        }).catch((err) => {
          console.log('WRONG SIGNIN', err);
        }).done();
        this.props.goBackToMain();
         
      }
    
    async fbAuth() {
        try {
            let result = await LoginManager.logInWithReadPermissions(['public_profile','email'])
            if (result.isCancelled) {
                alert("Log in cancelled");
            }
            else {
                AccessToken
                .getCurrentAccessToken()
                .then((user) => {
                    alert("Facebook accessToken:\n" + user.accessToken + "\n\naccessTokenSource: " + user.accessTokenSource + "\n\nuserID: " + user.userID)
                    console.log(user);
                    global.onSignIn(user.userID);
                    this.props.goBackToMain();
                    saveToken(user.accessToken);
                    return user
                })
                
            }
        } catch (error) {
            alert("Login failed with error" + error);
        }
    }
   
    onSignIn() {
        const { email, password } = this.state;

        if (email == '') {
            alert("Email không được trống");
        }
        if (password == '') {
            alert("Password không được trống");
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
                        placeholderTextColor='#CD8500'
                        autoFocus={true}
                        returnKeyType='next'
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                        onSubmitEditing={() => this.refs.password.focus()}
                    />
                    <TextInput style={styles.passwrod}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder='Password'
                        placeholderTextColor='#CD8500'
                        returnKeyType='next'
                        secureTextEntry={true}
                        autoCorrect={false}//không hiện ra gợi ý khi nhập
                    />
                    <View style={styles.button}>
                        <View style={styles.btndangnhap}>
                            <TouchableOpacity onPress={this.onSignIn.bind(this)}
                            >
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingTop: 5 }}>Sign in</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.btndangnhap}>
                            <TouchableOpacity onPress={this.fbAuth.bind(this)}
                            >
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingTop: 5 }}>Sign in with facebook</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btndangnhap}>
                            <TouchableOpacity onPress={() => this.handleSigninGoogle()}
                            >
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center', paddingTop: 5 }}>Sign in with Google +</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </View >
            
        );
       
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,// co giản màn hình
        backgroundColor: '#E8E8E8',
    },

    infocontainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 80,
        height: 200,
    },
    logo: {
        width: 100,
        height: 100

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
        flexDirection: 'column',
    },
    btndangnhap: {
        borderColor: 'gray',
        marginTop: 5,
        borderWidth: 1,
        margin: 20,
        borderRadius: 20,
        height: 40,
        marginBottom: 5,
        backgroundColor: '#c0b01d',
    },

});