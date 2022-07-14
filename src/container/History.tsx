import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { capital, icon_color } from "../configs/Colors";
import { TEXT } from "../configs/TEXT";
import { setHistory } from "../redux/actions/historyAction";
import { getHistoryByTeacher } from "../services/class_services";

const History = () => {
  const { user } = useSelector((state: any) => state.userState);
  const { token } = useSelector((state: any) => state.tokenState);
  const [history_data, set_history_data] = useState<any>();
  const { history } = useSelector((state: any) => state.historyState);
  const { goBack, navigate } = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  // console.log("alooo", history);

  const onRefresh = React.useCallback(async () => {
    if (user.role === "Teacher") {
      setRefreshing(true);
      const historyData = await getHistoryByTeacher(token, user._id);
      if (history?.history !== []) {
        setHistory(historyData);
        setRefreshing(false);
      } else if (user.role === "Student") setRefreshing(false);
    }
  }, []);

  const formatistory = () => {
    var finalHistory = {
      newHistory: [],
      oldHistory: [],
    };
    if (user.role === "Teacher") {
      history?.history.map((item) => {
        for (var i = 0; i < item.length; i++) {
          if (
            Date.now() -
              61200000 -
              (new Date(item[i].check_in_at).getTime() + 21600000) <
            7200000
          ) {
            finalHistory.newHistory.push(item[i]);
          } else finalHistory.oldHistory.push(item[i]);
        }
      });
      finalHistory.newHistory.reverse();
      finalHistory.oldHistory.reverse();
      set_history_data(finalHistory);
    }

    // console.log(new Date(item[i].check_in_at).getTime() + 21600000);
    console.log(new Date(moment().format()).getTime() - 61200000);

    var myDate = new Date("/Date(1655406381000)/".match(/\d+/)[0] * 1);
    console.log(myDate);
  };

  useEffect(() => {
    formatistory();
  }, [refreshing]);

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
      <ScrollView
        style={{ marginBottom: 10, paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {history?.history && user.role === "Student" ? (
          history?.history.reverse().map((item, index) => (
            <View key={index} style={styles.v_history_item}>
              <View style={styles.v_icon_history}>
                <View style={styles.ic_history}>
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
                at {moment(item.check_in_at).format("MMMM Do YYYY, h:mm:ss a")}
              </Text>
            </View>
          ))
        ) : (
          <>
            <View>
              {!history_data ? null : (
                <>
                  {history_data.newHistory.length === 0 ? null : (
                    <>
                      <Text style={styles.txt_history_label}>New history</Text>
                      {history_data?.newHistory.map((item, index) => (
                        <View key={index} style={styles.v_history_item}>
                          <View style={styles.v_icon_history}>
                            <View style={styles.ic_history}>
                              <Image
                                style={{ height: 30, width: 30 }}
                                source={require("../images/ic_accept.png")}
                              />
                            </View>
                          </View>
                          <Text style={{ fontSize: 16, flex: 0.8 }}>
                            <Text
                              style={{ color: "#1967D2", fontWeight: "700" }}
                            >
                              {item.student_name}
                            </Text>{" "}
                            checked in{" "}
                            <Text style={{ fontWeight: "bold" }}>
                              {item.course_name} - {item.lesson_name}
                            </Text>{" "}
                            at{" "}
                            {moment(item.check_in_at).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </Text>
                        </View>
                      ))}
                    </>
                  )}
                </>
              )}
            </View>
            <View>
              <Text style={styles.txt_history_label}>Older</Text>
              {history_data?.oldHistory
                ? history_data?.oldHistory.map((item, index) => (
                    <View key={index} style={styles.v_history_item}>
                      <View style={styles.v_icon_history}>
                        <View style={styles.ic_history}>
                          <Image
                            style={{ height: 30, width: 30 }}
                            source={require("../images/ic_accept.png")}
                          />
                        </View>
                      </View>
                      <Text style={{ fontSize: 16, flex: 0.8 }}>
                        <Text style={{ color: "#1967D2", fontWeight: "700" }}>
                          {item.student_name}
                        </Text>{" "}
                        checked in{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {item.course_name} - {item.lesson_name}
                        </Text>{" "}
                        at{" "}
                        {moment(item.check_in_at).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Text>
                    </View>
                  ))
                : null}
            </View>
          </>
        )}
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

  txt_history_label: {
    fontSize: 18,
    color: capital,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: "700",
  },

  v_history_item: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  v_icon_history: {
    flex: 0.2,
    alignItems: "center",
  },

  ic_history: {
    height: 50,
    width: 50,
    backgroundColor: "#FFEEEC",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
