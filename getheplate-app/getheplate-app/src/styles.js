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
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
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
      marginBottom : 'auto'
    },
    input : {
      fontFamily: 'Quantico',
      color : Colors.grey,
      backgroundColor : Colors.light_grey,
      margin : '10%',
      fontSize : "16px",
      marginHorizontal : "7%",
      borderRadius : '12px',
      marginBottom : 0,
      padding : "5%"
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
    }
    
  });

export default styles