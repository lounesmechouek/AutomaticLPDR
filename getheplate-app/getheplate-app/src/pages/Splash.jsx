import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,Button ,Image, InteractionManager } from 'react-native';
import Svg from 'react-native-svg-uri';
import Style from '../styles'
const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(()=>
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
            })
        ,2000)
      // TODO: here api call to verify session before navigation
    },[])
    
    return (
        <View 
            style={Style.container}
            accessible={true}
            accessibilityLabel="Launch!"
            onPress={() => navigation.navigate('Login')}
            >
            <StatusBar style="auto" />
            <Svg
                source={require('../assets/svg/10.svg')}
                style={{ heigth: "200px"}}
            />
            <Text style={Style.header}>
                GET THE PLATE</Text>
        </View>
    )
}
  
export default Splash