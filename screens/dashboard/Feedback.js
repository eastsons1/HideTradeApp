import React, { useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, BackHandler, Alert } from "react-native";

import RegisterButton from "../../components/RegisterButton";
import Colors from "../../constants/Colors";

const Feedback = (props) => {
  useEffect(()=>{
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  },[])

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.text,
          textAlign: "center",
          marginTop: 20,
        }}allowFontScaling={false}
      >
        Leave Your FeedBack
      </Text>
      <View style={{ marginHorizontal: 20, justifyContent: "center", flex: 1 }}>
        <View style={{ marginBottom: 10 }}>
          <RegisterButton
            title={"To a Tannery"}
            onPress={() => props.navigation.navigate("Tanneries List")}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <RegisterButton
            title={"To an Expert"}
            onPress={() => props.navigation.navigate("Agent List")}
          />
        </View>
        {/* <RegisterButton title={"Search Area"} /> */}
      </View>
      <View style={{ alignItems: "flex-end", marginBottom:15 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Approval List");
          }} style={{flexDirection:'row'}}
        >
          <Text
            style={{ fontSize: 22, alignSelf: "center", color: "#62B0A2" }}allowFontScaling={false}
          >
            Check your Approval List
          </Text>
          <Image source={require('../../assets/ByClient/BOTTOMNEXT.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Feedback;
