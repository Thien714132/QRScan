import { useNavigation } from "@react-navigation/native";
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
} from "react-native";
import Routes from "../configs/Routes";
import scale from "../configs/scale";
import { TEXT } from "../configs/TEXT";

interface LoginProps {}

const Login = memo((props: LoginProps) => {
  const {navigate} = useNavigation();

  const [visiblePassword, setVisiblePassword] = useState(true);



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            style={styles.imgBackgroundContainer}
            source={require("../images/background.png")}
          />
          <Image
            style={styles.img_background}
            source={require("../images/qrScan.png")}
          />

          <View style={styles.v_loginForm}>
            <Text style={styles.txt_header}>{TEXT.LOGIN.Header}</Text>
            <View style={styles.v_inputContainer}>
              <Image
                style={styles.ic_icon}
                source={require("../images/ic_user.png")}
              />
              <TextInput
                style={styles.txtIp_inputContent}
                placeholderTextColor="#707070"
                placeholder={TEXT.LOGIN.Email}
              ></TextInput>
            </View>

            <View style={styles.v_inputContainer}>
              <Image
                style={styles.ic_icon}
                source={require("../images/ic_lock.png")}
              />
              <TextInput
                style={styles.txtIp_inputContent}
                secureTextEntry={visiblePassword}
                placeholderTextColor="#707070"
                placeholder={TEXT.LOGIN.PASSWORD}
              ></TextInput>
              <TouchableOpacity
                onPress={() => {
                  setVisiblePassword(!visiblePassword);
                }}
              >
                <Image
                  style={[styles.ic_icon, { tintColor: "#BFC1CD" }]}
                  source={require("../images/ic_eye.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=> navigate(Routes.Maintab)}
              style={[
                styles.v_inputContainer,
                {
                  backgroundColor: "#333542",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={styles.txt_buttonText}>{TEXT.LOGIN.BT_LOGIN}</Text>
            </TouchableOpacity>

            <Text style={styles.txt_forgetPassButton}>{TEXT.LOGIN.FORGET_PASS}</Text>

            <TouchableOpacity
              style={[
                styles.v_registerButton,
                {
                  backgroundColor: "#EFC93B",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={styles.txt_buttonText}>{TEXT.LOGIN.BT_REGISTER}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inner: {
    flex: 1,
  },

  imgBackgroundContainer: {
    height: '54%',
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  img_background: {
    // width: '80%',
    height: "19%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    top: scale(110),
  },

  v_loginForm: {
    height: scale(520, true),
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(30),
    position: "absolute",
    bottom: 0,
  },

  txt_header: {
    fontSize: scale(30),
    color: "#2F313E",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: scale(20),
  },

  v_inputContainer: {
    height: scale(49),
    width: "100%",
    backgroundColor: "#F8FAFf",
    borderRadius: scale(20),
    marginBottom: scale(20),
    flexDirection: "row",
    paddingHorizontal: scale(10),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 2,
  },

  v_registerButton: {
    height: scale(49),
    width: "100%",
    backgroundColor: "#F8FAFf",
    borderRadius: scale(20),
    marginBottom: scale(20),
    flexDirection: "row",
    paddingHorizontal: scale(10),
    alignItems: "center",
    shadowColor: "#EFC93B",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 2,
  },

  ic_icon: {
    height: scale(25),
    width: scale(25),
    marginRight: scale(10),
    tintColor: "#333542",
  },

  txtIp_inputContent: {
    height: "80%",
    width: "80%",
    marginRight: scale(10),
    fontStyle: "italic",
    // marginHorizontal: scale(40)
  },

  txt_buttonText: {
    fontSize: scale(20),
    color: "#fff",
    fontWeight: "bold",
  },
  txt_forgetPassButton:{
    fontSize: scale(17),
    color: '#333542',
    fontStyle: "italic",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scale(20)
  }
});
