import React, { component } from 'react';
import {  Navigator } from 'react-native-deprecated-custom-components';
import Authentication from './Authentication/Authentication';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import Main from './Main/Main';
import OrderHistory from './OrderHistory/OrderHistory';
import refreshToken from '../api/refreshToken';
import ThemSanPham from './ShopAdmin/ThemSanPham';
import DanhSachSanPham from './ShopAdmin/DanhSachSanPham';
import DanhSachOrder from './ShopAdmin/DanhSachOrder';
import Bill_Order from './ShopAdmin/Bill_Detail';
export default class App extends React.Component {
    
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
                        case 'CHANGE_INFO': return <ChangeInfo navigator={navigator} user = {route.user}/>;
                        case 'AUTHENTICATION': return <Authentication navigator={navigator} />;
                        case 'THEM_SAN_PHAM': return <ThemSanPham navigator={navigator} />;
                        case 'DANH_SACH_SAN_PHAM': return <DanhSachSanPham navigator={navigator} />;
                        case 'DANH_SACH_Order': return <DanhSachOrder navigator={navigator} />;
                        case 'Bill_Order': return <Bill_Order navigator={navigator} />;
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


