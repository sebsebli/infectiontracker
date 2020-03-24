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
import t from 'tcomb-form-native';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: '#000000',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // the style applied when a validation error occours
        error: {
            color: '#EE6c4d',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}
const User = t.struct({
    Vorname: t.String,
    Nachname: t.String,
    Straße: t.String,
    Hausnummer: t.Number,
    Postleitzahl: t.maybe(t.String),
    Stadt: t.String,
    Telefonnummer: t.Number,
    terms: t.Boolean
});
const options = {
    fields: {
        Vorname: {
            error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        Nachname: {
            error: 'Choose something you use on a dozen other sites or something you won\'t remember'
        },
        Straße: {
            error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        Hausnummer: {
            error: 'Choose something you use on a dozen other sites or something you won\'t remember'
        },
        Postleitzahl: {
            error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        Stadt: {
            error: 'Choose something you use on a dozen other sites or something you won\'t remember'
        },
        Telefonnummer: {
            error: 'Choose something you use on a dozen other sites or something you won\'t remember'
        },
        terms: {
            label: 'Ich stimme der Datenverarbeitung durch die zuständige Behörde zu',
        },
    },
    stylesheet: formStyles,
};

export default ReportModal = (props) => {
    const hide = props.hide;


    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={() => {

            }}
        >


            <View style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', padding: 20, marginTop: 40 }}>
                <ScrollView>
                    <View style={{ marginBottom: 50, color: '#000000' }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "400",

                            color: '#000000'
                        }}>
                            Bitte gib deine Kontakt-Daten an, damit du von den Behörden über weitere Schritte informiert werden kannst.
                            </Text>

                        <Text style={{
                            fontSize: 14,
                            fontWeight: "400",
                            paddingTop: 20,
                            color: '#ababab'
                        }}>
                            Alternativ kannst du dich bei Fragen oder zur persönlichen Registrierung unter der Telefonnummer 123-456-6 melden.
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "400",
                            paddingTop: 20,
                            color: '#f1c056',
                            marginBottom: 30
                        }}>
                            Hinweis: Die Daten müssen für jeden bestätigten Fall neu abgeschickt werden. Nur so bleibt Ihre Identität und Ihr Kontaktverlauf anonym.
                        </Text>
                        <Form
                            style={{ color: '#000000' }}
                            type={User}
                            options={options}
                        />
                    </View>
                </ScrollView>


            </View>


            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                flexDirection: 'row'
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#EE6c4d',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                        height: 80, width: '50%', alignItems: 'center', justifyContent: 'center', marginTop: 20,
                        left: 0

                    }}
                    onPress={() => hide()}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "600",

                        color: '#ffffff', //
                    }}>{i18n.t('app-back') /*Zurück*/}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#7dc656',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                        height: 80, width: '50%', alignItems: 'center', justifyContent: 'center', marginTop: 20,
                        right: 0

                    }}
                    onPress={() => Alert.alert(i18n.t('app-not-supported')) /*Dieses Feature wird noch nicht unterstützt.*/}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "600",

                        color: '#ffffff', //
                    }}>Absenden</Text>
                </TouchableOpacity>
            </View>
        </Modal >

    )

}

