import React ,{useState,useEffect} from 'react'
import { SafeAreaView, ScrollView ,View ,Button, Image, FlatList} from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri';
import Colors from '../colors';
import { Mock } from '../../tests/mocks';
import ImageHolder from '../components/ImageHolder';
import FloatingColorButton from '../components/FloatingColorButton';

const ScanPage = ({ route, navigation }) => {
    const { scan } = route.params
    const [photos, setphotos] = useState([])
    const [errMsg, seterrMsg] = useState()
    useEffect(() => {
      Mock.getScanPhotos(scan.id)
      .then(res => setphotos(res))
      .catch(err => seterrMsg(err.error))
    }, [])
    const confirmDelete = ()=>{
        navigation.goBack()
    }
    //fill = {scan.is_flagged ? Colors.red : null}
    return (
        <SafeAreaView style={Style.container}>
            <Button title={Strings.button.back} onPress={()=>navigation.goBack()}/>
            <Svg
                source={require('../assets/svg/21.svg')}
                style={{ 
                    position : "absolute",
                    right : 0,
                    top : 60
                }}
            />
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