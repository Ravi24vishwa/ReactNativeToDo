// App.js (or MainNavigation.js)
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Import screens
import SignUp from './SignUp';
import HomeScreen from './HomeScreen';
import Login from './Login';
import SplashScreen from './SplashScreen';
import PhoneVerifyScreen from './PhoneVerifyScreen'
import ImageUploadScreen from './ImageUploadScreen'

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Configure Google Sign-in once
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '585858648557-nqkc1k0n8fq38b3us6ojl3e29p927vv8.apps.googleusercontent.com',
    });
  }, []);

  // ✅ Track Firebase Auth state
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  // ✅ Show SplashScreen while checking user status
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}
        //initialRouteName={user ? 'Home' : 'SplashScreen'}
      >
        
        {/* <Stack.Screen
        name="Phoneverification"
        component={PhoneVerifyScreen}
        options={{headerShown: false}}
        /> */}
        {/* Splash Screen */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImageUploadScreen"
          component={ImageUploadScreen}
          options={{ headerShown: false }}
        />

        {/* Login / SignUp */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        {/* Home (protected) */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
