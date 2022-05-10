import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../configs/Routes";
import Account from "../container/Account";
import User_detail from "../container/User_detail";
import Change_password from "../container/Change_password";

const Stack = createStackNavigator();

const accountStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Account}
        component={Account}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name={Routes.USER_DETAIL}
        component={User_detail}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name={Routes.CHANGE_PASSWORD}
        component={Change_password}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
});

export default accountStack;
