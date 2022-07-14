import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../configs/Routes";
import DashBoard from "../container/DashBoard";
import Class from "../container/Class";
import Class_detail from "../container/Class_Detail";
import Calendar_Screen from "../container/Calendar";
import Lesson from "../container/Lesson";
import History from "../container/History";
import AddLesson from "../container/AddLesson";
import Support from "../container/Support";

const Stack = createStackNavigator();

const dashBoardStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.DashBoard}
        component={DashBoard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.CLASS}
        component={Class}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.CLASS_DETAIL}
        component={Class_detail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.CALENDAR}
        component={Calendar_Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.LESSON}
        component={Lesson}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.HISTORY}
        component={History}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ADD_LESON}
        component={AddLesson}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SUPPORT}
        component={Support}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default dashBoardStack;
