import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Dimensions } from 'react-native';
export default class SignUp extends React.Component {
    static navigationOptions = {
        title: 'Registration', // to add letter spacing on Android
        headerStyle: {
            backgroundColor: '#0b2e05',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: 70
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
        }
    }
    insertaccount() {
        if(this.state.name == ''){
            alert("Không được để trống Họ Tên");
        }
        if(this.state.email == ''){
            alert("Không được để trống Email");
        }
        if(this.state.password == ''){
            alert("Không được để trống Mật Khẩu");
        }
        if(this.state.phone == ''){
            alert("Không được để trống phone");
        }
        if(this.state.address == ''){
            alert("Không được để trống address");
        }
        if(this.state.password.length <6){
            alert("Mật khẩu phải hơn 6 kí tự");
        }
        else {
        fetch('http://192.168.100.411/react-native/app/register.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                address: this.state.address,
            }),
        })
            .then((responseJson) => {
                alert("Tạo tài khoản thành công!");
                this.setState({ email: '' });
                this.setState({ name: '' });
                this.setState({ password: '' });
                this.setState({ phone: '' });
                this.setState({ address: '' });
            })
            .catch((error) => {
                console.error(error);
            });}
    }
    render() {
        return (
            <View style={styles.container}>
            
                <TextInput style={styles.hoten}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    placeholder='Họ tên'
                    placeholderTextColor='#CD8500'
                    autoFocus={true}
                    returnKeyType='next'
                    autoCorrect={false}//không hiện ra gợi ý khi nhập
                    onSubmitEditing={() => this.refs.email.focus()}
                />
                <TextInput style={styles.username}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    placeholder='Email'
                    placeholderTextColor='#CD8500'
                    returnKeyType='next'
                    autoCorrect={false}//không hiện ra gợi ý khi nhập
                    onSubmitEditing={() => this.refs.password.focus()}
                />
                <TextInput style={styles.matkhau}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder='Mật khẩu'
                    placeholderTextColor='#CD8500'
                    returnKeyType='next'
                    secureTextEntry={true}
                    autoCorrect={false}//không hiện ra gợi ý khi nhập
                    onSubmitEditing={() => this.refs.phone.focus()}
                />
                <TextInput style={styles.phone}
                    onChangeText={(phone) => this.setState({ phone })}
                    value={this.state.phone}
                    placeholder='phone'
                    placeholderTextColor='#CD8500'
                    returnKeyType='next'
                    autoCorrect={false}//không hiện ra gợi ý khi nhập
                    onSubmitEditing={() => this.refs.address.focus()}
                />
                <TextInput style={styles.address}
                    onChangeText={(address) => this.setState({ address })}
                    value={this.state.address}
                    placeholder='Address'
                    placeholderTextColor='#CD8500'
                    returnKeyType='next'
                    autoCorrect={false}//không hiện ra gợi ý khi nhập
                />
                <View style={{ flexDirection: 'column' }}>
                    <View style={styles.btnxacnhan}>
                        <TouchableOpacity onPress={() => this.insertaccount()}
                        >
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold',paddingTop: 5 }}>Sign UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8E8E8',
        paddingTop: 23,
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
    btnxacnhan: {
        borderColor: 'gray',
        marginTop: 5,
        borderWidth: 1,
        alignItems: 'center',
        margin: 10,
        height: 40,
        marginBottom: 5,
        backgroundColor: '#4d1c2f',
        borderRadius: 20,
    },
    logocontainer: {
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 60,
        flex: 1

    },
    logo: {
        width: 200,
        height: 100

    },

    phone: {
        borderColor: 'gray',
        margin: 20,
        marginTop: 5,
        borderWidth: 1,
        height: 40,
        marginBottom: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
    },
    address: {
        borderColor: 'gray',
        margin: 20,
        marginTop: 5,
        borderWidth: 1,
        height: 40,
        marginBottom: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
    },
});