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
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import scale from "../configs/scale";
import Scanner from "../components/Sacnner";
import {
  icon_color,
  icon_color_2,
  main_color1,
  main_color2,
  regular,
} from "../configs/Colors";
import { TEXT } from "../configs/TEXT";
import { LinearGradient } from "expo-linear-gradient";
import { chengePassword } from "../services/class_services";
import { useSelector } from "react-redux";
import { deleteToken } from "../redux/actions/tokenAction";

const Change_password = () => {
  const { goBack, navigate } = useNavigation();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visiblenewPass, setVisiblenewPass] = useState(true);
  const [visibleconfirmNewPass, setVisibleconfirmNewPass] = useState(true);
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [check, setCheck] = useState<any>();
  const { user } = useSelector((state: any) => state.userState);

  const validateForm = async () => {
    if (password === "") {
      Alert.alert("Current password can not be empty");
    } else if (newPass === "" || newPass.trim().length < 6) {
      Alert.alert("New password invalid");
    } else if (confirmNewPass === "") {
      Alert.alert("Confirm New password invalid");
    } else if (confirmNewPass !== newPass) {
      Alert.alert("Confirm new password an new password are not the same");
    } else {
      const temp = await chengePassword(null, user._id, {
        current_password: password,
        password: newPass,
      });

      if (temp.message === "Sucessfully") {
        Alert.alert(temp.message, "Please return to login!", [
          { text: "OK", onPress: () => deleteToken() },
        ]);
      } else Alert.alert(temp.message);
      //   console.log(temp);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.V_back_button} onPress={() => goBack()}>
          <Image
            style={styles.img_header_icon}
            source={require("../images/ic_left_arrow.png")}
          />
          <Text style={styles.txt_header}>Account</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={[main_color1, main_color2]}
        start={[1, 1]}
        end={[1, 0]}
      >
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          <View style={styles.v_inputContainer}>
            <Image
              style={[styles.ic_icon, { tintColor: regular }]}
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
                style={[styles.ic_icon, { tintColor: regular }]}
                source={require("../images/ic_eye.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.v_inputContainer}>
            <Image
              style={[styles.ic_icon, { tintColor: regular }]}
              source={require("../images/ic_lock.png")}
            />
            <TextInput
              style={styles.txtIp_inputContent}
              secureTextEntry={visiblenewPass}
              placeholderTextColor="#707070"
              placeholder={"New password"}
              value={newPass}
              onChangeText={setNewPass}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                setVisiblenewPass(!visiblenewPass);
              }}
            >
              <Image
                style={[styles.ic_icon, { tintColor: regular }]}
                source={require("../images/ic_eye.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.v_inputContainer}>
            <Image
              style={[styles.ic_icon, { tintColor: regular }]}
              source={require("../images/ic_lock.png")}
            />
            <TextInput
              style={styles.txtIp_inputContent}
              secureTextEntry={visibleconfirmNewPass}
              placeholderTextColor="#707070"
              placeholder={"Confirm new password"}
              value={confirmNewPass}
              onChangeText={setConfirmNewPass}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                setVisibleconfirmNewPass(!confirmNewPass);
              }}
            >
              <Image
                style={[styles.ic_icon, { tintColor: regular }]}
                source={require("../images/ic_eye.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        onPress={validateForm}
        style={{
          backgroundColor: icon_color,
          width: 180,
          padding: 15,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
          Change pasword
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Change_password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_color1,
  },

  header: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  V_back_button: {
    // flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
  },

  img_header_icon: {
    height: 17,
    width: 17,
    tintColor: icon_color,
  },

  txt_header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: icon_color,
  },
  v_inputContainer: {
    height: scale(49),
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: scale(20),
    marginBottom: scale(20),
    flexDirection: "row",
    paddingHorizontal: scale(10),
    alignItems: "center",
    borderWidth: 1,
    borderColor: regular,
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
});
