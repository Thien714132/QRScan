import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Scanner from "../components/Sacnner";
import { icon_color, main_color1, main_color2 } from "../configs/Colors";
import { TEXT } from "../configs/TEXT";

const Support = () => {
  const { goBack, navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.V_back_button} onPress={() => goBack()}>
          <Image
            style={styles.img_header_icon}
            source={require("../images/ic_left_arrow.png")}
          />
          <Text style={styles.txt_header}>{TEXT.CLASS_DETAIL.SUPPORT}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: icon_color,
          flexDirection: "row",
          marginHorizontal: 30,
          marginVertical: 30,
          //   paddingHorizontal: 30,
          paddingVertical: 30,
          borderRadius: 20,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          Hotline:
        </Text>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          0858908184
        </Text>
      </View>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_color1,
  },
  header: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  V_back_button: {
    // flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
  },

  img_header_icon: {
    height: 17,
    width: 17,
    tintColor: icon_color,
  },

  txt_header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: icon_color,
  },
});
