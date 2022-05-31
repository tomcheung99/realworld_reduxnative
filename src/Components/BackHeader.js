import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {FONTS, COLORS, SIZE} from '../Theme'
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../Image/Svg/back'


const BackHeader = ({goToHome}) => {
    const navigation = useNavigation();
    return(
        <View style={{flexDirection:'row', marginTop:20, marginLeft:20, marginRight:20, marginBottom:20, }}>
            <View style={{flex:1}}>
            {
            goToHome ?
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <BackIcon/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon/>
            </TouchableOpacity>
            }
            
            </View>
            <View style={{flex:1}}>
                <Text style={{ textAlign:'center', color:COLORS.green, fontWeight:'bold', fontSize:SIZE.header}}>Conduit</Text>
            </View>
            <View style={{flex:1}}>
            </View>
        </View>
    )
}

export default BackHeader