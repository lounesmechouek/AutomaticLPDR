import React from 'react'
import { Text, View } from 'react-native'
import Svg from 'react-native-svg-uri'
import { assets } from '../assets/importer'
import Strings from '../strings'
import Style from '../styles'

const StepScanning = () => {
  return (
    <View style={Style.steps_ctn}>
        <View style={Style.step}>
            <Svg style={Style.step_svg} source={assets.loading} />
            <Text style={Style.step_text}> {Strings.scanning.searching}</Text>
        </View>
        <Text> {Strings.scanning.segmentation}</Text>
        <Text> {Strings.scanning.finalisation}</Text>
    </View>
  )
}

export default StepScanning