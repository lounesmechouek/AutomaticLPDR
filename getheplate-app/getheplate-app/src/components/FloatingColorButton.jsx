import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableOpacity } from 'react-native';
import Svg from 'react-native-svg-uri'
import { assets } from '../assets/importer';
import Colors from '../colors';
import Style from '../styles'

const FloatingColorButton = (props) => {
    const defaults = { 
        BKColor : "dark_grey",
        TColor  : "white",
        minWidth : "90%",
        fontSize : "18px"
    }
    const BKColor = props.color || defaults.BKColor
    const TColor = props.textColor || defaults.TColor
    const shadowStyle = !!props.noShadow ? null : Style.shadowProp 
    const extraStyleCtn= {
        backgroundColor : Colors[BKColor],
        minWidth : props.size || defaults.minWidth,
    }
    const extraStyleTxt = {
        fontSize : props.fontSize || defaults.fontSize,
        color: Colors[TColor]
    }
    return (
    <TouchableOpacity  {...props} >
        <View style={[Style.floating_button_ctn,shadowStyle,extraStyleCtn]} > 
            <Svg 
                source={assets[props.type]}
                style={Style.floating_button_icon}
                fill={props.fill}
            />
            <Text style={[Style.floating_button_txt,extraStyleTxt]}>
                {props.title}
            </Text>
        </View>
    </TouchableOpacity> 
    )
}

export default FloatingColorButton