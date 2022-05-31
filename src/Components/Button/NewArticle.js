import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import {FONTS, COLORS, SIZE} from '../../Theme';
import NewArticleIcon from '../../Image/Svg/newArticle'
import { useNavigation } from '@react-navigation/native';


const NewArticle = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => navigation.navigate("NewArticleScreen")}
        style={{shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.34,
        shadowRadius: 4.27,
        
        elevation: 6, zIndex: 2, marginLeft:windowWidth-80, marginTop:windowHeight - windowHeight/4.2, position:'absolute' ,justifyContent:'center', alignItems:'center', backgroundColor:COLORS.green, width:60, height:60, borderRadius:60/2 }}>
            <NewArticleIcon/>
        </TouchableOpacity>
    )
}


export default NewArticle