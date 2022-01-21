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

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log("issign? = ", isSignedIn, "test ada data = ", userData);
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
      <Button title='Sign Out' onPress={SignOutAccount}></Button>
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
