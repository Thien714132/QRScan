import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { useSelector } from "react-redux";
import { main_color1, regular } from "../configs/Colors";
import Routes from "../configs/Routes";
import scale from "../configs/scale";
import { getStudentClass, getTeacherClass } from "../services/class_services";

const Calendar_Screen = () => {
  const { navigate, goBack } = useNavigation();
  const [schedule, setSchedule] = useState<any>();
  const [courses, setCourses] = useState<any>();
  const { course } = useSelector((state: any) => state.courseState);
  const { user } = useSelector((state: any) => state.userState);
  const { token } = useSelector((state: any) => state.tokenState);

  const onGetCourse = async () => {};

  const getCalendarData = async (): Promise<any> => {
    let temp: any;
    if (user?.role === "Student") {
      const coursesData = await getStudentClass(token, user?._id);
      if (coursesData) {
        temp = coursesData;
      }
    } else if (user?.role === "Teacher") {
      const coursesData = await getTeacherClass(token, user._id);
      if (coursesData) {
        temp = coursesData;
      }
    }
    var courseData = temp?.courses;
    var lessonData = temp?.lesson;
    for (var i = 0; i < courseData.length; i++) {
      courseData[i].lessons = lessonData[i];
    }
    var scheduleTemp = {};
    courseData.map((item) => {
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
    setSchedule(scheduleTemp);
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

  // const convertSchedule = () => {
  //   const data = getCalendarData();
  //   // console.log(data);
  //   var scheduleTemp = {};
  //   if (courses) {
  //     courses.map((item) => {
  //       item.lessons.map((item2) => {
  //         const a = Object.keys(scheduleTemp);
  //         if (a.includes(convertDate(item2.lesson_date))) {
  //           scheduleTemp[convertDate(item2.lesson_date)].push({
  //             Teacher_name: item.teacher_id.name,
  //             Class_name: "alo",
  //             Subject_Name: item.classroom_name,
  //             Session: item2.shift,
  //           });
  //         } else {
  //           scheduleTemp[convertDate(item2.lesson_date)] = [
  //             {
  //               lesson_id: item2._id,
  //               Teacher_name: item.teacher_id.name,
  //               Class_name: item.location,
  //               Subject_Name: item.classroom_name,
  //               Session: item2.shift,
  //             },
  //           ];
  //         }
  //       });
  //     });
  //   }

  //   // console.log(scheduleTemp);
  //   return scheduleTemp;
  // };

  useEffect(() => {
    getCalendarData();
    // console.log(getCalendarData());
    // const a = convertSchedule();
    // setSchedule(a);
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
          {moment(moment()).format("DD-MM-YYYY")}
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
          return (
            <View
              style={{
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: regular,
                  textAlign: "center",
                }}
              >
                No class today
              </Text>
            </View>
          );
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
          // calendarBackground: main_color1,
          backgroundColor: main_color1,
        }}
      />
    </SafeAreaView>
  );
};

export default Calendar_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
