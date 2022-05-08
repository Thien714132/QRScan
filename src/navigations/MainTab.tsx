import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabActions } from "@react-navigation/native";
import Routes from "../configs/Routes";
import scale from "../configs/scale";
import accountStack from "./accountStack";
import dashBoardStack from "./dashBoardStack";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Scan from "../container/Scan";
import ScanStack from "./ScanStack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { icon_color, icon_color_2 } from "../configs/Colors";

const Tab = createBottomTabNavigator();

const CustomQrScanButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      justifyContent: "center",
      alignItems: "center",
      //...styles.shadow
    }}
    onPress={onPress}
  >
    <LinearGradient
      colors={[icon_color, icon_color]}
      style={{
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: "#000",
      }}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBarStyle,
          // {...styles.shadow}
        ],
      }}
    >
      <Tab.Screen
        name={Routes.DashBoardStack}
        component={dashBoardStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: "50%",
                height: scale(70),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../images/ic_home.png")}
                resizeMode="contain"
                style={{
                  height: scale(28),
                  width: scale(28),
                  tintColor: focused ? icon_color : icon_color_2,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.ScanStack}
        component={ScanStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../images/ic_qr.png")}
                resizeMode="contain"
                style={{
                  height: scale(40),
                  width: scale(40),
                  resizeMode: "contain",
                  // tintColor: "#fff",
                  tintColor: focused ? icon_color : icon_color_2,
                }}
              />
            </View>
          ),
          // tabBarButton: (props) => <CustomQrScanButton {...props} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.AccountStack}
        component={accountStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: "50%",
                height: scale(70),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../images/ic_user.png")}
                resizeMode="contain"
                style={{
                  height: scale(28),
                  width: scale(28),
                  tintColor: focused ? icon_color : icon_color_2,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    width: "100%",
    height: scale(60),
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // elevation: 3,
  },
});
