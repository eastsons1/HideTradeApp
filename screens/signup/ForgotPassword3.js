import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput, Snackbar, Button } from "react-native-paper";
import Constants from "expo-constants";
import axios from "axios";

import Colors from "../../constants/Colors";
import LinkButton from "../../components/LinkButton";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(false);
  const [show, setShow] = useState(true);

  const onToggleSnackBar = () => {
    console.log("toggle");
    setToast(!toast);
  };
  const onDismiss = () => setToast(false);
  const snack = (text) => {
    console.log("snack" + text);
    //setShow(true);
    return (
      <View style={{}}>
        {console.log("abc")}
        <View style={{}}>
          <Snackbar
            visible={toast}
            onDismiss={onDismiss}
            style={{}}
            action={{
              //label: "Undo",
              onPress: () => {
                // Do something
              },
            }}
          >
            Email Verified! and Reset Link sent to email id
          </Snackbar>
        </View>
      </View>
    );
  };

  // const snackForError = (text) => {
  //   console.log("snack" + text);
  //   //setShow(true);
  //   return (
  //     <View style={{}}>
  //       {console.log("abc")}
  //       <View style={{}}>
  //         <Snackbar
  //           visible={toast}
  //           onDismiss={onDismiss}
  //           style={{}}
  //           action={{
  //             //label: "Undo",
  //             onPress: () => {
  //               // Do something
  //             },
  //           }}
  //         >
  //           Invalid email!
  //         </Snackbar>
  //       </View>
  //     </View>
  //   );
  // };

  const submitHandler = useCallback(async () => {
    let webApirUrl = `https://www.hidetrade.eu/app/api/User/resetpassword.php?email=${email}`;
    axios.get(webApirUrl).then((res) => {
      console.log("response in forgot password=" + JSON.stringify(res.data));
      if (res.data.status == true) {
        setShow(true);
        console.log("inside if");
        onToggleSnackBar();
        snack(res.data.message);
        console.log("efgh=" + res.data.message);
      } else {
        setShow(false);
        console.log("inside else");
        //snackForError(res.data.message);
      }
    });
  }, [email, toast]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginHorizontal: 30 }}>
          <View style={{ marginTop: '65%', alignItems: "center" }}>
            <Image
              style={{ width: 120, height: 120 }}
              source={require("../../assets/Logo.png")}
            />
            <Text allowFontScaling={false} style={{ fontWeight: "700", fontSize: 20, marginBottom: 20 }}>
              Forgot password
            </Text>
          </View>
          <TextInput
            mode="outlined"
            label={"User EmailID"}
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={{ backgroundColor: "white", marginTop: 5 }}
            activeOutlineColor={Colors.buttonBackground}
            autoCapitalize="none"allowFontScaling={false}maxFontSizeMultiplier={1}
          />
          <View style={{ marginTop: 20 }}>
            <LinkButton title={"Send Link"} onPress={submitHandler} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text allowFontScaling={false}>Have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: Colors.heading1,
                }}allowFontScaling={false}
              >
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text allowFontScaling={false}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("RegisterAs")}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: Colors.heading1,
                }}allowFontScaling={false}
              >
                {" "}
                Sign up
              </Text>
            </TouchableOpacity>

            {/* <Button onPress={onToggleSnackBar}>{toast ? "Hide" : "Show"}</Button> */}
            {/* <Snackbar
            visible={toast}
            onDismiss={onDismiss}
            action={{
              label: "Undo",
              onPress: () => {
                // Do something
              },
            }}
          >
            Done
          </Snackbar> */}
          </View>
        </View>
      </ScrollView>
      {(() => {
        if (show == true) {
          return <View>{snack()}</View>;
        } else if (show == false) {
          console.log("show in return of else" + show);
          return (
            <View style={{}}>
              {console.log("abc")}
              <View style={{}}>
                <Snackbar
                  visible={toast}
                  onDismiss={onDismiss}
                  style={{}}
                  action={{
                    //label: "Undo",
                    onPress: () => {
                      // Do something
                    },
                  }}
                >
                  Invalid email!
                </Snackbar>
              </View>
            </View>
          );
        }
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
});

export default ForgotPassword;
