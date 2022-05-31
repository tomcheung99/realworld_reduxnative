import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme';
import API from '../api/ReadWorldUrl';
import {useSelector, useDispatch} from 'react-redux';
import {setUserName, setCheckTag} from '../redux/action';

const Tags = () => {
    const [ShowTags, setShowTags] = useState(false);    
    const [TagItems, setTagItems] = useState([]);
    const handleClick = () => {
        setShowTags(!ShowTags);
    };

    const {tag, userToken} = useSelector(state => state.userReducers); 
    const dispatch = useDispatch();

    API.get('tags', {headers: {'Authorization':"Token " + userToken, 'Accept' : 'application/json', 'Content-Type': 'application/json'}})
      .then(function (response) {
        setTagItems(response.data.tags)
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
      
    return (
        <View style={{marginTop:20, paddingBottom:10, marginLeft:20, marginRight:20, }}>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={{marginLeft:8 ,...FONTS.body, color:COLORS.black, fontWeight:'600',}}>Popular Tags</Text>
                <TouchableOpacity onPress={handleClick}>
                    <Text style={{marginRight:8 ,...FONTS.body, color:COLORS.lightgray, fontWeight:'600',}}>Choose ▼</Text>
                </TouchableOpacity>
            </View>
            
            { ShowTags ?  
                <View style={{marginTop:15, flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start'}}>
                    {TagItems.map((TagItem)=>{
                    return(
                        <View style={{margin:5}}>
                            <TouchableOpacity onPress={() => dispatch(setCheckTag(TagItem))} key={TagItem} style={{backgroundColor:COLORS.gray, borderRadius: 50, padding:4, paddingLeft:6, paddingRight:6 }}>
                                <Text style={{color:COLORS.white, fontWeight:'500', textAlign:'center' }}>{TagItem}</Text>
                            </TouchableOpacity>
                        </View>
                    )})}
                </View>
              : null 
            }
        </View>
    )
}



export default Tags