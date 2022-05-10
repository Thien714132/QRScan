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
  FlatList,
  Modal,
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
import Class_information from "../components/Class_information";
import Constants from "../configs/Constants";
import {
  getCourseStatistic,
  getLessonByCourse,
} from "../services/class_services";
import { useSelector } from "react-redux";
import { TEXT } from "../configs/TEXT";

function Statistics(props) {
  const { statistics_data, numberOfLesson } = props;
  const [focusIndex, setFocusIndex] = useState<any>(0);
  const [focus, setFocus] = useState<any>(false);

  const getName = (name: any) => {
    if (name != undefined && name != null && name != {}) {
      // console.log(name);
      var values = name.split(" ");
      var letter = values[values.length - 1].charAt(0);
      return letter;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.v_scrollV_sta}
    >
      {statistics_data.length <= 1 ? (
        <View style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <View style={styles.v_avatar}>
              <Text style={styles.txt_avatar}>
                {getName(statistics_data[0].name)}
              </Text>
            </View>
            <Text style={styles.txt_statistic_name}>
              {statistics_data[0].name}
            </Text>
          </View>
          <View style={styles.statisticItem}>
            <Text style={{ flex: 0.4 }}>{TEXT.CLASS_DETAIL.ATTENDANCE}:</Text>
            <View style={{ flex: 0.6, alignItems: "center" }}>
              <Text>{statistics_data[0].attendance}</Text>
            </View>
          </View>
          <View style={styles.statisticItem}>
            <Text style={{ flex: 0.4 }}>{TEXT.CLASS_DETAIL.LESSON}:</Text>
            <View style={{ flex: 0.6, alignItems: "center" }}>
              <Text>{numberOfLesson}</Text>
            </View>
          </View>
          <View style={styles.statisticItem}>
            <Text style={{ flex: 0.6 }}>
              {TEXT.CLASS_DETAIL.ATTENDANCE_LESSON}
            </Text>
            <View style={{ flex: 0.4, alignItems: "center" }}>
              {statistics_data[0].lesson_attendance.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View style={{ paddingBottom: 20 }}>
          <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>
            {TEXT.CLASS_DETAIL.STATISTIC_LABEL}
          </Text>
          {statistics_data
            ? statistics_data.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setFocusIndex(index);
                    setFocus(!focus);
                  }}
                  style={[
                    styles.v_statistic_item,
                    index % 2 == 0 && { backgroundColor: "#FFEEEC" },
                  ]}
                  key={index}
                >
                  <Text style={styles.txt_STT}>{index + 1}</Text>
                  <View style={styles.v_statistic_content}>
                    <Text>{item.name}</Text>
                    <Text style={{ color: regular }}>
                      Check-in {item.attendance}/{numberOfLesson} lessons
                    </Text>
                    {focusIndex === index && focus ? (
                      <>
                        {item.lesson_attendance.map((item, index) => (
                          <Text
                            key={index}
                            style={{ marginLeft: 10, color: regular }}
                          >
                            {" "}
                            - {item}
                          </Text>
                        ))}
                      </>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </View>
      )}
    </ScrollView>
  );
}

function Lesson(props) {
  const { data, course_name } = props;
  const { navigate } = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.bt_lesson, styles.shadowButton]}
        onPress={() =>
          navigate(Routes.LESSON, {
            lesson_id: item._id,
            course_name: course_name,
          })
        }
      >
        <View style={styles.v_lesson_item}>
          <Image
            source={require("../images/ic_book_mark.png")}
            style={styles.ic_lesson_item}
          />
        </View>
        <Text style={{ fontSize: 16, color: capital }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {data ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={3}
          contentContainerStyle={styles.v_flatList}
          horizontal={false}
        />
      ) : null}
    </>
  );
}

