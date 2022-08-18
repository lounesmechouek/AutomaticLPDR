import React ,{useState,useEffect} from 'react'
import { SafeAreaView, ScrollView ,View ,Text, Image, FlatList} from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri';
import Colors from '../colors';
import { Mock } from '../../tests/mocks';
import ImageHolder from '../components/ImageHolder';
import FloatingColorButton from '../components/FloatingColorButton';
import LightButton from '../components/LightButton';
import getGeo from '../utils/geocoder';

const ScanPage = ({ route, navigation }) => {
    const { scan } = route.params
    const [photos, setphotos] = useState([])
    const [errMsg, seterrMsg] = useState()
    const [addr, setAddr] = useState(null)
    useEffect(() => {
      Mock.getScanPhotos(scan.id)
      .then(res => setphotos(res))
      .catch(err => seterrMsg(err.error))
      getGeo( scan.lat, scan.lon )
      .then(res=> setAddr(res))
      .catch(err => setAddr("Position non disponible"))
    }, [])
    const confirmDelete = ()=>{
        navigation.goBack()
    }
    //fill = {scan.is_flagged ? Colors.red : null}
    return (
        <SafeAreaView style={Style.container}>
            <LightButton title={Strings.button.back} icon="back" align="left" onPress={()=>navigation.goBack()}/>
            <Svg
                source={require('../assets/svg/21.svg')}
                style={{ 
                    position : "absolute",
                    right : 0,
                    top : 60
                }}
            />
            <Text style={Style.plateTxt}>
                {scan.plate_text}
            </Text>
            <Text style={Style.scanItemTexts}>{Strings.home.precision} : <Text style={{color : Colors.green , fontFamily : 'QuanticoB'}}>{scan.accuracy}</Text></Text>
            <View style={{flexDirection : 'row'}}>
                <Svg
                    source={require('../assets/svg/4.svg')}
                />
                <Text style={Style.scanItemTexts}>{addr}</Text>
            </View>
            <Svg
                source={require('../assets/svg/21.svg')}
                style={{ 
                    position : "absolute",
                    right : 0,
                    top : 60
                }}
            />
            <Text style={Style.scanItemTexts}></Text>
            <FlatList
                data={photos}
                renderItem={ ({item}) => <ImageHolder image_url={item.file_name_link} />}
                keyExtractor={item => item.id}
                extraData={photos}
            />
            <FloatingColorButton title={Strings.button.delete} color="red" type="delete" onPress={confirmDelete} />
        </SafeAreaView>
    )
}

export default ScanPage