// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import Header from '../components/Header'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';
export default class TutorialPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView>
                    <View style={{ flex: 1, height: '100%', alignItems: 'flex-start', width: '90%' }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            padding: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>{i18n.t('drawerTutorial') /*So funktioniert's*/}:</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",
                            padding: 20,
                            paddingTop: 0,
                            color: '#000000',

                        }}><Text style={{
                            fontSize: 16,
                            fontWeight: "600",

                            color: '#000000',

                        }}>Scan starten</Text> Kontakte über euren <Text style={{
                            fontSize: 16,
                            fontWeight: "600",

                            color: '#000000',

                        }}>Gesundheitszustand</Text> informieren, damit wir gemeinsam die Ausbreitung des Corona-Virus reduzieren können.</Text>



                        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', }}>
                            <View style={{ width: '80%', flexDirection: 'row' }}>
                                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{

                                        height: 50,
                                        width: 50,
                                        backgroundColor: '#EE6C4D',
                                        borderRadius: 25,

                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'flex-start',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.15,
                                        shadowRadius: 3.84,

                                    }}>

                                        <FontAwesome name="qrcode" size={25} color="white" />
                                    </View>

                                </View>
                                <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        marginLeft: -15,
                                        color: '#000000',
                                        textAlign: 'left'

                                    }}>Scan starten</Text>

                                </View>

                            </View>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{

                                        borderColor: '#7dc656', backgroundColor: '#383838', borderWidth: 4, borderRadius: 20, height: 40, width: 40,

                                        justifyContent: 'center',
                                        alignItems: 'center',


                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.15,
                                        shadowRadius: 3.84,

                                    }}>


                                        <Ionicons name="ios-person" size={35} color="white" />
                                    </View>

                                </View>
                                <View style={{ width: '70%', height: 100, alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: "400",
                                        color: '#000000',
                                        padding: 0,


                                    }}><Text style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        color: '#000000',

                                    }}>{i18n.t('healtState') /*Dein Gesundheitszustand*/}:</Text>{'\n'}Ändere ihn, um deine Kontakte zu informieren.</Text>

                                </View>

                            </View>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{

                                        borderColor: '#7dc656', backgroundColor: '#383838', borderWidth: 4, borderRadius: 20, height: 40, width: 40,

                                        justifyContent: 'center',
                                        alignItems: 'center',

                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.15,
                                        shadowRadius: 3.84,

                                    }}>


                                        <FontAwesome name="bell" size={20} color="white" />
                                    </View>

                                </View>
                                <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: "400",
                                        padding: 0,
                                        color: '#000000',

                                    }}><Text style={{
                                        fontSize: 16,
                                        fontWeight: "600",

                                        color: '#000000',

                                    }}>{i18n.t('app-your-env') /*Dein Umfeld*/}:</Text>{'\n'}Hier kannst du nachvollziehen, ob eine der Personen, mit denen du innerhalb der letzen 2 Wochen Kontakt hattest, Corona-Symptome aufweist oder bereits positiv auf Corona getestet wurde.</Text>


                                </View>

                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', paddingTop: 30 }}>
                                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{

                                        borderColor: '#293241', backgroundColor: '#293241', borderWidth: 4, borderRadius: 20, height: 40, width: 40,

                                        justifyContent: 'center',
                                        alignItems: 'center',

                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.15,
                                        shadowRadius: 3.84,

                                    }}>

                                        <Ionicons name="ios-people" size={35} color="white" />



                                    </View>

                                </View>
                                <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: "400",
                                        padding: 0,
                                        color: '#000000',

                                    }}><Text style={{
                                        fontSize: 16,
                                        fontWeight: "600",

                                        color: '#000000',

                                    }}>Veranstaltung mit mehreren Personen:</Text>{'\n'}Für Veranstaltunge mit mehreren Personen erstellst du einfach einen Gruppen-Code. Alle Personen, die den Code scannen oder eingeben, werden miteinander vernetzt und im Falle einer Infektion informiert.</Text>


                                </View>

                            </View>
                        </View>



                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
