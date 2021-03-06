// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DrawerNavigator from './DrawerNavigator';
export default createAppContainer(
    createSwitchNavigator({
        Main: DrawerNavigator,

    })
);