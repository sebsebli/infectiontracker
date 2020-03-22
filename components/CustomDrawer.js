// InfectionTracker (c) by Sebastian Lindner
// 
// InfectionTracker is licensed under a
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-nc-sa/4.0/>.

import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, } from 'react-native'
import i18n from 'i18n-js';
import Header from './Header';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
export default class CustomDrawer extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <SafeAreaView>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, padding: 10 }}>
                            <Ionicons name="ios-home" size={18} color="black" style={styles.icon} />
                            <Text style={styles.itemStyle}>

                                {i18n.t('drawerHome')}
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <View style={styles.sidebarDivider}></View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Reset")}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, padding: 10 }}>
                            <Ionicons name="ios-settings" size={18} color="black" style={styles.icon} />
                            <Text style={styles.itemStyle}>

                                {i18n.t('drawerReset')}
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Tutorial")}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, padding: 10 }}>
                            <Ionicons name="ios-help-buoy" size={18} color="black" style={styles.icon} />
                            <Text style={styles.itemStyle}>

                                {i18n.t('drawerTutorial')}
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Imprint")}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, padding: 10 }}>
                            <Ionicons name="md-information-circle-outline" size={18} color="black" style={styles.icon} />
                            <Text style={styles.itemStyle}>

                                {i18n.t('drawerImprint')}
                            </Text>
                        </View>

                    </TouchableOpacity>
                </SafeAreaView>
            </View >
        )
    }
}

const styles = StyleSheet.create({

    sidebarDivider: {
        height: 1,
        width: "80%",
        alignSelf: "center",
        backgroundColor: "lightgray",
        marginVertical: 10
    },
    icon: {
        padding: 10,
    },
    itemStyle: {
        padding: 10,
        fontSize: 16,
        fontWeight: "500",

    }
})
