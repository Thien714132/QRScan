import React, { memo, useState, useCallback, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { capital, icon_color_2, regular } from "../configs/Colors";
import scale from "../configs/scale";

export default function Account_button(props) {
  const [toggleSwitch, setToggleSwitch] = useState(false);

  const {
    buttonName,
    iconName,
    iconColor,
    iconBackground,
    switches = false,
    onPress,
    right_arrow = true
  } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.v_bt_content}>
        <View style={[styles.v_icon, { backgroundColor: iconBackground }]}>
          <Image
            style={{ height: 20, width: 20, tintColor: iconColor }}
            source={iconName}
          />
        </View>
        <Text style={styles.txt_content}>{buttonName}</Text>
        {switches ? (
          <TouchableOpacity
            style={[
              styles.v_switch,
              { backgroundColor: toggleSwitch ? "#29D277" : "#8F96AA" },
            ]}
            onPress={() => setToggleSwitch(!toggleSwitch)}
          >
            {toggleSwitch ? (
              <View style={styles.v_switch_dot} />
            ) : (
              <View
                style={[
                  styles.v_switch_dot,
                  { position: "absolute", right: 2 },
                ]}
              />
            )}
          </TouchableOpacity>
        ) : (
          <>
          {right_arrow ? <Image
            style={styles.img_right_arrow}
            source={require("../images/ic_right_arrow.png")}
          />: null}
          </>
          
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 20,
  },

  v_bt_content: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginVertical: 15,
  },

  v_icon: {
    padding: 10,
    borderRadius: 30,
  },

  txt_content: {
    fontSize: 18,
    color: capital,
    marginLeft: 10,
  },

  img_right_arrow: {
    height: 15,
    width: 15,
    position: "absolute",
    right: 20,
    tintColor: regular,
  },

  v_switch: {
    height: 30,
    width: 60,
    borderRadius: 20,
    justifyContent: "center",
    paddingLeft: 2,
    position: "absolute",
    right: 20,
  },

  v_switch_dot: {
    height: 26,
    width: 26,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
