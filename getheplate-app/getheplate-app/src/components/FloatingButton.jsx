import React from 'react'
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableOpacity } from 'react-native';
import Svg from 'react-native-svg-uri'
import Style from '../styles'

const FloatingButton = (props) => {
  return (
    <TouchableOpacity  {...props} >
      <View style={[Style.floating_button_ctn,Style.shadowProp]} >
        <Svg 
          source={require('../assets/svg/7.svg')}
          style={Style.floating_button_icon}
        />
        <Text style={Style.floating_button_txt}>
            {props.title}
        </Text>
      </View>
    </TouchableOpacity> 
  )
}

export default FloatingButton