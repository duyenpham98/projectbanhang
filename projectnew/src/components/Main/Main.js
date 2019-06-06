import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import Shop from './Shop/Shop';
import checkLogin from '../../api/checkLogin';
import getToken from '../../api/getToken';
import global from '../global';
export default class Main extends React.Component {
  componentDidMount() {
    getToken()
      .then(token => checkLogin(token))
      .then(res => global.onSignIn(res.user))
      .catch(err => console.log('LOI CHECK LOGIN', err));
  }
  closeControlPanel = () => {
    this.drawer.close();
  };
  openControlPanel = () => {
    this.drawer.open();
  };
  render() {
    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 3 },
    };
    const { navigator } = this.props;
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Menu navigator={navigator} />}
        openDrawerOffset={0.4} // 20% gap on the right side of drawer
        panCloseMask={0.4}
        closedDrawerOffset={-3}
        tapToClose
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <Shop open={this.openControlPanel.bind(this)} />
      </Drawer>

    );
  }
}

