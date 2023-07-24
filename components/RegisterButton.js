import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const RegisterButton = (props) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
        <View style={{ marginLeft: 5, justifyContent: "center" }}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight:'600'
            }}allowFontScaling={false}
          >
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
  },
  buttonStyle: {
    padding: 8,
    height: 80,
    borderRadius: 35,
    width: "100%",
    backgroundColor: Colors.buttonBackground,
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});

export default RegisterButton;