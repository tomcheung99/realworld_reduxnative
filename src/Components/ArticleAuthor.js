import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme';
import API from '../api/ReadWorldUrl';
import {useSelector, useDispatch} from 'react-redux';
import {setProfilesUserName, setProfilesUserImage, setProfilesUserFollow, setCheckTag} from '../redux/action'


const ArticleAuthor = ({type, icon, username, createdAt, navigation}) => {
    
    const {profilesUserName, profilesUserImage, profilesUserFollow} = useSelector(state => state.userReducers)
    const dispatch = useDispatch();

    function getProfiles() {
        API.get('profiles/' + username,{})
        .then(function(response) {
            console.log(username)
            console.log(response.data.profile)
            dispatch(setProfilesUserName(response.data.profile.username))
            dispatch(setProfilesUserImage(response.data.profile.image))
            dispatch(setProfilesUserFollow(response.data.profile.following))
            dispatch(setCheckTag(""))
            return (
                navigation.navigate("ProfilesScreen")
            )
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    return(
        <View>
            {  type === "white"  ?
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image style={{width:32, height:32, borderRadius: 32/2}} source={{ uri: icon}}/>
                <View style={{marginLeft:8}}>
                    <Text style={{color:COLORS.white, fontSize:SIZE.body, fontWeight:'400'}}>{username}</Text>
                    <Text style={{color:COLORS.lightgray2, fontSize:SIZE.small, fontWeight:'400'}}>{createdAt}</Text>
                </View>
            </View>
            : 
            <TouchableOpacity onPress={() => getProfiles()}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image style={{width:30, height:30, borderRadius: 30/2}} source={{uri: icon}}/>
                <View style={{marginLeft:8}}>
                    <Text style={{ ...FONTS.body, color:COLORS.green}}>{username}</Text>
                    <Text style={{fontSize:SIZE.small, fontWeight:'400', color:COLORS.lightgray2, }}>{createdAt}</Text>
                </View>
            </View>
            </TouchableOpacity>
            }
        </View>
    )
}

export default ArticleAuthor