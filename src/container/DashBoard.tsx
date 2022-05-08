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
  ScrollView,
  SafeAreaView,
} from "react-native";
import Button from "../components/Button";
import { capital, main_color1, main_color2, regular } from "../configs/Colors";
import Routes from "../configs/Routes";
import scale from "../configs/scale";
import { TEXT } from "../configs/TEXT";
import SvgQRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import moment from "moment";

const DashBoard = () => {
  const { navigate } = useNavigation();
  const { user } = useSelector((state: any) => state.userState);
  let userName: String;
  user ? (userName = `, ${user?.name}`) : "There";
  const { history } = useSelector((state: any) => state.historyState);
  const [historyLength, setHistoryLength] = useState<any>(0);
  const [turn_on_red_dot, set_turn_on_red_dot] = useState<any>(false);

  const getChange = async () => {
    if (history) {
      if (historyLength < history?.history.length) {
        set_turn_on_red_dot(true);
        setHistoryLength(history?.history.length);
      } else set_turn_on_red_dot(false);
      // console.log(history.history.length);
    }
  };

  useEffect(() => {
    getChange();
  }, [history]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={[main_color1, main_color2]}
          start={[1, 1]}
          end={[1, 0]}
        >
          <View style={styles.v_header}>
            <View style={styles.v_name}>
              <Text style={{ fontSize: 13, color: capital }}>
                {moment(moment()).format("ddd, MMMM DD")}
              </Text>
              <Text
                style={{
                  fontSize: 27,
                  color: capital,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {TEXT.DASHBOARD.Hi} {userName}
              </Text>
            </View>
            <TouchableOpacity style={styles.v_bellIcon}>
              <Image
                style={styles.ic_bell}
                source={require("../images/ic_bell.png")}
              />
            </TouchableOpacity>
          </View>

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
              {/* <Image
                style={styles.ic_qrCode}
                source={require("../images/qrCode.png")}
              /> */}

              <SvgQRCode
                size={160}
                value={JSON.stringify({
                  name: user?.name,
                  MSV: user?.student_id,
                })}
              />
            </View>
          </LinearGradient>
        </LinearGradient>

        <View style={styles.v_scrollView}>
          <View style={styles.v_dashBoard}>
            <Text style={styles.v_dashBoard_label}>
              - {TEXT.DASHBOARD.DASH_BOARD_LABEL} -
            </Text>
            <View style={styles.v_dashRow}>
              <Button
                buttonName={TEXT.DASHBOARD.CALENDAR}
                onPress={() => navigate(Routes.CALENDAR)}
                iconName={require("../images/ic_calendar.png")}
                iconColor="#F79A2D"
                iconBackground="#FEF7ED"
                detailButton="Coures schedule"
              />

              <Button
                buttonName={TEXT.DASHBOARD.CLASS}
                onPress={() => navigate(Routes.CLASS)}
                iconName={require("../images/ic_class.png")}
                iconColor="#29d229"
                iconBackground="#e9ffe9"
                detailButton="All classes"
                marginLeft={scale(20)}
              />
            </View>

            <View style={styles.v_dashRow}>
              <Button
                buttonName={TEXT.DASHBOARD.HISTORY}
                onPress={() => {
                  navigate(Routes.HISTORY), set_turn_on_red_dot(false);
                }}
                iconName={require("../images/ic_history.png")}
                iconColor="#14ABD6"
                iconBackground="#EAF7FB"
                detailButton="Attendance history"
                redDot={turn_on_red_dot}
              />

              <Button
                buttonName={TEXT.DASHBOARD.SUPPORT}
                // onPress={() => navigate(Routes.CALENDAR)}
                iconName={require("../images/ic_support.png")}
                iconColor="#d84a4a"
                iconBackground="#fee8e8"
                marginLeft={scale(20)}
                detailButton="Support contacts"
              />

              {/* <Button
                buttonName={TEXT.DASHBOARD.SETTING}
                // onPress={() => navigate(Routes.CALENDAR)}
                iconName={require("../images/ic_setting.png")}
                iconColor="#5A6175"
                iconBackground="#F2F3F4"
                marginHorizontal={scale(20)}
              /> */}

              {/* <Button
                buttonName={TEXT.DASHBOARD.LOGOUT}
                onPress={() => navigate(Routes.Login)}
                iconName={require("../images/ic_logout.png")}
                iconColor="#d84a4a"
                iconBackground="#fee8e8"
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_color2,
  },

  v_scrollView: {
    // paddingBottom: '15%'
  },

  v_header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginVertical: 10,
    marginBottom: 20,
  },

  pic_backgroud: {
    height: scale(100),
    width: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30),
  },

  v_name: {},

  v_bellIcon: {
    position: "absolute",
    right: 16,
    padding: 10,
    backgroundColor: main_color1,
    borderRadius: 20,
  },

  ic_bell: {
    height: scale(20),
    width: scale(20),
    tintColor: "#2C2C33",
  },

  v_qrCode: {
    alignSelf: "center",
    // paddingHorizontal: scale(20),
    // paddingVertical: scale(20),
    padding: 10,
    borderRadius: 30,
    marginBottom: 30,
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

  ic_qrCode: {
    height: scale(160),
    width: scale(160),
  },

  v_dashBoard: {
    alignItems: "center",
    backgroundColor: main_color1,
  },

  v_dashBoard_label: {
    fontWeight: "bold",
    fontSize: scale(20),
    color: "#1C226B",
    marginBottom: scale(20),
  },

  v_dashRow: {
    flexDirection: "row",
    marginHorizontal: scale(20),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(20),
  },

  bt_dash: {
    height: scale(80),
    width: scale(80),
    backgroundColor: "#fff",
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },

  ic_dashButton: {
    height: scale(25),
    width: scale(25),
    tintColor: "#2C2C33",
    resizeMode: "contain",
  },

  txt_dashButton: {
    fontSize: scale(12),
    color: "#2C2C33",
    marginTop: scale(5),
    fontWeight: "500",
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

  shadowButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
});
