import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,Button ,Image, InteractionManager } from 'react-native';
import Svg from 'react-native-svg-uri';
import Style from '../styles'
import { Mock } from '../../tests/mocks';
import Strings from '../strings';
import Model from '../model';
const Splash = ({ navigation }) => {

    useEffect(() => {
        Model.verifLogin()
        .then(res => {console.log(res);navigation.replace('Home')}
        )
        .catch(err =>{console.log(res);navigation.replace('Login')}
        )
    },[])
    
    return (
        <View 
            style={Style.container}
            accessible={true}
            accessibilityLabel="Launch!"
            onPress={() => navigation.navigate('Login')}
            >
            <StatusBar style="light" />
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