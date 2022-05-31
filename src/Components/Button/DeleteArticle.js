import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {FONTS, COLORS, SIZE} from '../../Theme';
import RubbishRedIcon from '../../Image/Svg/rubbishRed'
import API from '../../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import {setDataUpdate, setLoading} from '../../redux/action';
import {useNavigation} from '@react-navigation/native'


function DeleteArticleButton () {
    const {userToken, dataUpdate, articleSlug } = useSelector(state => state.userReducers)
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const [Loading, setLoading] = useState(false);

    function DeleteArticles() {
        setLoading(!Loading)
        const headers = { 'Content-Type': 'application/json', 'Authorization':"Token " + userToken }
        API.delete('articles/' + articleSlug, {headers: headers})
        .then(function (response) {
            dispatch(setDataUpdate(!dataUpdate)),
            setLoading(!Loading),
            navigation.navigate("HomeScreen")
        })
        .catch(function (error) {
            setLoading(!Loading),
            console.log(error.response.data);
        })
    }

    return(
        <>
        {
            Loading 
            ?
            <View style={{textAlign:'center', marginTop:8, marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:'#B85C5C', borderRadius:3 }}>
                <ActivityIndicator color="#B85C5C"/>
            </View>
            :
            <>
            <TouchableOpacity onPress={() => DeleteArticles()} style={{textAlign:'center', marginTop:8, marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:'#B85C5C', borderRadius:3 }}>
                <RubbishRedIcon/>
                <Text style={{...FONTS.content, fontWeight:'400', color:'#B85C5C', paddingLeft:3}}>Delete Article</Text>
            </TouchableOpacity>
            </>
        }
    </>
    )
}

export default DeleteArticleButton