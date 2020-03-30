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

import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, StatusBar, TouchableOpacity, View, Modal, Image, Alert, ScrollView } from 'react-native'

import { QRCode } from 'react-native-custom-qr-codes-expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Linking } from 'expo'
import i18n from 'i18n-js';

export default GroupsModal = (props) => {
    const hide = props.hide;


    let infectData = Linking.makeUrl('INFECTIONTRACKERQR', { uid: props.groups.gid, type: 'group' });
    console.log(props.groups)
    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={() => {

            }}

        >
            <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>


                <Text style={{
                    fontSize: 14,
                    fontWeight: "400",
                    padding: 20,
                    color: '#ababab'
                }}>Neuer Gruppen-Code:</Text>
                <QRCode content={infectData} codeStyle='dot' logo={require('../assets/images/logo.png')} size={250, 250} logoSize={100} />

                <Text style={{
                    fontSize: 40,
                    fontWeight: "400",
                    padding: 20,
                    color: '#000000',
                    textAlign: 'center',
                    letterSpacing: 20,
                }}>{props.groups.shortcode}</Text>

                <Text style={{
                    fontSize: 20,
                    fontWeight: "400",
                    padding: 20,
                    color: '#000000',
                    textAlign: 'center',

                }}>Hinweis: Gruppen-Codes bleiben 24h aktiv. Wenn du das Fenster schließt, wird dein Code gelöscht. Bitte notiere dir den Code, falls du ihn innerhalb von 24h noch mal verwenden möchtest.</Text>
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
                        height: 80, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20,
                        position: 'absolute',
                        bottom: 0, left: 0

                    }}
                    onPress={() => hide()}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "600",

                        color: '#ffffff', //
                    }}>{i18n.t('app-back') /*Zurück*/}</Text>
                </TouchableOpacity>

            </View>


        </Modal >

    )

}

const styles = StyleSheet.create({
    FABStyle: {
        height: 70,
        width: 70,
        backgroundColor: '#EE6C4D',
        borderRadius: 35,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    }
})
