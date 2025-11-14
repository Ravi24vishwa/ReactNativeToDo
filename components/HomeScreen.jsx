import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image } from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StackActions, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await getAuth().signOut();
      console.log('User signed out');
      alert('google sign out');
      navigation.dispatch(StackActions.replace('Login'))
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Home!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Text>Email: {getAuth().currentUser.email}</Text>
      <Image 
        source={{uri: getAuth().currentUser.photoURL}}
        style={styles.profileimage}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  profileimage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  }
})
