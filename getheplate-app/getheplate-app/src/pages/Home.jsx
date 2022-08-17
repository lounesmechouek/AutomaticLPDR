import React, { useEffect, useState } from 'react'
import { View ,Text , FlatList, SafeAreaView ,StatusBar} from 'react-native'
import Svg from 'react-native-svg-uri'
import { Mock } from '../../tests/mocks'
import FloatingButton from '../components/FloatingButton'
import ScanItem from '../components/ScanItem'
import Strings from '../strings'
import Style from '../styles'

const Home = ({navigation}) => {

  const [scans, setScans] = useState([])
  const [empty, setEmpty] = useState(true)
  const newScan = () => {
    navigation.navigate("Splash")
  }
  useEffect(() => {
    Mock.getScans(null)
    .then(res =>{
      setEmpty(false)
      setScans(res)
    })
    .catch( err => {
      // Display Error
      // TODO : error popup
    })
  }, [])
  

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar style="auto" />
      <Svg
            source={require('../assets/svg/20.svg')}
            style={{ 
                position : "absolute",
                right : 0,
                top : 60
            }}
        />
      <Text style={Style.titlePageTxt} >
        {Strings.home.youPlates}
      </Text>
      <FlatList
        data={scans}
        renderItem={ ({item}) => <ScanItem scan={item} navigation={navigation}/>}
        keyExtractor={item => item.id}
        extraData={scans}
      />
      <FloatingButton title={Strings.button.newScan} onPress={newScan}/>
      { empty ? <Text> {Strings.home.noscan} </Text> : null }
    </SafeAreaView>
  )
}

export default Home