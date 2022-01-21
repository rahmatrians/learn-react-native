import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { authentication } from './firebase/config';
import { db } from './firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // console.log("issign? = ", isSignedIn, "test ada data = ", userData);
  }, [])

  const RegisterAccount = () => {
    createUserWithEmailAndPassword(authentication, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log("success");
    setUserData(userCredential.user);
  })
  .catch((error) => {
    console.log("ada error :",error.code, error.message);
  });
  }

  const SignInAccount = () => {
    signInWithEmailAndPassword(authentication, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log("success login");
    setUserData(userCredential.user);
    setIsSignedIn(true);
  })
  .catch((error) => {
        console.log("ada error :",error.code, error.message);
  });
  }

  const SignOutAccount = () => {
    setIsSignedIn(false);
  }
  
  const AddData = async () => {
        try {
      const docRef = await addDoc(collection(db, "posts"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const PostData = async () => {
    // Get a list of cities from your database
    const citiesCol = collection(db, 'posts');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
  }

  return (
    <View>
      {isSignedIn === false ? ( 
        <>
<Text>{userData.email}</Text>
      <TextInput placeholder='Email' value={email} onChangeText={tulisan=>setEmail(tulisan)}/>
          <TextInput placeholder='password'value={password} onChangeText={tulisan=>setPassword(tulisan)} secureTextEntry={true}/>
      <Button title='Sign In' onPress={SignInAccount}></Button>
        </>
        ) : (
          <>
          <Text>Hello, {userData.email}. You're logged in</Text>
      <Button title='Post Data!' onPress={PostData}></Button>
      <Button title='Add Data!' onPress={AddData}></Button>
      <Button title='Sign Out' onPress={SignOutAccount}></Button>
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
