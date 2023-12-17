import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from "../components/Card"
import Colors from "../constant/colors"
import Input from "../components/Input"
import NumberContainer from "../components/NumberContainer"
import BodyText from "../components/BodyText"
import ButtonComp from '../components/ButtonComp';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNum, setSelectedNum] = useState();
    const [buttonWidth, setButtonWidth] = useState( Dimensions.get("window").width / 4);


    useEffect(() => {
        const updatelayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }
    
        const listen = Dimensions.addEventListener('change', updatelayout);
        return () => {
            listen.remove()
        }
    })

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmHandler = () => {
        const choosenNumber = parseInt(enteredValue);
        if (isNaN(choosenNumber)|| choosenNumber<=0 || choosenNumber>99){
            Alert.alert(
                'Invalid Number',
                'Number must be between 0 & 99',
                [{text: 'Okay', style: "default", onPress: resetHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNum(enteredValue);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmOutput;

    if (confirmed) {
        confirmOutput = (
        <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer children={selectedNum}/>
            <ButtonComp pressButton={() => {props.onStartGame(selectedNum)}}>
                START GAME
            </ButtonComp>
        </Card>
        );
    }

    return (
        <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
        <View style={styles.screen}>
            <Text style={styles.title}>The Game Screen</Text>
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input style={styles.input} blurOnSubmit keyboardType="number-pad" autoCorrect={false} autoCapitalize="none" maxLength={2} onChangeText={numberInputHandler} value={enteredValue}/>
                <View style={styles.buttonContainer}> 
                    <View style={{width: buttonWidth}}><Button title="Reset" onPress={resetHandler} color={Colors.primary}/></View>
                    <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmHandler} color={Colors.accent}/></View>
                </View>
            </Card>
            {confirmOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width:  '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row', 
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     //width: 90
    //     width: Dimensions.get("window").width / 4
    // },
    input: {
        width: 70,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
