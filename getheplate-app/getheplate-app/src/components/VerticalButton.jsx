import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableOpacity } from 'react-native';
import Svg from 'react-native-svg-uri'
import { assets } from '../assets/importer';
import Colors from '../colors';
import Style from '../styles'

const VerticalButton = (props) => {
    const defaults = { 
        BKColor : "light_grey",
        TColor  : "black",
        minWidth : "auto",
        fontSize : 14
    }
    const BKColor = props.color || defaults.BKColor
    const TColor = props.textColor || defaults.TColor
    const extraStyleCtn= {
        backgroundColor : Colors[BKColor] ,
        minWidth : props.size || defaults.minWidth ,
    }
    const extraStyleTxt = {
        fontSize : props.fontSize || defaults.fontSize,
        color: Colors[TColor] 
    }

    return (
        <TouchableOpacity  {...props} >
            <View style={[Style.vertical_button_ctn,extraStyleCtn]} > 
            <Svg 
                source={assets[props.type]}
                style={Style.vertical_button_icon}
                fill={props.fill}
            />
            {
                !!props.title ?
                <Text style={[Style.vertical_button_txt,extraStyleTxt]}>
                    {props.title}
                </Text>
                : null
            }
            </View>
        </TouchableOpacity> 
        )
}

export default VerticalButton