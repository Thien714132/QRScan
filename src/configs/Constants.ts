import { Dimensions } from "react-native";

export const API = "http://172.31.98.13:3000";

const Constants = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("screen").height,
};

export default Constants;
