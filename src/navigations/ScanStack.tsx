import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import Routes from "../configs/Routes";
import Scan from "../container/Scan";

const Stack = createStackNavigator();

const ScanStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Scan}
        component={Scan}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default ScanStack;
