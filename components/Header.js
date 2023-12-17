import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Colors from "../constant/colors";


function Header (props) {

    return (
        // <View style={styles.header}>
        <View style={{...styles.header, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View> 
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        //backgroundColor: Platform.OS === 'ios' ? Colors.accent : 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerIOS: {
        backgroundColor: 'white'
    },
    headerAndroid: {
        backgroundColor: Colors.accent,

    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
    }

  
});

export default Header;