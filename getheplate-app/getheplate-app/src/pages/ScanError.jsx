import React, {useState ,useEffect} from 'react'
import { View ,Text, SafeAreaView ,StatusBar ,ActivityIndicator} from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri'
import Colors from '../colors'
import { assets } from '../assets/importer'
import ImageHolder from '../components/ImageHolder';
import { Mock } from '../../tests/mocks'
import {Model} from '../model'
import FloatingColorButton from '../components/FloatingColorButton'

const ScanError = ({navigation ,route}) => {
    const { photo , error } = route.params
    const backHome = () => navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
    })
    
    return (
        <SafeAreaView style={[Style.container,{
            justifyContent : 'flex-start'
        }]}>
            <StatusBar style="auto" />
            <Svg
                source={assets.alert_big}
                style={Style.decor_logo}
            />
            <Text style={[Style.titlePageTxt ,{color : Colors.red}]}>{Strings.alerts.errorScan}</Text>
            <View style={Style.alert_ctn}>
                <Svg  source={assets.alert_svg} fill={Colors.red}/>
                <Text style={Style.errMsg}>{error}</Text>
            </View>
            <ImageHolder image_url={photo.url} />
            <View style={{marginTop : 'auto', alignItems : 'center'}}>
                <FloatingColorButton title={Strings.button.backHome} type="back" textColor="dark_grey" noShadow={true} color='light_grey' onPress={backHome}/>
            </View>     
            </SafeAreaView>
    )
}

export default ScanError