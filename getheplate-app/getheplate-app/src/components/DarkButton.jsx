import React from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableHighlight } from 'react-native';
import Style from '../styles'

const DarkButton = (props) => {
  return (
    <TouchableHighlight style={Style.dark_button_ctn} {...props} >
        <Text style={Style.dark_button_txt}>
            {props.title}
        </Text>
    </TouchableHighlight> 
  )
}

export default DarkButton