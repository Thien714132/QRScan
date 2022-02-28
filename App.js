import React, { useCallback, useMemo, useState } from "react";
import { View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import RootStack from "./src/navigations";
import { StatusBar } from "expo-status-bar";
export default function App() {
  return (
      <NavigationContainer>
        <StatusBar style="light" translucent={false}/>
        <RootStack />
      </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
