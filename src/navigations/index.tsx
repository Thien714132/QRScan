import React, { memo, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../container/Login";
import Routes from "../configs/Routes";
import MainTab from "./MainTab";
import Calendar_Screen from "../container/Calendar";
import Scan from "../container/Scan";
import Class from "../container/Class";
import Class_detail from "../container/Class_Detail";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const RootStack = memo(() => {
  const { token } = useSelector((state: any) => state.tokenState);

  return (
    <Stack.Navigator initialRouteName={Routes.Login}>
      {token ? (
        <Stack.Screen
          name={Routes.Maintab}
          component={MainTab}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name={Routes.Login}
            component={Login}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen
            name={Routes.Scan}
            component={Scan}
            options={{ headerShown: false }}
          /> */}
        </>
      )}

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
