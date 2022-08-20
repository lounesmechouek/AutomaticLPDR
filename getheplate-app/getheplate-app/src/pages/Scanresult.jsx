import React, {useState} from 'react'
import { View ,Text, SafeAreaView ,StatusBar ,ActivityIndicator} from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri'
import Colors from '../colors'
import { assets } from '../assets/importer'
import ImageHolder from '../components/ImageHolder';
import { useEffect } from 'react'
import { Mock } from '../../tests/mocks'
import FloatingColorButton from '../components/FloatingColorButton'

const ScanResult = ({navigation ,route}) => {
    const {scanResult ,imageLink} = route.params
    return (
        <SafeAreaView style={[Style.container,{
            justifyContent : 'flex-start'
        }]}>
            <StatusBar style="auto" />
            <Svg
                source={assets.result_big}
                style={Style.decor_logo}
            />
            <Text style={Style.titlePageTxt}>{Strings.titles.result}</Text>
            <Text style={[Style.plateTxt,{fontSize : 30 }]}>{scanResult.text} </Text>
            <Text style={[Style.scanItemTexts,{fontSize : 20 }]}>{Strings.home.precision}</Text>
            <Text style={{color : Colors.green , alignSelf : "left" , marginLeft: 'auto' , width : '90%',fontFamily : "QuanticoB" , fontSize : 30 }}>{Math.floor(scanResult.score*100)}%</Text>
            <ImageHolder image_url={imageLink} />
            <View style={Style.floating_box_ctn_2}>
                <FloatingColorButton title={Strings.button.nosave} type="cancel" textColor="dark_grey" noShadow={true} color='light_grey' onPress={navigation.goBack}/>
                <FloatingColorButton title={Strings.button.save} type="save" color='blue' onPress={null}/>
            </View>
        </SafeAreaView>
    )
}

export default ScanResult