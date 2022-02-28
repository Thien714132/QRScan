import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../configs/Routes";
import DashBoard from "../container/DashBoard";

const Stack = createStackNavigator();

const dashBoardStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.DashBoard}
        component={DashBoard}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
});

export default dashBoardStack;
