// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Alert, TouchableOpacity, View, AsyncStorage, ScrollView, Modal } from 'react-native'
import Header from '../components/Header'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useGlobalState, setmyStatus } from '../helpers/GlobalState';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import i18n from 'i18n-js';

const statusColor = [
    '#7dc656',
    '#7dc656',
    '#f1c056',
    '#EE6c4d',
    '#fb3640',
];

export default function HealthPage(props) {
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
    const [modalVisible, setModalVisible] = useState(false);
    const [myState] = useGlobalState('myStatus');
    const [mykey] = useGlobalState('key');
    const [uid] = useGlobalState('uid');
    const [myQR] = useGlobalState('myQRURL');
    const [loading, setLoading] = useState(false);
    async function handlePressButtonAsync(props) {
        let result = await WebBrowser.openBrowserAsync('https://www.infektionsschutz.de/coronavirus');

    };
    async function updateState(state) {
        setLoading(true)
        console.log(uid, mykey, state)
        axios.post('https://seb-vs-virus-api.herokuapp.com/status', {
            uid: uid,
            key: mykey,
            status: state,
        })
            .then(async function (response) {
                console.log(response)
                try {
                    setmyStatus(state);
                    await AsyncStorage.setItem('@infectiontrackerFinalSTATE', state.toString());
                    setLoading(false)
                    props.navigation.navigate('Home')

                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            })
            .catch(function (error) {
                setLoading(false)
            })
    }

    async function handleStateChange(state) {
        if (state === 4) {
            setModalVisible(true)
            return
        }

        if (state > 1) {
            Alert.alert(
                'Achtung!',
                'Bist du dir sicher, dass du deinen Status ändern willst?\n\nSei dir bewusst, dass die Änderung zur Information deiner Kontakte verwendet wird. Diese werden ggf. drastische Maßnahmen zum Selbst- und Fremdschutz einleiten. Wir wollen unserer Gesellschaft helfen und nicht Schaden.\n\nDanke für dein Verständnis.',
                [
                    { text: 'Ich bin mir sicher', onPress: () => updateState(state) },
                    {
                        text: 'Abbrechen',
                        style: 'cancel',
                    },
                ],
                { cancelable: true }
            );

        } else {
            updateState(state)
        }

    };

    return (
        <View>
            <Header></Header>
            <Spinner
                visible={loading}
                overlayColor="rgba(0,0,0,0.7)"
                size="large"
            />
            <ScrollView>
                <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 20 }}>
                        <View style={{ borderColor: '#7dc656', backgroundColor: '#383838', borderWidth: 4, borderRadius: 20, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="ios-person" size={35} color="white" />
                        </View>
                        <Text style={{ textAlign: 'left', fontWeight: '600', padding: 20, fontSize: 16 }}>{i18n.t('healtState') /*Dein Gesundheitszustand*/}</Text>

                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'left', fontWeight: '300', fontSize: 14, paddingLeft: 20, paddingRight: 20 }}>{i18n.t('reportState') /*Bitte berichte uns sofort, sobald etwas an deinem Zustand ändert. Alle Kontakte der letzten zwei Wochen werden anonym informiert. Niemand wird deine Identität erfahren.*/}
                        </Text>

                        <TouchableOpacity style={{
                            marginTop: 20,
                            width: '95%', borderWidth: 1, borderColor: myState === 0 ? '#000000' : '#d6d6d6', height: 60, alignItems: 'center', justifyContent: 'flex-start', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 1,
                            flexDirection: 'row'
                        }}
                            onPress={() => handleStateChange(0)}
                        >
                            <View style={{ marginLeft: 20, marginRight: 20, borderColor: statusColor[0], backgroundColor: statusColor[0], borderWidth: 4, borderRadius: 13, height: 26, width: 26, justifyContent: 'center', alignItems: 'center' }}>

                            </View>
                            <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>{statusString[0]}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: 5,
                            width: '95%', borderWidth: 1, borderColor: myState === 1 ? '#000000' : '#d6d6d6', height: 60, alignItems: 'center', justifyContent: 'flex-start', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 1,
                            flexDirection: 'row'
                        }} onPress={() => handleStateChange(1)}
                        >
                            <View style={{ marginLeft: 20, marginRight: 20, borderColor: statusColor[1], backgroundColor: statusColor[1], borderWidth: 4, borderRadius: 13, height: 26, width: 26, justifyContent: 'center', alignItems: 'center' }}>

                            </View>
                            <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>{statusString[1]}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            marginTop: 5,
                            width: '95%', borderWidth: 1, borderColor: myState === 2 ? '#000000' : '#d6d6d6', height: 60, alignItems: 'center', justifyContent: 'flex-start', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 1,
                            flexDirection: 'row'
                        }} onPress={() => handleStateChange(2)}
                        >
                            <View style={{ marginLeft: 20, marginRight: 20, borderColor: statusColor[2], backgroundColor: statusColor[2], borderWidth: 4, borderRadius: 13, height: 26, width: 26, justifyContent: 'center', alignItems: 'center' }}>

                            </View>
                            <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>{statusString[2]}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            marginTop: 5,
                            width: '95%', borderWidth: 1, borderColor: myState === 3 ? '#000000' : '#d6d6d6', height: 60, alignItems: 'center', justifyContent: 'flex-start', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 1,
                            flexDirection: 'row'
                        }} onPress={() => handleStateChange(3)}
                        >
                            <View style={{ marginLeft: 20, marginRight: 20, borderColor: statusColor[3], backgroundColor: statusColor[3], borderWidth: 4, borderRadius: 13, height: 26, width: 26, justifyContent: 'center', alignItems: 'center' }}>

                            </View>
                            <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>{statusString[3]}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            marginTop: 5,
                            width: '95%', borderWidth: 1, borderColor: myState === 4 ? '#000000' : '#d6d6d6', height: 60, alignItems: 'center', justifyContent: 'flex-start', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 1,
                            flexDirection: 'row'
                        }} onPress={() => handleStateChange(4)}
                        >
                            <View style={{ marginLeft: 20, marginRight: 20, borderColor: statusColor[4], backgroundColor: statusColor[4], borderWidth: 4, borderRadius: 13, height: 26, width: 26, justifyContent: 'center', alignItems: 'center' }}>

                            </View>
                            <Text style={{ textAlign: 'left', fontWeight: '500', padding: 2 }}>{statusString[4]}</Text>

                        </TouchableOpacity>


                        <Text style={{ textAlign: 'left', fontWeight: '300', fontSize: 14, padding: 20 }}>
                            {i18n.t('symptoms-intro') /*Häufigste Symptome bei Corona-Infektion*/}:{'\n'}
                        - {i18n.t('symptoms-cough') /*Husten*/} 55%{'\n'}
                        - {i18n.t('symptoms-fever') /*Fieber*/} 39%{'\n'}
                        - {i18n.t('symptoms-cold') /*Schnupfen*/} 28%{'\n'}
                        - {i18n.t('symptoms-throat') /*Halsschmerzen*/} 23%{'\n'}
                            {'\n'}
                            {i18n.t('symptoms-yes') /*Wenn du Symptome aufweist, ruf bitte deinen Hausarzt an oder wende dich bei Dringlichkeit an die Notfallnummer 116 117. Bei schwerwiegenden Symptomen wie Atemnot, ruf den Rettungsdient (112).*/}
                            {'\n'}{'\n'}
                            {i18n.t('symptoms-infos') /*Weitere Infos findest du hier*/}:  www.infektionsschutz.de/coronavirus



                    </Text>


                    </View>


                </View>

            </ScrollView>


            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {

                }}

            >
                <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>


                    <Text style={{
                        fontSize: 22,
                        fontWeight: "600",
                        padding: 20,
                        color: '#fb3640',
                        textAlign: 'center'
                    }}>Der Nachweis von Corona kann nur von offiziellen Stellen erfolgen.{'\n\n'} <Text style={{
                        fontSize: 22,
                        fontWeight: "300",
                        padding: 20,
                        color: '#000000',
                        textAlign: 'center'
                    }}>Zeige den Verantwortlichen diesen Code, um deine Kontakte schnellstmöglich zu informieren!</Text></Text>
                    < QRCode content={myQR} codeStyle='dot' logo={require('../assets/images/logo.png')} size={200, 200} logoSize={50} />




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


            </Modal >
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
                    height: 60, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20,
                    position: 'absolute',

                    bottom: 0, left: 0

                }}
                onPress={() => props.navigation.navigate('Home')}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: "600",

                    color: '#ffffff', //
                }}>{i18n.t('app-back') /*Zurück*/}</Text>
            </TouchableOpacity>
        </View >
    )

}

const styles = StyleSheet.create({})
