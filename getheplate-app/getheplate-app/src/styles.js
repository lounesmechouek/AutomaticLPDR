import { StyleSheet } from 'react-native'
import Colors from './colors'

const Style = StyleSheet.create({
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
      shadowOffset: {width: 1, height: 10},
      shadowOpacity: 0.1,
      shadowRadius: 10,
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
      marginVertical : '5%',
      marginHorizontal : "5%",
      padding: "4%",
      width : '90%' ,
      flexDirection:'row',
      color : Colors.white,
      backgroundColor : Colors.dark_grey,
      borderRadius : "50%"
    },
    dark_button_txt : {
      fontFamily: 'QuanticoB',
      textAlign : 'center',
      marginLeft : 'auto',
      marginRight : 'auto',  
      color : Colors.white,
      fontSize : "16px"
    },
    light_button_ctn : {
      alignItems: "center",
      margin : 'auto',
      marginTop : '10%',
      marginHorizontal : "5%",
      padding: "4%",
      flexDirection:'row',
      backgroundColor : Colors.light_grey,
      borderRadius : "50%"
    },
    light_button_txt : {
      fontFamily: 'QuanticoB',
      color : Colors.grey,
      fontSize : "16px",
      paddingHorizontal : 10
    },
    scanCard :{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical : '3%',
      marginHorizontal : "5%",
      minWidth : "90%",
      minHeight : "30%",
      borderRadius : "20px",
      borderColor : Colors.light_grey,
      backgroundColor : Colors.white
    },
    plateTxt :{
      borderRadius : "10%",
      paddingHorizontal : "2%",
      fontFamily: 'QuanticoB',
      alignSelf : "left",
      marginVertical : '5%',
      marginHorizontal : "5%",
      color : Colors.black ,
      borderColor : Colors.light_grey,
      borderWidth : "5%",
      fontSize : "22px",
    },
    scanItemTexts:{
      alignSelf :"left",
      fontFamily: 'Quantico',
      marginHorizontal : "7%",
      fontSize : "12px",
      marginBottom : "5%",
    },
    titlePageTxt : {
      fontFamily: 'QuanticoB',
      alignSelf : "left",
      marginHorizontal : "10%",
      marginVertical : "5%",
      color : Colors.black ,
      fontSize : "24px"
    },
    floating_button_ctn :{
      alignItems: "center",
      bottom : 0,
      left : 0,
      flexDirection:'row',
      minWidth : "90%",
      maxHeight : 100,
      padding: "4%",
      color : Colors.white,
      backgroundColor : Colors.dark_grey,
      borderRadius : "20%"
    },
    floating_button_icon : { 
      marginLeft: 0,
      marginRight : "auto"
    },
    floating_button_txt :{
      fontFamily: 'Quantico',
      color : Colors.white,
      fontSize : "18px",
      marginRight : "auto"
    },
    line_button_ctn :{
      alignItems: 'center',
      flexDirection:'row',
      minHeight : 60,
      marginVertical : 2,
      marginRight : "auto",
      color : Colors.light_grey,
      backgroundColor : Colors.black,
      borderRadius : "20%",
    },
    line_button_icon : { 
      width : 'auto',
      alignSelf : 'center',
      paddingHorizontal: 15
    },
    line_button_txt :{
      fontFamily: 'QuanticoB',
      color : Colors.white,
      fontSize : "15px",
      paddingRight : 15
    },
    container_23 :{
      flexDirection : 'row' ,
      width : "90%",
      flexWrap: 'wrap',
      alignSelf : 'center',
      alignItems : 'center',
      marginBottom : 20,
      justifyContent : 'space-between'
    },
    imageHolder : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical : '3%',
      marginHorizontal : "5%",
      minWidth : "90%",
      minHeight : "30%",
      maxHeight : 320,
      borderRadius : "20%",
      padding : "2%",
      backgroundColor : Colors.white
      
    },
    image :{
      width: "100%",
      height : 300,
      maxHeight: 300,
      borderRadius : "15%"
    },
    vertical_button_ctn :{
      alignItems: 'center',
      flexDirection : 'column',
      height : 180,
      marginVertical : 10,
      borderRadius : "20%",
    },
    vertical_button_icon : { 
      width : 'auto',
      marginTop : 'auto',
      marginVertical : 'auto',
      alignSelf : 'center',
    },
    vertical_button_txt :{
      fontFamily: 'QuanticoB',
      width : 140,
      paddingHorizontal: 15,
      textAlign : 'center',
      textAlignVertical : 'center',
      marginTop : 'auto',
      marginBottom : "15%",
    },
    floating_box_ctn_2 :{
      position : 'absolute',
      bottom : "5%",
      width : "90%",
      height : 130,
      justifyContent : 'space-between'
    },
    alert_ctn : {
      flexDirection : 'row',
      alignItems : 'center',
      maxWidth : "90%",
      marginTop : 10,
    },
    alert_svg : {
      alignSelf: 'center',
      marginBottom : 'auto'
    },
    decor_logo : { 
      position : "absolute",
      right : 0,
      top : 60
    },
    steps_ctn : {

    },
    step : {

    },
    step_svg : {

    },
    step_text : {

    },
    
    
  });

export default Style