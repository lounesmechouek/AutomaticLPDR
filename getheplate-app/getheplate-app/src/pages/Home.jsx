import React, { useEffect, useState } from 'react'
import { View ,Text , FlatList, SafeAreaView ,StatusBar} from 'react-native'
import Svg from 'react-native-svg-uri'
import FloatingColorButton from '../components/FloatingColorButton'
import ScanItem from '../components/ScanItem'
import Model, { user_id } from '../model'
import Strings from '../strings'
import Style from '../styles'

const Home = ({navigation}) => {

  const [scans, setScans] = useState([])
  const [empty, setEmpty] = useState(true)
  const newScan = () => {
    navigation.navigate("NewScan")
  }
  useEffect(() => {
    Model.getScans(user_id)
    .then(res =>{
      setEmpty(false)
      setScans(res)
    })
    .catch( err => {
      // Display Error
      // TODO : error popup
    })
  }, [scans])
  
  const updateScans = scan => {
    setScans(scans.map(elt => elt.id==scan.id  ? scan : elt))
  }

  //shd add delete

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar style="auto" />
      <Svg
            source={require('../assets/svg/20.svg')}
            style={Style.decor_logo}
        />
      <Text style={Style.titlePageTxt} >
        {Strings.home.youPlates}
      </Text>
      <FlatList
        data={scans}
        renderItem={ ({item}) => <ScanItem scan={item} updateScans={updateScans} navigation={navigation}/>}
        keyExtractor={item => item.id}
      />
      <FloatingColorButton title={Strings.button.newScan} type="scan" color="dark_grey" onPress={newScan}/>
      { empty ? <Text> {Strings.home.noscan} </Text> : null }
    </SafeAreaView>
  )
}

export default Home