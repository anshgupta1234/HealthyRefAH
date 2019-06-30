import React from 'react'
import { TouchableOpacity } from 'react-native'

const DisappearingTouchable = props => {
    if(props.visible){
        if(props.children){
            return <TouchableOpacity style={props.style} onPress={props.onPress}>{props.children}</TouchableOpacity>
        }
        return <TouchableOpacity style={props.style} onPress={props.onPress} />
    }
    return null
};

export default DisappearingTouchable