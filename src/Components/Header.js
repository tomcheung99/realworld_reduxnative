import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setProfilesUserName, setProfilesUserImage, setProfilesUserFollow, setCheckTag} from '../redux/action'


export const UnLoginHeader = () => {
    const navigation = useNavigation();
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20, marginLeft:20, marginRight:20, marginBottom:15, }}>
            <Text style={{color:COLORS.green, fontWeight:'bold', fontSize:SIZE.header}}>Conduit</Text>
            <View style={{flexDirection:'row',}}> 
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{color:COLORS.lightgray, fontSize:SIZE.header, marginRight:15}}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={{color:COLORS.lightgray, fontSize:SIZE.header}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const LoginHeader = () => {
    const navigation = useNavigation();
    const {userName, userImage} = useSelector(state => state.userReducers)
    const dispatch = useDispatch()
    
    function myProfile(){
        dispatch(setProfilesUserName(userName))
        dispatch(setProfilesUserImage(userImage))
        navigation.navigate("ProfilesScreen")
    }

    return(
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:20, marginLeft:20, marginRight:20, marginBottom:15, }}>
            <View style={{flex:1}}>
             <Text style={{color:COLORS.lightgray2, fontWeight:'300', fontSize:SIZE.small}}>Welcome</Text>
             <TouchableOpacity onPress={() => navigation.navigate("ProfilesScreen")}>
                 <Text style={{color:COLORS.green, fontWeight:'bold', fontSize:22}}>{userName}</Text>
             </TouchableOpacity>
            </View>

            <View style={{flex:1, }}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end'}} onPress={() => myProfile()}>
                {/* <Text style={{marginRight:10 ,color:COLORS.lightgray, fontSize:SIZE.header}}>{userName}</Text> */}
                <Image style={{width:35, height:35, borderRadius:35/2 }} source={{ uri: userImage }}/>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const Header = {UnLoginHeader, LoginHeader} ;



export default Header