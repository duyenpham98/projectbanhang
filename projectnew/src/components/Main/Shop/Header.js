import React, { component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import icLogo from '../../../media/appIcon/logo.jpeg';
import icMenu from '../../../media/appIcon/ic_menu.png';
import global from '../../global';
import search from '../../../api/searchProduct';
const { height } = Dimensions.get('window');
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: ''
        };
    }
    onSearch() {
        const { txtSearch } = this.state;
        this.setState({ txtSearch: '' });
        search(txtSearch)
            .then(arrProduct => global.setArraySearch(arrProduct))
            .catch(err => console.log(err));
    }
    render() {
        return (

            <View style={styleHeader.wrapp}>
                <View style={styleHeader.headr}>
                    <TouchableOpacity onPress={this.props.onOpen}>
                        <Image source={icMenu} style={styleHeader.iconStyle} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}> SHOP SPACE </Text>
                    <Image source={icLogo} style={styleHeader.iconStyle} />
                </View>
                <TextInput
                    style={styleHeader.textInput}
                    placeholder="What do you want to buy?"
                    underlineColorAndroid="transparent"
                    value={this.state.txtSearch}
                    onChangeText={text => this.setState({ txtSearch: text })}
                    onFocus={() => global.gotoSearch()}
                    onSubmitEditing={this.onSearch.bind(this)}
                />
            </View>

        );
    }
}
const styleHeader = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    wrapp: {
        height: height / 8,
        padding: 10,
        justifyContent: 'space-around',
        backgroundColor: '#329576'
    },
    headr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        height: height / 25,
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 10,
        color: 'gray',
        paddingVertical: 0,

    },
    iconStyle: {
        height: 25,
        width: 25
    },
    textInput: {
        height: height / 23,
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingVertical: 0
    },
});