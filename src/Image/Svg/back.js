import * as React from 'react';
import { View, Text } from 'react-native';
import Svg, {Path} from 'react-native-svg';



const Back = () => {
    return(
        <View>
            <Svg width={20} height={20} viewBox="0 0 477.175 477.175">
            <Path 
                fill={"#000000"}
                fillRule="preserve"
                d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
            </Svg>
        </View>
    )
}

export default Back