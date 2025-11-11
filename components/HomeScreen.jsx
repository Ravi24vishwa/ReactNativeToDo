import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
// import { useRoute } from '@react-navigation/native'
import {getAuth} from '@react-native-firebase/auth'
import { useNavigation, StackActions } from '@react-navigation/native'


const HomeScreen = () => {
    // const routes = useRoute().params
    // const {user, uid} = routes
   
    // console.log(user)

    const navigation = useNavigation();
  return (
    <View style={styles.container} >
      <Text>HomeScreen</Text>
      <Text> email : {getAuth().currentUser.email}</Text>

      <TouchableOpacity style={styles.LogoutButton} onPress={ async() => {
        await getAuth().signOut()
        // navigation.navigate('Login')
        navigation.dispatch(StackActions.replace('Login'))
      }}>
        <Text> Logout </Text>
      </TouchableOpacity>
    </View >
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center', 
        alignItems:'center',
        // flexDirection: 'row'
    },
    LogoutButton:{
        backgroundColor: '#dfe6e9',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: 40,
        gap: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    cardcontainer:{
        backgroundColor: '#b2bec3',
        // flexDirection: 'row',
        gap: 5,
    },
    individualcard:{
        width: 180,
        height: 200,
        backgroundColor: '#a29bfe',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    twoInOnecard: {
        backgroundColor: '#6c5ce7',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})