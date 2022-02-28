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
} from "react-native";

const Scan = () => {
    return(
        <View style={styles.container}>
            <Text>Scan</Text>
        </View>
    )
}

export default Scan

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFE'
    },
})