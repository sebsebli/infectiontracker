// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import Header from '../components/Header'
export default class ImprintPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView>
                    <View style={{ flex: 1, height: '100%', alignItems: 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            padding: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>Impressum</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",
                            paddingRight: 20,
                            paddingLeft: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>Diese App wurde innerhalb von 48h im Rahmen des  <Text style={{

                            fontWeight: "600",

                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>#WIRVSVIRUS-Hackathons</Text> entwickelt und unterstützt alle notwendigen Funktionen der
                        des anvisierten Ziels. Wir haben weiterhin vielzählige Ideen, wie wir die App erweitern können. Wir wünschen uns Kooperationen und hoffen
                        die App bald im Praxisgebrauch zu sehen, damit wir die Corona-Krise bestmöglich überstehen können.
                    </Text>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",
                            paddingTop: 20,
                            paddingRight: 20,
                            paddingLeft: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>This app was developed within 48h as part of the  <Text style={{

                            fontWeight: "600",

                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>#WIRVSVIRUS-Hackathons</Text> and supports all necessary functions of
                        of the intended target. We still have a lot of ideas how to extend the app. We are looking for cooperations and hope
                        to see the app in practical use soon, so that we can get through the Corona crisis in the best possible way.
                    </Text>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            padding: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>Unser Team</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",
                            paddingRight: 20,
                            paddingLeft: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>
                            - Sebastian Lindner (Ideengeber/Frontend){'\n'}
                        - Kai Raschke (Backend){'\n'}
                        - Fabian Glück (Designer){'\n'}
                        - Tim Eberhardt (Organisation u. Ideen){'\n'}
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            padding: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>Kooperation</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",
                            paddingRight: 20,
                            paddingLeft: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>
                            Kontaktieren Sie uns bei Bedarf unter sebastian@lindner.me
                    </Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            padding: 20,
                            color: '#000000',
                            alignSelf: 'flex-start'

                        }}>License: CC BY-NC-SA 4.0</Text>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
