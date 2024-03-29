import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/startGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from './screens/GameOver';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
};

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    //setGuessRounds(0)
  };

  const gameOverHandler = noOfRounds => {
    setGuessRounds(noOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if (userNumber && guessRounds <= 0) {
    console.log('that right')
    
    content = (<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>);
  } else if (guessRounds > 0){
    console.log('yes')
    content = (<GameOver roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>);
  }

  return (
    <SafeAreaView style={styles.screen}>
    {/* <View style={styles.screen}> */}

      <Header title="Guess the title"/>
      {content}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }

  
});
