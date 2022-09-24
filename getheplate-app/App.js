import React from 'react';
import { StyleSheet, Text, TextInput, View ,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Splash from './src/pages/Splash';
import  Login  from './src/pages/Login';
import Home from './src/pages/Home';
import ScanPage from './src/pages/ScanPage';
import NewScan from './src/pages/NewScan';
import BeforeScan from './src/pages/BeforeScan';
import Scanning from './src/pages/Scanning';
import ScanResult from './src/pages/ScanResult';
import ScanError from './src/pages/ScanError';

const Stack = createStackNavigator()
// disable warnings
console.disableYellowBox = true;

export default function App() {
  const [loaded] = useFonts({
    Quantico: require('./src/assets/fonts/Quantico-Regular.ttf'),
    QuanticoB: require('./src/assets/fonts/Quantico-Bold.ttf')
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ title: 'Get The Plate' , headerShown : false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' , headerShown : false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' , headerShown : false }}
        />
        <Stack.Screen
          name="ScanPage"
          component={ScanPage}
          options={{ title: 'Scan' , headerShown : false }}
        />
        <Stack.Screen
          name="NewScan"
          component={NewScan}
          options={{ title: 'NewScan' , headerShown : false }}
        />
        <Stack.Screen
          name="BeforeScan"
          component={BeforeScan}
          options={{ title: 'BeforeScan' , headerShown : false }}
        />
        <Stack.Screen
          name="Scanning"
          component={Scanning}
          options={{ title: 'Scanning' , headerShown : false }}
        />
        <Stack.Screen
          name="ScanResult"
          component={ScanResult}
          options={{ title: 'ScanResult' , headerShown : false }}
        />
        <Stack.Screen
          name="ScanError"
          component={ScanError}
          options={{ title: 'ScanError' , headerShown : false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}