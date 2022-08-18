import React from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableOpacity } from 'react-native';
import Svg from 'react-native-svg-uri';
import Style from '../styles'

const allPaths = {
    back : require('../assets/svg/18.svg'),
    add : require('../assets/svg/21.svg'),
    cancel : require('../assets/svg/21.svg')
}

const LightButton = (props) => {

  return (
    <TouchableOpacity style={props.align ? [Style.light_button_ctn,{alignSelf : props.align}] : Style.light_button_ctn} {...props} >
        {
            !!props.icon ?
            <Svg 
                source={allPaths[props.icon]}
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