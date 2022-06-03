import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import {FONTS, COLORS, SIZE} from '../../Theme';
import HeartGreen from '../../Image/Svg/heartGreen'
import HeartWhite from '../../Image/Svg/heartWhite'
import API from '../../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import {setDataUpdate, setCommentDataUpdate} from '../../redux/action';


function FavoriteArticleClickedButton ({favorite, slug}) {
    const {userToken, dataUpdate, commentDataUpdate } = useSelector(state => state.userReducers)
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false)

    function DeleteFavorite() {
        setLoading(!Loading)
        const headers = { 'Content-Type': 'application/json', 'Authorization':"Token " + userToken }
        API.delete('articles/' + slug + "/favorite", {headers: headers})
        .then(function (response) {
            return [
                dispatch(setDataUpdate(!dataUpdate)),
                dispatch(setCommentDataUpdate(!commentDataUpdate)),
                console.log(response),
                setLoading(!Loading),
            ]
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
                <View style={{backgroundColor:COLORS.green, marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.green, borderRadius:3 }}>
                    <ActivityIndicator color="#ffffff"/>
                </View>
                :
                <TouchableOpacity onPress={() => DeleteFavorite()} style={{backgroundColor:COLORS.green, marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.green, borderRadius:3 }}>
                    <HeartWhite/>
                    <Text style={{...FONTS.content, fontWeight:'400', color:COLORS.white, paddingLeft:3}}>{favorite}</Text>
                </TouchableOpacity>
            }
        </>
  
    )
}

function FavoriteArticleUnClickedButton ({favorite, slug}) {
    const {userToken, dataUpdate, commentDataUpdate} = useSelector(state => state.userReducers)
    const dispatch = useDispatch();


    const [Loading, setLoading] = useState(false)
    
    function PostFavorite() {
        if( userToken === "" ) {
           return console.log("No Token")
        } else {
            setLoading(!Loading)
            const headers = { 'Content-Type': 'application/json', 'Content-Type': 'text/plain', 'Authorization':"Token " + userToken }
            API.post('articles/' + slug + "/favorite", '', {headers: headers})
            .then(function (response) {
                return [
                    dispatch(setDataUpdate(!dataUpdate)),
                    dispatch(setCommentDataUpdate(!commentDataUpdate)),
                    console.log(response),
                    setLoading(!Loading),
                ]
            })
            .catch(function (error) {
                setLoading(!Loading)
                console.log(error.response.data);
            })
        } 
    }
    
    return(
        <>
            {   Loading
                ?
                <View style={{marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.green, borderRadius:3 }}>
                    <ActivityIndicator color="#5CB85B"/>
                </View>
                :
                <TouchableOpacity onPress={() => PostFavorite()} style={{marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.green, borderRadius:3 }}>
                    <HeartGreen/>
                    <Text style={{...FONTS.content, fontWeight:'400', color:COLORS.green, paddingLeft:3}}>{favorite}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

const FavoriteArticleButton = ({favorite, slug}) => {
    return (
        <>
        {
            favorite
            ? <FavoriteArticleClickedButton favorite={favorite} slug={slug}/>
            : <FavoriteArticleUnClickedButton favorite={favorite} slug={slug}/>
        }
        </>
    )
}


export default FavoriteArticleButton