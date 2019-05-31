import React, { component } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Contact from './Contact/Contact';
import TabNavigator from 'react-native-tab-navigator';
import Header from './Header';
import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';
import homeIcon0 from '../../../media/appIcon/home0.png';
import homeIcon from '../../../media/appIcon/home.png';
import cart0 from '../../../media/appIcon/cart0.png';
import cart from '../../../media/appIcon/cart.png';
import search0 from '../../../media/appIcon/search0.png';
import search from '../../../media/appIcon/search.png';
import contact0 from '../../../media/appIcon/contact0.png';
import contact from '../../../media/appIcon/contact.png';
import global from '../../global';
const { height } = Dimensions.get('window');
export default class Shop extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            types: [],
            topProducts: [],
            cartArray: []
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
        if (isExist) return false;
        this.setState(
            { cartArray: this.state.cartArray.concat({ product, quantity: 1 }) }, 
            () => saveCart(this.state.cartArray)
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
            return { product: e.product, quantity: e.quantity - 1 };
        });
        this.setState({ cartArray: newCart }, 
            () => saveCart(this.state.cartArray)
        );
    }
    componentDidMount(){
        initData()
        .then(resJSON => {
            const { type , product   } = resJSON;
            this.setState({ types: type , topProducts: product });
        });
        getCart()
        .then(cartArray => this.setState({ cartArray }));
    }
    openMenu() {
        const { open } = this.props;
        open();
    }
    render() {
        const {types , selectedTab , topProducts,cartArray} = this.state;
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
                        <Home types = {types} topProducts = {topProducts}/>
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
                        title="cart"
                        badgeText={cartArray.length}
                        onPress={() => this.setState({ selectedTab: 'cart' })}>
                        <Cart cartArray = {cartArray}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        renderIcon={() => <Image style={styleApp.iconStyle} source={search0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={search} />}

                        selected={selectedTab === 'search'}
                        title="search"
                        onPress={() => this.setState({ selectedTab: 'search' })}>
                        <Search />
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