import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import {Ionicons} from '@expo/vector-icons'

import ButtonComp from "../../components/ButtonComp";
import RegisterButton from "../../components/RegisterButton";
import Colors from "../../constants/Colors";

const RegisterAs = (props) => {
  const nextHandler = useCallback(() => {
    props.navigation.navigate("Signup", { Tanneries: "Tannery" });
  }, []);
  const nextHandlerExpert = useCallback(() => {
    props.navigation.navigate("Signup", { Agents: "Expert" });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "white",
      }}
    >
      <Ionicons name="chevron-back-outline" size={30} style={{marginTop:5}} onPress={()=>props.navigation.goBack()} />
      <View style={{ marginHorizontal: 10, justifyContent:'center', flex:1 }}>
        <View style={{ alignItems: "center", marginTop: 30,  }}>
          <Text allowFontScaling={false}
            style={{ color: Colors.text, fontSize: 30, fontWeight: "bold" }}
          >
            Welcome to
          </Text>
          <Text allowFontScaling={false} style={styles.hideTradeTextSTyle}>
            HIDE <Text style={{ color: Colors.heading2 }}> TRADE</Text>
          </Text>
        </View>
        {/* <View style={{ marginTop: 200, marginHorizontal: 20 }}> */}
        <View style={{ marginHorizontal: 20, marginTop:'20%' }}>
          <Text
            style={{
              color: Colors.text,
              fontWeight: "700",
              textAlign: "center",
            }}allowFontScaling={false}
          >
            Register As
          </Text>
          <View style={{ marginTop: 20 }}>
            <RegisterButton title={"A Tannery"} onPress={nextHandler} />
          </View>
          <View style={{ marginTop: 30 }}>
            <RegisterButton title={"An Expert"} onPress={nextHandlerExpert} />
          </View>
          <View style={{ marginTop: 30 }}>
            <Text allowFontScaling={false} style={{textAlign:'center'}}>
              The Features of the application are different depending on whther
              you are one or the other!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hideTradeTextSTyle: {
    color: Colors.heading1,
    fontWeight: "bold",
    fontSize: 30,
    textDecorationLine: "underline",
    textDecorationColor: Colors.heading1,
    marginTop: 10,
  },
});

export default RegisterAs;
