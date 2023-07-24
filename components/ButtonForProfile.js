import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Colors from "../constants/Colors";

const ButtonForProfile = (props) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
        <View style={{ marginLeft: 5, justifyContent: "center"}}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
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
    height: 50,
    borderRadius: 25,
    width: 150,
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

export default ButtonForProfile;