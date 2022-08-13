import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,Button } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
        <Text>Hey you !</Text>
        <Button title="Click here"/>
        <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  
export default Splash