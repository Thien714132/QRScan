import react from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { capital, icon_color_2, regular } from "../configs/Colors";
import scale from "../configs/scale";

export default function Button(props) {
  const {
    onPress,
    iconName,
    buttonName,
    iconColor,
    iconBackground,
    marginLeft,
    detailButton,
    redDot = false
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.bt_dash,
        { ...styles.shadowButton, marginLeft: marginLeft },
      ]}
    >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={[
            styles.icon_container,
            { backgroundColor: iconBackground, borderColor: iconColor },
          ]}
        >
          <Image
            style={[styles.ic_dashButton, { tintColor: iconColor }]}
            source={iconName}
          />
        </View>

          {redDot ? <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: "red",
            borderRadius: 20,
            position: 'absolute',
            right: 0,
            top: 0
          }}/>: null}
        
      </View>
      <Text style={styles.txt_dashButton}>{buttonName}</Text>
      <Text style={styles.txt_dashDetailButton}>{detailButton}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bt_dash: {
    height: 150,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
  },

  ic_dashButton: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },

  txt_dashButton: {
    fontSize: 18,
    color: capital,
    marginTop: 10,
    fontWeight: "700",
  },

  txt_dashDetailButton: {
    fontSize: 15,
    color: regular,
    marginTop: 5,
  },

  shadowButton: {
    shadowColor: capital,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },

  icon_container: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    alignSelf: "baseline",
    justifyContent: "center",
    alignItems: "center",
  },
});
