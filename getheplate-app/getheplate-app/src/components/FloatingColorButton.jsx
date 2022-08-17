import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableOpacity } from 'react-native';
import Svg from 'react-native-svg-uri'
import Colors from '../colors';
import Style from '../styles'
const allPaths = {
    delete: require('../assets/svg/22.svg'),
    detect : require('../assets/svg/9.svg'),
    scan : require('../assets/svg/7.svg'),
  };
  
const FloatingColorButton = (props) => {
    return (
    <TouchableOpacity  {...props} >
        <View style={[Style.floating_button_ctn,Style.shadowProp,{backgroundColor : Colors[props.color]}]} > 
        <Svg 
            source={allPaths[props.type]}
            style={Style.floating_button_icon}
        />
        <Text style={Style.floating_button_txt}>
            {props.title}
        </Text>
        </View>
    </TouchableOpacity> 
    )
}

export default FloatingColorButton