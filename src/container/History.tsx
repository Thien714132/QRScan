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
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import scale from "../configs/scale";
import Scanner from "../components/Sacnner";
import { useSelector } from "react-redux";
import {
  getClassDetail,
  getHistoryByStudent,
} from "../services/class_services";
import moment from "moment";
import { icon_color } from "../configs/Colors";
import { TEXT } from "../configs/TEXT";

const History = () => {
  const { user } = useSelector((state: any) => state.userState);
  const [history_data, set_history_data] = useState<any>();
  const { history } = useSelector((state: any) => state.historyState);
  const { goBack, navigate } = useNavigation();

  //   const getHistory = async () => {
  //     const historyData = await getHistoryByStudent(null, user._id);
  //     if (historyData.history) {
  //       //   console.log(historyData);
  //       set_history_data(historyData);
  //     }
  //   };

  //   useEffect(() => {
  //     getHistory();
  //   }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.V_back_button} onPress={() => goBack()}>
          <Image
            style={styles.img_header_icon}
            source={require("../images/ic_left_arrow.png")}
          />
          <Text style={styles.txt_header}>{TEXT.CLASS_DETAIL.HISTORY}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {history?.history
          ? history?.history.map((item) => (
              <View
                key={item._id}
                style={{
                  backgroundColor: "#fff",
                  marginHorizontal: 15,
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 0.2,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      backgroundColor: "#FFEEEC",
                      borderRadius: 30,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={require("../images/ic_accept.png")}
                    />
                  </View>
                </View>
                <Text style={{ fontSize: 16, flex: 0.8 }}>
                  You checked in{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {item.course_name} - {item.lesson_name}
                  </Text>{" "}
                  at{" "}
                  {moment(item.check_in_at).format("MMMM Do YYYY, h:mm:ss a")}
                </Text>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
