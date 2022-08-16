import React from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableOpacity } from 'react-native';
import Style from '../styles'

const DarkButton = (props) => {
  return (
    <TouchableOpacity style={Style.dark_button_ctn} {...props} >
        <Text style={Style.dark_button_txt}>
            {props.title}
        </Text>
    </TouchableOpacity> 
  )
}

export default DarkButton