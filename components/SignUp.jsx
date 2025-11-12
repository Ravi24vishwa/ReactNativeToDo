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
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';

async function onGoogleButtonPress() {
  try {
    // 1️⃣ Start Google sign-in process
    const { idToken } = await GoogleSignin.signIn();

    // 2️⃣ Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // 3️⃣ Sign-in (or sign-up) the user with Firebase
    const userCredential = await auth().signInWithCredential(googleCredential);

    // 4️⃣ Handle result
    console.log('User signed in with Google:', userCredential.user);
    Alert.alert('Welcome!', userCredential.user.displayName);
  } catch (error) {
    console.error('Google sign-in error:', error);
    Alert.alert('Error', error.message);
  }
}

GoogleSignin.configure({
  webClientId: '585858648557-nqkc1k0n8fq38b3us6ojl3e29p927vv8.apps.googleusercontent.com'
})

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const [message, setmessage] = useState("")

  const navigation = useNavigation();
  const handleSignUp = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const UserLoginData = await getAuth().createUserWithEmailAndPassword(email, password);
        console.log(`this is userlogindata before : ${UserLoginData}`)

        await getAuth().currentUser.sendEmailVerification();

        await getAuth().signOut();

        alert('Please verify your email')
        navigation.dispatch(
          StackActions.replace('Login')
        )
      }
      else {
        alert('Enter details please')
      }
    } catch (err) {
      console.log(err)
      setmessage(err.message)
      console.log(message)
    }
  }
  const HandleExistingAccount = () => {
    navigation.dispatch(
      StackActions.replace('Login')
    )
  }
  const GoogleLoginFn = () => {
    onGoogleButtonPress()
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
              style={styles.SignUpButton}
              accessibilityLabel="Login Button"
              activeOpacity={0.7}
              onPress={() => (handleSignUp())}
            >
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.LoginRedirectButton}
              accessibilityLabel="SignUp Button"
              activeOpacity={0.7}
              onPress={() => (HandleExistingAccount())}>
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
  SignUpButton: {
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
  },
  LoginRedirectButton: {
    //  backgroundColor: '#e63946',
    width: '80%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  GoogleLoginButton: {
    backgroundColor: '#e63946',
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
  }
});
