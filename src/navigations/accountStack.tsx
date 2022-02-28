import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../configs/Routes";
import Account from "../container/Account";

const Stack = createStackNavigator();

const accountStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Account}
        component={Account}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
});

export default accountStack;
