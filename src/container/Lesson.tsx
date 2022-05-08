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
  SafeAreaView,
  ScrollView,
  TextInputComponent,
  Button,
  Modal,
  PermissionsAndroid,
  NativeModules,
} from "react-native";
import SvgQRCode from "react-native-qrcode-svg";
import {
  capital,
  icon_color,
  icon_color_2,
  main_color1,
  main_color2,
  regular,
} from "../configs/Colors";
import Routes from "../configs/Routes";
import { LinearGradient } from "expo-linear-gradient";
import getName from "../components/Get_first_letter";
import {
  createQRCode,
  getAllClasses,
  getHistory,
  getLessonDetail,
} from "../services/class_services";
import { useSelector } from "react-redux";
import scale from "../configs/scale";
import Scanner from "../components/Sacnner";
import * as Location from "expo-location";
import moment from "moment";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import * as Device from "expo-device";
import * as Network from "expo-network";
import Loading from "../components/Loading";

const Lesson = (props) => {
  const { user } = useSelector((state: any) => state.userState);
  const { route } = props;
  const { lesson_id, course_name } = route.params;
  const { goBack, navigate } = useNavigation();
  const [lessonData, setLessonData] = useState<any>();
  const [history_data, setHistory] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [turnOnLoading, setTurnOnLoading] = useState(false);

  const getLessonData = async () => {
    const lesson = await getLessonDetail(null, lesson_id);
    if (lesson) {
      const historyData = await getHistory(null, lesson._id);
      // console.log(historyData);
      setHistory(historyData);
    }

    // console.log(lesson);
    setLessonData(lesson);
  };

  useEffect(() => {
    getLessonData();
  }, []);

  useEffect(() => {
    if (!lessonData) {
      setTurnOnLoading(true);
    } else setTurnOnLoading(false);
  }, [lessonData]);

  const createQR = async () => {
    // console.log(lessonData);
    if (lessonData !== undefined && lessonData !== null) {
      const data = await createQRCode(lessonData?._id, {
        qr_code: `{"date":"${moment(moment()).format()}","_id":"${
          lessonData._id
        }"}`,
      });
      getLessonData();
    }
  };

  const renderCheckInItem = (i: any, e: any) => {
    return (
      <View
        key={i._id}
        style={[
          {
            backgroundColor: "#fff",
            // width: "100%",
            // paddingTop: 20,
            paddingVertical: 10,
            // marginHorizontal: 15,
            // borderRadius: 20,
            flexDirection: "row",
            borderBottomWidth: 0.2,
            borderColor: regular,
          },
          e % 2 == 0 && { backgroundColor: "#FFEEEC" },
        ]}
      >
        <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}>{e + 1}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            borderLeftWidth: 0.2,
            borderColor: regular,
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontSize: 17 }}>
            {i.student_name} - {i.student_code}
          </Text>
          <Text style={{ color: regular }}>
            Check in at{" "}
            {moment(i.check_in_at).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {turnOnLoading ? <Loading></Loading> : null}
      <View style={styles.header}>
        <TouchableOpacity style={styles.V_back_button} onPress={() => goBack()}>
          <Image
            style={styles.img_header_icon}
            source={require("../images/ic_left_arrow.png")}
          />
          <Text style={styles.txt_header}>{course_name}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <LinearGradient
          colors={[main_color1, main_color2]}
          start={[1, 1]}
          end={[1, 0]}
          style={{ paddingTop: 20 }}
        >
          {user?.role === "Teacher" ? (
            <>
              {lessonData?.qr_code !== " " ? (
                <LinearGradient
                  colors={["#CFDCFF", "#FDA349"]}
                  start={[0, 1]}
                  end={[1, 0]}
                  style={[
                    styles.v_qrCode,
                    { ...styles.shadow, shadowColor: "#EFC93B" },
                  ]}
                >
                  <View style={styles.v_qrCodeContainer}>
                    <SvgQRCode
                      size={160}
                      value={JSON.stringify(lessonData?.qr_code)}
                    />
                  </View>
                </LinearGradient>
              ) : null}

              <View style={styles.v_create_qr}>
                <TouchableOpacity
                  onPress={createQR}
                  style={[
                    styles.bt_qrcode,
                    { marginRight: 20, backgroundColor: "#29D277" },
                  ]}
                >
                  <Image
                    source={require("../images/ic_pencil.png")}
                    style={styles.img_button_qr}
                  />
                  <Text style={styles.txt_button_qr}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bt_qrcode, { backgroundColor: "#3EA1EC" }]}
                >
                  <Image
                    source={require("../images/ic_share.png")}
                    style={styles.img_button_qr}
                  />
                  <Text style={styles.txt_button_qr}>Share</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.bt_scan_qr}
                onPress={() => setModalVisible(true)}
              >
                <Image
                  source={require("../images/ic_qr.png")}
                  style={styles.img_scan}
                />
                <Text style={styles.txt_scan}>Scan</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>

        <View
          style={{
            marginTop: 30,
            // marginLeft: 20,
            // flexDirection: "row",
            // alignItems: "center",
            backgroundColor: "#fff",
            // paddingHorizontal: 20,
            paddingTop: 10,
            marginHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: capital }}>
              Attendance - {lessonData?.name}
            </Text>
            <TouchableOpacity
              style={{ position: "absolute", right: 20 }}
              onPress={getLessonData}
            >
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../images/ic_refresh.png")}
              />
            </TouchableOpacity>
          </View>
          {/* {console.log("___A", history_data)} */}
          {/* <View style={styles.v_checkIn_list}> */}
          {history_data?.history
            ? history_data.history.map((item, index) =>
                renderCheckInItem(item, index)
              )
            : null}
          {/* </View> */}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Scanner lesson_Data={lessonData?._id} />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              getLessonData();
            }}
            style={{ position: "absolute", top: 30, left: 15 }}
          >
            <Image
              style={styles.img_header_icon}
              source={require("../images/ic_close.png")}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Lesson;

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

  v_qrCodeContainer: {
    alignSelf: "baseline",
    // paddingHorizontal: scale(20),
    // paddingVertical: scale(20),
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  v_qrCode: {
    alignSelf: "center",
    // paddingHorizontal: scale(20),
    // paddingVertical: scale(20),
    padding: 10,
    borderRadius: 30,
    marginBottom: 30,
  },

  ic_qrCode: {
    height: scale(160),
    width: scale(160),
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },

  v_create_qr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  bt_qrcode: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: icon_color_2,
    padding: 8,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
  },

  img_button_qr: {
    height: 17,
    width: 17,
    marginRight: 10,
    tintColor: "#fff",
  },

  txt_button_qr: { color: "#fff", fontWeight: "700" },

  bt_scan_qr: {
    flexDirection: "row",
    backgroundColor: "#29D277",
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
  },

  img_scan: { height: 30, width: 30, tintColor: "#fff" },

  txt_scan: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 5,
  },

  v_checkIn_list: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
});
