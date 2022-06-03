import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {setUserName, setUserEmail, setUserImage, setUserToken} from '../redux/action';
import {UnLoginHeader, LoginHeader} from '../Components/Header'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Tags from '../Components/Tags'
import List from '../Components/List'
import NewArticleButton from '../Components/Button/NewArticle'





function Banner() {
    return(
        <View style={{backgroundColor: COLORS.green, padding: 20, }}>
            <Text style={styles.bannerTitle}>
                Conduit
            </Text>
            <Text style={{fontSize:SIZE.title, color:COLORS.white, textAlign:'center',}}> 
                A place to share your knowledge.
            </Text>
        </View>
    )
}




const Home = () => {
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const {userToken} = useSelector(state => state.userReducers)
const dispatch = useDispatch()
    return (
        <SafeAreaView edges={['top']} style={{flex:1, backgroundColor:COLORS.white, height:windowHeight}}>
            <View style={{flex:1,}}>
                {
                    userToken === ""  
                    ?
                    <>
                        <UnLoginHeader/>
                        <Banner/>
                    </>
                    :
                        <LoginHeader/>  
                }
                <Tags/>
                { userToken === "" ? null : <NewArticleButton/> }
                <List name={"Global Feed"} profileShow={false}/>
            </View>
        </SafeAreaView>
    )

}





export default Home

const styles = StyleSheet.create({
  bannerTitle: {
    fontSize:SIZE.title,
    color:COLORS.white,
    textAlign:'center',
    fontWeight:'bold',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
})