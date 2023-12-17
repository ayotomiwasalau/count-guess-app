import React, {useState, useRef, useEffect} from 'react';
import { Button, StyleSheet, Text, View, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import defaultStyles from '../constant/default-styles';
import ButtonComp from '../components/ButtonComp';
import { Ionicons, AntDesign } from '@expo/vector-icons'
import BodyText from '../components/BodyText';
//import { ScreenOrientation } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation'

function generateRandNum(min, max, exclude){

  min = Math.ceil(min);
  max = Math.floor(max)
  //Generate a random number
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  if (randNum === exclude){
    return generateRandNum(min, max, exclude)
  } else {
    return randNum
  }
};

// const renderList = (value, numOfRounds) => (
//   <View key={value} style={styles.listItem}>
//     <BodyText>#{numOfRounds}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// );

const renderListItem = (listLength, itemData) => (
  
  <View style={styles.listItem}>
    <BodyText>{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

function GameScreen(props) {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  const initialGuess = generateRandNum(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuess, setPastGuess] = useState([initialGuess.toString()])
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
  const [rounds, setRounds] = useState(0)
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  console.log('i',currentGuess, userChoice)

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    }

    const listen2 = Dimensions.addEventListener('change', updateLayout)

    return () => {
      listen2.remove()
    }
  })

  // useEffect(() => {
  //   console.log('yes')
  //   if (currentGuess === userChoice) {
  //     console.log('yessy')
  //     onGameOver(rounds);
  //   }
  // }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    //console.log('j',currentGuess, userChoice);
    if (parseInt(currentGuess) === parseInt(userChoice)) {
      console.log('yessy')
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const guessAgainHandler = direction => {
    console.log(direction)
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ){
      Alert.alert('nigga dont lie to me', 'That is wrong motherf*cker', [{text: 'Nah gee', style: 'cancel'}]);
      return;
    }
  
    if (direction === 'lower'){
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }

    const nextGuess = generateRandNum(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextGuess);
    setPastGuess(curPastGuess => [nextGuess.toString(), ...curPastGuess])
    //setRounds(curRounds => curRounds + 1);
    //console.log(currentGuess, userChoice)
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig
  }

  if (availableDeviceHeight < 500) {
    return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      
      <View style={styles.control}>
        <ButtonComp pressButton={guessAgainHandler.bind(this, 'lower')}>
         <Ionicons name="md-remove" size={24} color="white"/> 
        </ButtonComp>
        <NumberContainer>{currentGuess}</NumberContainer>
        <ButtonComp pressButton={guessAgainHandler.bind(this, 'greater')}>
          <AntDesign name="plus" size={24} color="white" /> 
        </ButtonComp>
        </View>

      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) => (
            renderList(guess, pastGuess.length - index)
          ))}
        </ScrollView> */}
        <FlatList 
          keyExtractor={(item) => item} 
          data={pastGuess} 
          renderItem={renderListItem.bind(this, pastGuess.length)}
          contentContainerStyle={styles.list}
          />
      </View>
      
    </View>
    );

  }

    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={{...styles.buttonContainer, ...{marginTop: availableDeviceHeight > 600 ? 10 : 15}}}>
        {/* <Card style={styles.buttonContainer}> */}
          <ButtonComp pressButton={guessAgainHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white"/> 
          </ButtonComp>
          <ButtonComp pressButton={guessAgainHandler.bind(this, 'greater')}>
            <AntDesign name="plus" size={24} color="white" /> 
          </ButtonComp>
        </Card>

        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {pastGuess.map((guess, index) => (
              renderList(guess, pastGuess.length - index)
            ))}
          </ScrollView> */}
          <FlatList 
            keyExtractor={(item) => item} 
            data={pastGuess} 
            renderItem={renderListItem.bind(this, pastGuess.length)}
            contentContainerStyle={styles.list}
            />
        </View>
        
      </View>

    );
  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingVertical: 10
    //justifyContent: 'center'
  }, 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //marginTop: Dimensions.get("window").height > 600 ? 10 : 15,
    width: 350,
    maxWidth: '90%',
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1, 
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  listContainer: {
    width: '60%',
    flex: 1
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

export default GameScreen;