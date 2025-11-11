import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
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
import { useNavigation } from '@react-navigation/native';


const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [message, setmessage] = useState("")

  const navigation = useNavigation();
  const handleSignUp = async() => {
    try {
      if(email.length > 0 && password.length > 0){

        // console.log(`email => ${email} and password => ${password}`)
        
        const UserLoginData = await createUserWithEmailAndPassword(getAuth(), email, password);
        // console.log(UserLoginData)
      }
      else{
        alert('Enter details please')
      }
    } catch (err) {
      console.log(err)
      setmessage(err.message)
      console.log(message)
    }
  }
  const HandleExistingAccount = () => {
    navigation.navigate("Login")
  } 
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Sign Up</Text>

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
              onPress={() => (handleSignUp())}
            >
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.SignUpButton}
              accessibilityLabel="SignUp Button"
              activeOpacity={0.7}
              onPress={() => (HandleExistingAccount())}
            >
              <Text style={styles.ExistingText}>Already Have account ? Login Here</Text>
            </TouchableOpacity>
            <Text>{message}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
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
  ExistingText: {
    color: 'blue'
  }
});
