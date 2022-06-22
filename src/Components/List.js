import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Dimensions, ScrollView, RefreshControl } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme';
import API from '../api/ReadWorldUrl'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {setUserName, setCheckTag, setArticleSlug, setLoading, setTagData, setRefreshing,} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import ArticleAuthor from '../Components/ArticleAuthor'
import FavoriteArticleButton from '../Components/Button/FavoriteArticleButton'
import TagButton from '../Components/Button/TagButton'


function ListLine({name}) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const {tag} = useSelector(state => state.userReducers)
    const dispatch = useDispatch();

    return(
        <View style={{ marginLeft:28, marginRight:28,}}>
            { tag === "" ?
                    <View style={{borderBottomWidth:3, borderBottomColor:COLORS.green, width: (windowWidth-28-28)/2, }}>
                        <Text style={{color:COLORS.green, fontSize:SIZE.body, fontWeight:'500', textAlign:'center', lineHeight:40}}>{name}</Text>
                    </View>
                :
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => dispatch(setCheckTag(""))}>
                        <Text style={{width:(windowWidth-28-28)/2, color:COLORS.gray, fontSize:SIZE.body, fontWeight:'500', textAlign:'center', lineHeight:40}}>Global Feed</Text>
                        </TouchableOpacity>
                        <View style={{borderBottomWidth:3, borderBottomColor:COLORS.green, width: (windowWidth-28-28)/2,}}>
                            <Text style={{color:COLORS.green, fontSize:SIZE.body, fontWeight:'500', textAlign:'center', lineHeight:40}}>#{tag}</Text>
                        </View>
                    </View>
            }
        </View>
    )
}

function ListAuthor(profileShow) {
    const navigation = useNavigation();
    const [HeartChecked, setHeartChecked] = useState(false);
    const [ListData, setListData] = useState([]);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const {tag, loading, userToken, dataUpdate, refreshing, userName, profilesUserName, } = useSelector(state => state.userReducers)
    const dispatch = useDispatch();
    
    const HeartButtonClicked = () => {
        setHeartChecked(!HeartChecked);
    };
    function getList () {
        API.get('articles' , {headers: {'Authorization':"Token " + userToken, 'Accept' : 'application/json', 'Content-Type': 'application/json'}})
        .then(function (response) {
            // console.log(response.data)
            dispatch(setLoading(true))
            return [
                console.log(response.data),
                setListData(response.data.articles)
            ]
            dispatch(setLoading(false))
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    function selectTagList() {
        API.get('articles?tag='+ tag, {headers: {'Authorization':"Token " + userToken, 'Accept' : 'application/json', 'Content-Type': 'application/json'}})
        .then(function (response) {
            dispatch(setLoading(true))
            return[
                setListData(response.data.articles)
            ]
            dispatch(setLoading(false))
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    

    function userProfileList() {
        API.get('articles?author='+ profilesUserName, {headers: {'Authorization':"Token " + userToken, 'Accept' : 'application/json', 'Content-Type': 'application/json'}})
        .then(function (response) {
            dispatch(setLoading(true))
            return [
                console.log("Use Profiles "),
                setListData(response.data.articles),
            ]
            dispatch(setLoading(false))
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    function whichList() {
        return(
            <>
            {
                tag === ""
                ? getList()
                : selectTagList()
            }
            </>
        )
    }


    useEffect(() => {
        {   
            profileShow.profileShow
            ?
            userProfileList()
            :
            whichList()
        }
    },[userToken, tag, refreshing, dataUpdate])

    return(
        <View>
            { loading ? 
            <View>
            { ListData.map((Data,index)=>{
                return(
            <View key = {index}>
                <View style={{paddingTop:30, marginLeft:28, marginRight:28, justifyContent:'space-between', flexDirection:'row', alignItems:'center', borderTopWidth:1, borderColor:COLORS.lightgray}}>
                        <ArticleAuthor icon =
                        {
                            Data.author.image === ""
                            ? "https://api.realworld.io/images/smiley-cyrus.jpeg"
                            : Data.author.image
                        }
                        
                        username={Data.author.username} createdAt={Data.createdAt.split('T')[0]} navigation={navigation}/>
                {
                    userToken === ""
                        ? null
                        : <FavoriteArticleButton bool={Data.favorited} favorite={Data.favoritesCount} slug={Data.slug}/>

                }

                </View>
                <TouchableOpacity  onPress={() => dispatch(setArticleSlug(Data.slug)) || navigation.navigate("ArticleScreen")}>
                    <View style={{marginTop:15, marginLeft:28, marginRight:28}}>
                        <Text style={{...FONTS.title, fontWeight:'600'}}>
                            {Data.title}
                        </Text>
                        <Text style={{...FONTS.content, marginTop:5 }}>
                            {Data.description}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:15, marginBottom:15, marginLeft:28, marginRight:28, }}>

                            <Text style={{...FONTS.small}}>Read more...</Text>

                        <View style={{flexDirection:'row'}}>
                            {Data.tagList.map((Data,index)=>{
                            return(
                            <View key={index}>
                                <TagButton tagType={Data}/>
                            </View>
                            )})}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            )})}
            </View>
            : 
            <ActivityIndicator size="large" color="#5CB85B" />
            }
        </View>
    )
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
  
const List = ({name, profileShow}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const {refreshing} = useSelector(state => state.userReducers)
    const dispatch = useDispatch();
    const onRefresh = React.useCallback(() => {
    dispatch(setRefreshing(true));
      wait(2000).then(() => dispatch(setRefreshing(false)));
    }, []);

    return(
        <View style={{flex:1}}>
            <ListLine name={name}/>
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1}}
                refreshControl={  <RefreshControl tintColor="#5CB85B" color="#5cB85B" refreshing={refreshing} onRefresh={onRefresh} /> }>
                <ListAuthor profileShow={profileShow}/>
            </ScrollView>
        </View>

    )
}

export default List