import React ,{ useEffect, useState ,useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View ,Button ,Image, Keyboard, TouchableHighlight } from 'react-native';
import Style from '../styles'
import Svg from 'react-native-svg-uri';
import Strings from '../strings';
import DarkButton from '../components/DarkButton';
import Colors from '../colors';
import Model from '../model';
import { storage } from '../utils/storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  /* keybord bullshit to scroll*/
  const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);
  /* end of bullshit*/

  const [err, setErr] = useState(false)
  const [errMsg, seterrMsg] = useState()
  
  const log = () => {
    Model.Login(username,password)
    .then( async res => {
      //saveTokenPersistent
      await storage.save('token',res.token)
      await storage.save('user_id',res.user.id)
      navigation.navigate('Splash')
    })
    .catch( err => { 
        setErr(true)
        console.log(err)
        seterrMsg(err)
    })
  } 

  return (
      <View style={[
        Style.container ,
        {bottom: keyboardOffset}
        ]}
        accessible={true}
        accessibilityLabel="Login"
        >
        <StatusBar style="auto" />
        <View style={[Style.container,Style.loginLogo]}>
          <Svg
            source={require('../assets/svg/10.svg')}
            style={{ heigth: "100px"}}
          />
          <Text style={Style.header}>
            GET THE PLATE
          </Text>
        </View>
        <View style={[Style.formHolder,Style.shadowProp]}>
          <TextInput 
            style={err ? [Style.input,Style.inputErr] : Style.input}
            onChangeText={setUsername}
            placeholder= {Strings.placeHolder.username}
            value={username}
            placeholderTextColor= {Colors.light_black} 
            returnKeyType="next"
            blurOnSubmit={true}
            onSubmitEditing={() => passwordInputRef.current.focus()}
            keyboardType="alphanumeric"
          />
          <TextInput 
            style={err ? [Style.input,Style.inputErr] : Style.input}
            onChangeText={setPassword}
            ref={passwordInputRef}
            placeholder= {Strings.placeHolder.password}
            placeholderTextColor= {Colors.light_black} 
            secureTextEntry={true}
            blurOnSubmit={true}
            value={password}
            keyboardType="alphanumeric"
          />
          <Text style={Style.errMsg}>{errMsg}</Text>
          <DarkButton title={Strings.button.login} onPress={log} />
        </View>
        
      </View>
  )
}

export default Login