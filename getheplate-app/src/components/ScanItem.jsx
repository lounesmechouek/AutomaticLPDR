import React from 'react'
import { View ,Text,TouchableOpacity } from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri';
import Colors from '../colors';


const ScanItem = ({ scan , updateScans , navigation } ) => {
    
    const goToScanPage = () => {
        navigation.navigate('ScanPage',{
            scanPack :{
                scan: scan,
                updateScans : updateScans
            }
        })
    }
    return (
    <TouchableOpacity onPress={goToScanPage}>
        <View style={[Style.scanCard,Style.shadowProp]} >
            <Text style={Style.plateTxt}>{scan.text_plate}</Text>
            <Text style={Style.scanItemTexts}>{Strings.home.precision} : <Text style={{color : Colors.green , fontFamily : 'QuanticoB'}}>{Math.floor(scan.accuracy*100)} %</Text></Text>
            <Text style={Style.scanItemTexts}>{Strings.home.took_at} { new Date(scan.created_at).toLocaleString()}</Text>
            <Svg
                source={require('../assets/svg/8.svg')}
                style={{ 
                    position : 'absolute',
                    right : '5%',
                    bottom : '10%'
                }}
                fill = {scan.flagged ? Colors.red : null}
            />
        </View>
    </TouchableOpacity>
    )
}

export default ScanItem