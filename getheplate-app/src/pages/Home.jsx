import React, { useEffect, useState } from 'react'
import { View ,Text , FlatList, SafeAreaView } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import Svg from 'react-native-svg-uri'
import FloatingColorButton from '../components/FloatingColorButton'
import ScanItem from '../components/ScanItem'
import Model, { user_id } from '../model'
import Strings from '../strings'
import Style from '../styles'

const Home = ({navigation}) => {
  NavigationBar.setBackgroundColorAsync("white");
  const [scans, setScans] = useState([])
  const newScan = () => {
    navigation.navigate("NewScan")
  }
  useEffect(() => {
    Model.getScans()
    .then(res =>{
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
      <StatusBar 
        style='light'
        animated={true}
        translucent={false}
        hidden={false}
        backgroundColor = 'white' />  
      <Svg
            source={require('../assets/svg/20.svg')}
            style={Style.decor_logo}
        />
        <Text style={Style.titlePageTxt}>
          {Strings.home.youPlates}
        </Text>
        <FlatList
          data={scans}
          renderItem={ ({item}) => <ScanItem scan={item} updateScans={updateScans} navigation={navigation}/>}
          keyExtractor={item => item.id}
        />
      <FloatingColorButton title={Strings.button.newScan} type="scan" color="dark_grey" onPress={newScan}/>
    </SafeAreaView>
  )
}

export default Home