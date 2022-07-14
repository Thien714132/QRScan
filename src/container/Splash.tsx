import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const Splash = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      // navigate(Routes.Login);
    }, 3000);
  }, []);
  const scaleAnimationRef = useRef(new Animated.Value(0)).current;
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scaleAnimationRef, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [scaleAnimationRef]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(opacityAnimationRef, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [opacityAnimationRef]);

  return (
    <View style={styles.container}>
      <LottieView source={require("../images/thien.json")} autoPlay loop />
      <Animated.View style={styles.markerWrap}>
        <Animated.View
          style={[
            styles.ring,
            { opacity: opacityAnimationRef },
            { transform: [{ scale: scaleAnimationRef }] },
          ]}
        />
        <View style={styles.marker} />
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    resizeMode: "stretch",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: Dimensions.get("screen").height / 3,
    left: Dimensions.get("screen").width / 3,
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,255, 0.9)",
    position: "absolute",
    borderWidth: 3,
    borderColor: "#fff",
  },
  ring: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0,0,255, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(0,0,255, 0.5)",
    opacity: 1,
  },
});
