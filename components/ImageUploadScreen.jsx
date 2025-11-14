import { StyleSheet, Text, View, Button, PermissionsAndroid, Platform, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImageUploadScreen = () => {
    const [ImageUri, setImageUri] = useState("")

    //request persmission in camera
    const ReqCameraPermission = async() => {
        if(Platform.OS !== 'android') return true;

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            )
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handlecamera = async() => {
        const haspermission = await ReqCameraPermission();

        if(!haspermission){
            Alert.alert("permission require");
            return;
        }

        const result = await launchCamera({
            mediaType: 'photo',
            saveToPhotos: true,
        })

        console.log( 'this is result' ,result);
        console.log(` this is assests in result : ${result.assets}`);

        if(!result.didCancel && result.assets){
            setImageUri(result.assets[0].uri);
        }
    }

    const handlegallery = async() => {
        const result = await launchImageLibrary({
            mediaType: 'photo'
        })

        console.log(`this is library result: ${result}`)
        
        if(!result.didCancel && result.assets){
            setImageUri(result.assets[0].uri);
        }
    }

    const handlestorage = async() => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Upload Here</Text>
            <Button title='Open Camera' onPress={() => handlecamera()} />
            <Button title='Open Gallery' onPress={() => handlegallery()} />
            <Button title='Upload to Firebase' onPress={() => handlestorage()} />

         {ImageUri && (
            <Image
            source = {{uri: ImageUri}}
            style={styles.image}
            />
         )}       
        </View>
    )
}

export default ImageUploadScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    image:{
        width: 250,
        height: 250,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 15,
    }
})

// import React, { useState } from 'react';
// import { View, Button, Image, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// export default function ImageUploadScreen() {
//   const [imageUri, setImageUri] = useState(null);

//   // Ask camera permission for Android
//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );

//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   // Open camera
//   const openCamera = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "Camera permission required!");
//       return;
//     }

//     const result = await launchCamera({
//       mediaType: 'photo',
//       saveToPhotos: true,
//     });

//     if (!result.didCancel && result.assets) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   // Open Gallery
//   const openGallery = async () => {
//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//     });

//     if (!result.didCancel && result.assets) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Open Camera" onPress={openCamera} />
//       <View style={{ height: 15 }} />

//       <Button title="Open Gallery" onPress={openGallery} />

//       {imageUri && (
//         <Image
//           source={{ uri: imageUri }}
//           style={styles.image}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 250,
//     height: 250,
//     borderRadius: 10,
//     marginTop: 20,
//   },
// });
