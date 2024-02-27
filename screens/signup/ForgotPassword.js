import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
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

  const sendOtp1 = () => {
    // let webApirUrl = `https://www.hidetrade.eu/app/api/User/resetpassword.php?email=${email}`;
    // let webApirUrl = 'https://www.hidetrade.eu/app/APIs/forgot-password/forgot-password.php'
    // const data = new FormData();
    // data.append("email", email);
    // // data.append("otp", '69');
    // // data.append("newpassword", '1234');
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: webApirUrl,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // };
    // console.log(data, 'formdataaaa')
    // axios.request(config).then((res) => {
    //   console.log("response in forgot password=" + JSON.stringify(res.data));
    //   if (res.data.status == true) {
    //     setShow(true);
    //     console.log("inside if");
    //     onToggleSnackBar();
    //     snack(res.data.message);
    //     console.log("efgh=" + res.data.message);
    //   } else {
    //     setShow(false);
    //     console.log("inside else");
    //     //snackForError(res.data.message);
    //   }
    // });



    const FormData = require('form-data');
    let data = new FormData();
    data.append('email', 'javed@eastsons.com');
    // data.append('otp','')
    // data.append('newpassword','')

    let config = {
      method: 'POST',
      // maxBodyLength: Infinity,
      url: 'https://www.hidetrade.eu/app/APIs/forgot-password/forgot-password.php',
      headers: { "Content-Type": "multipart/form-data" },

      data: data
    };
    console.log(data, 'formddaataa')
    axios.request(config)
      .then((res) => {

        console.log("forgetPass" + JSON.stringify(res));
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const sendOtp = async () => {
    try {
      // Create a new instance of FormData
      const formData = new FormData();
  
      // Append key-value pairs for each form field
      formData.append('email', email);
  
      // Make a POST request with fetch()
      const response = await fetch('https://www.hidetrade.eu/app/APIs/forgot-password/forgot-password.php', {
        method: 'POST',
        body: formData, // Use FormData object as the body
      });
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response JSON data
      const res = await response.json();
      console.log("forgetPass" + JSON.stringify(res));
      if(res.status == true){
        props.navigation.navigate('CreateNewPass',{email: email})
        Alert.alert(res.message)
      }
      Alert.alert(res.message)
      // console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
            autoCapitalize="none" allowFontScaling={false} maxFontSizeMultiplier={1}
          />
          <View style={{ marginTop: 20 }}>
            <LinkButton title={"Send Link"} onPress={sendOtp} />
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
                }} allowFontScaling={false}
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
                }} allowFontScaling={false}
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
