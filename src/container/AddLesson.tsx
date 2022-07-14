import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {
  icon_color,
  main_color1,
  main_color2,
  regular,
} from "../configs/Colors";
import scale from "../configs/scale";
import { TEXT } from "../configs/TEXT";
import { deleteToken } from "../redux/actions/tokenAction";
import {
  addLesson,
  chengePassword,
  getStudentClass,
  getTeacherClass,
} from "../services/class_services";
import moment from "moment";
import { store } from "../redux/reducer";
import { setCourse } from "../redux/actions/coursesAction";

const AddLesson = (route) => {
  const { goBack, navigate } = useNavigation();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visiblenewPass, setVisiblenewPass] = useState(true);
  const [visibleconfirmNewPass, setVisibleconfirmNewPass] = useState(true);
  const [name, setName] = useState("");
  const [shift, setShift] = useState("");
  const [date, setStartDate] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [check, setCheck] = useState<any>();
  const { user } = useSelector((state: any) => state.userState);
  const { token } = useSelector((state: any) => state.tokenState);
  const [modalVisible, setModalVisible] = useState(false);

  //   console.log(route.route.params);

  const onAddLesson = async () => {
    try {
      const body = {
        name: name,
        qr_code: "",
        shift: shift,
        course_id: route?.route?.params?.courseId,
        lesson_date: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"),
      };
      const res = await addLesson(token, body);
      if (res) {
        if (user?.role === "Student") {
          const coursesData = await getStudentClass(token, user._id);
        } else if (user?.role === "Teacher") {
          const coursesData = await getTeacherClass(token, user._id);
        }
        Alert.alert("Successfully");
      }
    } catch (error) {
      Alert.alert("Successfully");
    }
  };

  const shiftData: any = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.V_back_button} onPress={() => goBack()}>
          <Image
            style={styles.img_header_icon}
            source={require("../images/ic_left_arrow.png")}
          />
          <Text style={styles.txt_header}>Add Lesson</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={[main_color1, main_color2]}
        start={[1, 1]}
        end={[1, 0]}
      >
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          <View style={styles.v_inputContainer}>
            <TextInput
              style={styles.txtIp_inputContent}
              placeholderTextColor="#707070"
              placeholder={"Name"}
              value={name}
              onChangeText={setName}
            ></TextInput>
          </View>

          <TouchableOpacity
            style={styles.v_inputContainer}
            onPress={() => setModalVisible(!modalVisible)}
          >
            {/* <TextInput
              style={styles.txtIp_inputContent}
              secureTextEntry={visiblenewPass}
              placeholderTextColor="#707070"
              placeholder={"Shift"}
              value={shift}
              onChangeText={setShift}
            ></TextInput> */}
            <View style={styles.txtIp_inputContent}>
              <Text style={{ fontStyle: "italic", color: "#333542" }}>
                {shift ? shift : "Shift"}
              </Text>
            </View>
            <Image
              style={[styles.ic_icon, { tintColor: regular }]}
              source={require("../images/ic_down_arrow.png")}
            />
          </TouchableOpacity>

          <Text style={{ fontStyle: "italic", color: regular }}>
            (*Day-Month-Year)
          </Text>
          <View style={styles.v_inputContainer}>
            <TextInput
              style={styles.txtIp_inputContent}
              placeholderTextColor="#707070"
              placeholder={"Start date"}
              value={date}
              onChangeText={setStartDate}
            ></TextInput>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        onPress={() => {
          onAddLesson();
        }}
        style={{
          backgroundColor: icon_color,
          width: 150,
          padding: 15,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
          Add
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: 50,
              backgroundColor: "#fff",
              marginVertical: 150,
              borderRadius: 40,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#000",
                marginTop: 30,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Shift
            </Text>
            {shiftData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: main_color1,
                  width: "80%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                  borderRadius: 20,
                  marginHorizontal: 20,
                }}
                onPress={() => (setShift(item), setModalVisible(!modalVisible))}
              >
                <Text style={{ fontSize: 20 }}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={{
                backgroundColor: icon_color,
                width: "80%",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                borderRadius: 20,
                marginHorizontal: 20,
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AddLesson;

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
    marginHorizontal: scale(10),
    fontStyle: "italic",
    // marginHorizontal: scale(40)
    justifyContent: "center",
  },
});
