import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { icon_color, main_color1, regular } from "../configs/Colors";
import scale from "../configs/scale";
import { setUser } from "../redux/actions/userAction";
import { getUser } from "../services/auth";
import { changeInfor } from "../services/class_services";

const User_detail = () => {
  const { goBack, navigate } = useNavigation();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [DOB, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useSelector((state: any) => state.userState);
  const { token } = useSelector((state: any) => state.tokenState);
  let postData = {};

  const validateForm = async () => {
    if (phone === "" && DOB === "") {
      Alert.alert("Fill in infromation need to change");
    } else if (
      phone !== "" &&
      DOB !== "" &&
      phone.match(/((09|03|07|08|05)+([0-9]{8})\b)/g)
    ) {
      postData = {
        date_of_birth: DOB,
        phone: phone,
      };
      const temp = await changeInfor(token, user._id, postData);
      if (temp.message === "Sucessfully") {
        const userData: any = await getUser(token, user._id);
        if (userData) {
          setUser(userData);
        }
        Alert.alert(temp.message);
      } else Alert.alert(temp.message);
    } else if (phone === "" && DOB !== "") {
      postData = {
        date_of_birth: DOB,
      };
      const temp = await changeInfor(token, user._id, postData);
      if (temp.message === "Sucessfully") {
        const userData: any = await getUser(token, user._id);
        if (userData) {
          setUser(userData);
        }
        Alert.alert(temp.message);
      } else Alert.alert(temp.message);
    } else if (
      DOB === "" &&
      phone !== "" &&
      phone.match(/((09|03|07|08|05)+([0-9]{8})\b)/g)
    ) {
      postData = {
        phone: phone,
      };
      const temp = await changeInfor(token, user._id, postData);
      if (temp.message === "Sucessfully") {
        const userData: any = await getUser(token, user._id);
        if (userData) {
          setUser(userData);
        }
        Alert.alert(temp.message);
      } else Alert.alert(temp.message);
    } else Alert.alert("Phone invalid");
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

      <View style={{ marginHorizontal: 20, marginTop: 30 }}>
        <Text style={{ fontStyle: "italic", color: regular }}>
          (*Year-Month-Day)
        </Text>
        <View style={styles.v_inputContainer}>
          <Image
            style={[styles.ic_icon, { tintColor: regular }]}
            source={require("../images/ic_birthday.png")}
          />
          <TextInput
            style={styles.txtIp_inputContent}
            secureTextEntry={false}
            placeholderTextColor="#707070"
            placeholder={moment(user.date_of_birth).format("YYYY-MM-DD")}
            value={DOB}
            onChangeText={setDOB}
          ></TextInput>
        </View>

        <View style={styles.v_inputContainer}>
          <Image
            style={[styles.ic_icon, { tintColor: regular }]}
            source={require("../images/ic_phone.png")}
          />
          <TextInput
            style={styles.txtIp_inputContent}
            secureTextEntry={false}
            placeholderTextColor="#707070"
            placeholder={user.phone}
            value={phone}
            onChangeText={setPhone}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={validateForm}
          style={{
            backgroundColor: icon_color,
            width: 100,
            padding: 15,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User_detail;

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
