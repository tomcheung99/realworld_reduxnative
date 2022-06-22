import React, {useState, useEffect,} from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../Components/BackHeader';
import {FONTS, COLORS, SIZE} from '../Theme';
import {useSelector, useDispatch} from 'react-redux';
import {setUserName, setUserEmail, setUserImage,  setUserBio, setUserToken, setDataUpdate} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputScrollView from 'react-native-input-scroll-view';
import User from '../Image/Svg/user';
import API from '../api/ReadWorldUrl';


const Setting = ({navigation}) => {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const {userName, userEmail, userImage, userBio, userToken, dataUpdate} = useSelector(state => state.userReducers)
const dispatch = useDispatch();

const [Loading, setLoading] = useState(false)
const [Image, setImage] = useState('');
const [Name, setName] = useState('');
const [Email, setEmail] = useState('');
const [Bio, setBio] = useState('');
const [Password, setPassword] = useState('');
const [ShowError, setShowError] = useState(false);
const [ErrorMes, setErrorMes] = useState({});

storeEmailData = async (Email) => {
    try {
      await AsyncStorage.setItem('@storage_useremail', Email)
      dispatch(setUserEmail(Email))
    } catch (e) {
        console.log(e)
    }
  }

  storeTokenData = async (Token) => {
    try {
      await AsyncStorage.setItem('@storage_usertoken', Token)
      dispatch(setUserToken(Token))
    } catch (e) {
        console.log(e)
    }
  }

  storeImageData = async (Image) => {
    try {
      await AsyncStorage.setItem('@storage_userimage', Image)
      dispatch(setUserImage(Image))
    } catch (e) {
        console.log(e)
    }
  }

  storeUserNameData = async (UserName) => {
    try {
      await AsyncStorage.setItem('@storage_username', UserName)
      dispatch(setUserName(UserName))
    } catch (e) {
        console.log(e)
    }
  }




function UpdateUserDataSubmit() {
    setLoading(true)
    const headers = { 'Content-Type': 'application/json', 'Authorization':"Token " + userToken }
    const data = {  
        "user": {
            "email": Email,
            "token": userToken,
            "username": Name,
            "bio": Bio,
            "image": Image
          }
    }
    API.put('user/' , data, {headers:headers })
    .then(function (response) {
            {
                Email === ""
                ? storeEmailData(userEmail)
                : storeEmailData(Email)
            }
            {
                Name === ""
                ? storeUserNameData(userName)
                : storeUserNameData(Name)
            }
            {
                Image === ""
                ? storeImageData(userImage)
                : storeImageData(Image);
            }
            dispatch(setDataUpdate(!dataUpdate));
            // dispatch(setProfilesUserName(Name));
            // dispatch(setProfilesUserImage(Image));
            // console.log(response.data.user),
            // console.log(response.data.user.username),
            navigation.navigate("HomeScreen")
            setLoading(false)
    })
    .catch(function (error) {
        setLoading(false)
        console.log(error)
   })
}





function Logout() {
    dispatch(setUserToken(''));
    storeEmailData('');
    storeTokenData('');
    storeImageData("https://api.realworld.io/images/smiley-cyrus.jpeg");
    storeUserNameData('');
    dispatch(setDataUpdate(!dataUpdate));
    navigation.navigate("HomeScreen");
}



    return (
        <SafeAreaView style={{backgroundColor:COLORS.white ,height:windowHeight}}>
        <BackHeader/>
        <InputScrollView keyboardOffset={115}>
        <View style={{flex:1,  marginTop:30, marginLeft:20, marginRight:20}}> 
            <Text style={{fontSize:24,fontWeight:'800', textAlign:'center' }}>Your Settings </Text>
            <Text style={{...FONTS.content, textAlign:'center', marginBottom:30}}>Setting your profile</Text>
                <TextInput onChangeText={(value) => setImage(value)} placeholder="URL of profile picture" style={{...FONTS.body, borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}>{userImage}</TextInput>
                <TextInput onChangeText={(value) => set(value)} placeholder="Username" style={{...FONTS.body, borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15 }}>{userName}</TextInput>
                <TextInput onChangeText={(value) => setBio(value)} multiline={true} numberOfLines={10} placeholder="Short bio about you" style={{...FONTS.body, height:160, textAlignVertical: 'top', borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}/>
                <TextInput onChangeText={(value) => setEmail(value)} placeholder="Email" style={{...FONTS.body, borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}>{userEmail}</TextInput>
                <TouchableOpacity onPress={() => UpdateUserDataSubmit()} style={{ borderRadius:8, alignSelf:'flex-end',backgroundColor:COLORS.green, borderWidth:1, borderColor:COLORS.green, padding:10, }}>
                    {
                        Loading
                        ? <ActivityIndicator color='#ffffff' />
                        : <Text style={{...FONTS.body, textAlign:'center', color:COLORS.white,}}>Update Setting</Text>
                    }
                </TouchableOpacity>
        </View>
        <View style={{marginTop:20, marginRight:20, marginLeft:20, borderTopWidth:1, borderColor:COLORS.lightgray2 }}>
            <TouchableOpacity onPress={()=> Logout()} style={{marginTop:20 ,borderRadius:8, alignSelf:'flex-start', borderWidth:1, borderColor:"red", padding:10, backgroundColor:COLORS.white }}>
                <Text style={{...FONTS.content, textAlign:'center', color:"red",}}>Or Click here to logout</Text>
            </TouchableOpacity>
        </View>
        </InputScrollView>
        </SafeAreaView>
    )

}

export default Setting