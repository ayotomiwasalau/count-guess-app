import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import Colors from '../constant/colors';


const ButtonComp = (props) => {

    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21){
        ButtonComponent = TouchableNativeFeedback
    }

    return (
        <View style={styles.buttonContainer}>
        <ButtonComponent onPress={props.pressButton}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonText: {},
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25
    }
});

export default ButtonComp;