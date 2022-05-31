import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {FONTS, COLORS, SIZE} from '../../Theme';
import PencilIcon from '../../Image/Svg/pencil';
import AddWhiteIcon from '../../Image/Svg/addWhite';
import API from '../../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import {setDataUpdate, setCommentDataUpdate} from '../../redux/action';
import {useNavigation} from '@react-navigation/native'

function EditArticleButton ({following, username}) {
    const {userToken, commentDataUpdate } = useSelector(state => state.userReducers)
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [Loading, setLoading] = useState(false)

    return(
        <TouchableOpacity onPress={() => navigation.navigate("EditArticleScreen")} style={{marginLeft:10, flexDirection:'row', alignItems:'center', textAlign:'center', paddingTop:5, paddingBottom:5, paddingLeft:10,paddingRight:10, borderWidth:1, borderColor:COLORS.lightgray2, borderRadius:3 }}>
            <PencilIcon/>
            <Text style={{...FONTS.content,  fontWeight:'400',  color:COLORS.lightgray2, paddingLeft:3}}>Edit Articles</Text>
        </TouchableOpacity>
    )
}


export default EditArticleButton