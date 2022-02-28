import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import Routes from "../configs/Routes";
import scale from "../configs/scale";
import { TEXT } from "../configs/TEXT";

const DashBoard = () => {

  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.v_header}>
            <Image source={require('../images/background.png')} style={styles.pic_backgroud}/>
            <View style={styles.v_name}> 
              <Text style={{fontSize: scale(13), color: '#fff'}}>{TEXT.DASHBOARD.TODAY}</Text>
              <Text style={{fontSize: scale(27), color: '#fff', fontWeight: 'bold'}}>{TEXT.DASHBOARD.Hi}</Text>
            </View>
            <TouchableOpacity style={styles.v_bellIcon}>
              <Image style={styles.ic_bell} source={require('../images/ic_bell.png')}/>
            </TouchableOpacity>
      </View>
      <ScrollView style={styles.v_scrollView}>

        <LinearGradient colors={['#EFC93B', '#F37335']} start={[0, 1]} end ={[1,0]} style={[styles.v_qrCode, {...styles.shadow, shadowColor: "#EFC93B"}]}>
          <View style={styles.v_qrCodeContainer}>
            <Image style={styles.ic_qrCode} source={require('../images/qrCode.png')} />
          </View>
        </LinearGradient>

        <View style={styles.v_dashBoard}>
          <Text style={{fontWeight: '500', fontSize: scale(22), color: '#2C2C33',marginBottom: scale(20) }}>- Dashboard -</Text>
          <View style={styles.v_dashRow}>
            <TouchableOpacity style={[styles.bt_dash, {...styles.shadowButton}]}>
              <Image style={styles.ic_dashButton} source={require('../images/ic_calendar.png')}/>
              <Text style={styles.txt_dashButton}>{TEXT.DASHBOARD.CALENDAR}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bt_dash, {...styles.shadowButton, marginHorizontal: scale(20)}]}>
              <Image style={styles.ic_dashButton} source={require('../images/ic_class.png')}/>
              <Text style={styles.txt_dashButton}>{TEXT.DASHBOARD.CLASS}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bt_dash, {...styles.shadowButton}]}>
              <Image style={styles.ic_dashButton} source={require('../images/ic_history.png')}/>
              <Text style={styles.txt_dashButton}>{TEXT.DASHBOARD.HISTORY}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.v_dashRow}>
            <TouchableOpacity style={[styles.bt_dash, {...styles.shadowButton}]}>
              <Image style={styles.ic_dashButton} source={require('../images/ic_support.png')}/>
              <Text style={styles.txt_dashButton}>{TEXT.DASHBOARD.SUPPORT}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bt_dash, {...styles.shadowButton, marginHorizontal: scale(20)}]}>
              <Image style={styles.ic_dashButton} source={require('../images/ic_setting.png')}/>
              <Text style={styles.txt_dashButton}>{TEXT.DASHBOARD.SETTING}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bt_dash, {...styles.shadowButton}]} onPress={()=> navigate(Routes.Login)}>
              <Image style={styles.ic_dashButton} source={require('../images/ic_logout.png')}/>
              <Text style={styles.txt_dashButton}>{TEXT.DASHBOARD.LOGOUT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  v_scrollView:{
    // paddingBottom: '15%'
  },

  v_header:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomLeftRadius: scale(20),
    // borderBottomRightRadius: scale(20),
    // marginTop: scale(10)
  },

  pic_backgroud:{
    height: scale(100),
    width: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30)
  },

  v_name:{
    // marginLeft: scale(30), 
    position: 'absolute',
    left: scale(20),
    bottom: scale(20)
  },

  v_bellIcon:{
    position: 'absolute',
    bottom: scale(20),
    right: scale(30),
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    backgroundColor: '#f4f6f8',
    borderRadius: scale(20)
  },

  ic_bell:{
    height: scale(30),
    width: scale(30),
    tintColor: '#2C2C33'
  },

  v_qrCode:{
    alignSelf: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    // backgroundColor: '#EFC93B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: scale(20),
    marginBottom: 20
  },

  v_qrCodeContainer:{
    alignSelf: 'baseline',
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },

  ic_qrCode:{
    height: scale(220),
    width: scale(220),
  },

  v_dashBoard:{
    alignItems: 'center',
    marginBottom: '15%'
  },

  v_dashRow:{
    flexDirection: 'row',
    marginHorizontal: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(20)
  },

  bt_dash:{
    height: scale(90),
    width: scale(90),
    backgroundColor: '#fff',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center'
  },

  ic_dashButton:{
    height: scale(30),
    width: scale(30),
    tintColor: '#2C2C33',
    resizeMode: 'contain'
  },

  txt_dashButton:{
    fontSize: scale(15),
    color: '#2C2C33',
    marginTop: scale(5),
    fontWeight: '500'
  },

  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
  },

  shadowButton:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  }
  
});
