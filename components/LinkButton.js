import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const LinkButton = (props) => {
  return (
    <View style={{ justifyContent: "center" }}>
      <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
        <View>
          <Text style={{color:'white', fontWeight:'500'}}allowFontScaling={false}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    //padding: 8,
    height: 40,
    borderRadius: 35,
    width: 100,
    backgroundColor: Colors.buttonBackground,
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
    alignItems:'center'
  },
});

export default LinkButton;
