import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../configs/Routes";
import Account from "../container/Account";
import Scan from "../container/Scan";

const Stack = createStackNavigator();

const ScanStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Scan}
        component={Scan}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
});

export default ScanStack;
