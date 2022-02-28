import React, { memo, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../container/Login";
import Routes from "../configs/Routes";
import MainTab from "./MainTab";

const Stack = createStackNavigator();

const RootStack = memo(() => {
  return (
    <Stack.Navigator initialRouteName={Routes.Login}>
      <Stack.Screen
        name={Routes.Login}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Maintab}
        component={MainTab}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name={Routes.Login}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.ForgetPassword}
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.SignUp}
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.MainTab}
        component={MainTab}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
});

export default RootStack;
