import { StyleSheet } from 'react-native'
import Colors from './colors'

const styles = StyleSheet.create({
    global : {
      fontFamily: 'Quantico',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    header : {
      fontFamily: 'Quantico',
      fontSize : "20px"
    },
    footer :{
      fontFamily: 'Quantico',
      fontSize : "20px",
      marginBottom : '10%',
      marginTop : 'auto'
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -1, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    formHolder :{
      backgroundColor : Colors.grey,
      borderRadius : '20px',
      width : '90%',
      margin : 'auto',
      marginBottom : '10%',
      marginTop : 'auto'
    },
    loginLogo : {
      marginBottom : 'auto',
      heigth: "200px"
    },
    input : {
      fontFamily: 'QuanticoB',
      color : Colors.grey,
      backgroundColor : Colors.light_grey,
      margin : '10%',
      fontSize : "14px",
      marginHorizontal : "7%",
      borderRadius : '12px',
      marginBottom : 0,
      padding : "5%"
    },
    inputErr :{
      color : Colors.red,
      borderColor : Colors.red,
      borderWidth : "2%"
    },
    errMsg :{
      fontFamily: 'QuanticoB',
      color : Colors.red,
      marginHorizontal : "7%",
      marginTop : '3%',
      textAlign : 'center'

    },
    dark_button_ctn : {
      alignItems: "center",
      margin : 'auto',
      marginVertical : '10%',
      marginHorizontal : "5%",
      padding: "4%",
      color : Colors.white,
      backgroundColor : Colors.dark_grey,
      borderRadius : "50%"
    },
    dark_button_txt : {
      fontFamily: 'QuanticoB',
      color : Colors.white,
      fontSize : "16px"
    },
    scanCard :{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical : '5%',
      minWidth : "90%",
      minHeight : "30%",
      borderRadius : "20px",
      borderColor : Colors.light_grey,
      backgroundColor : Colors.white
    },
    plateTxt :{
      borderRadius : "5%",
      paddingHorizontal : "2%",
      fontFamily: 'QuanticoB',
      alignSelf : "left",
      marginVertical : '5%',
      marginHorizontal : "7%",
      color : Colors.black ,
      borderColor : Colors.light_grey,
      borderWidth : "5%",
      fontSize : "20px",
    },
    scanItemTexts:{
      alignSelf :"left",
      fontFamily: 'Quantico',
      marginHorizontal : "7%",
      fontSize : "12px"
    },
    titlePageTxt : {
      fontFamily: 'QuanticoB',
      alignSelf : "left",
      marginHorizontal : "10%",
      marginVertical : "5%",
      color : Colors.black ,
      fontSize : "24px"
    }
    
  });

export default styles