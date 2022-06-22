import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import API from '../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {setUserName, setCheckTag, setArticleSlug, setEditData} from '../redux/action';

// Components
import ArticleAuthor from '../Components/ArticleAuthor';
import FavoriteArticleButton from '../Components/Button/FavoriteArticleButton';
import FollowButton from '../Components/Button/FollowButton'
import EditArticleButton from '../Components/Button/EditArticle'
import DeleteArticleButton from '../Components/Button/DeleteArticle'
import TagButton from '../Components/Button/TagButton'
import Comment from '../Components/Comment'
import PostComment from '../Components/PostComment'
import Header from '../Components/Header'
import BackHeader from '../Components/BackHeader'

// Page

function ArticleContent() {
    const {articleSlug, userToken, commentDataUpdate, userName} = useSelector(state => state.userReducers)
    const dispatch = useDispatch();

    const [ArticleData, setArticleData] = useState([]);
    const [AuthorData, setAuthorData] = useState([]);
    const [CommentData, setCommentData] = useState([]);
    const [CommentDataArray, setCommentDataArray] = useState([]);
    const [TagData, setTagData] = useState([]);
    const [CreatedAt, setCreatedAt] = useState("")
    const [Clicked, setClicked] = useState(true)

    function getArticleData() {
        const headers = { 'Content-Type': 'application/json', 'Authorization':"Token " + userToken }
        API.get('articles/' + articleSlug, {headers: headers})
        .then(function (response) {
            return [
            console.log(response.data.article.author.following),
             dispatch(setEditData(response.data.article)),
             setArticleData(response.data.article),
             setTagData(response.data.article.tagList),
             setAuthorData(response.data.article.author),
             setCreatedAt(response.data.article.createdAt),
            //  console.log(response.data.article.author)
            ];
        })
        .catch(function (error) {
            console.log(error);
        })
    }


    function getCommentData() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization':"Token " + userToken
        }
        API.get('articles/' + articleSlug + '/comments', {headers:headers})
        .then(function (response) {
            return [
                setCommentData(response.data.comments),
                console.log(response.data.comments),
            ]
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    function CommentList() {
        return [CommentData.map((Data) => {
            return(
                <View key={Data.key}>
                    <Comment id={Data.id} comment={Data.body} image={Data.author.image} username={Data.author.username} createdAt={Data.createdAt}/> 
                </View>
            );
        })];
    };

    function FunctionButton() {
        return(
            <>
            {
                AuthorData.username === userName 
                ? 
                <View style={{}}>
                    <EditArticleButton/>
                    <DeleteArticleButton/>
                </View>
                :
                <View style={{flexDirection:"row"}}>
                    <FollowButton following={AuthorData.following} username={AuthorData.username}/>
                    <FavoriteArticleButton bool={ArticleData.favorited} favorite={ArticleData.favoritesCount} slug={ArticleData.slug}/>
                </View>
            }
            </>
        )
    }


    useEffect(() => {
        getArticleData();
        getCommentData();
    },[commentDataUpdate, userToken])

    return(
        <>
            <View style={{backgroundColor:COLORS.darkgray, paddingLeft:20, paddingRight:20, paddingTop:15, paddingBottom:15}}>
                <Text style={{...FONTS.title, color:COLORS.white, marginBottom:10}}> {ArticleData.title} </Text>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <ArticleAuthor type={"white"} icon={AuthorData.image} username={AuthorData.username} createdAt={CreatedAt.split('T')[0]}/>
                            { userToken === "" ? null : <FunctionButton/>}
                    </View>
            </View>
                    <View style={{marginTop:20, marginLeft:20, marginRight:20, borderBottomWidth:1, borderBottomColor:COLORS.lightgray2}}>
                        <Text style={{...FONTS.body, color:COLORS.black,}}>{ArticleData.body}</Text>
                        <View style={{flexDirection:'row', marginTop:20, marginBottom:20}}>
                            { TagData.map((Data, index)=>{
                            return(
                                <TagButton key={index}  tagType={Data}/>
                            )})} 
                        </View>
                    </View>
                            
        
        
                        <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center', marginTop:20}}>
                            <ArticleAuthor icon={AuthorData.image} username={AuthorData.username} createdAt={CreatedAt.split('T')[0]}/>
                            { userToken === "" 
                                ? null 
                                : <FunctionButton/>
                            }
                        </View>
                            { userToken === "" ?  null : <PostComment/>  }
                        <CommentList/>
        </>
    )
}

const Article = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
    <SafeAreaView style={{ flex:1, backgroundColor:COLORS.white, height: windowHeight, }}>
        <View style={{flex:1,}}>
            <BackHeader/>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ArticleContent/>
            </ScrollView>
        </View>
    </SafeAreaView>
    )
}

export default Article