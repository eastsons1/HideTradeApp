import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { View, Text, Alert, Image, Platform, ScrollView,TouchableOpacity,Linking } from "react-native";
import Constants from "expo-constants";
import {Ionicons} from '@expo/vector-icons'
import Colors from "../../constants/Colors";
import ButtonComp from "../../components/ButtonComp";
import SpinView from "../../components/Spin";
import { StackActions } from "@react-navigation/native";
import { useRevenueCat } from "../../customHook/useRevenueCat";
import Purchases from "react-native-purchases";

export default function CheckoutScreen(props) {
    const userData = props.route.params.Data;

    const apiUrl = "`https://wandering-pear-hen.cyclic.app`"

    const [apiLoader, setApiLoader]=useState(true);

    const [offering, setOffering]  = useState();
    const [customerInfo, setCustomerInfo] = useState();

    const fetchPaymentSheetParams = async () => {
      const response = await fetch(apiUrl + `/create-subscription`, {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          email: userData.email,
          name: userData.name
        })
      });

      const { subscriptionId, clientSecret, customerId } = await response.json();

      return {
        subscriptionId,
        clientSecret,
        customerId,
      }
    }

    const initializePaymentSheet = async () => {
      const {
        subscriptionId,
        clientSecret,
        customerId,
      } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Hide Trade",
        customerId: customerId,
        paymentIntentClientSecret: '15',
      });

      console.log(error)

      setApiLoader(false);
    };

    const openPaymentSheet = async () => {
      if (Platform.OS === "android") {
        const { error } = await presentPaymentSheet();

        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your Subscription is Active Now', [{
            text : "OK", onPress : () => {
              props.navigation.dispatch(StackActions.replace('Tabs'));
            }
          }], {
            cancelable : false
          });
        }
      } else {
        console.log("Offering : ")
        console.log(offering)

        if (!offering?.monthly) {
          return;
        }

        console.log("hello000")

        let purchaserInfo = null;

        let error = null

        try {
          console.log("started")
          setApiLoader(true)
          purchaserInfo = await Purchases.purchasePackage(offering.monthly);
          setApiLoader(false)
        } catch(err) {
          setApiLoader(false)
          console.log("error")
          error = err
          console.log(err)
        }

        if (purchaserInfo !== null && purchaserInfo.customerInfo.entitlements.active.tannery) {
          Alert.alert('Success', 'Your Subscription is Active Now', [{
            text : "OK", onPress : () => {
              props.navigation.dispatch(StackActions.replace('Tabs'));
            }
          }], {
            cancelable : false
          });
        } else {
          Alert.alert(`Error code: ${error.code}`, error.message, [{
            text : "OK", onPress : () => {
              props.navigation.navigate("Login")
            }
          }], {
            cancelable : false
          });
        }
      }
    }

    const setUpRevenueCat = async () => {
      setApiLoader(true);
      const response = await useRevenueCat()
      setCustomerInfo(response.ci)
      setOffering(response.offerings)
      setApiLoader(false)
    }

    useEffect(() => {
      if (Platform.OS === "android") {
        initializePaymentSheet();
      } else {
        setUpRevenueCat();
      }
    }, []);

    return (
      <View
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "white",
        }}
      >
        {apiLoader?(<SpinView
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          />
          <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>):(
          <ScrollView>
          <View>
                {/* <Ionicons name="chevron-back-outline" size={30} style={{ marginTop: 25, marginLeft: 10 }} onPress={() => props.navigation.goBack()} /> */}
            <Ionicons name="chevron-back-outline" size={30} style={{marginTop:25, marginLeft : 10}} onPress={()=>props.navigation.navigate('Login')} />
            <View style={{ marginHorizontal : 10}}>
              <View style={{ marginTop : "35%", marginHorizontal : 10 }}>
                <Text style={{
                  color: Colors.heading1,
                  fontWeight: "bold",
                  fontSize: 25,
                  marginTop: 10,
                  textAlign : "center"
                }}>Subscribe Here</Text>

                <Text
                  style = {{
                    marginTop : 20,
                    marginBottom : 30,
                    textAlign : "center",
                    fontSize : 16,
                    color : Colors.placeholderText,
                    fontWeight : "600",
                    lineHeight: 25
                  }}
                >
                  To Use This App As Tennary You Need To Pay Monthly Subscription Fee
                </Text>
                <Text
                  style = {{
                    marginTop : 30,
                    marginBottom : 70,
                    textAlign : "center",
                    fontSize : 35,
                    color : Colors.registerNowText,
                    fontWeight : "600"
                  }}
                >
                  {Platform.OS === "android" ? "$ 00.99" : "$ 00.99"}
                </Text>

                <View style={{ marginVertical: 40 }}>
                  <ButtonComp title="PAY" onPress={openPaymentSheet} />
                </View>

                {Platform.OS === "ios" ? (
                  <TouchableOpacity onPress={() => { Linking.openURL("https://www.apple.com/legal/internet-services/itunes/dev/stdeula/") }}>
                    <View style={{marginTop : 30}}>
                      <Text style={{fontSize : 16, color : "black", textAlign : "center", textDecorationLine:"underline"}}>Terms Of Use</Text>
                    </View>
                  </TouchableOpacity>
                ): (null) }


                {Platform.OS === "ios" ? (
                  <TouchableOpacity onPress={() => { Linking.openURL("https://www.hidetrade.eu/privacy-policy.html")  }}>
                    <View style={{marginTop : 20}}>
                      <Text style={{fontSize : 16, color : "black", textAlign : "center", textDecorationLine:"underline"}}>Privacy Policy</Text>
                    </View>
                  </TouchableOpacity>
                ): (null) }
              </View>
            </View>
        </View>
        </ScrollView>)}
      </View>
    );
}