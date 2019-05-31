import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
export default class HomeView extends React.Component {
    render() {
        const { types, topProducts } = this.props;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#85A6C9' }}>
                <Collection navigator={this.props.navigator}/>
                <Category navigator = {this.props.navigator} types={types}/>
                <TopProduct navigator={this.props.navigator} topProducts={topProducts} />
            </ScrollView>
        );
    }
}