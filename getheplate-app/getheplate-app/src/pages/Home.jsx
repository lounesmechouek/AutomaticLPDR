import React, { useEffect, useState } from 'react'
import { View ,Text , FlatList, SafeAreaView} from 'react-native'
import { Mock } from '../../tests/mocks'
import ScanItem from '../components/ScanItem'
import Strings from '../strings'
import Style from '../styles'

const Home = ({navigation}) => {

  const [scans, setScans] = useState([])
  const [empty, setEmpty] = useState(true)

  useEffect(() => {
    Mock.getScans(null)
    .then(res =>{
      setEmpty(false)
      setScans(res.data)
    })
    .catch( err => {
      // Display Error
      // TODO : error popup
    })
  }, [])
  

  return (
    <SafeAreaView style={Style.container}>
      <Text style={Style.titlePageTxt} >
        {Strings.home.youPlates}
      </Text>
      <FlatList
        data={scans}
        renderItem={ ({item}) => <ScanItem scan={item} navigation={navigation}/>}
        keyExtractor={item => item.id}
        extraData={scans}
      />
    </SafeAreaView>
  )
}

export default Home