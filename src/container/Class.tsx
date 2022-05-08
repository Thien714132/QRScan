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
import { getAllClasses } from "../services/class_services";
import { useSelector } from "react-redux";
import { TEXT } from "../configs/TEXT";

const Class = () => {
  const { course } = useSelector((state: any) => state.courseState);
  // let value: string;
  const { goBack, navigate } = useNavigation();
  const [searchClass, setSearchClass] = useState<any>(course?.courses);

  const onSearch = (e: any) => {
    var temp = course?.courses?.filter((element: any) =>
      element.classroom_name.includes(e)
    );
    setSearchClass(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <SvgQRCode value={JSON.stringify(a)} /> */}
      {/* <Button title="click" onPress={getCalendarData} /> */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.V_back_button}
          onPress={() => navigate(Routes.DashBoard)}
        >
          <Image
            style={styles.img_header_icon}
            source={require("../images/ic_left_arrow.png")}
          />
        </TouchableOpacity>
        <View style={styles.v_search}>
          <TextInput
            style={styles.txt_search}
            placeholderTextColor="#707070"
            placeholder={TEXT.CLASS.SEARCH}
            // value={searchData}
            onChangeText={(text) => onSearch(text)}
          />
        </View>
        <View style={{ flex: 0.1, alignItems: "flex-end" }}>
          <Image
            style={styles.img_header_icon}
            source={require("../images/ic_search.png")}
          />
        </View>
      </View>
      <LinearGradient
        colors={[main_color1, main_color2]}
        start={[1, 1]}
        end={[1, 0]}
      >
        <View style={{ marginLeft: 20, marginVertical: 20 }}>
          <Text style={styles.txt_label}>{TEXT.CLASS.MY_CLASS}</Text>
        </View>
      </LinearGradient>
      <ScrollView
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {searchClass?.map((item: any) => (
          <TouchableOpacity
            onPress={() =>
              navigate(Routes.CLASS_DETAIL, {
                color: item.color,
                _id: item._id,
              })
            }
            key={item._id}
            style={[styles.bt_class_item, styles.shadowButton]}
          >
            <View
              style={[styles.v_class_avatar, { backgroundColor: item.color }]}
            >
              <Text style={styles.txt_class_avatar}>
                {getName(item.classroom_name)}
              </Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text numberOfLines={2} style={styles.txt_class_name}>
                {item.classroom_name}
              </Text>
              <Text style={{ color: regular }}>{item.teacher_id.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Class;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_color1,
  },

  header: {
    paddingHorizontal: 15,
    paddingTop: 20,
    // paddingBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
    // alignSelf: "baseline",
    flexDirection: "row",
    alignItems: "center",
  },

  V_back_button: {
    flex: 0.1,
  },

  v_search: {
    flex: 0.8,
    borderWidth: 1,
    borderColor: main_color1,
    paddingVertical: 5,
    borderRadius: 20,
    paddingRight: 10,
  },

  txt_search: {
    // flex: 0.9,
    paddingLeft: 15,
    fontSize: 15,
  },

  img_header_icon: {
    height: 17,
    width: 17,
    tintColor: icon_color,
  },

  txt_label: {
    fontSize: 18,
    fontWeight: "bold",
    color: icon_color_2,
    // alignSelf: "center",
  },

  bt_class_item: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  v_class_avatar: {
    flex: 0.2,
    height: 70,
    width: 70,
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 1,
  },

  txt_class_avatar: {
    fontSize: 50,
    color: "#fff",
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "700",
  },

  txt_class_name: {
    fontSize: 18,
    fontWeight: "700",
    color: capital,
    marginBottom: 5,
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
});
