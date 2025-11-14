import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';

const Login = () => {
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("")
   const [message, setmessage] = useState("")
 
   const navigation = useNavigation();

   const handlLogin = async() => {
     try {
      if(email.length > 0 && password.length > 0){
        
        const UserLoginData = await getAuth().signInWithEmailAndPassword(email, password);
        console.log(UserLoginData)
        
        if(UserLoginData.user.emailVerified){
          alert('You are verified')
          navigation.dispatch(StackActions.replace('Home'));
        }
        else{
          await getAuth().currentUser.sendEmailVerification()
          await getAuth().signOut();
          alert('please check your inbox to verify')
        }
        // navigation.navigate("Home", {
        //  user: UserLoginData.user.email,
        //  uid: UserLoginData.user.uid
        // })
        // console.log(UserLoginData)
      }
      else{
        alert('Please enter details')
      }
     } catch (err) {
      //  console.log(err)
       setmessage(err.message)
       console.log(message)
     }
   }

   const HandleSignUp = async() => {
    navigation.dispatch(StackActions.replace('SignUp'))
   }
   return (
     <SafeAreaView style={styles.safeArea}>
       <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}
       >
         <ScrollView contentContainerStyle={styles.scrollContainer}>
           <Text style={styles.header}>Login</Text>
 
           <View style={styles.inputContainer}>
             <TextInput
               style={styles.inputField}
               placeholder="Email"
               keyboardType="email-address"
               autoCapitalize="none"
               autoCorrect={false}
               value={email}
               onChangeText={value => (setemail(value))}
             />
             <TextInput
               style={styles.inputField}
               placeholder="Password"
               secureTextEntry
               value={password}
               onChangeText={value => (setpassword(value))}
             />
             <TouchableOpacity
               style={styles.loginButton}
               accessibilityLabel="Login Button"
               activeOpacity={0.7}
               onPress={() => (handlLogin())}
             >
               <Text style={styles.loginText}>Login</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.SignUpButton}
               accessibilityLabel="SignUp Button"
               activeOpacity={0.7}
               onPress={() => (HandleSignUp())}
             >
               <Text style={styles.SignUp}>New User ?</Text>
             </TouchableOpacity>
             <Text>{message}</Text>
            </View>
         </ScrollView>
       </KeyboardAvoidingView>
     </SafeAreaView>
   );
}

export default Login

const styles = StyleSheet.create({  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  inputField: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  loginButton: {
    backgroundColor: '#e63946',
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  SignUp: {
    color: 'blue'
  },
});