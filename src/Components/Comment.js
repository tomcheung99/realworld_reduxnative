import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import Rubbish from '../Image/Svg/rubbish'
import {useSelector, useDispatch} from 'react-redux';
import {setCommentDataUpdate} from '../redux/action';
import API from '../api/ReadWorldUrl'



const Comment = ({id, comment, image, username, createdAt}) => {
    const {userName, articleSlug, userToken, commentDataUpdate} = useSelector(state => state.userReducers)
    const dispatch = useDispatch()
    const headers = { 'Content-Type': 'application/json', 'Authorization':"Token " + userToken }

    function DeleteComment () {
        API.delete('articles/' + articleSlug + "/comments/" + id,{headers: headers})
        .then(function (response) {
            dispatch(setCommentDataUpdate(!commentDataUpdate))
            console.log(response)            
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure delete this comment ?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => DeleteComment() }
      ]
    );


    return(
        <View style={{margin:20, marginBottom:10, borderWidth:1, borderColor:COLORS.lightgray2, borderRadius:3}}>
            <View style={{ padding:20,}}>
                <Text>{comment}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between' , padding:8, borderBottomRadius:10, backgroundColor:'#F5F5F5', borderColor:COLORS.lightgray2, borderTopWidth:1 }}>
               <View style={{flexDirection:'row', alignItems:'center',}}> 
               <Image style={{width:20, height:20, borderRadius:20/2 }} source={{ uri: image}}/>
                <Text style={{color:COLORS.green, marginLeft:8}}>{username}</Text>
                <Text style={{marginLeft:5, color:COLORS.lightgray2, ...FONTS.small}}>{createdAt.replace(/T/, ' ').slice(0, createdAt.length - 8)}</Text>
               </View>
               {
                   userName === username
                   ?
                   <TouchableOpacity onPress={() => createTwoButtonAlert()}>
                       <Rubbish/>
                   </TouchableOpacity>
                   :
                   null
               }
            </View>
        </View>
    )
}

export default Comment