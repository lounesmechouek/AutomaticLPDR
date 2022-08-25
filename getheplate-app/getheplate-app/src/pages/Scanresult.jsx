import React, { useEffect ,useState } from 'react'
import { View ,Text, SafeAreaView ,StatusBar ,ActivityIndicator} from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri'
import Colors from '../colors'
import { assets } from '../assets/importer'
import ImageHolder from '../components/ImageHolder';
import FloatingColorButton from '../components/FloatingColorButton'
import Model from '../model'

const ScanResult = ({navigation ,route}) => {
    const {scanResult , photo } = route.params    
    const [saved, setsaved] = useState(false)

    useEffect(() => {
      saved 
      ? deleteScan()
      : setsaved (false)
    }, [saved])
    
    const deleteScan = () => {
        // This API is not working for deletion PROVIDER PROBLEM
        // Model.DeletePhotoLink(photo.delete_url)
        
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
        
    }

    // TODO : Fix the loop back navigation
    const saveScan = async () => {
        await Model.saveScan({
            "file_name_link" : photo.url,
            "longitude" : 3.042048, // Algeirs default
            "latitude" : 36.752887,
            "country" : "Algeria", // default
            "text_plate" : scanResult.text,
            "note" : "",
            "accuracy" : scanResult.score
        })
        setsaved(true)
        navigation.reset({
            index: 1,
            routes: [{ name: 'Home' }],
        })
    }

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
            <ImageHolder image_url={photo.url} />
            <View style={Style.floating_box_ctn_2}>
                <FloatingColorButton title={Strings.button.nosave} type="cancel" textColor="dark_grey" noShadow={true} color='light_grey' onPress={deleteScan}/>
                <FloatingColorButton title={Strings.button.save} type="save" color='blue' onPress={saveScan}/>
            </View>
        </SafeAreaView>
    )
}

export default ScanResult