import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../Components/BackHeader';
import {FONTS, COLORS, SIZE} from '../Theme';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, setDataUpdate, setUserName, setUserImage, setUserToken, setUserEmail} from '../redux/action';
import User from '../Image/Svg/user';
import API from '../api/ReadWorldUrl';




const Login = ({navigation}) => {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const {loading, dataUpdate} = useSelector(state => state.userReducers)
const dispatch = useDispatch();


const [Email, setEmail] = useState("");
const [Password, setPassword] = useState("");
const [ErrorMes, setErrorMes] = useState({});

storeEmailData = async (Email) => {
    try {
      await AsyncStorage.setItem('@storage_useremail', Email)
      dispatch(setUserEmail(Email))
      console.log("Email " + Email)
    } catch (e) {
        console.log(e)
    }
  }

  storeTokenData = async (Token) => {
    try {
      await AsyncStorage.setItem('@storage_usertoken', Token)
      dispatch(setUserToken(Token))
      console.log("Token " + Token)
    } catch (e) {
        console.log(e)
    }
  }

  storeImageData = async (Image) => {
    try {
      await AsyncStorage.setItem('@storage_userimage', Image)
      dispatch(setUserImage(Image))
      console.log("Image " + Image)
    } catch (e) {
        console.log(e)
    }
  }

  storeUserNameData = async (UserName) => {
    try {
      await AsyncStorage.setItem('@storage_username', UserName)
      dispatch(setUserName(UserName))
      console.log("UserName " + UserName)
    } catch (e) {
        console.log(e)
    }
  }

function LoginSubmit() {
    API.post('users/login',{
        "user": {
            "email": Email,
            "password": Password
        }
    })
    .then(function (response) {
        dispatch(setLoading(true))
        storeEmailData(response.data.user.email)
        storeTokenData(response.data.user.token)
        storeImageData(response.data.user.image)
        storeUserNameData(response.data.user.username)
        dispatch(setDataUpdate(!dataUpdate))
        return [
            navigation.navigate("HomeScreen"),
        ]
        dispatch(setLoading(false))
    })
   .catch(function (error) {
     console.log(error)
     setErrorMes(error.response.data.errors);
   })
}

    return (
        <SafeAreaView style={{backgroundColor:COLORS.white ,height:windowHeight}}>
        <BackHeader goToHome={true}/>
        <View style={{marginTop:50, alignItems: 'center', justifyContent: 'center', }}>
            <User/>
            <Text style={{fontSize:24,fontWeight:'800' }}>Welcome Back</Text>
            <Text style={{...FONTS.content}}>Sign to continue</Text>
            <TextInput placeholder="EMAIL" onChangeText={setEmail} style={{marginTop:40, marginBottom:10, padding:10, borderWidth:1, borderColor:COLORS.green, borderRadius:5, width: windowWidth-80, ...FONTS.body }}/>
            <TextInput secureTextEntry={true} placeholder="PASSWORD" onChangeText={setPassword} style={{padding:10, borderWidth:1, borderColor:COLORS.green, borderRadius:5, width: windowWidth-80, ...FONTS.body }}/>
            {
               ErrorMes === "" 
               ? null
               :            
               <View style={{marginTop:10}}>
                {Object.keys(ErrorMes).map((keyName, i, name ) => (
                <Text style={{color:'red',}}>{(name[i]).toUpperCase()}: {ErrorMes[keyName]}</Text>
                ))}
                </View>
            }
            <TouchableOpacity onPress={() => LoginSubmit()} style={{marginTop:30, padding:8, backgroundColor:COLORS.green, borderColor:COLORS.green, borderWidth:1, borderRadius:5, width:windowWidth-80,}}>
                <Text style={{...FONTS.title, textAlign:'center', color:COLORS.white,}}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={{marginTop:10, ...FONTS.body, color:COLORS.green, marginBottom:10}}>Need an account?</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )

}

export default Login