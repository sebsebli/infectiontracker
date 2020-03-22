// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { useState } from 'react'
import { Text, StyleSheet, View, StatusBar, Image, AsyncStorage, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import i18n from 'i18n-js';
import { Updates } from 'expo';
export default ResetPage = () => {
    /* ONLY FOR DEVELOPMENT, REMOVE IN PRODUCTION */
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(false);

    updateCounter = () => {
        console.log(counter)
        if (!timer) {
            setTimer(true)
            setTimeout(() => {

                setTimer(false)
                setCounter(0)

            }, 5000)

        } else {
            if (counter > 6) {
                AsyncStorage.clear()
                Updates.reload()
            } else {
                console.log(counter)
                setCounter(counter + 1)
            }
        }
    }
    /* ///ONLY FOR DEVELOPMENT, REMOVE IN PRODUCTION */

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => updateCounter()}>
                    <Image source={require('../assets/icon.png')} style={{ height: 200, width: 200 }}></Image>
                </TouchableOpacity>
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


const styles = StyleSheet.create({})
