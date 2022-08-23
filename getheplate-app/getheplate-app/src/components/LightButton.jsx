import React from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableOpacity } from 'react-native';
import Svg from 'react-native-svg-uri';
import { assets } from '../assets/importer';
import Style from '../styles'


const LightButton = (props) => {

  return (
    <TouchableOpacity style={props.align ? [Style.light_button_ctn,{alignSelf : props.align}] : Style.light_button_ctn} {...props} >
        {
            !!props.icon ?
            <Svg 
                source={assets[props.icon]}
                style={Style.floating_button_icon}
            />
            :null
        }
        <Text style={Style.light_button_txt}>
            {props.title}
        </Text>
    </TouchableOpacity> 
  )
}

export default LightButton