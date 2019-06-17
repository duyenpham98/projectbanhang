import React, { component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Contact from './Contact/Contact';
import TabNavigator from 'react-native-tab-navigator';
import Header from './Header';
import Message from './Mess/Message';
import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';
import homeIcon0 from '../../../media/appIcon/home0.png';
import homeIcon from '../../../media/appIcon/home.png';
import cart0 from '../../../media/appIcon/cart0.png';
import cart from '../../../media/appIcon/cart.png';
import mess from '../../../media/appIcon/mess.png';
import mess0 from '../../../media/appIcon/mess0.jpeg';
import search0 from '../../../media/appIcon/search0.png';
import search from '../../../media/appIcon/search.png';
import contact0 from '../../../media/appIcon/contact0.png';
import contact from '../../../media/appIcon/contact.png';
import global from '../../global';
import getToken from '../../../api/getToken';
import checkLogin from '../../../api/checkLogin';
export default class Shop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            types: [],
            topProducts: [],
            cartArray: [],
            user: null,
        };
        global.addProductToCart = this.addProductToCart.bind(this);
        global.incrQuantity = this.incrQuantity.bind(this);
        global.decrQuantity = this.decrQuantity.bind(this);
        global.removeProduct = this.removeProduct.bind(this);
        global.gotoSearch = this.gotoSearch.bind(this);
    }
    removeProduct(productId) {
        const newCart = this.state.cartArray.filter(e => e.product.id !== productId);
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }
    gotoSearch() {
        this.setState({ selectedTab: 'search' });
    }
    addProductToCart(product) {
        const isExist = this.state.cartArray.some(e => e.product.id === product.id);
        if (isExist) {
            Alert.alert(
                'Notification',
                'This product is already in the shopping cart',
                [
                    { text: 'OK' },
                ],
            );
            return false;
        }
        this.setState(
            { cartArray: this.state.cartArray.concat({ product, quantity: 1 }) },
            () => saveCart(this.state.cartArray)
        );
        Alert.alert(
            'Notification',
            'Products are put into cart',
            [
                { text: 'OK' },
            ],
        );
    }
    incrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            return { product: e.product, quantity: e.quantity + 1 };
        });
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }

    decrQuantity(productId) {
        const newCart = this.state.cartArray.map(e => {
            if (e.product.id !== productId) return e;
            if (e.quantity <= 1) {
                Alert.alert(
                    'Notification',
                    'The product you want to buy is not under one',
                    [
                        { text: 'OK' },
                    ],
                );
                return e;
            }
            return { product: e.product, quantity: e.quantity - 1 };
        });
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }
    componentDidMount() {
        initData()
            .then(resJSON => {
                const { type, product } = resJSON;
                this.setState({ types: type, topProducts: product });
            });
        getCart()
            .then(cartArray => this.setState({ cartArray }));
        getToken()
        .then(token => checkLogin(token))
        .then(res => {
            global.onSignIn(res.user);
            this.setState({ user: res.user });
        });
    }
    openMenu() {
        const { open } = this.props;
        open();
    }
    render() {
        const { types, selectedTab, topProducts, cartArray, user } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#85A6C9' }}>
                <Header onOpen={this.openMenu.bind(this)} />
                <TabNavigator>
                    <TabNavigator.Item
                        selected={selectedTab === 'home'}
                        renderIcon={() => <Image style={styleApp.iconStyle} source={homeIcon0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={homeIcon} />}
                        title="Home"
                        onPress={() => this.setState({ selectedTab: 'home' })}
                    >
                        <Home types={types} topProducts={topProducts} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        renderIcon={() => <Image style={styleApp.iconStyle} source={contact0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={contact} />}
                        selected={selectedTab === 'contact'}
                        title="Contact"
                        onPress={() => this.setState({ selectedTab: 'contact' })}>
                        <Contact />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        renderIcon={() => <Image style={styleApp.iconStyle} source={cart0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={cart} />}
                        selected={selectedTab === 'cart'}
                        title="Cart"
                        badgeText={cartArray.length}
                        onPress={() => this.setState({ selectedTab: 'cart' })}>
                        <Cart cartArray={cartArray} user={user}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        renderIcon={() => <Image style={styleApp.iconStyle} source={search0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={search} />}

                        selected={selectedTab === 'search'}
                        title="Search"
                        onPress={() => this.setState({ selectedTab: 'search' })}>
                        <Search />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'mess'}
                        renderIcon={() => <Image style={styleApp.iconStyle} source={mess} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={mess0} />}
                        title="Message"
                        onPress={() => this.setState({ selectedTab: 'mess' })}
                    >
                        <Message user ={user} />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );

    }
}
const styleApp = StyleSheet.create({
    iconStyle: {
        width: 20, height: 20
    }
});