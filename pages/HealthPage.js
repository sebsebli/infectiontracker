// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, StatusBar, TouchableOpacity, View, AsyncStorage } from 'react-native'
import Header from '../components/Header'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as WebBrowser from 'expo-web-browser';
import { useGlobalState, setmyStatus } from '../helpers/GlobalState';

import i18n from 'i18n-js';

const statusColor = [
    '#7dc656',
    '#7dc656',
    '#f1c056',
    '#EE6c4d',
    '#fb3640',
];

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
  i18n.t('status-01'),
  i18n.t('status-02'),
  i18n.t('status-03'),
  i18n.t('status-04'),
  i18n.t('status-05'),
];

export default function HealthPage(props) {

    const [myState] = useGlobalState('myStatus');
    const [mykey] = useGlobalState('key');
    const [uid] = useGlobalState('uid');
    const [loading, setLoading] = useState(false);
    async function handlePressButtonAsync(props) {
        let result = await WebBrowser.openBrowserAsync('https://www.infektionsschutz.de/coronavirus');

    };

    async function handleStateChange(state) {
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
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#293241" barStyle="light-content" />
            <Header></Header>
            <Spinner
                visible={loading}
                overlayColor="rgba(0,0,0,0.7)"
                size="large"
            />
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 20 }}>
                    <View style={{ borderColor: '#7dc656', backgroundColor: '#383838', borderWidth: 4, borderRadius: 20, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="ios-person" size={35} color="white" />
                    </View>
                    <Text style={{ textAlign: 'left', fontWeight: '600', padding: 20, fontSize: 16 }}>Dein Gesundheitszustand</Text>

                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'left', fontWeight: '300', fontSize: 14, paddingLeft: 20, paddingRight: 20 }}>Bitte berichte uns sofort, sobald etwas an deinem Zustand ändert. Alle Kontakte der letzten zwei Wochen werden anonym informiert. Niemand wird deine Identität erfahren.
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
                        häufigste Symptome bei Corona-Infektion:{'\n'}
                        - Husten 55%{'\n'}
                        - Fieber 39%{'\n'}
                        - Schnupfen 28%{'\n'}
                        - Halsschmerzen 23%{'\n'}
                        {'\n'}
                        Wenn du Symptome aufweist, ruf bitte deinen Hausarzt an oder wende dich bei Dringlichkeit an die Notfallnummer 116 117. Bei schwerwiegenden Symptomen wie Atemnot, ruf den Rettungsdient (112).
                        {'\n'}{'\n'}
                        Weitere Infos findest du hier:{'\n'}
                        <TouchableOpacity onPress={() => handlePressButtonAsync()}>
                            <Text style={{ textAlign: 'left', fontWeight: '300', fontSize: 14, padding: 20 }}>www.infektionsschutz.de/coronavirus</Text>
                        </TouchableOpacity>
                    </Text>


                </View>


            </View>
        </View >
    )

}

const styles = StyleSheet.create({})
