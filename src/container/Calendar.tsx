import { useNavigation } from "@react-navigation/native";
import { ModalTransition } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import moment from "moment";
import React, { memo, useState, useCallback, useEffect } from "react";
import Moment from "react-moment";
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
  SafeAreaView,
  Button,
} from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  CalendarProvider,
} from "react-native-calendars";
import { useSelector } from "react-redux";
import Routes from "../configs/Routes";
import scale from "../configs/scale";

// const scheduleData = [
//   {
//     id: 1,
//     Class: {
//       Subject_Name: "Lập trình Mobile",
//       Class_name: "103-TA1",
//       Teacher_name: "Le Ba Cuong",
//       Student_id_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
//       learning_day: [
//         { date: "2022-04-03", session: 1 },
//         { date: "2022-04-12", session: 1 },
//         { date: "2022-04-18", session: 1 },
//         { date: "2022-04-25", session: 2 },
//         { date: "2022-05-03", session: 2 },
//         { date: "2022-05-10", session: 2 },
//         { date: "2022-05-17", session: 2 },
//       ],
//     },
//   },
//   {
//     id: 2,
//     Class: {
//       Subject_Name: "Lập trình nhúng",
//       Class_name: "102-TA1",
//       Teacher_name: "Pham Van Huong",
//       Student_id_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
//       learning_day: [
//         { date: "2022-04-03", session: 5 },
//         { date: "2022-04-12", session: 5 },
//         { date: "2022-04-19", session: 5 },
//         { date: "2022-04-26", session: 4 },
//         { date: "2022-05-04", session: 4 },
//         { date: "2022-05-11", session: 4 },
//         { date: "2022-05-18", session: 4 },
//       ],
//     },
//   },
// ];

const Calendar_Screen = () => {
  const { navigate, goBack } = useNavigation();
  const [schedule, setSchedule] = useState<any>();
  const { course } = useSelector((state: any) => state.courseState);

  const getCalendarData = () => {
    var courseData = course?.courses;
    var lessonData = course?.lesson;
    for (var i = 0; i < courseData.length; i++) {
      courseData[i].lessons = lessonData[i];
    }
    return courseData;
  };

  const convertDate = (date) => {
    var a = date.slice(0, 10);
    return a;
  };

  const convertSession = (sess: any) => {
    var a = "";
    if (sess === 1) {
      a = "7:00 - 9:30";
    } else if (sess === 2) {
      a = "9:30-12:00";
    } else if (sess === 3) {
      a = "12:30-15:00";
    } else if (sess === 4) {
      a = "15:00-17:30";
    } else if (sess === 5) {
      a = "18:00-21:30";
    }
    return a;
  };

  const convertSchedule = () => {
    const data = getCalendarData();
    // console.log(data);
    var scheduleTemp = {};
    data.map((item) => {
      item.lessons.map((item2) => {
        const a = Object.keys(scheduleTemp);
        if (a.includes(convertDate(item2.lesson_date))) {
          scheduleTemp[convertDate(item2.lesson_date)].push({
            Teacher_name: item.teacher_id.name,
            Class_name: "alo",
            Subject_Name: item.classroom_name,
            Session: item2.shift,
          });
        } else {
          scheduleTemp[convertDate(item2.lesson_date)] = [
            {
              lesson_id: item2._id,
              Teacher_name: item.teacher_id.name,
              Class_name: item.location,
              Subject_Name: item.classroom_name,
              Session: item2.shift,
            },
          ];
        }
      });
    });
    // console.log(scheduleTemp);
    return scheduleTemp;
  };

  useEffect(() => {
    const a = convertSchedule();
    setSchedule(a);
  }, []);

  // console.log(schedule);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v_header}>
        <Text
          style={{ position: "absolute", left: 20, fontSize: 15 }}
          onPress={() => goBack()}
        >
          Back
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {moment(moment()).format("DD-MMM-YYYY")}
        </Text>
      </View>
      <Agenda
        items={schedule}
        pastScrollRange={5}
        futureScrollRange={5}
        showClosingKnob={true}
        renderItem={(item, firstItemInDay) => {
          return (
            <TouchableOpacity
              style={styles.v_dayDetail}
              onPress={() =>
                navigate(Routes.LESSON, {
                  lesson_id: item.lesson_id,
                  course_name: item.Subject_Name,
                })
              }
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: scale(20),
                  color: "#303137",
                  marginBottom: scale(5),
                }}
              >
                {item.Subject_Name}
              </Text>
              <Text style={{ fontStyle: "italic" }}>
                {convertSession(item.Session)}
              </Text>
              <Text>{item.Class_name}</Text>
              <Text>{item.Teacher_name}</Text>
            </TouchableOpacity>
          );
        }}
        renderEmptyData={() => {
          return <View />;
        }}
        theme={{
          agendaDayTextColor: "#303137",
          agendaDayNumColor: "#303137",
          agendaTodayColor: "#EFC93B",
          agendaKnobColor: "#303137",
          selectedDayBackgroundColor: "#EFC93B",
          dotColor: "#EFC93B",
          // textDayFontWeight: 'bold',
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
          foregroundColor: "#FFF3C6",
          todayTextColor: "#EFC93B",
        }}
      />
    </SafeAreaView>
  );
};

export default Calendar_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFE",
  },

  v_header: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    // borderBottomWidth: 0.2,
    // borderColor: "grey",
  },

  v_dayDetail: {
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBottom: scale(10),
    marginTop: 16,
    borderRadius: scale(10),
    paddingLeft: scale(20),
    marginRight: 30,
    paddingVertical: 20,
  },
});
