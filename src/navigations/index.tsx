import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import Routes from "../configs/Routes";
import Login from "../container/Login";
import Splash from "../container/Splash";
import MainTab from "./MainTab";

const Stack = createStackNavigator();

const RootStack = memo(() => {
  const { token } = useSelector((state: any) => state.tokenState);

  return (
    <Stack.Navigator initialRouteName={Routes.Login}>
      {token ? (
        <>
          <Stack.Screen
            name={Routes.Maintab}
            component={MainTab}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={Routes.Login}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.SPLASH}
            component={Splash}
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
