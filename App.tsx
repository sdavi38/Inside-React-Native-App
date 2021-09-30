import React from 'react';
import 'react-native-gesture-handler'
import { StatusBar } from  'react-native';
import {NavigationContainer} from '@react-navigation/native'
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true}/>
      <Routes/>
    </NavigationContainer>
  );
}
