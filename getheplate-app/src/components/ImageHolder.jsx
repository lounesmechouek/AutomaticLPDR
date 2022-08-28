import React from 'react'
import Style from '../styles'
import { View, Image} from 'react-native'

const ImageHolder = ({image_url}) => {
    return(
        <View>
            <View style= {[Style.imageHolder,Style.shadowProp]}>
                <Image
                style= {Style.image}
                source={{uri : image_url }} 
                />
            </View>
        </View>
    )
}
export default ImageHolder