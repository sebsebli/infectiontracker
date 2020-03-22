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
export default class TutorialPage extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#293241" barStyle="light-content" />
                <Header />
                <View style={{ flex: 1, height: '100%', paddingTop:20,justifyContent: 'center' }}>
                    <Image source={require('../assets/icon.png')} style={{ height: 200, width: 200 }}></Image>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "400",
                        padding: 20,
                        color: '#000000',
                        textAlign: 'center'
                    }}>Zukünftige App-Versionen ermöglichen das Wiederherstellen eines Accounts über einen Wiederherstellungs-Code</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
