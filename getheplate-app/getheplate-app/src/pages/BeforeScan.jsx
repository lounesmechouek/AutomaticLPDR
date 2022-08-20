import React, { useEffect, useState } from 'react'
import { View ,Text , FlatList, SafeAreaView ,StatusBar} from 'react-native'
import Svg from 'react-native-svg-uri'
import { Mock } from '../../tests/mocks'
import { assets } from '../assets/importer'
import Colors from '../colors'
import LineColorButton from '../components/LineColorButton'
import VerticalButton from '../components/VerticalButton'
import FloatingColorButton from '../components/FloatingColorButton'
import DarkButton from '../components/DarkButton'
import Strings from '../strings'
import Style from '../styles'
import ImageHolder from '../components/ImageHolder';


const BeforeScan = ({navigation , photo }) => {
  const [image, setImage] = useState(photo)
  const [imageLink, setImageLink] = useState('https://i.ibb.co/cJrQjbQ/image-2.png')
  const launchDetect =()=>{
    //save photo and take id
    navigation.navigate('Scanning',{
        imageLink
        //and id
    })
  }
  return (
    <SafeAreaView style={[Style.container,{
        justifyContent : 'flex-start'
    }]}>
        <StatusBar style="auto" />
        <Svg
            source={assets.scan_big}
            style={Style.decor_logo}
        />
        <Text style={Style.titlePageTxt}>{Strings.titles.image}</Text>      
        <ImageHolder image_url={imageLink} />
        <View style={Style.alert_ctn}>
            <Svg 
                source={assets.alert}
                style={Style.alert_svg}
            />
            <Text style={Style.scanItemTexts}>
                {Strings.alerts.beforeScan}
            </Text>
        </View>
        <View style={Style.floating_box_ctn_2}>
            <FloatingColorButton title={Strings.button.cancel} type="cancel" textColor="dark_grey" noShadow={true} color='light_grey' onPress={navigation.goBack}/>
            <FloatingColorButton title={Strings.button.detect} type="detect" color='green' onPress={launchDetect}/>
        </View>
    </SafeAreaView>
  )
}

export default BeforeScan