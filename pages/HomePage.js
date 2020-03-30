// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { useState, useEffect, useRef } from 'react'
import { Text, StyleSheet, AsyncStorage, TouchableOpacity, View, Modal, Image, Alert, ScrollView, Vibration } from 'react-native'
import Header from '../components/Header'
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { BarCodeScanner, } from 'expo-barcode-scanner';
import i18n from 'i18n-js';
import { Notifications } from 'expo';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import GroupsModal from '../components/GroupsModal'
import ReportModal from '../components/ReportModal'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useGlobalState, setgid, setcontactCount, setcontactStatus, setMYQR } from '../helpers/GlobalState';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import Toast from 'react-native-tiny-toast'

import { Linking } from 'expo';
const statusColor = [
    '#7dc656',
    '#7dc656',
    '#f1c056',
    '#EE6c4d',
    '#fb3640',
];

const localNotification = {
    title: 'Achtung!',
    body: 'Einer deiner Kontakte hat seinen Status in einen kritischen Zustand geändert!',
    android: {
        sound: true,
    },
    ios: {
        sound: true,
        _displayInForeground: true,
    },
};


function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}





export default HomePage = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleGrupCode, setmodalVisibleGrupCode] = useState(false);
    const [groupsVisible, setgroupsVisible] = useState(false);
    const [pause, setPause] = useState(false);
    const [groupCode, setGroupCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [reportVisible, setreportVisible] = useState(false);


    const [groupError, setGroupError] = useState(false);
    const [loadingHome, setLoadingHome] = useState(false);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [canJoin, setCanJoin] = useState(true);
    const [error, setError] = useState(false);

    const [contactState] = useGlobalState('contactStatus');
    const [contactCount] = useGlobalState('contactCount');
    const [groupData] = useGlobalState('gid');
    const [key] = useGlobalState('key');
    const [uid] = useGlobalState('uid');
    const [myQR] = useGlobalState('myQRURL');
    const [myState] = useGlobalState('myStatus');

    const infectData = "@infectDataUS" + uid;
    const codeInputRef = useRef();
    let myQRURL = Linking.makeUrl('INFECTIONTRACKERQR', { uid: uid, type: 'user' });


    // Non replaced
    // const statusString = [
    //     'nicht getestet, keine Symptome',
    //     'getestet: Test negativ',
    //     'Kontakt mit positiv getester Person',
    //     'nicht getestet, Corona-typische Symptome',
    //     'getestet: Test positiv',
    // ];

    // i18n Version
    const statusString = [
        i18n.t('health-state-one'),
        i18n.t('health-state-two'),
        i18n.t('health-state-three'),
        i18n.t('health-state-four'),
        i18n.t('health-state-five'),
    ];

    useEffect(() => {
        (async () => {

            setMYQR(myQRURL)
            console.log((myQR))

        })();
    }, []);

    const handleNotification = (notification) => {
        // do whatever you want to do with the notification
        console.log("NEW NOTIFICATION", notification)
    };



    joinGroup = () => {
        setLoadingGroup(true)

        console.log(groupCode)
        axios.post('https://seb-vs-virus-api.herokuapp.com/join', {
            uid: uid,
            key: key,
            shortcode: groupCode.toString()

        })
            .then(function (response) {
                console.log(response.data)

                setLoadingGroup(false)
                setmodalVisibleGrupCode(false)
                Toast.show('Erfolgreich der Gruppe beigetreten', {
                    position: Toast.position.center,
                    containerStyle: { zIndex: 99 },
                })
                setGroupCode('')

            })
            .catch(function (error) {

                setLoadingGroup(false)

                codeInputRef.current.shake()

                setGroupCode('')

            });



    }







    const updateMe = () => {
        let contactCount = axios.post('https://seb-vs-virus-api.herokuapp.com/count', {
            uid: uid,
            key: key
        })
        let contactStatus = axios.post('https://seb-vs-virus-api.herokuapp.com/check', {
            uid: uid,
            key: key
        })
        /*  let groupAlive = axios.post('https://seb-vs-virus-api.herokuapp.com/groupalive', {
              gid: groupData,
          })*/
        axios.all([contactCount, contactStatus]).then(axios.spread((...responses) => {
            const count = responses[0].data
            const status = responses[1].data

            console.log("alive", count, status)
            if ((status > 2) && (status > contactState)) {
                setcontactCount(count)
                setcontactStatus(status)

                Alert.alert(
                    "Ein Kontakt wurde positiv getestet", //Achtung
                    "Bitte übermittelt eure Kontaktinformationen an die zuständige Behörde, damit diese mit euch Kontakt aufnehmen können. Die Kontaktdaten können nur von der jeweiligen Behörde eingesehen werden.", //"Es gab einen Fehler beim Daten übertragen"
                    [
                        { text: 'Später', onPress: () => { } },
                        { text: 'Jetzt angeben', onPress: () => { setreportVisible(true) } },
                    ],
                    { cancelable: false }
                );
            }



        })).catch(errors => {
            console.log("alive", errors)

        })
    }

    useInterval(() => {
        updateMe()
    }, 60000);


    generateGroupCode = async () => {
        if (groupData) {
            setgroupsVisible(true)
            return
        }
        setLoadingHome(true)
        axios.post('https://seb-vs-virus-api.herokuapp.com/group', {
            uid: uid,
        })
            .then(async function (response) {





                setgid(response.data)
                setLoadingHome(false)
                setgroupsVisible(true)

            })
            .catch(function (error) {
                setLoadingHome(false)
                Toast.show('Es gab einen Fehler', {
                    position: Toast.position.center,
                    containerStyle: { zIndex: 99 },
                })
            });



    };



    const addToContacts = (type, id) => {
        console.log(type)
        if (type === "user") {
            setLoading(true)

            axios.post('https://seb-vs-virus-api.herokuapp.com/connect', {
                uid: uid,
                xid: id,
                key: key

            })
                .then(function (response) {
                    Vibration.vibrate();
                    console.log(response)
                    setLoading(false)
                    setModalVisible(false);

                    Toast.show('Kontakt hinzugefügt', {
                        position: Toast.position.center,
                        containerStyle: { zIndex: 99 },
                    })
                })
                .catch(function (error) {
                    setError(true)
                    // Works on both Android and iOS
                    Alert.alert(
                        i18n.t('app-attention'), //Achtung
                        i18n.t('app-error') + '\n' + error, //"Es gab einen Fehler beim Daten übertragen"
                        [

                            { text: 'OK', onPress: () => { setLoading(false); setError(false) } },
                        ],
                        { cancelable: false }
                    );

                });

        }
        if (type === "group") {
            setLoading(true)
            axios.post('https://seb-vs-virus-api.herokuapp.com/join', {
                uid: uid,
                gid: id,
                key: key

            })
                .then(function (response) {
                    console.log(response)
                    setLoading(false)
                    setModalVisible(false);
                    Toast.show('Gruppe beigetreten', {
                        position: Toast.position.center,
                        containerStyle: { zIndex: 99 },
                    })
                })
                .catch(function (error) {

                    // Works on both Android and iOS
                    Alert.alert(
                        i18n.t('app-attention'), //Achtung
                        i18n.t('app-error') + '\n' + error, //"Es gab einen Fehler beim Daten übertragen"
                        [

                            { text: 'OK', onPress: () => { setLoading(false); setError(false) } },
                        ],
                        { cancelable: false }
                    );

                });

        }
    }



    const handleBarCodeScanned = async ({ type, data }) => {
        if (error) return
        let temp = Linking.parse(data);
        if (temp.queryParams.type && temp.queryParams.uid) {
            addToContacts(temp.queryParams.type, temp.queryParams.uid)

        }
        return


    };


    const _handleUrl = (url) => {

        let temp = Linking.parse(url);
        console.log(url, temp.queryParams)
        if (temp.queryParams.type && temp.queryParams.uid) {
            addToContacts(temp.queryParams.type, temp.queryParams.uid)
        }
        return
    };

    Linking.addEventListener('url', (url) => { _handleUrl(url.url) });

    Notifications.addListener(handleNotification);


    return (
        <View style={{ flex: 1 }}>

            <Header />
            <Spinner
                visible={loadingHome}
                overlayColor="rgba(0,0,0,0.7)"
                size="large"
            />

            <ScrollView>
                <View style={{ flex: 1, width: '100%', alignItems: 'center', marginTop: 10 }}>
                    <GroupsModal visible={groupsVisible} groups={groupData || {}} hide={() => setgroupsVisible(false)}></GroupsModal>
                    <ReportModal visible={reportVisible} hide={() => setreportVisible(false)}></ReportModal>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "400",
                        padding: 20,
                        color: '#ababab'
                    }}>{i18n.t('homeYourCode')}</Text>
                    <QRCode content={myQRURL} codeStyle='dot' logo={require('../assets/images/logo.png')} size={200, 200} logoSize={50} />

                    <TouchableOpacity style={{
                        backgroundColor: '#293241',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                        height: 50, borderRadius: 25, width: 200, alignItems: 'center', justifyContent: 'center', marginTop: 20,
                    }}
                        onPress={() => generateGroupCode()}

                    >
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "600",

                            color: '#ffffff', //
                        }}>{i18n.t('app-code-plain') /*Gruppen-Code*/} {groupData ? i18n.t('app-code-show') : i18n.t('app-code-generate') /*'anzeigen' 'generieren'*/}</Text>

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


                            <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>{i18n.t('healtState') /*Dein Gesundheitszustand*/}</Text>
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
                    }}
                        onPress={() => {
                            props.navigation.navigate('Info')
                        }}
                    >
                        <View style={{ height: '100%', width: 40, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 20 }}>
                            {contactState > 1 ?
                                <View style={{
                                    borderColor: statusColor[contactState],
                                    backgroundColor: statusColor[contactState],
                                    borderRadius: 10, height: 20, width: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginBottom: -5,
                                }}>

                                    <FontAwesome name="info" size={10} color="white" />
                                </View>
                                : null}
                            <View style={{ borderColor: statusColor[contactState], backgroundColor: '#383838', borderWidth: 4, borderRadius: 20, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>

                                <FontAwesome name="bell" size={20} color="white" />
                            </View>
                        </View>
                        <View style={{ height: '100%', width: 180, justifyContent: 'center', marginLeft: 20 }} >


                            <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>{i18n.t('app-your-env') /*Dein Umfeld*/}</Text>
                            <Text style={{ textAlign: 'left', fontWeight: '300', padding: 2, fontSize: 12 }}>{contactState > 2 ? i18n.t('app-your-env-attention') : i18n.t('app-your-env-nothing') /*'Achtung! Du bist gefährdet.' : 'keine Gefahr erkannt'*/}</Text>
                            <Text style={{ textAlign: 'left', fontWeight: '300', padding: 2, fontSize: 12 }}>{i18n.t('app-your-follow') /*du verfolgst*/} <Text style={{ fontWeight: '500' }}>{contactCount}</Text> {i18n.t('app-your-contacts') /*Kontakte*/}</Text>
                        </View>
                        <View style={{ height: '100%', width: 80, justifyContent: 'center', alignItems: 'flex-end', marginRight: 40 }}>


                            <FontAwesome name="info-circle" size={20} color='#383838' />

                        </View>
                    </TouchableOpacity>
                    {(contactState > 2) ?
                        <TouchableOpacity>
                            <Text style={{ padding: 15, opacity: 0.7, color: '#EE6c4d' }} onPress={() => setreportVisible(true)}>Kontaktdaten übermitteln</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            </ScrollView>

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
                            height: 50, borderRadius: 25, width: 200, alignItems: 'center', justifyContent: 'center', marginTop: 20,
                        }}
                            onPress={() => {
                                setModalVisible(false)
                                setmodalVisibleGrupCode(true)
                            }}
                        >
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "600",

                                color: '#ffffff',


                            }}>{i18n.t('app-code') /*Gruppen-Code eingeben*/}</Text>

                        </TouchableOpacity>
                        <Text style={{
                            padding: 20, fontSize: 16, textAlign: 'center',
                        }}>{i18n.t('app-scan-so') /*Scannt den Code eures Kontaktes. Gescannte Kontakte werden nach 2 Wochen automatisch gelöscht.*/}</Text>
                        <Text style={{
                            padding: 5, fontSize: 16, textAlign: 'center', color: '#fb3640'
                        }}><Text style={{ fontWeight: '600' }}>{i18n.t('app-attention') /*Achtung*/}:</Text> {i18n.t('app-no-revert') /*Einmal gescannte Kontakte können aus Sicherheitsgründen nicht rückgängig gemacht werden.*/}</Text>



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
                            }}>{i18n.t('app-back') /*Zurück*/}</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisibleGrupCode}
                onRequestClose={() => {

                }}

                style={{ flex: 1, backgroundColor: 'none', height: '100%' }}>
                <Spinner
                    visible={loadingGroup}
                    overlayColor="rgba(0,0,0,0.7)"
                    size="large"
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{


                            alignItems: 'center', justifyContent: 'center',
                            position: 'absolute',
                            top: 30, right: 20,
                            height: 40, width: 40

                        }}
                        onPress={() => {
                            setModalVisible(false)
                            setmodalVisibleGrupCode(false)
                        }}
                    >
                        <Ionicons name="ios-close-circle-outline" size={30} color="black"></Ionicons>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'left', fontWeight: '500', padding: 10 }}>{i18n.t('app-join-code') /*Bitte gib den 7-stelligen Gruppen-Code ein*/}</Text>
                    <SmoothPinCodeInput
                        cellStyle={{
                            borderBottomWidth: 2,
                            borderColor: 'gray',
                        }}
                        cellStyleFocused={{
                            borderColor: 'black',
                        }}
                        restrictToNumbers={true}
                        keyboardType="number-pad"
                        autoFocus={true}
                        codeLength={7}
                        value={groupCode}
                        onTextChange={code => setGroupCode(code)}
                        animated={true}
                        onFulfill={() => setCanJoin(false)}
                        onBackspace={() => setCanJoin(true)}
                        ref={codeInputRef}
                    />
                    <TouchableOpacity
                        disabled={canJoin}
                        style={{
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
                        onPress={() =>
                            joinGroup()
                        }
                    >
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "600",

                            color: '#ffffff',


                        }}>{i18n.t('app-join') /*Gruppe beitreten*/}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={canJoin}
                        style={{
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
                        onPress={() => {
                            setModalVisible(true)
                            setmodalVisibleGrupCode(false)
                        }
                        }
                    >
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "600",

                            color: '#ffffff',


                        }}>{i18n.t('app-qr-scan') /*QR-Code scannen*/}</Text>

                    </TouchableOpacity>



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
        bottom: 5,
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
