// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './navigation/AppNavigator'
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { AppLoading } from 'expo';
import { AsyncStorage, View, TouchableOpacity, Text, Modal, SafeAreaView, Alert, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'
import { setUID, setKEY, setmyStatus, setgid, setSex, setAge, useGlobalState } from './helpers/GlobalState';
import Toast from 'react-native-tiny-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Constants from 'expo-constants';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
i18n.fallbacks = true;
i18n.defaultLocale = 'de-DE';
i18n.translations = {
  de: require('./assets/languages/de-DE.json'),
  en: require('./assets/languages/en-US.json'),
  es: require('./assets/languages/es-ES.json'),
  fr: require('./assets/languages/fr-FR.json'),
  it: require('./assets/languages/it-IT.json'),
  pt: require('./assets/languages/pt-PT.json'),
  ru: require('./assets/languages/ru-RU.json'),
  hi: require('./assets/languages/hi.json'),
  ar: require('./assets/languages/ar.json')
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

export default function App() {

  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [age] = useGlobalState('age');
  const [sex] = useGlobalState('sex');





  function register() {
    setLoading(true);
    axios.post('https://seb-vs-virus-api.herokuapp.com/register', {
      age: age,
      sex: sex,


    })
      .then(async function (response) {

        await AsyncStorage.setItem('@infectiontrackerFinalKEY', response.data.key);
        await AsyncStorage.setItem('@infectiontrackerFinalUID', response.data.uid);
        setKEY(response.data.key)
        setUID(response.data.uid)
        setModalVisible(false)
        setHasData(true)


        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        Toast.show('Es gab einen Fehler', {
          position: Toast.position.center,
          containerStyle: { zIndex: 99 },
        })

      });



  }



  async function getUserData() {
    const key = await AsyncStorage.getItem('@infectiontrackerFinalKEY');
    const uid = await AsyncStorage.getItem('@infectiontrackerFinalUID');
    const state = await AsyncStorage.getItem('@infectiontrackerFinalSTATE');


    if (state !== null) {
      setmyStatus(Number(state))
    }
    console.log(key, uid, state)
    if ((key !== null) && (uid !== null)) {
      //USER DOES EXIST
      setKEY(key)
      setUID(uid)
      setHasData(true)
      return
    } else {
      setHasData(false)
      return
    }

  }

  if (finished) {
    // Retrieve data from storage
    if (!hasData) {
      // User does not exist -> generate new Data or Restore
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {

              }}>
              <View style={{ flex: 1, paddingTop: 80 }}>

                <View style={{ flexDirection: 'row', padding: 20 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: "500",
                  }}>{i18n.t('welcome')}</Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: '#EE6C4D'
                  }}>{i18n.t('appName')}!</Text>
                </View>
                <Text style={{
                  fontSize: 14,
                  paddingTop: 10,
                  padding: 20,
                  color: '#293241'
                }}>{i18n.t('welcomeDesc')}!
              </Text>

                <View style={{ flexDirection: 'row', width: '100%', padding: 20 }} >
                  <View style={{ flexDirection: 'column', width: '50%', paddingRight: 30 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: "500",
                      paddingBottom: 10
                    }}>{i18n.t('welcomeAge')}</Text>

                    <RNPickerSelect
                      placeholder={{
                        label: i18n.t('noSelect'),
                        value: 0,
                      }}
                      onValueChange={(value) => setAge(value)}
                      style={{
                        iconContainer: {
                          top: 15,
                          right: 10,
                        },
                        inputIOS: {

                          fontSize: 16,
                          paddingVertical: 12,
                          paddingHorizontal: 5,
                          borderWidth: 1,
                          borderColor: 'gray',

                          color: 'black',
                          paddingRight: 30, // to ensure the text is never behind the icon
                        },
                        inputAndroid: {

                          fontSize: 16,
                          paddingHorizontal: 5,
                          paddingVertical: 8,
                          borderWidth: 0.5,
                          borderColor: 'black',

                          color: 'black',
                          paddingRight: 30, // to ensure the text is never behind the icon
                        },
                      }}
                      value={age}
                      items={[
                        { label: '0 - 9', value: '9' },
                        { label: '10 - 19', value: '19' },
                        { label: '20 - 29', value: '29' },
                        { label: '30 - 39', value: '39' },
                        { label: '40 - 49', value: '49' },
                        { label: '50 - 59', value: '59' },
                        { label: '60 - 69', value: '69' },
                        { label: '70 - 79', value: '79' },
                        { label: 'über 80', value: '80' },
                      ]}
                      Icon={() => {
                        return (
                          <Ionicons name="ios-arrow-down" size={18} color="black" />
                        );
                      }
                      }
                    />
                  </View>


                  <View style={{ flexDirection: 'column', width: '50%', paddingRight: 30 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: "500",
                      paddingBottom: 10
                    }}>{i18n.t('welcomeSex')}</Text>

                    <RNPickerSelect
                      placeholder={{
                        label: i18n.t('noSelect'),
                        value: 0,
                      }}
                      onValueChange={(value) => setSex(value)}
                      style={{
                        iconContainer: {
                          top: 15,
                          right: 10,
                        },
                        inputIOS: {

                          fontSize: 16,
                          paddingVertical: 12,
                          paddingHorizontal: 5,
                          borderWidth: 1,
                          borderColor: 'gray',

                          color: 'black',
                          paddingRight: 30, // to ensure the text is never behind the icon
                        },
                        inputAndroid: {

                          fontSize: 16,
                          paddingHorizontal: 5,
                          paddingVertical: 8,
                          borderWidth: 0.5,
                          borderColor: 'black',

                          color: 'black',
                          paddingRight: 30, // to ensure the text is never behind the icon
                        },
                      }}
                      value={sex}
                      items={[
                        { label: i18n.t('sex-m'), value: '1' },
                        { label: i18n.t('sex-f'), value: '2' },
                        { label: i18n.t('sex-d'), value: '3' },

                      ]}
                      Icon={() => {
                        return (
                          <Ionicons name="ios-arrow-down" size={18} color="black" />
                        );
                      }
                      }
                    />
                  </View>


                </View>
                <Text style={{
                  fontSize: 14,
                  paddingTop: 10,
                  padding: 20,
                  fontWeight: '600',
                  color: '#000000',
                  width: '70%'
                }}>{i18n.t('welcomeRisk')}
                </Text>
                <CheckBox
                  center
                  title={i18n.t('welcomeCheck1')}
                  containerStyle={{ backgroundColor: '#ffffff', alignItems: 'flex-start', justifyContent: 'flex-start', borderColor: '#ffffff' }}
                  textStyle={{ textAlign: 'left', fontWeight: '300', }}
                  checked={check1}
                  onPress={() => setCheck1(!check1)}
                  checkedColor='#ee6c4d'
                />
                <CheckBox
                  center
                  title={i18n.t('welcomeCheck2')}
                  checked={check2}
                  containerStyle={{ backgroundColor: '#ffffff', alignItems: 'flex-start', justifyContent: 'flex-start', borderColor: '#ffffff' }}
                  textStyle={{ textAlign: 'left', fontWeight: '300', }}
                  onPress={() => setCheck2(!check2)}
                  checkedColor='#ee6c4d'
                />
                <CheckBox
                  center
                  title={i18n.t('welcomeCheck3')}
                  checked={check3}
                  containerStyle={{ backgroundColor: '#ffffff', alignItems: 'flex-start', justifyContent: 'flex-start', borderColor: '#ffffff' }}
                  textStyle={{ textAlign: 'left', fontWeight: '300', }}
                  onPress={() => setCheck3(!check3)}
                  checkedColor='#ee6c4d'
                />
                <TouchableOpacity style={{ position: 'absolute', width: '100%', borderColor: '#ebebeb', borderWidth: 2, justifyContent: 'center', alignItems: 'center', height: 80, bottom: 0 }}
                  onPress={() => { setModalVisible(false); register(); }}
                >

                  <Text style={{
                    fontSize: 16,
                    fontWeight: "500",
                    paddingBottom: 10
                  }}>{i18n.t('continue')}</Text>

                </TouchableOpacity>
              </View>


            </Modal>
            <Image source={require('./assets/icon.png')} style={{ height: 200, width: 200 }}></Image>
            <TouchableOpacity style={{ width: '80%', height: 50, backgroundColor: '#293241', alignItems: 'center', justifyContent: 'center', margin: 10, }}
              onPress={() => setModalVisible(true)}>
              <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>{i18n.t('homeNew')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '80%', height: 50, borderColor: '#293241', borderWidth: 2, alignItems: 'center', justifyContent: 'center', margin: 10, }}

              onPress={() => Alert.alert(i18n.t('app-not-supported')) /*Dieses Feature wird noch nicht unterstützt.*/}
            >
              <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600' }}>{i18n.t('homeRestore')}</Text>
            </TouchableOpacity>
          </View>
          <Spinner
            visible={loading}
            overlayColor="rgba(0,0,0,0.7)"
            size="large"
          />
        </SafeAreaView >

      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{
            backgroundColor: "#293241",
            height: Constants.statusBarHeight,
          }} />
          <SafeAreaView style={{ flex: 1 }}>

            <AppNavigator />
          </SafeAreaView>
        </View>
      );
    }
  } else {
    return (
      <AppLoading
        startAsync={getUserData}
        onFinish={() => setFinished(true)}
        onError={console.warn}
      />
    )
  }
}

