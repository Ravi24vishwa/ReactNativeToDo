import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth } from '@react-native-firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';


const SplashScreen = () => {
    const [IsLogin, setIsLogin] = useState(false)

    const navigation = useNavigation();

    getAuth().onAuthStateChanged((userdata) => {
        if (userdata !== null) {
            setIsLogin(true)
            console.log(userdata);
        }
    })

    useEffect(() => {
      setTimeout(() => {
          getAuth().onAuthStateChanged((userdata) => {
             const routeName  = userdata ? 'Home' : 'Login';
             navigation.dispatch(
                StackActions.replace(routeName)
                );
            })
      }, 300);
      return () => {}
    }, [])
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text> SplashScreen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})