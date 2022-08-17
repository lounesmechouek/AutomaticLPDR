import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,Button ,Image, InteractionManager } from 'react-native';
import Svg from 'react-native-svg-uri';
import Style from '../styles'
import { Mock } from '../../tests/mocks';
import Strings from '../strings';
const Splash = ({ navigation }) => {

    useEffect(() => {
        //TODO : get persistent token
        token = null
        //Simulating a check
        setTimeout(()=>
        Mock.verifLogin(token)
        .then(res => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
            })
        )
        .catch(err => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
            })
        )
        ,2000)
    },[])
    
    return (
        <View 
            style={Style.container}
            accessible={true}
            accessibilityLabel="Launch!"
            onPress={() => navigation.navigate('Login')}
            >
            <StatusBar style="auto" />
            <View 
                style={[Style.container,Style.loginLogo]}>
                <Svg
                source={require('../assets/svg/10.svg')}
                />
            </View>
            <Text style={Style.footer}>
                {Strings.app.name}</Text>
        </View>
    )
}
  
export default Splash