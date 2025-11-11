import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';

const ToDoApp = () => {
  const [Inputtext, setInputtext] = useState(null)
  const [text, settext] = useState('')
  const [isUpdate, setisUpdate] = useState(false)
  const [selectedcard, setselectedcard] = useState(null)

  useEffect(() => {
    getuserdata();
  }, [])

  const getuserdata = async () => {
    try {
      // const data = await firestore().collection("testing").doc("D6P2eQcENkr3YpYycIuJ").get();
      // console.log(data._data);
      // settext(data._data);

      // const reference = database().ref('/todo');
      // const snapshot = await reference.once('value'); //------ this line of code get data only once and need to refresh to reflect in app

      // const reference = database().ref('/todo');
      // reference.on("value",snapshot =>{console.log(snapshot.val());
      // settext(snapshot.val());});
      // console.log(snapshot.val())

      const reference = database().ref('/todo');
      reference.on('value', snapshot => {
        console.log(snapshot.val());
        settext(snapshot.val());
      });



    } catch (error) {
      console.log(error);
    }
  }

  const AddTaskHandler = async () => {
    try {
      if (Inputtext.length > 0) {
        const id = text.length;
        const addtext = await database().ref(`/todo/${id}`).set({
          value: Inputtext
        });
        console.log(addtext)
      }
      else {
        alert('please enter something')
      }
    } catch (error) {
      console.log(error)
    }
    setInputtext('');
  }

  const UpdateTaskHandle = async () => {
    try {
      if (Inputtext.length > 0) {
        const updatedData = await database().ref(`todo/${selectedcard}`).update({
          value: Inputtext
        })
        console.log(updatedData);
        setInputtext('');
        setisUpdate(false);
      }
      else {
        alert('please enter something')
      }
    } catch (error) { console.log(error) }
  }

  const handledcard = (cardnumber, currentcardvalue) => {
    try {
      console.log(cardnumber)
      console.log(currentcardvalue)
      setisUpdate(true)
      setselectedcard(cardnumber)
      setInputtext(currentcardvalue)

    } catch (error) { console.log(error) }
  }
  const hanldlongpress = (cardnumber, currentcardvalue) => {
    try {
      console.log(cardnumber)
      console.log(currentcardvalue)
      // setisUpdate(true)
      // setselectedcard(cardnumber)
      // setInputtext(currentcardvalue)
      Alert.alert("Alert", `Do yo want to delete : ${currentcardvalue}`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('cancel pressed')
          }
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              const response = await database().ref(`todo/${cardnumber}`).remove();
               setInputtext('');
        setisUpdate(false);
            } catch (error) {
              console.log(error)
            }
          }
        }
      ])

    } catch (error) { console.log(error) }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Header}> To-Do App</Text>
      <View>
        <TextInput style={styles.Inputbox}
          placeholder='Add To-Do'
          value={Inputtext}
          onChangeText={(value) => setInputtext(value)}
        />
        {
          !isUpdate ? (<TouchableOpacity style={styles.AddBtn} onPress={() => AddTaskHandler()}>
            <Text>ADD</Text>
          </TouchableOpacity>) :
            (<TouchableOpacity style={styles.AddBtn} onPress={() => UpdateTaskHandle()}>
              <Text>UPDATE</Text>
            </TouchableOpacity>)
        }
      </View>
      <Text style={{ fontSize: 21 }}>To-Do List</Text>
      <View style={styles.cardContainer}>
        <FlatList
          data={text}
          renderItem={(item) => {
            const indexnumber = item.index
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => (handledcard(indexnumber, item.item.value))}
                  onLongPress={() => {hanldlongpress(indexnumber, item.item.value);}}
                  >
                  <Text>{item.item.value}</Text>
                  <View style={styles.Buttons}>
                  {/* <Text style={{color: 'blue'}} onp>Edit</Text>
                  <Text style={{color: 'red'}}>Delete</Text> */}
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  )
}

const { height, width } = Dimensions.get("screen")

export default ToDoApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  Header: {
    fontSize: 30,
    marginTop: 4,
    paddingTop: 10,
  },
  Inputbox: {
    width: width - 35,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    marginVertical: 5,
  },
  AddBtn: {
    width: width - 35,
    backgroundColor: '#575fcf',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  cardContainer: {

  },
  card: {
    backgroundColor: '#d2dae2',
    padding: 10,
    width: width - 40,
    borderRadius: 10,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Buttons: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    gap: 8,
  }
})