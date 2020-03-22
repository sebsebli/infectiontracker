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
import i18n from 'i18n-js';
export default class TutorialPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#293241" barStyle="light-content" />
                <Header />
                <View style={{ flex: 1, height: '100%' }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        padding: 20,
                        color: '#000000',

                    }}>{i18n.t('drawerTutorial') /*So funktioniert's*/}:</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "400",
                        padding: 20,
                        color: '#000000',

                    }}>{i18n.t('app-tutorial-intro') /*Scannt den Code eures Kontaktes oder informiert eure Kontakte über euren Gesundheitszustand, damit wir gemeinsam die Ausbreitung des Corona-Virus reduzieren können.*/}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
