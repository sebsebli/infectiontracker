// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    uid: 0,
    key: 0,
    myStatus: 0,
    contactStatus: 0,
    contactCount: 0,
    gid: 0,
    sex: 0,
    age: 0,
    myQRURL: ''
});
export const setMYQR= (s) => {
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