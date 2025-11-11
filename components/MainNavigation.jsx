// In App.js in a new project

import  React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//import screens
import SignUp from './SignUp';
import HomeScreen from './HomeScreen'
import Login from './Login'
import SplashScreen from './SplashScreen'

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
   
  return(
     <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
         }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/> 
        <Stack.Screen name="SignUp" component={SignUp} /> 
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}