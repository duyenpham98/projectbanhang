import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Dimensions, Image, StyleSheet
} from 'react-native';
import icBack from '../../media/appIcon/back_white.png';
import icLogo from '../../media/appIcon/logo.png';
import SignIn from './SignIn';
import SignUp from './SignUp';
export default class Authentication extends Component {
  goBackToMain() {
    const { navigator } = this.props;
    navigator.pop();

  }
  constructor(props) {
    super(props);
    this.state = { isSignIn: true };
  }
  
  goBackToMain() {
    const { navigator } = this.props;
    navigator.pop();
  }
  gotoSignIn() {
    this.setState({ isSignIn: true });
  }

  signIn() {
    this.setState({ isSignIn: true });
  }
  signUp() {
    this.setState({ isSignIn: false });
  }
  render() {
    const mainJSX = this.state.isSignIn ? <SignIn goBackToMain={this.goBackToMain.bind(this)} /> : <SignUp gotoSignIn={this.gotoSignIn.bind(this)} />;
    return (
      <View style={styles.container}>
        {/*header  */}
        <View style={styles.headr}>
          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={icBack} style={styles.iconStyle} />
          </TouchableOpacity>
          <Text style={{ color: 'white' }}> Shop SPACE </Text>
          <Image source={icLogo} style={styles.iconStyle} />
        </View>

        {/*Content  */}
        {mainJSX}
        {/*bottom  */}

        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.styleButtonLeft}
            onPress={this.signIn.bind(this)}
          >
            <Text
              style={styles.inactiveStyle}
            >
              ĐĂNG NHẬP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.styleButtonRight}
            onPress={this.signUp.bind(this)}
          >
            <Text
              style={styles.activeStyle}
            >
              ĐĂNG KÍ </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#329576',
    padding: 6,
    justifyContent: 'space-between',

  },
  wrapp: {
    height: height / 3,
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: '#329576',
    alignItems: 'center'
  },
  headr: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    height: height / 25,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 10,
    color: 'gray'

  },
  iconStyle: {
    height: 25,
    width: 25
  },
  viewInput: {
    flex: 1,
    alignItems: 'center',
    marginTop: '30%'

  },
  viewButton: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  styleTextInput: {
    width: '80%',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 15,
  },
  styleButtonLeft: {
    borderColor: 'white',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 1
  },
  styleButtonRight: {
    borderColor: 'white',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 1,
  },
  styleButtonTransfer: {
    borderRadius: 20,
    borderWidth: 0.6,
    borderColor: 'white',
    width: '80%',
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  inactiveStyle: {
    color: '#34aa77'
  },
  activeStyle: {
    color: '#d0cfd0'
  },
  buttonText: {
    color: 'white',
    alignItems: 'center',
    height: 35
  },
  buttonText1: {
    color: 'white',
    alignItems: 'center',
    height: 35,
    marginBottom: 50
  },

  hoten: {
    borderColor: 'gray',
    margin: 20,
    marginTop: 5,
    borderWidth: 1,
    marginBottom: 5,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  username: {
    borderColor: 'gray',
    margin: 20,
    marginTop: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  matkhau: {
    margin: 20,
    borderColor: 'gray',
    marginTop: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,

  },
  result: {
    margin: 20,
    borderColor: 'gray',
    marginTop: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

});