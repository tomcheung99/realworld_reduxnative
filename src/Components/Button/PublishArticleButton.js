import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {FONTS, COLORS, SIZE} from '../../Theme';
import AddIcon from '../../Image/Svg/add';
import API from '../../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import {setDataUpdate} from '../../redux/action';
import { useNavigation } from '@react-navigation/native';




export const PublishArticleButton = ({ArticleTitle, ArticleAbout, ArticleContent, ArticleTags}) => {
    const {userToken, loading, dataUpdate} = useSelector(state => state.userReducers)
    const dispatch = useDispatch()
    const [Loading, setLoading] = useState(false)
    const navigation = useNavigation()

    function PublishArticle() {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization':"Token " + userToken
        }
        const postData = {
            "article": {
                "title": ArticleTitle,
                "description": ArticleAbout,
                "body": ArticleContent,
                "tagList": [
                    ArticleTags
                ]
            }
        }
        API.post('articles/', postData, { headers:  headers})
        .then(function(response) {
            console.log(response.data.article)
            console.log(response.data)
            return (
                dispatch(setDataUpdate(!dataUpdate)),
                setLoading(false),
                navigation.navigate("HomeScreen")
            )
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    return(
        <TouchableOpacity onPress={() => PublishArticle()} style={{ borderRadius:8, alignSelf:'flex-end',backgroundColor:COLORS.green, borderWidth:1, borderColor:COLORS.green, padding:10, }}>
            {
                Loading
                ?<ActivityIndicator color='#ffffff' />
                :<Text style={{...FONTS.body, textAlign:'center', color:COLORS.white,}}>Publish Article</Text>
            }
        </TouchableOpacity>
    )
}

export const PublishArticleUnButton = () => {
    return(
        <TouchableOpacity style={{    opacity: 0.5, borderRadius:8, alignSelf:'flex-end',backgroundColor:COLORS.green, borderWidth:1, borderColor:COLORS.green, padding:10, }}>
            <Text style={{...FONTS.body, textAlign:'center', color:COLORS.white,}}>Publish Article</Text>
        </TouchableOpacity>

    )
}

const PublishArticleButtons = {PublishArticleButton,PublishArticleUnButton}

export default PublishArticleButtons