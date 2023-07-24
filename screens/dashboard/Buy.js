import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useEffect, useState} from "react";
import { View, Text, BackHandler, Alert } from "react-native";

import RegisterButton from "../../components/RegisterButton";

const Buy = (props) => {
const [userType ,setUserType] = useState(undefined)

  const getDetails=async()=>{
    setUserType(await AsyncStorage.getItem("user_type"))
  }

  useEffect( ()=>{
    getDetails()
    console.log("!!!!!!!userType",userType)
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
  },[getDetails])
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
    <View style={{ marginHorizontal: 20, justifyContent: "center", flex: 1 }}>
      <View style={{ marginBottom: 10 }}>
        <RegisterButton title={"Search Tanneries"} onPress={()=>props.navigation.navigate("Search Tannery")} />
      </View>
     
      <View style={{ marginBottom: 10 }}>
        {userType!='Agents'&&
        <RegisterButton title={"Search Products"} onPress={()=>props.navigation.navigate('Leather Condition ')} />
       
      }
      </View>
     
      {userType!='Agents'&&
      <RegisterButton title={"Search Area"} onPress={()=>props.navigation.navigate('Search Area')} />
   
      }
    </View>

  </View>
  );
};

export default Buy;
