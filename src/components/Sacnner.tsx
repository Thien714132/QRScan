import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Device from "expo-device";
import * as Network from "expo-network";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { setHistory } from "../redux/actions/historyAction";
import { createHistory, getHistoryByStudent } from "../services/class_services";

const A = {
  date: "2022-05-03T15:18:50+07:00",
  _id: "626dd25e98ce19264d649eb7",
};

const Scanner = (props) => {
  const { goBack } = useNavigation();
  const { lesson_Data, onPress, expireTime } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [qr_return, setQRReturn] = useState<any>(" ");
  const { user } = useSelector((state: any) => state.userState);
  const { token } = useSelector((state: any) => state.tokenState);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const B = {
    _id: lesson_Data,
    date: "2022-05-03T16:04:39+07:00",
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // setQRReturn(JSON.parse(data));
    // alert(checkCondition(JSON.parse(data)));
    // if(JSON.parse(data))
    if (JSON.parse(data).role) {
      if (JSON.parse(data).role === "Student") {
        alert(
          `name : ${JSON.parse(data).name} MSV: ${
            JSON.parse(data)?.MSV
          } Phone: ${JSON.parse(data)?.phone} DOB: ${moment(
            JSON.parse(data)?.DOB
          ).format("DD MM YYYY")}`
        );
      } else {
        alert(
          `name : ${JSON.parse(data).name} Phone: ${
            JSON.parse(data)?.phone
          } DOB: ${moment(JSON.parse(data)?.DOB).format("DD MM YYYY")}`
        );
      }
    } else {
      checkCondition(JSON.parse(data));
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const checkCondition = async (item) => {
    const ScanData = JSON.parse(item);
    const LesonNow = {
      _id: lesson_Data,
      date: moment().format(),
      ip: await Network.getIpAddressAsync(),
    };

    console.log(LesonNow.ip);
    console.log(ScanData.ip);

    const convertIPScan = ScanData.ip.split(".");
    const convertIPSlesson = LesonNow.ip.split(".");
    const condition =
      convertIPScan[0] === convertIPSlesson[0] &&
      convertIPScan[1] === convertIPSlesson[1];
    // &&
    // convertIPScan[2] === convertIPSlesson[2];
    // console.log(
    //   ScanData._id,
    //   new Date(LesonNow.date).getTime(),
    //   LesonNow.date,
    //   LesonNow._id,
    //   new Date(ScanData.date).getTime(),
    //   ScanData.date
    // );
    console.log("now", moment().format());
    console.log("scandate", ScanData.date);
    console.log(
      "count",
      new Date(moment().format()).getTime() -
        86400000 -
        new Date(ScanData.date).getTime()
    );
    // console.log(
    //   new Date("2022-06-22T14:17:11.000Z").getTime() -
    //     new Date("2022-06-22T14:16:11.000Z").getTime()
    // );

    if (
      ScanData._id === LesonNow._id &&
      new Date(moment().format()).getTime() +
        86400000 -
        new Date(ScanData.date).getTime() <
        parseInt(ScanData.expireTime) * 60000 &&
      condition
    ) {
      const A = await createHistory(token, {
        lesson_id: LesonNow._id,
        student_id: user._id,
        check_in_at: LesonNow.date,
        device_name: `${Device.modelName} - ${Device.deviceName}`,
      });
      // console.log(A);
      if (A.history) {
        Alert.alert("Thành công", `Chúc mừng bạn đã điểm danh thành công`, [
          { text: "OK", onPress: onPress },
        ]);
        const historyData = await getHistoryByStudent(token, user._id);
        setHistory(historyData);
      } else alert(A.message);
    }
    // return "Điểm danh thất bại";
    else alert("Điểm danh thất bại");
  };

  // console.log("+++++", moment().format());

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          height: (windowHeight - 300) / 2 - 40,
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
          height: (windowHeight - 300) / 2 + 40,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        {scanned && (
          <TouchableOpacity
            style={styles.scanAgain}
            onPress={() => setScanned(false)}
          >
            <Text>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scanAgain: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    height: 40,
    width: 150,
    backgroundColor: "#EFC93B",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
