// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import { createGlobalState } from 'react-hooks-global-state';
import { AsyncStorage } from 'react-native';

const persistenceKey = '@InfectionTracker:AppState'
const blankState = {
    uid: 0,
    key: 0,
    myStatus: 0,
    contactStatus: 0,
    contactCount: 0,
    gid: 0,
    sex: 0,
    age: 0,
    myQRURL: '',
    pushID: ''
}
let initialState = ''
const getStateFromStorage = async () => {

    try {
        initialState = await JSON.parse(AsyncStorage.getItem(persistenceKey)) || blankState;
    } catch (error) {
        initialState = blankState;
    }
}
getStateFromStorage()
console.log(initialState)

const { setGlobalState, useGlobalState } = createGlobalState(initialState);


const _storeData = async () => {
    try {
        console.log("STORED", blankState)
        let persistObj = {}
        Object.keys(blankState).forEach(function (key) {
            [key] = useGlobalState(key.toString())
            console.log(key)

            persistObj.push({ key: useGlobalState(key.toString()) })

        })
        console.log("STORED", persistObj)
        //  await AsyncStorage.setItem(persistenceKey, 'I like to save it.');
    } catch (error) {
        // Error saving data
    }
};
_storeData()

export const setMYQR = (s) => {
    setGlobalState('myQRURL', s);
};
export const setSex = (s) => {
    setGlobalState('sex', s);
};

export const setAge = (s) => {
    setGlobalState('age', s);
};
export const setUID = (s) => {
    setGlobalState('uid', s);

};
export const setKEY = (s) => {
    setGlobalState('key', s);
};

export const setcontactStatus = (s) => {
    setGlobalState('contactStatus', s);
};
export const setmyStatus = (s) => {
    setGlobalState('myStatus', s);
};

export const setcontactCount = (s) => {
    setGlobalState('contactCount', s);
};
export const setgid = (s) => {
    setGlobalState('gid', s);
};
export { useGlobalState };