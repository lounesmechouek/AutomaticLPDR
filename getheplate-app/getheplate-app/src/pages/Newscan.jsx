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
import * as ImagePicker from 'expo-image-picker';

const NewScan = ({navigation}) => {
  const [photo, setPhoto] = useState(null)
  const [geoloc, setGeoloc] = useState({lat:null,lon:null})
  const importPhoto  = ()=>{
    setPhoto(null)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64 : true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result.uri);
    }

    navigation.navigate('BeforeScan',{
      photo : photo,
      ...geoloc 
    })
  };

  const takeImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync()
    let result = await ImagePicker.launchCameraAsync ({
      allowsEditing: true,
      aspect: [16, 9],
      base64 : true,
      quality: 1,
    });
    
    console.log(result);
    if (!result.cancelled) {
      setPhoto(result.uri);
    }

    navigation.navigate('BeforeScan',{
      photo : photo,
      ...geoloc 
    })
  }

  const loadedPic = ()=>{
    setPhoto(null)
    setGeoloc({lat:null,lon:null})
    // save in 
    navigation.navigate('BeforeScan',{
      photo : photo,
      ...geoloc 
    })
  }

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar style="auto" />
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
              <VerticalButton title={Strings.button.getFromGallery} type="import" color="dark_grey" textColor="white" fill={Colors.white} onPress={pickImage}/>
              <VerticalButton title={Strings.button.takePhoto} type="camera" color="dark_grey" textColor="white" fill={Colors.white} onPress={takeImage}/>
            </View>
            <DarkButton title={Strings.button.cancel} onPress={navigation.goBack}/>
        </View>
    </SafeAreaView>
  )
}

export default NewScan