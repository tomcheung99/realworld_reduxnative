import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import InputScrollView from 'react-native-input-scroll-view';


//Components
import BackHeader from '../Components/BackHeader'
import {PublishArticleUnButton, PublishArticleButton} from '../Components/Button/PublishArticleButton'


const NewArticleScreen = ({navigation}) => {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const {profilesUserName, profilesUserImage, profilesUserFollow, userName} = useSelector(state => state.userReducers)
const dispatch = useDispatch();

const [ArticleTitle, setArticleTitle] = useState("")  
const [ArticleAbout, setArticleAbout] = useState("")  
const [ArticleContent, setArticleContent] = useState("")  
const [ArticleTags, setArticleTags] = useState("")  

    return(
        <SafeAreaView style={{height:windowHeight, backgroundColor:COLORS.white}}>
        <BackHeader/>
        <InputScrollView topOffset={windowHeight}>
        <View style={{flex:1, marginTop:30, marginLeft:20, marginRight:20}}> 
        <Text style={{fontSize:24,fontWeight:'800', textAlign:'center' }}>New Article </Text>
        <Text style={{...FONTS.content, textAlign:'center', marginBottom:30}}>Create your are new article</Text>
            <TextInput onChangeText={(value) => setArticleTitle(value)} placeholder="Article Title" style={{...FONTS.title, borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}/>
            <TextInput onChangeText={(value) => setArticleAbout(value)} placeholder="What this article is about?" style={{borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15 }}/>
            <TextInput onChangeText={(value) => setArticleContent(value)} multiline={true} numberOfLines={10} placeholder="Write your article here (in markdown)" style={{height:160, textAlignVertical: 'top', borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}/>
            <TextInput onChangeText={(value) => setArticleTags(value)} placeholder="Enter tags" style={{borderWidth:1, borderColor:COLORS.lightgray, borderRadius:5, padding:10, marginBottom:15}}/>
            {   
             ArticleTitle !== "" &&  ArticleContent !== "" && ArticleAbout !== "" && ArticleTags !==""
             ? <PublishArticleButton ArticleTitle={ArticleTitle} ArticleAbout={ArticleAbout} ArticleContent={ArticleContent} ArticleTags={ArticleTags} />
             : <PublishArticleUnButton/>
            }
        </View>
        </InputScrollView>
        </SafeAreaView>
    )
}

export default NewArticleScreen