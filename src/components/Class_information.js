import react from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { capital, icon_color_2, regular } from "../configs/Colors";
import scale from "../configs/scale";

export default function Class_information(props) {
  const {
    information,
    iconColor,
    iconName,
    fontStyle,
    imageStyle,
    iconBackground
  } = props;
  return (
    <View style={styles.v_class_infor}>
      <View style={styles.v_class_icon}>
        <View style={{padding: 8, backgroundColor: iconBackground, borderRadius: 30}}>
          <Image
            style={[styles.ic_class_infor, imageStyle]}
            source={iconName}
          />
        </View>
      </View>
      <View style={styles.v_infor_detail}>
        <Text numberOfLines={2} style={[styles.txt_class_infor, fontStyle]}>
          {information}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    v_class_infor: {
        // backgroundColor: "#fff",
        flexDirection: "row",
        // alignItems: "center",
        marginHorizontal: 15,
        paddingBottom: 5,
      },
    
      v_class_icon: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
      },
    
      ic_class_infor: {
        height: 20,
        width: 20,
        // resizeMode: "contain",
      },
    
      v_infor_detail: {
        flex: 0.85,
        justifyContent: "center",
      },

      txt_class_infor:{ fontSize: 16, color: capital, textAlignVertical: 'center' }
});
