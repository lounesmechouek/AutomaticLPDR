import React from 'react'
import { View ,Text,TouchableOpacity } from 'react-native'
import Strings from '../strings'
import Style from '../styles'
import Svg from 'react-native-svg-uri';
import Colors from '../colors';


const ScanItem = ({ scan , navigation } ) => {
    
    const goToScanPage = () => {
        navigation.navigate('ScanPage',{
            scan: scan
        })
        // to selected id scan
    }
    return (
    <TouchableOpacity onPress={goToScanPage}>
        <View style={[Style.scanCard,Style.shadowProp]} >
            <Text style={Style.plateTxt}>{scan.plate_text}</Text>
            <Text style={Style.scanItemTexts}>{Strings.home.precision} : <Text style={{color : Colors.green , fontFamily : 'QuanticoB'}}>{scan.accuracy}</Text></Text>
            <Text style={Style.scanItemTexts}>{Strings.home.took_at} { new Date(scan.created_at).toLocaleString()}</Text>
            <Svg
                source={require('../assets/svg/8.svg')}
                style={{ 
                    position : "absolute",
                    right : "5%",
                    bottom : '10%'
                }}
                fill = {scan.is_flagged ? Colors.red : null}
            />
        </View>
    </TouchableOpacity>
    )
}

export default ScanItem