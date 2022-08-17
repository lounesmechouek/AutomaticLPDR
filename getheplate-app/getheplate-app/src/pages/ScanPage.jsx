import React ,{useState,useEffect} from 'react'
import { SafeAreaView, ScrollView ,View ,Button} from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri';
import Colors from '../colors';
import { Mock } from '../../tests/mocks';

const ScanPage = ({ route, navigation }) => {
    const { scan } = route.params
    const [photos, setphotos] = useState([])
    const [errMsg, seterrMsg] = useState()
    useEffect(() => {
      Mock.getScanPhotos(scan.id)
      .then(res => setphotos(res))
      .catch(err => seterrMsg(err.error))
    }, [])
    
    return (
        <SafeAreaView style={Style.container}>
            <Button title="back" onPress={()=>navigation.goBack()}/>
            <Svg
                source={require('../assets/svg/21.svg')}
                style={{ 
                    position : "absolute",
                    right : 0,
                    top : 60
                }}
                fill = {scan.is_flagged ? Colors.red : null}
            />
            <ScrollView>
                <View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScanPage