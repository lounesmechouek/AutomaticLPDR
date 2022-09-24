import React, { useEffect, useState } from 'react'
import { View ,Text , FlatList, SafeAreaView ,StatusBar, ActivityIndicator} from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';
import { getLink } from '../utils/imageToLink'
import { Compressor } from '../utils/imageCompressor'
import { storage } from '../utils/storage'

const NewScan = ({navigation}) => {
  const [geoloc, setGeoloc] = useState({lat:null,lon:null})
  const [loading,setLoading] = useState(false)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64 : true,
      quality: 0.2,
    });
    loadedPic(result)
  };

  const takeImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync()
    let result = await ImagePicker.launchCameraAsync ({
      allowsEditing: true,
      base64 : true,
      quality: 0.2,
    });
    loadedPic(result)
  }

  const disconnect = async ()=> {
    await storage.delete('token')
    await navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    })
  }

  const loadedPic = result =>{
    setLoading(true);
    if (!result.cancelled) {
      getLink(result.base64)
      .then( photoLink => {
        navigation.replace('BeforeScan',{
          photo : { ...photoLink.data , ...photoLink.delete_url },
          ...geoloc 
        })
      })
      .catch(()=> setLoading(false))
    }
    else
      setLoading(false)
  }

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar 
        style="auto" 
        hidden={true} 
        />
      <View><Text style ={{color : Colors.white}} onPress={disconnect} >disconnect</Text></View>
        {
          loading ? 
          <ActivityIndicator 
                    animating ={loading}
                    size="large" 
                    color={Colors.dark_grey}   
                    hidesWhenStopped={true} />
          : null
        }
        <View style={Style.formHolder} >
            <Svg 
                source={assets.car}
                style={{
                  alignSelf: 'center',
                  marginTop : 25
                }}
            />
            <Text style={[Style.header,{
              color : Colors.white ,
              textAlign : 'center',
              marginVertical : 20,
              fontSize : 16,
              marginHorizontal : "20%"
            }]}>
                {Strings.addScan.option}
            </Text>
            <View style={[Style.container_23,{marginBottom : 0}]}>
              <VerticalButton title={Strings.button.getFromGallery} type="import" color="dark_grey" textColor="white" fill={Colors.white} onPress={pickImage} disabled={loading} />
              <VerticalButton title={Strings.button.takePhoto} type="camera" color="dark_grey" textColor="white" fill={Colors.white} onPress={takeImage} disabled={loading} />
            </View>
            <DarkButton title={Strings.button.cancel} onPress={navigation.goBack} disabled={loading}  />
        </View>
    </SafeAreaView>
  )
}

export default NewScan