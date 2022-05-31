import * as React from 'react';
import { View, Text } from 'react-native';
import Svg, {Path} from 'react-native-svg';



const Add = () => {
    return(
        <View>
            <Svg width={14} height={14} viewBox="0 0 24 24" >
            <Path 
                fill={"#bbbbbb"}
                fillRule="none"
                d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"/>
            </Svg>
        </View>
    )
}

export default Add