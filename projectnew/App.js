/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {  Navigator } from 'react-native-deprecated-custom-components';
import App1 from './src/components/App';
export default class App extends React.Component {
  render() {
      return (
          <Navigator
              initialRoute={{ name: 'APP' }}
              renderScene={(route, navigator) => {
                  switch (route.name) {
                      case 'APP': return <App1 navigator={navigator} />;
                      default: return ;
                  }
              }}
          />
      );
  }
}
