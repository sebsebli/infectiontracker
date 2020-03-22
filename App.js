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
import { AsyncStorage, View, TouchableOpacity, Text, Modal, Picker, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'
i18n.fallbacks = true;
i18n.translations = {
  de: require('./assets/languages/de-DE.json')
};
i18n.defaultLocale = 'de-DE'
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;



// Check user credentials in storage 

export default function App() {
  const [userCredentials, setUserCredentials] = useState({});
  const [finished, setFinished] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState(0);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  async function register(sex, age) {
    return fetch('https://seb-vs-virus-api.herokuapp.com/register',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: age,
          sex: sex,
        }),
      })
      .then((response) => response.json())
      .then(async (responseData) => {


        console.log(responseData)
        await AsyncStorage.setItem('@infectiontrackerKEY', responseData.key);
        await AsyncStorage.setItem('@infectiontrackerUID', responseData.uid);
        setUserCredentials(responseData)
        setModalVisible(false)
        setHasData(true)



      })
      .catch(error => {
        Alert.alert(i18n.t('errorMessage'))
      });
  }



  async function getUserData() {
    const key = await AsyncStorage.getItem('@infectiontrackerKEY');
    const uid = await AsyncStorage.getItem('@infectiontrackerUID');

    console.log(key, uid)
    if ((key !== null) && (uid !== null)) {
      //USER DOES EXIST
      setUserCredentials({ key: key, uid: uid })
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
                      { label: 'männlich', value: '1' },
                      { label: 'weiblich', value: '2' },
                      { label: 'divers/sonstiges', value: '3' },

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
                onPress={() => register()}
              >

                <Text style={{
                  fontSize: 16,
                  fontWeight: "500",
                  paddingBottom: 10
                }}>{i18n.t('continue')}</Text>

              </TouchableOpacity>
            </View>


          </Modal>

          <TouchableOpacity style={{ width: '80%', height: 50, backgroundColor: '#293241', alignItems: 'center', justifyContent: 'center', margin: 10, }}
            onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>{i18n.t('homeNew')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '80%', height: 50, borderColor: '#293241', borderWidth: 2, alignItems: 'center', justifyContent: 'center', margin: 10, }}>
            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600' }}>{i18n.t('homeRestore')}</Text>
          </TouchableOpacity>
        </View >
      );
    } else {
      return (

        <AppNavigator screenProps={userCredentials} />

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

