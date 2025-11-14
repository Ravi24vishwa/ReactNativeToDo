// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StackActions, useNavigation } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth'; // ✅ Correct Firebase Auth import
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// // ✅ Configure Google Sign-In
// GoogleSignin.configure({
//   webClientId:
//     '585858648557-nqkc1k0n8fq38b3us6ojl3e29p927vv8.apps.googleusercontent.com',
// });

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigation = useNavigation();

//   // ✅ Email Sign-Up Flow
//   const handleSignUp = async () => {
//     try {
//       if (!email || !password) {
//         Alert.alert('Missing Info', 'Please enter both email and password.');
//         return;
//       }

//       // 1️⃣ Create user with Firebase
//       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//       console.log('User created:', userCredential.user.email);

//       // 2️⃣ Send email verification
//       await userCredential.user.sendEmailVerification();

//       // 3️⃣ Sign out so they must verify before next login
//       await auth().signOut();

//       Alert.alert(
//         'Verification Email Sent',
//         'Please verify your email before logging in.'
//       );

//       // 4️⃣ Navigate to login
//       navigation.dispatch(StackActions.replace('Login'));
//     } catch (err) {
//       console.error('Signup Error:', err);
//       setMessage(err.message);
//     }
//   };

//   // ✅ Existing account redirect
//   const handleExistingAccount = () => {
//     navigation.dispatch(StackActions.replace('Login'));
//   };

//   // ✅ Google Login Flow
//   // const handleGoogleLogin = async () => {
//   //   try {
//   //     // 1️⃣ Get user’s ID token from Google
//   //     const { idToken } = await GoogleSignin.signIn();

//   //     // 2️⃣ Create Firebase credential
//   //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   //     // 3️⃣ Sign in with Firebase using the credential
//   //     const userCredential = await auth().signInWithCredential(googleCredential);

//   //     console.log('Google User:', userCredential.user);
//   //     Alert.alert('Welcome!', `Hello ${userCredential.user.displayName}`);
//   //   } catch (error) {
//   //     console.error('Google sign-in error:', error);
//   //     Alert.alert('Error', error.message);
//   //   }
//   // };
//   const handleGoogleLogin = async () => {
//   try {
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }); // ✅ Ensure Google Play services available

//     // 1️⃣ Start sign-in process
//     const userInfo = await GoogleSignin.signIn();

//     if (!userInfo.idToken) {
//       throw new Error('Google Sign-In failed: no idToken returned');
//     }

//     // 2️⃣ Create Firebase credential
//     const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

//     // 3️⃣ Sign in with Firebase
//     const userCredential = await auth().signInWithCredential(googleCredential);

//     console.log('✅ Google User Signed In:', userCredential.user);
//     Alert.alert('Welcome', `Hello ${userCredential.user.displayName || 'User'}`);
//   } catch (error) {
//     console.error('❌ Google sign-in error:', error);
//     Alert.alert('Error', error?.message || 'Google Sign-In failed.');
//   }
// };


//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <Text style={styles.header}>Sign Up</Text>

//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.inputField}
//               placeholder="Email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={email}
//               onChangeText={setEmail}
//             />

//             <TextInput
//               style={styles.inputField}
//               placeholder="Password"
//               secureTextEntry
//               value={password}
//               onChangeText={setPassword}
//             />

//             <TouchableOpacity
//               style={styles.signUpButton}
//               activeOpacity={0.7}
//               onPress={handleSignUp}
//             >
//               <Text style={styles.loginText}>Sign Up</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.loginRedirectButton}
//               activeOpacity={0.7}
//               onPress={handleExistingAccount}
//             >
//               <Text style={styles.existingText}>
//                 Already have an account? Login here
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.googleLoginButton}
//               activeOpacity={0.7}
//               onPress={handleGoogleLogin}
//             >
//               <Text style={styles.loginText}>Google Login</Text>
//             </TouchableOpacity>

//             {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     alignItems: 'center',
//     gap: 10,
//   },
//   inputField: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     width: '80%',
//   },
//   signUpButton: {
//     backgroundColor: '#e63946',
//     width: '80%',
//     height: 45,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: 25,
//   },
//   loginText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   existingText: {
//     color: 'blue',
//   },
//   loginRedirectButton: {
//     width: '80%',
//     height: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   googleLoginButton: {
//     backgroundColor: '#4285F4',
//     width: '60%',
//     height: 45,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: 25,
//   },
// });
//-----------------------------------------------------------------------------------------------------------------------------
// import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import auth from '@react-native-firebase/auth'; // ✅ import default
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// // ✅ Configure Google Signin (should be done once, preferably in App.js)
// GoogleSignin.configure({
//   webClientId: '585858648557-nqkc1k0n8fq38b3us6ojl3e29p927vv8.apps.googleusercontent.com',
// });

