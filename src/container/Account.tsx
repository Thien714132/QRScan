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
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Account_button from "../components/Account_button";
import {
  capital,
  icon_color,
  main_color1,
  main_color2,
  regular,
} from "../configs/Colors";
import Routes from "../configs/Routes";
import { deleteToken } from "../redux/actions/tokenAction";
import { useSelector } from "react-redux";
import { deleteUser } from "../redux/actions/userAction";
import { deleteCourse } from "../redux/actions/coursesAction";

const Account = () => {
  const { navigate } = useNavigation();
  const { user } = useSelector((state: any) => state.userState);

  const getName = (name: any) => {
    if (name != undefined && name != null && name != {}) {
      // console.log(name);
      var values = name.split(" ");
      var letter = values[values.length - 1].charAt(0);
      return letter;
    }
  };

  // let userName: String;
  // let userRole: String

  const onSignOut = () => {
    deleteToken();
    // deleteUser();
    // deleteCourse();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: main_color1 }}>
        {/* <View style={styles.v_header}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: capital }}>
            Account
          </Text>
        </View> */}
        <View style={styles.v_information}>
          <View style={styles.v_avatar}>
            <Text style={styles.txt_avatar}>{getName(user?.name)}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.txt_name}>{user ? user?.name : null}</Text>
            <Text style={styles.txt_role}>{user ? user.role : null}</Text>
          </View>
        </View>

        <View
          style={{
            paddingTop: 30,
            paddingHorizontal: 20,
            backgroundColor: main_color1,
          }}
        >
          <Account_button
            buttonName="Personal information"
            iconName={require("../images/ic_user.png")}
            iconColor="#F79A2D"
            iconBackground="#FEF7ED"
          />

          <Account_button
            buttonName="Change password"
            iconName={require("../images/ic_lock.png")}
            iconColor="#14ABD6"
            iconBackground="#EAF7FB"
          />

          <Account_button
            buttonName="Dark mode"
            iconName={require("../images/ic_dark_mode.png")}
            iconColor="#5A6175"
            iconBackground="#F2F3F4"
            switches={true}
          />

          <Account_button
            buttonName="Log out"
            iconName={require("../images/ic_logout.png")}
            iconColor="#d84a4a"
            iconBackground="#fee8e8"
            onPress={onSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_color2,
  },

  v_header: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    // borderBottomWidth: 0.2,
    // borderColor: "grey",
  },

  v_information: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 20,
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

  txt_name: {
    fontSize: 20,
    fontWeight: "bold",
    color: capital,
    marginTop: 15,
  },

  txt_role: {
    fontSize: 15,
    color: regular,
    marginTop: 5,
    marginBottom: 20,
  },
});
