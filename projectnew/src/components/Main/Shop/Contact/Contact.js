import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Linking, Platform, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import phoneIcon from '../../../../media/appIcon/phone.png';
import mailIcon from '../../../../media/appIcon/mail.png';
import messageIcon from '../../../../media/appIcon/message.png';
import locationIcon from '../../../../media/appIcon/location.png';
class Contact extends Component {
    dialCall = () => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${1234567890}';
        }
        else {
            phoneNumber = 'telprompt:${1234567890}';
        }

        Linking.openURL(phoneNumber);
    };
    render() {
        const {
            mapContainer, wrapper, infoContainer,
            rowInfoContainer, imageStyle, infoText
        } = styles;
        return (
            <View style={wrapper}>
                <View style={mapContainer}>
                    <MapView
                        showsUserLocation={true}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                        style={{ width: width - 30, height: 185 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            title="NDT"
                            description="Shop Space"
                        />
                    </MapView>
                </View>
                <View style={infoContainer}>
                    <View style={rowInfoContainer}>
                        <Image source={locationIcon} style={imageStyle} />
                        <Text style={infoText}>Lang Dai Hoc</Text>
                    </View>
                    <View style={rowInfoContainer}>
                        <Image source={phoneIcon} style={imageStyle} />
                        <TouchableOpacity onPress={this.dialCall} activeOpacity={0.7}>
                            <Text style={infoText}>(+84) 1234567890</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={rowInfoContainer}>
                        <Image source={mailIcon} style={imageStyle} />
                        <Text style={infoText}>duyenpham.no@gmail.com</Text>
                    </View>
                    <View style={[rowInfoContainer, { borderBottomWidth: 0 }]}>
                        <Image source={messageIcon} style={imageStyle} />
                        <Text style={infoText}>(+84) 999999</Text>
                    </View>
                </View>

            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#F6F6F6' },
    mapStyle: {
        width: width - 40,
        height: 230,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    infoContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#FFF',
        margin: 10,
        marginTop: 0,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    rowInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#D6D6D6'
    },
    imageStyle: {
        width: 30,
        height: 30
    },
    infoText: {
        fontFamily: 'Arial',
        color: '#329576',
        fontWeight: '500'
    }
});

export default Contact;