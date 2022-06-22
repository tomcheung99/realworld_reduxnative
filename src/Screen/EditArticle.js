import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import InputScrollView from 'react-native-input-scroll-view';
import {setDataUpdate, setCommentDataUpdate, setLoading} from '../redux/action';
import API from '../api/ReadWorldUrl'

//Components
import BackHeader from '../Components/BackHeader'

const EditArticleScreen = ({navigation}) => {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const {editData, userToken, articleSlug, dataUpdate, Loading} = useSelector(state => state.userReducers)
const dispatch = useDispatch();

const [ArticleTitle, setArticleTitle] = useState("")
const [ArticleAbout, setArticleAbout] = useState("")
const [ArticleContent, setArticleContent] = useState("")

    function UpdateArticle() {
            setLoading(!Loading)
            const headers = { 'Content-Type': 'application/json', 'Authorization':"Token " + userToken }
            const data = {
                "article": {
                    "title": ArticleTitle,
                    "description": ArticleAbout,
                    "body": ArticleContent
                  }
            }
            API.put('articles/' + articleSlug , data, {headers: headers})
            .then(function (response) {
                return [
                    dispatch(setDataUpdate(!dataUpdate)),
                    console.log(response),
                    navigation.navigate("HomeScreen"),
                    setLoading(!Loading),
                ]
            })
            .catch(function (error) {
              setLoading(!Loading);
              console.log(error.response.data);
            })
    }


    return(
        <SafeAreaView style={{height:windowHeight, backgroundColor:COLORS.white}}>
        <BackHeader/>
        <InputScrollView topOffset={windowHeight}>
        <View style={{flex:1, marginTop:30, marginLeft:20, marginRight:20}}> 
        <Text style={{fontSize:24,fontWeight:'800', textAlign:'center' }}>Edit Article </Text>
        <Text style={{...FONTS.content, textAlign:'center', marginBottom:30}}>Update your are article</Text>
            <TextInput onChangeText={(value) => setArticleTitle(value)} placeholder="Article Title" style={{...FONTS.title, borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}>{editData.title}</TextInput>
            <TextInput onChangeText={(value) => setArticleAbout(value)} placeholder="What this article is about?" style={{borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15 }}>{editData.description}</TextInput>
            <TextInput onChangeText={(value) => setArticleContent(value)} multiline={true} numberOfLines={10} placeholder="Write your article here (in markdown)" style={{height:160, textAlignVertical: 'top', borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}>{editData.body}</TextInput>
            {/* <TextInput onChangeText={(value) => setArticleTags(value)} placeholder="Enter tags" style={{borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}>{editData.tagList}</TextInput> */}
            <TouchableOpacity onPress={() => UpdateArticle()} style={{ borderRadius:8, alignSelf:'flex-end',backgroundColor:COLORS.green, borderWidth:1, borderColor:COLORS.green, padding:10, }}>
            {
                Loading
                ? <ActivityIndicator color='#ffffff' />
                : <Text style={{...FONTS.body, textAlign:'center', color:COLORS.white,}}>Update Article</Text>
            }
        </TouchableOpacity>
        </View>
        </InputScrollView>
        </SafeAreaView>
    )
}

export default EditArticleScreen