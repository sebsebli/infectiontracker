// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar } from 'react-native'
import Header from '../components/Header'
export default class ImprintPage extends Component {
    render() {
        return (
            <View>
                <StatusBar backgroundColor="#293241" barStyle="light-content" />
                <Header />
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
