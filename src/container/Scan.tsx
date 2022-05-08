import { useNavigation } from "@react-navigation/native";
import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import scale from "../configs/scale";
import Scanner from "../components/Sacnner";

const Scan = () => {
  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(false);
  // const windowWidth = Dimensions.get("window").width;
  // const windowHeight = Dimensions.get("window").height;

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  //   console.log(data);
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View style={styles.container}>
      
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          height: (windowHeight - 350) / 2,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
      <View style={{ height: 300, width: "100%", flexDirection: "row" }}>
        <View
          style={{
            height: 300,
            width: (windowWidth - 300) / 2,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
        <View style={{ height: 300, width: 300 }}>
          <Image
            source={require("../images/full-screen.png")}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <View
          style={{
            height: 300,
            width: (windowWidth - 250) / 2,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </View>
      <View
        style={{
          height: (windowHeight - 300) / 2,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        {scanned && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 50,
              alignSelf: "center",
              height: 40,
              width: 150,
              backgroundColor: "#EFC93B",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
            onPress={() => setScanned(false)}
          >
            <Text>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View> */}
      <Scanner />
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
