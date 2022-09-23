import React ,{useState,useEffect} from 'react'
import { SafeAreaView, ScrollView ,View ,Text, Image, FlatList} from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri';
import Colors from '../colors';
import { Mock } from '../../tests/mocks';
import ImageHolder from '../components/ImageHolder';
import FloatingColorButton from '../components/FloatingColorButton';
import LineColorButton from '../components/LineColorButton';
import LightButton from '../components/LightButton';
import getGeo from '../utils/geocoder';
import Model from '../model';

const ScanPage = ({ route , navigation }) => {
    
    let { scan , updateScans} = route.params?.scanPack
    const [photos, setphotos] = useState([])
    const [errMsg, seterrMsg] = useState()
    const [addr, setAddr] = useState(null)
    const [marked, setmarked] = useState(scan.flagged)
    useEffect(() => {
        //get Photos
        Model.getScanPhotos(scan.id)
        .then(res => setphotos(res))
        .catch(err => seterrMsg(err.error))
        //getGeoloc
        getGeo( scan.lat, scan.lon )
        .then(res=> setAddr(res))
        .catch(err => setAddr("Position non disponible"))
        }, [])
    const confirmDelete = ()=>{
        Model.deleteScan(scan.id)
        .then(navigation.goBack())
        .catch(err => console.log(err))
    }
    const toggleMark = ()=>{
        Model.flagScan(scan.plate_id,!marked)
        .then(res => { updateScans(scan) ; setmarked(!marked) })
        .catch( err => console.log("message pop up here",err) )
    }
    return (
        <SafeAreaView style={Style.container}>
            <Svg
                source={require('../assets/svg/21.svg')}
                style={Style.decor_logo}
            />
            <LightButton title={Strings.button.back} icon="back" align='flex-start' onPress={()=>navigation.goBack()}/>
            <Text style={Style.plateTxt}>{scan.text_plate}</Text>
            <Text style={Style.scanItemTexts}>{Strings.home.precision} : <Text style={{color : Colors.green , fontFamily : 'QuanticoB'}}>{Math.floor(scan.accuracy*100)} %</Text></Text>
            <View style={[{flexDirection : 'row' , alignItems : 'flex-start'},Style.scanItemTexts]}>
                <Svg source={require('../assets/svg/4.svg')}/>
                <Text style={[Style.scanItemTexts,{marginBottom : 0}]}>{addr}</Text>
            </View>
            <View style={Style.container_23}>
                {
                    marked ? <LineColorButton type="plate_small" title={Strings.button.unmark}  fill={Colors.red} textColor="red" onPress={toggleMark}/>
                    : <LineColorButton type="plate_small" title={ Strings.button.mark}  fill={Colors.dark_grey} textColor="dark_grey" onPress={toggleMark}/>
                }
            </View>
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