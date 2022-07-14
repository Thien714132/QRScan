import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  initialWindowMetrics, SafeAreaProvider
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import RootStack from "./src/navigations";
import { store } from "./src/redux/reducer";


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar
        translucent={false}
        backgroundColor={backgroundColor}
        {...props}
      />
    </SafeAreaView>
  </View>
);

export default function App() {

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <NavigationContainer>
          <MyStatusBar backgroundColor="#fff" barStyle="light-content" />
          {/* <StatusBar style="dark-content" backgroundColor='#fff' translucent={false}/> */}
          <RootStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: "#33373B",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
