// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// withNavigation allows components to dispatch navigation actions
import { withNavigation } from 'react-navigation';

// DrawerActions is a specific type of navigation dispatcher
import { DrawerActions } from 'react-navigation-drawer';

class DrawerTrigger extends React.Component {

    render() {

        return (
            <TouchableOpacity style={styles.trigger}
                onPress={() => {
                    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                }}
            >
                <Ionicons
                    name={'md-menu'}
                    size={35}
                    color={'white'}

                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    trigger: {
        marginLeft: 27.5,
        borderRadius: 30,
        width: 60,
        height: 50,
    },

});

export default withNavigation(DrawerTrigger);