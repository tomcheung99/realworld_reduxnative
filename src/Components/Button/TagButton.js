import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {FONTS, COLORS, SIZE} from '../../Theme';

const TagButton = ({tagType}) => {
    return(
        <View style={{padding:3, paddingLeft:10, paddingRight:10, borderWidth:1, borderRadius:50, borderColor:COLORS.lightgray, marginRight:5}}>
            <Text style={{...FONTS.small }}>{tagType}</Text>
        </View>
    )
}


export default TagButton