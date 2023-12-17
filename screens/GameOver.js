import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import defaultStyles from '../constant/default-styles';
import ButtonComp from '../components/ButtonComp';

const GameOver = props => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useState(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
          }
      
        const listen3 = Dimensions.addEventListener('change', updateLayout)
    
        return () => {
            listen3.remove()
        }
    })
    return (
        <ScrollView>
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>
                Game Over!
            </Text>
            <View style={{...styles.imageContainer, ...{
                width: availableDeviceWidth * 0.7,
                height: availableDeviceWidth * 0.7,
                borderRadius: availableDeviceWidth * 0.7 / 2,
                marginVertical: availableDeviceHeight / 30
            }}}>
            <Image
                //source={require('../assets/end-page.png')}
                fadeDuration={300}
                source={{uri: 'https://cdn.dribbble.com/users/465131/screenshots/8347338/media/fd367794e26c979327f8f54e8a2f3c42.jpg?compress=1&resize=400x300'}}
                style={styles.image}
                resizedMode="contain"
            />
            </View>
            <View style={{...styles.textContainer, ...{marginVertical: availableDeviceHeight / 60}}}>
                <BodyText style={{...styles.bodyTextContainer, ...{fontSize: availableDeviceHeight < 900 ? 13 : 15}}}> 
                    Machine needed <Text style={styles.textDesign}>{props.roundsNumber}</Text> rounds to guess your number <Text style={styles.textDesign}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <ButtonComp pressButton={props.onRestart}> NEW GAME</ButtonComp>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    imageContainer: {
        // width: Dimensions.get('window').width * 0.7,
        // height: Dimensions.get('window').width * 0.7,
        // borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        //marginVertical: Dimensions.get('window').height / 30

    },
    image: {
        width: '100%',
        height: '100%',
    },
    textDesign: {
        color: 'red'
    },
    textContainer: {
        //width: '80%',
        marginHorizontal: 30,
        //marginVertical: Dimensions.get('window').height / 60
    },
    bodyTextContainer: {
        textAlign: 'center',
        //fontSize: Dimensions.get('window').height < 900 ? 13 : 15
    }
})

export default GameOver;