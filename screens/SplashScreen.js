import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Text,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRevenueCat } from "../customHook/useRevenueCat";

const SplashScreen = (props) => {
  // useEffect(() => {
  //   console.log("inside splash screen use Effect");
  //   setTimeout(() => {
  //     console.log("inside set time out use effect");
  //     props.navigation.navigate("Login");
  //   }, 2000);
  // });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const status = await AsyncStorage.getItem("loginStatus");
    const id = await AsyncStorage.getItem("user_id");
    const userType = await AsyncStorage.getItem("user_type");

    console.log("after await values=" + status + id + userType);

    console.log("after function=" + status + id + userType);

    if (status == undefined || id == undefined || userType == undefined) {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 3000);
    } else if (status == undefined) {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 3000);
    } else if (id == undefined) {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 3000);
    } else if (userType == undefined) {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 3000);
    } else {
      // check wether subscription is active or not
      checkForSubsciption(userType, id);
    }
  };

  const checkForSubsciption = async (userType, id) => {
    console.log(userType, id, ">>>>>>>>>>>>>>>>>>");
    let flag = false;

    if (userType === "Tanneries") {
      if (Platform.OS === "android") {
        let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=Tanneries&user_id=${id}`;
        const checkDetails = await axios.get(webApiUrl);
        console.log(checkDetails.data, "PPPPPPPPPPPPPPPPPPPPPPPPPPPP");

        const timestamp = checkDetails.data.User_Details[0].timestamp + "";
        var email = checkDetails.data.User_Details[0].email;
        var name = id;

        console.log(timestamp, "timestamptimestamptimestamp");

        console.log(Number(timestamp));

        if (
          timestamp === "" ||
          timestamp.length == 0 ||
          isNaN(Number(timestamp))
        ) {
          flag = true;
        } else {
          const date_exp = new Date(Number(timestamp) * 1000);
          console.log("Exp : " + date_exp);
          if (date_exp < new Date()) {
            flag = true;
          }
        }
      } else {
        const response = await useRevenueCat();
        const customerInfo = response.ci;
        const isSubscribed =
          customerInfo.activeSubscriptions.includes("tannery");
        console.log("isSubscribedisSubscribedisSubscribed", isSubscribed);
        if (!isSubscribed) {
          flag = true;
        }
      }
    }

    if (flag) {
      console.log("hello", flag);
      const Data = {
        email: email,
        name: name,
      };
      if (Platform.OS === "android")
        ToastAndroid.show("Your Subsciption Expired!", ToastAndroid.LONG);
      setTimeout(() => {
       // Alert.alert("hiiiiii");
        props.navigation.navigate("CheckoutScreen", { Data: Data });
      }, 3000);
    } else {
      setTimeout(() => {
        //Alert.alert("PPP");
        props.navigation.navigate("Tabs");
      }, 3000);
    }
  };

  return (
    <View style={styles.layout}>
      {/* <StatusBar backgroundColor={Colors.theme} barStyle={"light-content"} /> */}
      <Image
        //source={require("../assets/loader.jpg")}
        source={require("../assets/300.png")}
        resizeMode="contain"
        resizeMethod="scale"
        style={{ width: 250, height: 250 }}
      />
      {/* <Text>Hi={status}={id}={userType}</Text> */}
      {/* <Text>splash screen</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SplashScreen;
