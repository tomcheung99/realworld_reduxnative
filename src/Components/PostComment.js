import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import InputScrollView from 'react-native-input-scroll-view';
import API from '../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import {setCommentDataUpdate} from '../redux/action';


const PostComment = () => {
const [PostCommentContentData, setPostCommentContentData] = useState("");
const [Loading, setLoading] = useState(false);
const {userToken, articleSlug, commentDataUpdate} = useSelector(state => state.userReducers)
const dispatch = useDispatch()


function PostCommentContent() {
    setLoading(true)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization':"Token " + userToken
    }
    const postData = {
        "comment": {
           "body": PostCommentContentData
        }
    }
    API.post('articles/'+articleSlug+"/comments", postData, {headers: headers})
    .then(function (response) {
        return [
        dispatch(setCommentDataUpdate(!commentDataUpdate)),
        console.log(response),
        setPostCommentContentData(""),
        setLoading(false)
        ];
    })
    .catch(function (error) {
        console.log(error);
    })
}



    return(
        <View style={{margin:20, marginBottom:10, borderWidth:1, borderColor:COLORS.lightgray2, borderRadius:3}}>
            <View style={{ padding:20,}}>
                 <TextInput onChangeText={(value) => setPostCommentContentData(value)} multiline={true} numberOfLines={10} placeholder="Write a comment..." style={{height:40, textAlignVertical: 'top'}}/>
            </View>
            <View style={{alignItems:'flex-end', padding:8, borderBottomRadius:10, backgroundColor:'#F5F5F5', borderColor:COLORS.lightgray2, borderTopWidth:1,  }}>
                <TouchableOpacity onPress={() => PostCommentContent()} style={{ backgroundColor:COLORS.green, padding:5, paddingLeft:10, paddingRight:10, borderRadius:5}}>
                    {
                        Loading
                        ?
                        <ActivityIndicator color="#ffffff"/>
                        :
                        <Text style={{fontWeight:'700', color:COLORS.white}}>Post Comment</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostComment