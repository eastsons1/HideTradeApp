import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import Colors from "../constants/Colors";

const ButtonForLogout = (props) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
        <View
          style={{
            marginLeft: 5,
            justifyContent: "space-evenly",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
            allowFontScaling={false}
          >
            {props.title}
          </Text>
          {/* <Image
            source={require("../assets/ByClient/LOGOUTWHITE.png")}
            style={{ width: 30, height: 30 }}
            resizeMode={Platform.OS == "android" ? "center" : "contain"}
          /> */}
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

export default ButtonForLogout;
