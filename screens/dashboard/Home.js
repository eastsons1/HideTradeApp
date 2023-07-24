import React,{useState, useEffect} from "react";
import { View, Text, BackHandler, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RegisterButton from "../../components/RegisterButton";


const Home = (props) => {
const [userType, setUserType] = useState('')
const getDetails=async()=>{
  setUserType(await AsyncStorage.getItem('user_type'))
}
  useEffect(()=>{
    getDetails()
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

  const [id, setId]=useState(undefined);
  const [type, setType]=useState(undefined);
  const user_id=AsyncStorage.getItem("user_id");
  const user_type=AsyncStorage.getItem("user_type")
  console.log('user id='+user_id.then((value)=>setId(JSON.stringify(value))));
  console.log('id='+id);
  console.log('user type='+user_type.then((value)=>setType(JSON.stringify(value))))
  console.log('type='+userType);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20, justifyContent: "center", flex: 1 }}>
      {userType != 'Agents' &&

        <View style={{ marginBottom: 10 }}>
          <RegisterButton title={"Sell Leather"} onPress={()=>props.navigation.navigate("Sell")} />
        </View>
}
        <View style={{ marginBottom: 10 }}>
          <RegisterButton title={"Buy Leathers"} onPress={()=>props.navigation.navigate('Buy ')} />
        </View>
        
        {userType != 'Agents' &&
        <RegisterButton title={"Search An Expert"} onPress={()=>props.navigation.navigate('Leather Condition  ')} />
      }
      </View>
    </View>
  );
};

export default Home;
