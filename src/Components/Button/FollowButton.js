import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {FONTS, COLORS, SIZE} from '../../Theme';
import AddIcon from '../../Image/Svg/add';
import AddWhiteIcon from '../../Image/Svg/addWhite';
import API from '../../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import {setDataUpdate, setCommentDataUpdate} from '../../redux/action';


function FollowClickedButton ({following, username}) {
    const {userToken, commentDataUpdate } = useSelector(state => state.userReducers)
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false)

    function DeleteFollow() {
        setLoading(!Loading)
        const headers = { 'Content-Type': 'application/json', 'Authorization':"Token " + userToken }
        API.delete('profiles/' + username + "/follow", {headers: headers})
        .then(function (response) {
            return [
                dispatch(setCommentDataUpdate(!commentDataUpdate)),
                console.log(response),
                console.log("UnFollowed"),
            ]
            setLoading(!Loading)
        })
        .catch(function (error) {
          setLoading(!Loading);
          console.log(error.response.data);
        })
    }

    return(
        <>
            {
                Loading
                ?
                <View style={{marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.lightgray2, borderRadius:3 }}>
                    <ActivityIndicator color='#bbbbbb'/>
                </View>
                :
                <TouchableOpacity onPress={()=>DeleteFollow()} style={{backgroundColor:COLORS.lightgray2, marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.lightgray2, borderRadius:3 }}>
                <AddWhiteIcon/>
                <Text style={{...FONTS.content, fontWeight:'400', color:COLORS.white, paddingLeft:3}}>Unfollow</Text>
                </TouchableOpacity>
            }
        </>

    )
}

function FollowUnClickedButton ({following, username}) {
    const {userToken, commentDataUpdate } = useSelector(state => state.userReducers)
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false)

    function PostFollow() {
        setLoading(!Loading)
        const headers = { 'Content-Type': 'application/json', 'Content-Type': 'text/plain', 'Authorization':"Token " + userToken }
        API.post('profiles/' + username + "/follow", '',{ headers: headers })
        .then(function (response) {
            return [
                dispatch(setCommentDataUpdate(!commentDataUpdate)),
                console.log(response.data),
                console.log("Followed"),
            ]
            setLoading(!Loading)
        })
        .catch(function (error) {
          setLoading(!Loading);
          console.log(error);
        })
    }

    return(
        <>
        {   Loading
            ?
            <View style={{marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.lightgray2, borderRadius:3 }}>
                <ActivityIndicator color='#bbbbbb'/>
            </View>
            :
            <TouchableOpacity onPress={() => PostFollow()} style={{marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.lightgray2, borderRadius:3 }}>
                <AddIcon/>
                <Text style={{...FONTS.content, fontWeight:'400',  color:COLORS.lightgray2, paddingLeft:3}}>Follow</Text>
            </TouchableOpacity>
        }

        </>
    )
}

const FollowButton = ({following, username }) => {
    return (
        <>
            {
                following
                ? <FollowClickedButton following={following} username={username}/>
                : <FollowUnClickedButton following={following} username={username}/>
            }
        </>
    )
}


export default FollowButton