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
export default class ResetPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#293241" barStyle="light-content" />
                <Header />
                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/icon.png')} style={{ height: 200, width: 200 }}></Image>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "400",
                        padding: 20,
                        color: '#000000',
                        textAlign: 'center'
                    }}>{i18n.t('app-reset-unsupported') /*Zukünftige App-Versionen ermöglichen das Wiederherstellen eines Accounts über einen Wiederherstellungs-Code*/}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
