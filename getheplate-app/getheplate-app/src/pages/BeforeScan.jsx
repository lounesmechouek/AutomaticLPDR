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
  return (
    <SafeAreaView style={Style.container}>
        <StatusBar style="auto" />
        <Svg
            source={assets.scan_big}
            style={{ 
                position : "absolute",
                right : 0,
                top : 60
            }}
        />
        <Text style={Style.titlePageTxt}>{Strings.titles.image}</Text>
        <ImageHolder image_url={imageLink} />
        <View style={{
            flexDirection : 'row',
            alignItems : 'center',
            width : "90%",
        }}>
            <Svg 
                source={assets.alert}
                style={{
                  alignSelf: 'center',
                  marginTop : 25
                }}
            />
            <Text style={Style.scanItemTexts}>
                {Strings.alerts.beforeScan}
            </Text>
        </View>
        <View>
            <FloatingColorButton title={Strings.button.cancel} type="cancel" textColor="dark_grey" color='light_grey' onPress={navigation.goBack}/>
            <FloatingColorButton title={Strings.button.detect} type="detect" color='green' onPress={navigation.goBack}/>
        </View>
    </SafeAreaView>
  )
}

export default BeforeScan