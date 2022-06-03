import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {setUserEmail, setUserToken, setUserImage, setUserName} from './src/redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Pages
import HomeScreen from './src/Screen/Home';
import ArticleScreen from './src/Screen/Article';
import LoginScreen from './src/Screen/Login';
import SignupScreen from './src/Screen/Signup';
import ProfilesScreen from './src/Screen/Profiles';
import NewArticleScreen from './src/Screen/NewArticle';
import EditArticleScreen from './src/Screen/EditArticle'
import SettingScreen from './src/Screen/Setting';


const AppWrapper = () => {
  return(   
    <Provider store={Store}>
      <App/>
    </Provider>

  )
}

const App = () =>  {
  const Stack = createNativeStackNavigator();
  const {userEmail, userName, userToken, userImage} = useSelector(state => state.userReducers)
  const dispatch = useDispatch();

  useEffect(()=> {
    retrieveTokenData()
    retrieveUserNameData()
    retrieveImageData()
    retrieveEmailData()
  },[userToken])


  const retrieveTokenData = async () => {
    try {
      const token = await AsyncStorage.getItem('@storage_usertoken');
      if (token !== null) {
        dispatch(setUserToken(token))
        console.log(token);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const retrieveEmailData = async () => {
    try {
      const email = await AsyncStorage.getItem('@storage_useremail');
      if (email !== null) {
        dispatch(setUserEmail(email))
        console.log(email);
      }
    } catch (error) {
     console.log(error)
    }
  };



const retrieveImageData = async () => {
    try {
        const image = await AsyncStorage.getItem('@storage_userimage');
        if (image !== null) {
        dispatch(setUserImage(image))
        console.log(image);
        } else {
        dispatch(setUserImage("https://api.realworld.io/images/smiley-cyrus.jpeg"))
        console.log("No Image");
        }
    } catch (error) {
      console.log(error)
        // Error retrieving data
    }
};

const retrieveUserNameData = async () => {
    try {
        const name = await AsyncStorage.getItem('@storage_username');
        if (name !== null) {
        dispatch(setUserName(name))
        console.log(name);
        }
    } catch (error) {
      console.log(error)
        // Error retrieving data
    }
};


  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="ProfilesScreen" component={ProfilesScreen} />
            <Stack.Screen name="NewArticleScreen" component={NewArticleScreen} />
            <Stack.Screen name="EditArticleScreen" component={EditArticleScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

export default AppWrapper;