import React from 'react';
import { StyleSheet, Text, TextInput, View ,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/pages/Splash';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ title: 'Get The Plate' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}