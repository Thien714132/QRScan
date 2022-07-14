import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Network from "expo-network";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SvgQRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Scanner from "../components/Sacnner";
import {
  capital,
  icon_color,
  icon_color_2,
  main_color1,
  main_color2,
  regular,
} from "../configs/Colors";
import scale from "../configs/scale";
import {
  createQRCode,
  getHistory,
  getLessonDetail,
} from "../services/class_services";

const Lesson = (props) => {
  const { user } = useSelector((state: any) => state.userState);
  const { token } = useSelector((state: any) => state.tokenState);
  const { route } = props;
  const { lesson_id, course_name } = route.params;
  const { goBack, navigate } = useNavigation();
  const [lessonData, setLessonData] = useState<any>();
  const [history_data, setHistory] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [turnOnLoading, setTurnOnLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("2");

  const getLessonData = async () => {
    const lesson = await getLessonDetail(token, lesson_id);
    var A = {};
    if (lesson) {
      const historyData = await getHistory(token, lesson._id);
      if (user.role === "Student") {
        if (historyData?.history.length > 0) {
          A.history = historyData?.history.filter(
            (item) => item.student_id === user._id
          );
          setHistory(A);
        }
      }
      // console.log(historyData);
      else setHistory(historyData);
    }
    // console.log(lesson);
    setLessonData(lesson);
  };

  // useEffect(() => {
  //   getLessonData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getLessonData();
    }, [])
  );

  useEffect(() => {
    if (!lessonData) {
      setTurnOnLoading(true);
    } else setTurnOnLoading(false);
  }, [lessonData]);

  const createQR = async () => {
    var myDate: any = moment().format();
    const ip = await Network.getIpAddressAsync();
    if (lessonData !== undefined && lessonData !== null) {
      const data = await createQRCode(token, lessonData?._id, {
        qr_code: `{"date":"${moment().format()}","_id":"${
          lessonData._id
        }", "ip": "${ip}", "expireTime":"${selectedLanguage}"} `,
      });
      if (data?.lesson) {
        setModalVisible(!modalVisible);
      } else Alert.alert("Create failed");
      getLessonData();
    }
  };

  console.log("lesson", moment().format());

  const convertSession = (sess: any) => {
    var a = "";
    if (sess === 1) {
      a = "7:00 - 9:30";
    } else if (sess === 2) {
      a = "9:30 - 12:00";
    } else if (sess === 3) {
      a = "12:30 - 15:00";
    } else if (sess === 4) {
      a = "15:00 - 17:30";
    } else if (sess === 5) {
      a = "18:00 - 21:30";
    }
    return a;
  };

  const renderCheckInItem = (i: any, e: any) => {
    return (
      <View
        key={i._id}
        style={[
          styles.v_check_in_item,
          e % 2 == 0 && { backgroundColor: "#FFEEEC" },
          user.role === "Teacher" && {
            borderBottomWidth: 0.2,
            borderColor: regular,
          },
        ]}
      >
        {user.role === "Teacher" ? (
          <View style={styles.v_index}>
            <Text style={{ fontSize: 15 }}>{e + 1}</Text>
          </View>
        ) : null}

        <View
          style={[
            styles.v_check_in_infor,
            user.role === "Teacher" && {
              borderLeftWidth: 0.2,
              borderColor: regular,
            },
          ]}
        >
          <Text style={{ fontSize: 17 }}>
            {i.student_name} - {i.student_code}
          </Text>
          <Text style={{ color: regular }}>
            Check in at {moment(i.check_in_at).format("DD-MM-YYYY, h:mm:ss a")}{" "}
            by {i.device_name}
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
          <View style={{ borderStartColor: "#fff" }}></View>
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
                  onPress={() => setModalVisible(true)}
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

        <View style={styles.v_attendance_list}>
          <View style={{}}>
            <View style={styles.v_attendance_header}>
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
            <Text
              style={{ marginLeft: 20, marginBottom: 10, color: icon_color }}
            >
              {convertSession(lessonData?.shift)} (
              {moment(lessonData?.lesson_date).format("DD/MM/YYYY")})
            </Text>
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
        {user.role === "Student" ? (
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Scanner
              lesson_Data={lessonData?._id}
              onPress={() => setModalVisible(false)}
            />
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
        ) : (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <View style={styles.v_pick_time}>
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
              <View style={styles.v_pick_field}>
                <Text style={{ flex: 0.5, fontSize: 18, fontWeight: "bold" }}>
                  Expire time
                </Text>
                <Picker
                  style={{ flex: 0.5 }}
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }
                  mode={"dropdown"}
                >
                  <Picker.Item label="2 phút" value="2" />
                  <Picker.Item label="3 phút" value="3" />
                  <Picker.Item label="4 phút" value="4" />
                  <Picker.Item label="5 phút" value="5" />
                  <Picker.Item label="6 phút" value="6" />
                  <Picker.Item label="7 phút" value="7" />
                </Picker>
              </View>
              <TouchableOpacity
                onPress={() => createQR()}
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
            </View>
          </View>
        )}
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

  v_attendance_list: {
    marginTop: 30,
    // marginLeft: 20,
    // flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "#fff",
    // paddingHorizontal: 20,
    paddingTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },

  v_attendance_header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 20,
  },

  v_pick_time: {
    height: 350,
    width: 300,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },

  v_pick_field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },

  v_index: {
    marginHorizontal: 10,
    justifyContent: "center",
    flex: 0.05,
    alignItems: "center",
  },

  v_check_in_infor: {
    justifyContent: "center",
    paddingLeft: 10,
    flex: 0.95,
  },

  v_check_in_item: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
  },
});
