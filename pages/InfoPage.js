// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Header from '../components/Header'
import i18n from 'i18n-js';

export default function InfoPage(props) {

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView>
                <View style={{ flex: 1, height: '100%', alignItems: 'center', }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "600",
                        padding: 20,
                        color: '#000000',
                        alignSelf: 'flex-start'

                    }}>Hier findest du Informationen zu den verschiedenen Fällen</Text>


                    <Text style={{
                        paddingTop: 10,
                        fontWeight: "600",
                        fontSize: 18,
                        color: '#000000',
                        alignSelf: 'flex-start',
                        paddingRight: 20,
                        paddingLeft: 20,

                    }}>Einer meiner Kontakte wurde positiv auf Corona getestet</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "400",
                        paddingRight: 20,
                        paddingLeft: 20,
                        color: '#000000',
                        alignSelf: 'flex-start'

                    }}>Diese Informationen werden zurzeit sorgfältig aufgearbeitet, um keine Falschinformationen zu verbreiten. Wir werden die Informationen in Kürze aktualisieren.
                    </Text>
                    <Text style={{

                        fontWeight: "600",
                        fontSize: 18,
                        color: '#000000',
                        alignSelf: 'flex-start',
                        paddingRight: 20,
                        paddingLeft: 20,
                        paddingTop: 10,
                    }}>Ich hatte Kontakt mit einer Person, die Corona-typische Symptome aufweist</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "400",
                        paddingRight: 20,
                        paddingLeft: 20,
                        color: '#000000',
                        alignSelf: 'flex-start'

                    }}>Diese Informationen werden zurzeit sorgfältig aufgearbeitet, um keine Falschinformationen zu verbreiten. Wir werden die Informationen in Kürze aktualisieren.
                        </Text>
                    <Text style={{
                        paddingTop: 10,
                        fontWeight: "600",
                        fontSize: 18,
                        color: '#000000',
                        alignSelf: 'flex-start',
                        paddingRight: 20,
                        paddingLeft: 20,

                    }}>Einer meiner Kontakte hatte Kontakt mit einer positiv getesteten Person</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "400",
                        paddingRight: 20,
                        paddingLeft: 20,
                        color: '#000000',
                        alignSelf: 'flex-start'

                    }}>Diese Informationen werden zurzeit sorgfältig aufgearbeitet, um keine Falschinformationen zu verbreiten. Wir werden die Informationen in Kürze aktualisieren.
                        </Text>

                    <Text style={{
                        paddingTop: 20,
                        fontWeight: "600",
                        fontSize: 18,
                        color: '#000000',
                        alignSelf: 'flex-start',
                        paddingRight: 20,
                        paddingLeft: 20,

                    }}>Bitte kontaktiert in der Zwischenzeit bei Fragen und insb. Symptomen eine der folgenden Nummern:</Text>

                    <Text style={{
                        paddingTop: 10,
                        fontWeight: "600",
                        fontSize: 18,
                        color: '#ee6c4d',
                        alignSelf: 'flex-start',
                        paddingRight: 20,
                        paddingLeft: 20,

                    }}>0800 011 77 22
                              <Text style={{
                            fontWeight: "300",
                            fontSize: 18,
                            color: '#ee6c4d',
                            alignSelf: 'flex-start',


                        }}> - die Nummer der unabhängigen Patientenberatung Deutschland</Text>
                    </Text>


                    <Text style={{
                        paddingTop: 10,
                        fontWeight: "600",
                        fontSize: 18,
                        color: '#ee6c4d',
                        alignSelf: 'flex-start',
                        paddingRight: 20,
                        paddingLeft: 20,

                    }}>030 346 465 100
                              <Text style={{
                            fontWeight: "300",
                            fontSize: 18,
                            color: '#ee6c4d',
                            alignSelf: 'flex-start',


                        }}> - das Bürgertelefon des Bundesministeriums für Gesundheit</Text>
                    </Text>
                    <Text style={{
                        paddingTop: 10,
                        fontWeight: "600",
                        fontSize: 18,
                        color: '#ee6c4d',
                        alignSelf: 'flex-start',
                        paddingRight: 20,
                        paddingLeft: 20,

                    }}>Behördennummer 115
                              <Text style={{
                            fontWeight: "300",
                            fontSize: 18,
                            color: '#ee6c4d',
                            alignSelf: 'flex-start',


                        }}> - Allgemeine Erstinformation und Kontaktvermittlung </Text>
                    </Text>


                </View>
            </ScrollView>
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


