// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomePage from '../pages/HomePage';
import ResetPage from '../pages/ResetPage';
import TutorialPage from '../pages/TutorialPage';
import ImprintPage from '../pages/ImprintPage';
import CustomDrawer from '../components/CustomDrawer';
import HealthPage from '../pages/HealthPage';



const DrawerNavigator = createDrawerNavigator({
    Home: HomePage,
    Reset: ResetPage,
    Tutorial: TutorialPage,
    Imprint: ImprintPage,
    Health: HealthPage,

}, { contentComponent: CustomDrawer });

export default DrawerNavigator;