const Class_detail = memo((props: any) => {
  const { goBack, navigate } = useNavigation();
  const { route } = props;
  const { _id } = route.params;
  const [focus, setFocus] = useState<any>(true);
  const [lessonData, setLessonData] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [statistic_data, setStatisticData] = useState<any>();
  const { user } = useSelector((state: any) => state.userState);

  const getLessonDetail = async () => {
    const lesson_Data = await getLessonByCourse(null, _id);
    setLessonData(lesson_Data);
    // console.log(lesson_Data);
  };

  const getStatistic = async () => {
    const statistics = await getCourseStatistic(null, _id);
    // console.log(statistics);

    if (statistics !== {} && statistics !== undefined) {
      if (user.role === "Student") {
        var temp = { statistic: "" };
        const find_user = statistics?.statistic.filter(
          (item) => item.student_id == user._id
        );
        temp.statistic = find_user;
        setStatisticData(temp);
      } else setStatisticData(statistics);
    }
  };

  useEffect(() => {
    getLessonDetail();
    getStatistic();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.V_back_button}
            onPress={() => goBack()}
          >
            <Image
              style={styles.img_header_icon}
              source={require("../images/ic_left_arrow.png")}
            />
            <Text style={styles.txt_header}>{TEXT.CLASS_DETAIL.CLASS}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 15 }}
            onPress={() => setModalVisible(true)}
          >
            <Image
              style={[styles.img_header_icon, ,]}
              source={require("../images/ic_information.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.v_class_infor]}>
          <Class_information
            imageStyle={{ tintColor: "#d84a4a" }}
            information={lessonData?.course?.classroom_name}
            iconName={require("../images/ic_book.png")}
            fontStyle={{ fontSize: 20, fontWeight: "bold" }}
            iconBackground={"#fee8e8"}
          />
          <Class_information
            imageStyle={{ tintColor: "#14ABD6" }}
            information={lessonData?.course?.teacher_id?.name}
            iconName={require("../images/ic_teacher.png")}
            iconBackground={"#EAF7FB"}
          />

          <Class_information
            imageStyle={{ tintColor: "#29d229" }}
            information={`${lessonData?.course?.start_date} - ${lessonData?.course?.end_date}`}
            iconName={require("../images/ic_history.png")}
            iconBackground={"#e9ffe9"}
          />
        </View>
      </View>
      <View style={styles.v_dashBoard}>
        <TouchableOpacity
          style={[
            styles.bt_dash,
            focus && { borderBottomWidth: 2, borderColor: icon_color },
          ]}
          onPress={() => setFocus(true)}
        >
          <Text style={[styles.txt_dash, focus && { color: icon_color }]}>
            {TEXT.CLASS_DETAIL.LESSON}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bt_dash,
            !focus && { borderBottomWidth: 2, borderColor: icon_color },
          ]}
          onPress={() => setFocus(false)}
        >
          <Text style={[styles.txt_dash, !focus && { color: icon_color }]}>
            {TEXT.CLASS_DETAIL.STATISTIC}
          </Text>
        </TouchableOpacity>
      </View>

      {focus ? (
        <Lesson
          data={lessonData?.lesson}
          course_name={lessonData?.course.classroom_name}
        />
      ) : (
        <>
          {/* {user?.role === 'Student'} */}
          <Statistics
            statistics_data={statistic_data?.statistic}
            numberOfLesson={lessonData.lesson.length}
          />
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{ marginTop: 30, marginLeft: 15 }}
          >
            <Image
              style={styles.img_header_icon}
              source={require("../images/ic_close.png")}
            />
          </TouchableOpacity>

          <ScrollView style={styles.v_student_list}>
            <Text style={styles.txt_list_label}>
              {TEXT.CLASS_DETAIL.STUDENT_LIST}
            </Text>
            <View>
              {lessonData?.course?.students.map((item, index) => (
                <View
                  style={[
                    styles.v_student_item,
                    index % 2 == 0 && { backgroundColor: "#FFEEEC" },
                  ]}
                  key={index}
                >
                  <Text
                    style={{ flex: 0.1, fontSize: 18, textAlign: "center" }}
                  >
                    {index + 1}
                  </Text>
                  <Text style={{ flex: 0.7, fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ flex: 0.3, fontSize: 18 }}>
                    {item.student_code}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
});

export default Class_detail;

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

  v_lesson: {
    height: 300,
    width: "100%",
    backgroundColor: main_color2,
  },

  v_class_infor: {
    backgroundColor: "#fff",
    // paddingBottom: 15,
    // marginHorizontal: 20,
    // paddingTop: 20,
    // borderRadius: 20,
    // borderBottomWidth: 1,
  },

  shadowButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },

  v_dashBoard: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-around",
    // paddingVertical: 10,
    paddingTop: 10,
    backgroundColor: "#fff",
  },

  bt_dash: {
    width: Constants.width / 4,
    alignItems: "center",
    paddingBottom: 5,
  },

  txt_dash: {
    fontSize: 18,
    color: regular,
    textAlign: "center",
  },

  bt_lesson: {
    backgroundColor: "#fff",
    // padding: 10,
    paddingVertical: 20,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: (Constants.width - 60) / 3,
    flexDirection: "row",
  },

  v_flatList: {
    flexGrow: 1,
    alignItems: "stretch",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: main_color1,
  },

  txt_header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: icon_color,
  },

  v_avatar: {
    backgroundColor: "#29D277",
    height: 90,
    width: 90,
    borderRadius: 50,
    // paddingTop: 5,
    justifyContent: "center",
  },

  txt_avatar: {
    fontSize: 60,
    color: "#fff",
    textAlign: "center",
    // textAlignVertical: "center",
  },

  statisticItem: {
    flexDirection: "row",
    backgroundColor: main_color1,
    width: "80%",
    marginBottom: 10,
    padding: 7,
    borderRadius: 10,
  },

  txt_statistic_name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },

  v_lesson_item: {
    padding: 4,
    backgroundColor: "#FEF7ED",
    borderRadius: 30,
    marginRight: 5,
  },

  ic_lesson_item: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    tintColor: "#F79A2D",
  },

  v_scrollV_sta: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    paddingTop: 20,
    marginBottom: 20,
    // paddingBottom: 20,
  },

  v_statistic_item: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    // marginHorizontal: 15,
    flexDirection: "row",
    borderBottomWidth: 0.2,
    borderColor: regular,
    alignItems: "center",
  },
  txt_STT: {
    flex: 0.1,
    textAlign: "center",
    textAlignVertical: "center",
  },

  v_statistic_content: {
    flex: 0.9,
    borderLeftWidth: 0.2,
    borderColor: regular,
    paddingLeft: 10,
  },

  v_student_list: {
    marginTop: 20,
    marginHorizontal: 15,
  },

  txt_list_label: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  v_student_item: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.2,
  },
});
