import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth'

const PhoneVerifyScreen = () => {
  const [mobileNumber, setmobileNumber] = useState("")
  const [OtpInput, setOtpInput] = useState("")
  const [ConfirmData, setConfirmData] = useState("")

  const sendOtp = async() => {
    try {
      const mobile = "+91"+mobileNumber
      const response = await getAuth().signInWithPhoneNumber(mobile)

      setConfirmData(response)
      console.log(response)

      alert("OTP sent on your mobile number")
    } catch (error) {
      console.log(error)
    }
  }
  const submitOtp = async() => {
    try {
      const response = await ConfirmData.confrim(OtpInput);
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center', gap: 7,}}>

      <TextInput style={{borderWidth: 1, width: '70%', padding: 15}} 
      placeholder='Enter Mobile Number'
      onChangeText={value => setmobileNumber(value)}
      keyboardType='numeric'/>
      <Button title='Send OTP' onPress={() => sendOtp()}/>

      <TextInput style={{borderWidth: 1, width: '50%',  marginTop: 25, padding: 10}} 
      placeholder='Enter OTP'
      onChangeText={value => setOtpInput(value)}/>
      <Button title='Submit' onPress={() => submitOtp()}/>
    </View>
  )
}

export default PhoneVerifyScreen

const styles = StyleSheet.create({})