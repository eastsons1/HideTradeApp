import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  //TextInput,
} from "react-native";
import Constants from "expo-constants";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-paper";
import CheckBox from "expo-checkbox";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpinView from "../../components/Spin";
import { StackActions } from "@react-navigation/native";

import Colors from "../../constants/Colors";
import ButtonComp from "../../components/ButtonComp";
import { useRevenueCat } from "../../customHook/useRevenueCat";

// const data = [
//   // { label: "Admin", value: "1" },
//   { label: "Tanneries", value: "2" },
//   { label: "Agents", value: "3" },
// ];

const data = [
  // { label: "Admin", value: "1" },
  { label: "Tannery", value: "2" },
  { label: "Expert", value: "3" },
];

const Login = (props) => {
  const screen = Dimensions;
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    if (dataLoad == false) {
      console.log("inside login page useEffect");
      setApiLoader(false);
      setDataLoaded(true);
    }
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const popAction = StackActions.pop(1);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          allowFontScaling={false}
          style={[styles.label, isFocus && { color: "blue" }]}
        >
          --Select User Type--
        </Text>
      );
    }
    return null;
  };

  const loginHandler = useCallback(async () => {
    setApiLoader(true);
    let webApiUrl = `https://www.hidetrade.eu/app/api/User/login.php?user_type=${
      label == "Tannery" ? "Tanneries" : "Agents"
    }&email=${email}&password=${password}`;
    console.log("webapiurl=" + webApiUrl);
    axios
      .get(webApiUrl)
      .then(async (res) => {
        console.log("response in login=" + JSON.stringify(res.data));
        if (res.data.status == true) {
          await AsyncStorage.setItem("loginStatus", "true");
          await AsyncStorage.setItem("user_id", res.data.User_Details.user_id);
          await AsyncStorage.setItem(
            "user_type",
            res.data.User_Details.user_type
          );

          console.log(res.data.User_Details);

          let flag = false;

          if (label === "Tannery") {
           // if (Platform.OS === "android" || Platform.OS === "ios") {
              if (Platform.OS === "android") {
              const timestamp = res.data.User_Details.timestamp + "";

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
               // Alert.alert('kiiiii')
              console.log(response.ci,'responseresponseresponseresponse')
              const customerInfo = response.ci;
              console.log(customerInfo,'isSubscribedisSubscribedisSubscribed')

              const isSubscribed =
              customerInfo.activeSubscriptions.includes("tannery");


              if (!isSubscribed) {
                flag = true;
              }
            }


          }

          if (flag) {
            const Data = {
              email: res.data.User_Details.email,
              name: res.data.User_Details.user_id,
            };
            setEmail("");
            setPassword("");
            setApiLoader(false);
            // props.navigation.dispatch(StackActions.replace('Tabs'));

            props.navigation.navigate("CheckoutScreen", { Data: Data });
          } else {
            setEmail("");
            setPassword("");
            setApiLoader(false);
            props.navigation.dispatch(StackActions.replace("Tabs"));
          }
        } else if (res.data.status == false) {
          Alert.alert("", res.data.message);
          setApiLoader(false);
        } else {
          Alert.alert("", "Kindly recheck the fields");
          setApiLoader(false);
        }
      })
      .catch((err) => {
        console.log("error==", err);
        setApiLoader(false);
        Alert.alert(
          "Bad Internet Connection",
          "Kindly Check Your Internet Connection or try after some time"
        );
      });
  }, [value, email, password]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" && "padding"}
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.container}>
        {apiLoader ? (
          <SpinView
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Image
              source={require("../../assets/loader.jpg")}
              resizeMode="contain"
              resizeMethod="scale"
              style={{ width: 80, height: 80 }}
            />
            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
              Loading...
            </Text>
          </SpinView>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ marginHorizontal: 30, marginTop: "25%" }}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Colors.text,
                      fontSize: 30,
                      fontWeight: "bold",
                    }}
                  >
                    Welcome to
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.hideTradeTextSTyle}
                  >
                    HIDE{" "}
                    <Text
                      allowFontScaling={false}
                      style={{ color: Colors.heading2 }}
                    >
                      {" "}
                      TRADE
                    </Text>
                  </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                  <Text
                    style={{
                      color: Colors.text,
                      fontSize: 35,
                      fontWeight: "bold",
                      marginBottom: 20,
                    }}
                    allowFontScaling={false}
                  >
                    Log in
                  </Text>
                  {/* {renderLabel()} */}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    //search
                    //maxHeight={300}
                    labelField="label"
                    valueField="value"
                    maxHeight={110}
                    placeholder={!isFocus ? "--Select User Type--" : "..."}
                    //searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setValue(item.value);
                      setLabel(item.label);
                      setIsFocus(false);
                    }}
                  />
                  {/* <Dropdown
              data={data} style={{borderWidth:1}}
              labelField="label"
              valueField="value"
              onChange={(item) => {
                setValue(item.value);
                setLabel(item.label);
                //setIsFocus(false);
              }}
            /> */}
                  {/* <TextInput
            placeholder="Enter EmailID"
            style={{
              width: "100%",
              paddingHorizontal: 10,
              borderColor: "gray",
              borderWidth: 0.5,
              borderRadius: 8,
              height: 50,
              marginVertical:15
            }}
          /> */}
                  <TextInput
                    label="Enter EmailID"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(value) => {
                      setEmail(value);
                    }}
                    mode="outlined"
                    style={{ marginVertical: 15, backgroundColor: "white" }}
                    activeOutlineColor={Colors.buttonBackground}
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}
                  />
                  <TextInput
                    label="Enter Password"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(value) => {
                      setPassword(value);
                    }}
                    allowFontScaling={false}
                    mode="outlined"
                    secureTextEntry={passwordVisible}
                    maxFontSizeMultiplier={1}
                    right={
                      <TextInput.Icon
                        name={
                          passwordVisible == true ? "eye-off-outline" : "eye"
                        }
                        onPress={() => {
                          setPasswordVisible(!passwordVisible);
                        }}
                      />
                    }
                    style={{ backgroundColor: "white" }}
                    activeOutlineColor={Colors.buttonBackground}
                  />
                  <View style={{ marginVertical: 15 }}>
                    <ButtonComp title="SIGN IN" onPress={loginHandler} />
                  </View>
                  {/* <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <View>
                <CheckBox
                  style={{ marginRight: 10 }}
                  value={checked}
                  onValueChange={(value) => {
                    setChecked(value);
                  }}
                  disabled={false}
                />
              </View>
              <Text style={{ textAlignVertical: "center", top: 1 }}>
                Remember me on this computer
              </Text>
            </View> */}
                </View>
              </View>
            </ScrollView>
            {/* )} */}

            <View style={{ marginBottom: 20, marginHorizontal: 30 }}>
              {/* <ButtonComp title="SIGN IN" onPress={loginHandler} /> */}
              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{}}>
                  IF YOU DON'T HAVE ACCOUNT{" "}
                </Text>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    props.navigation.navigate("RegisterAs");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  <Text
                    style={{
                      color: Colors.registerNowText,
                      textDecorationLine: "underline",
                    }}
                    allowFontScaling={false}
                  >
                    REGISTER NOW
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  //borderBottomWidth: 0.5,
                  paddingBottom: 2,
                  //width: 140,
                  marginTop: 16,
                  //borderBottomColor: Colors.registerNowText,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("ForgotPassword")}
                >
                  <Text
                    style={{
                      color: Colors.registerNowText,
                      textDecorationLine: "underline",
                    }}
                    allowFontScaling={false}
                  >
                    FORGOT PASSWORD
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  hideTradeTextSTyle: {
    color: Colors.heading1,
    fontWeight: "bold",
    fontSize: 30,
    textDecorationLine: "underline",
    textDecorationColor: Colors.heading1,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    //borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  // label: {
  //   position: "absolute",
  //   backgroundColor: "white",
  //   left: 22,
  //   top: 72,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
