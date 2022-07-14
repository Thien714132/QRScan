import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import React, { memo, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Loading from "../components/Loading";
import validationEmail from "../configs/emailValidate";
import scale from "../configs/scale";
import { TEXT } from "../configs/TEXT";
import { setCourse } from "../redux/actions/coursesAction";
import { setHistory } from "../redux/actions/historyAction";
import { setToken } from "../redux/actions/tokenAction";
import { setUser } from "../redux/actions/userAction";
import { getUser, login } from "../services/auth";
import {
  getHistoryByStudent,
  getHistoryByTeacher,
  getStudentClass,
  getTeacherClass,
} from "../services/class_services";

interface LoginProps {}

const Login = memo((props: LoginProps) => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [validateLogin, setValidateLogin] = useState({
    status: false,
    mes: "",
  });
  const [turnOnLoading, setTurnOnLoading] = useState(false);

  // const a = async () => {
  //   const b = await login({ email, password });
  //   console.log(b);
  // };

  const onLogin = async () => {
    setValidateLogin({ status: false, mes: "" });

    if (
      email.trim() === null ||
      email.trim() === "" ||
      !validationEmail(email)
    ) {
      setValidateLogin({
        ...validateLogin,
        status: true,
        mes: "Email invalid",
      });
      return;
    }
    if (
      password.trim() === null ||
      password.trim() === "" ||
      password.length < 6
    ) {
      setValidateLogin({
        ...validateLogin,
        status: true,
        mes: "Password invalid",
      });
      return;
    }

    if (!validateLogin.status) {
      setTurnOnLoading(true);
      const data: any = await login({
        password,
        email,
      });
      // console.log(data);
      try {
        if (data?.access_token) {
          if (data.access_token !== "ERROR") {
            var decoded = jwt_decode(data.access_token);
            setToken(data.access_token);
            const userData: any = await getUser(data.access_token, decoded._id);
            var coursesData = {};
            var historyData = {};
            if (userData?.role === "Student") {
              coursesData = await getStudentClass(
                data.access_token,
                userData._id
              );
              historyData = await getHistoryByStudent(
                data.access_token,
                userData._id
              );
            } else if (userData?.role === "Teacher") {
              coursesData = await getTeacherClass(
                data.access_token,
                userData._id
              );
              historyData = await getHistoryByTeacher(
                data.access_token,
                userData._id
              );
            }
            // console.log(coursesData);
            if (!userData.message && !coursesData.message) {
              setUser(userData);
              setCourse(coursesData);
              setHistory(historyData);
            }
            setTurnOnLoading(false);
            setValidateLogin({
              ...validateLogin,
              status: true,
              mes: "Login failed. Try again",
            });
          } else {
            setTurnOnLoading(false);
          }
        } else if (data?.message) {
          setTurnOnLoading(false);
          setValidateLogin({
            ...validateLogin,
            status: true,
            mes: data.message,
          });
        }
      } catch (error) {
        setTurnOnLoading(false);
        setValidateLogin({
          ...validateLogin,
          status: error,
          mes: data.message,
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {turnOnLoading ? <Loading></Loading> : null}
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
                value={email}
                onChangeText={setEmail}
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
                value={password}
                onChangeText={setPassword}
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
            <TouchableOpacity
              onPress={onLogin}
              style={[
                styles.v_inputContainer,
                {
                  backgroundColor: "#EFC93B",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={styles.txt_buttonText}>{TEXT.LOGIN.BT_LOGIN}</Text>
            </TouchableOpacity>

            <Text style={styles.txt_forgetPassButton}>
              {TEXT.LOGIN.FORGET_PASS}
            </Text>

            {/* <TouchableOpacity
              style={[
                styles.v_registerButton,
                {
                  backgroundColor: "#EFC93B",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={styles.txt_buttonText}>
                {TEXT.LOGIN.BT_REGISTER}
              </Text>
            </TouchableOpacity> */}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={validateLogin.status}
            onRequestClose={() => {
              setValidateLogin({ status: false, mes: "" });
            }}
          >
            <View style={styles.v_modalError}>
              <View style={styles.v_modelErrorField}>
                <Image
                  source={require("../images/ic_warning.png")}
                  style={styles.ic_warning}
                />
                <Text style={styles.txt_errorMes}>{validateLogin.mes}</Text>
                <TouchableOpacity
                  onPress={() => setValidateLogin({ status: false, mes: "" })}
                >
                  <Text style={styles.txt_hideModel}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
});

export default Login;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inner: {
    flex: 1,
  },

  imgBackgroundContainer: {
    height: "54%",
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
  txt_forgetPassButton: {
    fontSize: scale(17),
    color: "#333542",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: scale(20),
  },

  v_modalError: {
    flex: 1,
    backgroundColor: "#000A",
    justifyContent: "center",
    alignItems: "center",
  },

  v_modelErrorField: {
    width: "70%",
    borderRadius: 10,
    backgroundColor: "#fff",
    // justifyContent: 'center',
  },

  ic_warning: {
    height: scale(30),
    width: scale(30),
    marginVertical: scale(20),
    alignSelf: "center",
  },

  txt_errorMes: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },

  txt_hideModel: {
    fontSize: scale(16),
    color: "#4080EF",
    fontWeight: "bold",
    marginVertical: scale(20),
    marginRight: scale(30),
    alignSelf: "flex-end",
  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT,
  },
});
