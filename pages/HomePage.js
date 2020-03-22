// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, StatusBar, TouchableOpacity, View, Modal, Image, Alert, ScrollView } from 'react-native'
import Header from '../components/Header'
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { BarCodeScanner, } from 'expo-barcode-scanner';
import i18n from 'i18n-js';
import { BlurView } from 'expo-blur';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import GroupsModal from '../components/GroupsModal'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useGlobalState, setgid } from '../helpers/GlobalState';
const statusColor = [
    '#7dc656',
    '#7dc656',
    '#f1c056',
    '#EE6c4d',
    '#fb3640',
]
const statusString = [
    'nicht getestet, keine Symptome',
    'getestet: Test negativ',
    'Kontakt mit positiv getester Person',
    'nicht getestet, Corona-typische Symptome',
    'getestet: Test positiv',
]

export default HomePage = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [groupsVisible, setgroupsVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingHome, setLoadingHome] = useState(false);


    const [contactState, setContactstate] = useState(0);

    const [groupData] = useGlobalState('gid');
    const [key] = useGlobalState('key');
    const [uid] = useGlobalState('uid');
    const [myState] = useGlobalState('myStatus');

    const infectData = "@infectData" + uid;



    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    generateGroupCode = async () => {
        if (groupData) {
            setgroupsVisible(true)
            return
        }
        setLoadingHome(true)
        axios.post('https://seb-vs-virus-api.herokuapp.com/group', {
            uid: uid,

        })
            .then(function (response) {


                setLoadingHome(false)
                setgid(response.data)
                setgroupsVisible(true)
            })
            .catch(function (error) {

                // Works on both Android and iOS
                Alert.alert(
                    'Achtung',
                    "Es gab einen Fehler beim Daten übertragen" + '\n' + error,
                    [

                        { text: 'OK', onPress: () => setLoadingHome(false) },
                    ],
                    { cancelable: false }
                );

            });



    };


    const handleBarCodeScanned = async ({ type, data }) => {
        if (data.slice(0, 11) !== "@infectData") return
        console.log('GOT CODE', "XID: " + data.slice(11), "UID: " + uid, "KEY: " + key)
        setLoading(true)

        axios.post('https://seb-vs-virus-api.herokuapp.com/connect', {
            uid: uid,
            xid: data.slice(11),
            key: key

        })
            .then(function (response) {
                console.log(response)
                setLoading(false)
                setModalVisible(false);
            })
            .catch(function (error) {

                // Works on both Android and iOS
                Alert.alert(
                    'Achtung',
                    "Es gab einen Fehler beim Daten übertragen" + '\n' + error,
                    [

                        { text: 'OK', onPress: () => setLoading(false) },
                    ],
                    { cancelable: false }
                );

            });



    };
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#293241" barStyle="light-content" />
            <Header />
            <Spinner
                visible={loadingHome}
                overlayColor="rgba(0,0,0,0.7)"
                size="large"
            />

            <View style={{ flex: 1, width: '100%', alignItems: 'center', marginTop: 30 }}>
                <GroupsModal visible={groupsVisible} groups={groupData || {}} hide={() => setgroupsVisible(false)}></GroupsModal>
                <Text style={{
                    fontSize: 14,
                    fontWeight: "400",
                    padding: 20,
                    color: '#ababab'
                }}>{i18n.t('homeYourCode')}</Text>
                <QRCode content={infectData} codeStyle='dot' logo={require('../assets/images/logo.png')} size={200, 200} logoSize={50} />

                <TouchableOpacity style={{
                    backgroundColor: '#293241',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 3.84,
                    height: 50, borderRadius: 15, width: 200, alignItems: 'center', justifyContent: 'center', marginTop: 20,
                }}
                    onPress={() => generateGroupCode()}

                >
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "600",

                        color: '#ffffff', //
                    }}>Gruppen-Code {groupData ? 'anzeigen' : 'generieren'}</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginTop: 20,
                    width: '95%', borderWidth: 1, borderColor: '#d6d6d6', height: 80, alignItems: 'center', justifyContent: 'space-between', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                    flexDirection: 'row'
                }}
                    onPress={() => props.navigation.navigate("Health", { myState: myState, key: key, uid: uid })}
                >
                    <View style={{ height: '100%', width: 40, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 20 }}>

                        <View style={{ borderColor: statusColor[myState], backgroundColor: '#383838', borderWidth: 4, borderRadius: 20, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>

                            <Ionicons name="ios-person" size={35} color="white" />
                        </View>
                    </View>
                    <View style={{ height: '100%', width: 180, justifyContent: 'center', marginLeft: 20 }} >


                        <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>Dein Gesundheitszustand</Text>
                        <Text style={{ textAlign: 'left', fontWeight: '300', padding: 2, fontSize: 12 }}>{statusString[myState]}</Text>
                    </View>
                    <View style={{ height: '100%', width: 80, justifyContent: 'center', alignItems: 'flex-end', marginRight: 40 }}>


                        <Ionicons name="ios-settings" size={20} color='#383838' />

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    marginTop: 20,
                    width: '95%', borderWidth: 1, borderColor: '#d6d6d6', height: 80, alignItems: 'center', justifyContent: 'space-between', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                    flexDirection: 'row'
                }}>
                    <View style={{ height: '100%', width: 40, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 20 }}>

                        <View style={{ borderColor: statusColor[contactState], backgroundColor: '#383838', borderWidth: 4, borderRadius: 20, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>

                            <FontAwesome name="bell" size={20} color="white" />
                        </View>
                    </View>
                    <View style={{ height: '100%', width: 180, justifyContent: 'center', marginLeft: 20 }} >


                        <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>Dein Umfeld</Text>
                        <Text style={{ textAlign: 'left', fontWeight: '300', padding: 2, fontSize: 12 }}>{contactState > 2 ? 'Achtung! Du bist gefährdet.' : 'keine Gefahr erkannt'}</Text>
                        <Text style={{ textAlign: 'left', fontWeight: '300', padding: 2, fontSize: 12 }}>du trackst <Text style={{ fontWeight: '500' }}>18</Text> Kontakte</Text>
                    </View>
                    <View style={{ height: '100%', width: 80, justifyContent: 'center', alignItems: 'flex-end', marginRight: 40 }}>


                        <FontAwesome name="info-circle" size={20} color='#383838' />

                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.FABStyle} onPress={() => setModalVisible(true)}>

                <FontAwesome name="qrcode" size={35} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {

                }}

                style={{ flex: 1, backgroundColor: 'none', height: '100%' }}>
                <View style={{ flex: 1, }}>
                    <Spinner

                        overlayColor="rgba(0,0,0,0.7)"
                        size="large"
                    />
                    <View style={{ height: '50%' }}>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{ height: '100%' }}
                        />
                        <Image source={require('../assets/images/scan_overlay.png')} style={{ height: '100%', width: '100%', zIndex: 99, position: 'absolute' }}></Image>
                    </View>
                    <View style={{ alignItems: 'center', height: '50%' }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#293241',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 3.84,
                            height: 50, borderRadius: 15, width: 200, alignItems: 'center', justifyContent: 'center', marginTop: 20,
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "600",

                                color: '#ffffff',


                            }}>Gruppen-Code eingeben</Text>

                        </TouchableOpacity>
                        <Text style={{
                            padding: 20, fontSize: 16, textAlign: 'center',
                        }}>Scannt den Code eures Kontaktes. Gescannte Kontakte werden nach 2 Wochen automatisch gelöscht.</Text>
                        <Text style={{
                            padding: 5, fontSize: 16, textAlign: 'center', color: '#fb3640'
                        }}><Text style={{ fontWeight: '600' }}>Achtung:</Text> Einmal gescannte Kontakte können aus Sicherheitsgründen nicht rückgängig gemacht werden.</Text>



                        <TouchableOpacity
                            style={{
                                backgroundColor: '#293241',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.15,
                                shadowRadius: 3.84,
                                height: 80, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20,
                                position: 'absolute',
                                bottom: 0, left: 0

                            }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "600",

                                color: '#ffffff', //
                            }}>Zurück</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </Modal>

        </View >
    )

}

const styles = StyleSheet.create({
    FABStyle: {
        height: 70,
        width: 70,
        backgroundColor: '#EE6C4D',
        borderRadius: 35,
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    }
})
