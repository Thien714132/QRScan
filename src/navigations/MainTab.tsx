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

const Tab = createBottomTabNavigator();

const CustomQrScanButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{ top: 0, justifyContent: "center", alignItems: "center", 
    //...styles.shadow 
  }}
    onPress={onPress}
  >
    <LinearGradient
      colors={['#686A75', '#333542']}
      style={{
        width: scale(50),
        height: scale(50),
        borderRadius: scale(10),
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
        tabBarStyle: [styles.tabBarStyle, 
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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../images/ic_home.png")}
                resizeMode="contain"
                style={{
                  height: scale(30), 
                  width: scale(30),
                  tintColor: focused ? "#EFC93B" : "#A5AFBF",resizeMode: 'contain'
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
            <Image
              source={require("../images/ic_qr.png")}
              resizeMode="contain"
              style={{ height: scale(30), width: scale(30), resizeMode: 'contain',
                // tintColor: "#fff"
                tintColor: focused ? "#EFC93B" : "#fff",
               }}
            />
          ),
          tabBarButton: (props) => <CustomQrScanButton {...props} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.AccountStack}
        component={accountStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../images/ic_user.png")}
                resizeMode="contain"
                style={{
                  height: scale(30),
                  width: scale(30),
                  tintColor: focused ? "#EFC93B" : "#A5AFBF",resizeMode: 'contain'
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
    position: "absolute",
    bottom: '2%',
    height: '8%',
    backgroundColor: "#f4f6f8",
    marginHorizontal: scale(30),
    // borderTopRightRadius: scale(20),
    // borderTopLeftRadius: scale(20),
    borderRadius: scale(20),
    borderTopWidth: 0,
    elevation: 0
  },

  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // elevation: 3,
  }
});
