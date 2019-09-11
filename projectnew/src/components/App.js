import React, { component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import Authentication from './Authentication/Authentication';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import Main from './Main/Main';
import OrderHistory from './OrderHistory/OrderHistory';
import refreshToken from '../api/refreshToken';
import AddProduct from './ShopAdmin/AddProduct';
import ListProduct from './ShopAdmin/ListProduct';
import ListOrder from './ShopAdmin/ListOrder';
import Bill_Detail from './ShopAdmin/Bill_Detail';
import Update_product from './ShopAdmin/Update_product';
export default class App extends React.Component {
    // new line
    componentDidMount() {
        setInterval(refreshToken, 30000);
    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'MAIN' }}
                renderScene={(route, navigator) => {
                    switch (route.name) {
                        case 'MAIN': return <Main navigator={navigator} />;
                        case 'CHANGE_INFO': return <ChangeInfo navigator={navigator} user={route.user} />;
                        case 'AUTHENTICATION': return <Authentication navigator={navigator} />;
                        case 'ADD_PRODUCT': return <AddProduct navigator={navigator} />;
                        case 'LIST_PRODUCT': return <ListProduct navigator={navigator} />;
                        case 'LIST_ORDER': return <ListOrder navigator={navigator} />;
                        case 'BILL_DETAIL': return <Bill_Detail navigator={navigator} bill={route.bill} />;
                        case 'UPDATE_PRODUCT': return <Update_product navigator={navigator} product={route.product} />;
                        default: return <OrderHistory navigator={navigator} />;
                    }
                }}
                configureScene={route => {
                    if (route.name === 'AUTHENTICATION') return Navigator.SceneConfigs.FloatFromRight;
                    return Navigator.SceneConfigs.FloatFromLeft;
                }}
            />
        );
    }
}


