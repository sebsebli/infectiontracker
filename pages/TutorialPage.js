// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, Image } from 'react-native'
import Header from '../components/Header'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
export default class TutorialPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#293241" barStyle="light-content" />
                <Header />
                <View style={{ flex: 1, height: '100%', alignItems: 'center', width: '90%' }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        padding: 20,
                        color: '#000000',
                        alignSelf: 'flex-start'

                    }}>So funktioniert's:</Text>
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

                    }}>Scann starten</Text> oder informiert eure Kontakte über euren <Text style={{
                        fontSize: 16,
                        fontWeight: "600",

                        color: '#000000',

                    }}>Gesundheitszustand</Text>, damit wir gemeinsam die Ausbreitung des Corona-Virus reduzieren können.</Text>



                    <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', }}>
                        <View style={{ width: '80%', flexDirection: 'row' }}>
                            <View style={{ width: '30%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
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
                            <View style={{ width: '70%', height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
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
                            <View style={{ width: '30%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
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

                                }}>Dein Gesundheitszustand:</Text>{'\n'}Ändere ihn, um deine Kontakte zu informieren.</Text>

                            </View>

                        </View>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <View style={{ width: '30%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
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
                            <View style={{ width: '70%', height: 100, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "400",
                                    padding: 0,
                                    color: '#000000',

                                }}><Text style={{
                                    fontSize: 16,
                                    fontWeight: "600",

                                    color: '#000000',

                                }}>Dein Umfeld:</Text>{'\n'}Hier kannst du nachvollziehen, ob eine der Personen, mit denen du innerhalb der letzen 2 Wochen Kontakt hattest, Corona-Symptome aufweist oder bereits positiv auf Corona getestet wurde.</Text>


                            </View>

                        </View>
                    </View>



                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({})
