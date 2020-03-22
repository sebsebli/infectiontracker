// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

// pull in from DrawerTrigger.js
import DrawerTrigger from './DrawerTrigger'

class Header extends React.Component {
    render() {
        return (

            <View style={styles.header}>
                <DrawerTrigger />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 0,
        backgroundColor: '#293241'
    }
});

export default Header;