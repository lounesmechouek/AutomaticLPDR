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

const Scanning = ({navigation ,route}) => {
    const { photo } = route.params
    const [loading, setLoading] = useState(true)

    const ModelCall = () => 
        Model.Scan(photo.url)
            .then( res => {
                setLoading(false)
                navigation.replace('ScanResult',{ scanResult : res , photo })
            })
            .catch ( err => {
                if (err.status === 501) // retry on busy server
                    setTimeout(() => {
                        ModelCall();
                    }, 2000);
                else
                    navigation.replace('ScanError',{ photo , error : Strings.alerts.noDetection , other : err})
            })

    useEffect(() => {ModelCall()}, [])
    
    return (
        <SafeAreaView style={[Style.container,{
            justifyContent : 'flex-start'
        }]}>
            <StatusBar style="auto" />
            <Svg
                source={assets.neural_big}
                style={Style.decor_logo}
            />
            <Text style={Style.titlePageTxt}>{Strings.titles.traitment}</Text>
            <View style={Style.Loading} >
                <ActivityIndicator 
                    animating ={loading}
                    size="large" 
                    color={Colors.dark_grey}   
                    hidesWhenStopped={true} />
            </View>
            

            <View style={{marginTop : 'auto', alignItems : 'center'}}>
                <View style={Style.alert_ctn}>
                    <Svg 
                        source={assets.alert}
                        style={Style.alert_svg}
                    />
                    <Text style={Style.scanItemTexts}>
                        {Strings.alerts.scanning}
                    </Text>
                </View>
                <ImageHolder image_url={photo.url} />
            </View>
        </SafeAreaView>
    )
}

export default Scanning