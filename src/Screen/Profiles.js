import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {setProfilesOpen} from '../redux/action'
import API from '../api/ReadWorldUrl'
import List from '../Components/List'
import Setting from '../Image/Svg/setting'

//Components
import BackHeader from '../Components/BackHeader'




const Profiles = ({navigation}) => {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const {profilesUserName, profilesUserImage, profilesUserFollow, userName} = useSelector(state => state.userReducers)
const dispatch = useDispatch();

    return(
        <SafeAreaView style={{height:windowHeight, backgroundColor:COLORS.white}}>
        <BackHeader/>
        <View style={{justifyContent:'center', alignItems:'center', backgroundColor:COLORS.darkwhite, padding:20}}> 
          <Image style={{width:100, height:100, borderRadius:100/2 }} source={{uri: profilesUserImage}}/>
          <Text style={{marginTop:15, ...FONTS.title, color:COLORS.black}}>{profilesUserName}</Text>
            {
                profilesUserName === userName
                ?
                <TouchableOpacity  onPress={() => navigation.navigate("SettingScreen")} style={{flexDirection:'row', alignItems:'center', marginTop:10, borderWidth:1, borderColor:COLORS.gray, padding:5, borderRadius:5}}>
                <Setting/>
                <Text style={{color:COLORS.gray, paddingLeft:5, ...FONTS.small}}>Edit Profile Settings</Text>
                </TouchableOpacity>
                :
                null
            }
        </View>
        <List name={"My Articles"} />
        </SafeAreaView>
    )
}

export default Profiles