// async function onGoogleButtonPress() {
//   try {
//     // 1️⃣ Ensure Google Play Services available
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//     // 2️⃣ Get user’s ID token
//     const signInResult = await GoogleSignin.signIn();
//     const idToken = signInResult?.data?.idToken || signInResult?.idToken;

//     if (!idToken) throw new Error('No ID token found');

//     // 3️⃣ Create credential using Firebase Auth provider
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // 4️⃣ Sign in with Firebase
//     const userCredential = await auth().signInWithCredential(googleCredential);

//     console.log('✅ Signed in with Google:', userCredential.user.email);
//     return userCredential;
//   } catch (error) {
//     console.error('❌ Google sign-in error:', error);
//   }
// }

// const SignUp = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>SignUp</Text>
//       <Button
//         title="Google Sign-In"
//         onPress={() => onGoogleButtonPress()}
//       />
//     </View>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 10,
//   },
// });

//-----------------------------------------------------------------------------------------------------------------------------
// import { StyleSheet, Text, View, Button } from 'react-native'
// import React from 'react'
// import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '585858648557-nqkc1k0n8fq38b3us6ojl3e29p927vv8.apps.googleusercontent.com',
// });

// async function onGoogleButtonPress() {
//   // Check if your device supports Google Play
//   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//   // Get the users ID token
//   const signInResult = await GoogleSignin.signIn();

//   // Try the new style of google-sign in result, from v13+ of that module
//   idToken = signInResult.data?.idToken;
//   if (!idToken) {
//     // if you are using older versions of google-signin, try old style result
//     idToken = signInResult.idToken;
//   }
//   if (!idToken) {
//     throw new Error('No ID token found');
//   }

//   // Create a Google credential with the token
//   const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);

//   // Sign-in the user with the credential
//   return signInWithCredential(getAuth(), googleCredential);
// }

// const SignUp = () => {

//   return (
//     <View>
//       <Text>SignUp</Text>
//       <Button
//       title="Google Sign-In"
//       onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
//     />
//     </View>
//   )
// }

// export default SignUp

// const styles = StyleSheet.create({})
//============================================================================================================================
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import auth, { getAuth } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { StackActions, useNavigation } from '@react-navigation/native';

// ✅ We already configure GoogleSignin in App.js (no need here again)

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setname] = useState(null);
  const navigation = useNavigation();

  // ✅ Google Sign-in handler
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Force logout before signing in again (avoid old sessions)
      await GoogleSignin.signOut();


      const userInfo = await GoogleSignin.signIn();
      console.log('🔹 Google sign-in result:', userInfo);

      // Check if idToken exists
      const idToken = userInfo.data.idToken;
      if (!idToken) throw new Error('No ID token found from Google');

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      console.log('✅ Signed in Firebase as:', userCredential.user.email);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!email || !password || !name) {
        Alert.alert('Missing Info', 'Please enter name, email and password.');
        return;
      }

      // 1️⃣ Create user with Firebase
      const userCredential = await getAuth().createUserWithEmailAndPassword(email, password);

      const userdata = {
        id: userCredential.user.uid,
        name: name,
        email: email
      }
      await firestore().collection('users').doc(userCredential.user.uid).set(userdata);

      console.log('User created:', userCredential.user.email);

      // 2️⃣ Send email verification
      await userCredential.user.sendEmailVerification();

      // 3️⃣ Sign out so they must verify before next login
      
      Alert.alert(
        'Verification Email Sent',
        'Please verify your email before logging in.'
      );
      await getAuth().signOut();

      // 4️⃣ Navigate to login
      navigation.dispatch(StackActions.replace('Login'));
    } catch (err) {
      console.error('Signup Error:', err);
      setMessage(err.message);
      console.log(message)
    }
  };

  const handleExistingAccount = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Name"
        keyboardType="default"
        autoCapitalize="none"
        value={name}
        onChangeText={setname}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.signUpButton}
        activeOpacity={0.7}
        onPress={handleSignUp}
      >
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginRedirectButton}
        activeOpacity={0.7}
        onPress={handleExistingAccount}
      >
        <Text style={styles.existingText}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
      <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  inputField: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  signUpButton: {
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
});