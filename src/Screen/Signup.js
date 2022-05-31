import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../Components/BackHeader';
import {FONTS, COLORS, SIZE} from '../Theme';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, setUserName, setUserEmail, setUserImage, setUserToken} from '../redux/action';
import User from '../Image/Svg/user';
import API from '../api/ReadWorldUrl';


const Signup = ({navigation}) => {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const {userName, userEmail, userImage, userToken, loading} = useSelector(state => state.userReducers)
const dispatch = useDispatch();

const [UserName, setUserName] = useState("");
const [Email, setEmail] = useState("");
const [Password, setPassword] = useState("");
const [ShowError, setShowError] = useState(false);
const [ErrorMes, setErrorMes] = useState({});




function SignUpSubmit() {
    API.post('users',{
        "user": {
            "username": UserName,
            "email": Email,
            "password": Password
        }
    })
    .then(function (response) {
        dispatch(setLoading(true))
        return [
            // console.log(response.data.user),
            // console.log(response.data.user.username),
            navigation.navigate("LoginScreen")
        ]
        dispatch(setLoading(false))
    })
    .catch(function (error) {
        setErrorMes(error.response.data.errors);
        console.log(ErrorMes)
   })
}



    return (
        <SafeAreaView style={{backgroundColor:COLORS.white ,height:windowHeight}}>
        <BackHeader goToHome={true}/>
        <View style={{marginTop:50, alignItems: 'center', justifyContent: 'center', }}>
            <User/>
            <Text style={{fontSize:24,fontWeight:'800' }}>Welcome </Text>
            <Text style={{...FONTS.content}}>Create account to continue</Text>
            <TextInput onChangeText={setUserName} placeholder="USERNAME" style={{marginTop:40, marginBottom:10, padding:10, borderWidth:1, borderColor:COLORS.green, borderRadius:5, width: windowWidth-80, ...FONTS.body }}/>
            <TextInput onChangeText={setEmail} placeholder="EMAIL" style={{marginBottom:10, padding:10, borderWidth:1, borderColor:COLORS.green, borderRadius:5, width: windowWidth-80, ...FONTS.body }}/>
            <TextInput secureTextEntry={true} onChangeText={setPassword} placeholder="PASSWORD" style={{padding:10, borderWidth:1, borderColor:COLORS.green, borderRadius:5, width: windowWidth-80, ...FONTS.body }}/>
            {
               ErrorMes === "" 
               ? null
               :            
               <View style={{marginTop:10}}>
                {Object.keys(ErrorMes).map((keyName, i, name ) => (
                <Text style={{color:'red',}}>{(name[i]).toUpperCase()} {ErrorMes[keyName]}</Text>
                ))}
                </View>
            }

            
            <TouchableOpacity onPress={() => SignUpSubmit()} style={{marginTop:30, padding:8, backgroundColor:COLORS.green, borderColor:COLORS.green, borderWidth:1, borderRadius:5, width:windowWidth-80,}}>
                <Text style={{...FONTS.title, textAlign:'center', color:COLORS.white,}}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{marginTop:10, ...FONTS.body, color:COLORS.green, marginBottom:10}}>Have an account?</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )

}

export default Signup