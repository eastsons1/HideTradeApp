import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image, KeyboardAvoidingView, Platform,Modal, ToastAndroid,
} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import Colors from "../../constants/Colors";
import ButtonComp from "../../components/ButtonComp";
import ButtonForProfile from "../../components/ButtonForProfile";
import SpinView from "../../components/Spin";
import ButtonForLogout from "../../components/ButtonForLogout";
import { StackActions } from '@react-navigation/native';

const Profile = (props) => {
  const [id, setId] = useState(undefined);
  const [user_type, setUser_type] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const [first_name, setFirst_Name] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [civic, setCivic] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cap, setCap] = useState("");
  const [country, setCountry] = useState("");
  const [vat, setVat] = useState("");
  const [fiscal, setFiscal] = useState("");
  const [pec, setPec] = useState("");
  const [http, setHttp] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const subId = props.route.params.subId;

  const getDetails=async()=>{
    setId(await  AsyncStorage.getItem("user_id"));
    setUser_type(await AsyncStorage.getItem("user_type"));
  }


  useEffect( () => {
    if (dataLoad == false) {
      setApiLoader(true);
      getDetails()
      console.log("id in profile=" + id);
      console.log("user type in profile=" + user_type);
      if (user_type != undefined && id != undefined) {
        let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=${user_type}&user_id=${id}`;
        console.log("webapiurl=" + webApirUrl);
        axios
          .get(webApirUrl)
          .then(async (response) => {
            console.log("response=" + JSON.stringify(response.data));
            setProfile(await response.data.User_Details[0]);
            setFirst_Name(await response.data.User_Details[0].first_name);
            setLastName(await response.data.User_Details[0].last_name);
            setEmail(await response.data.User_Details[0].email);
            setMob(await response.data.User_Details[0].mobile);
            setCivic(await response.data.User_Details[0].Civic_Nr);
            setAddress(await response.data.User_Details[0].address);
            setCity(await response.data.User_Details[0].City);
            setCap(await response.data.User_Details[0].C_A_P);
            setCountry(await response.data.User_Details[0].Country);
            setVat(await response.data.User_Details[0].VAT_nr);
            setFiscal(await response.data.User_Details[0].Fiscal_Code);
            setPec(await response.data.User_Details[0].PEC);
            setHttp(await response.data.User_Details[0].HTTP);
            setImage(await response.data.User_Details[0].logo_upload);
            setDataLoaded(true);
            setApiLoader(false);
          })
          .catch((err) => console.log("error=" + err));
      }
    }
  }, [id, user_type]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
      setSelectedImage(result.uri);
      // setProfileImage(result.base64)
      //uploadImage({ uri: result.base64 });
    }
  };

  // Edit profile starts 

  const user_id = { ["user_id"]: id };
  const type = { ["user_type"]: user_type };
  var name = { ["first_name"]: first_name };
  var last_name = { ["last_name"]: lastName };
  var email_id = { ["email"]: email };
  var mobile = { ["mobile"]: mob };
  var address1 = { ["address1"]: address };
  var civic_Nr = { ["Civic_Nr"]: civic };
  var City = { ["City"]: city };
  var C_A_P = { ["C_A_P"]: cap };
  var Country = { ["Country"]: country };
  var VAT_nr = { ["VAT_nr"]: vat };
  var Fiscal_Code = { ["Fiscal_Code"]: fiscal };
  var PEC = { ["PEC"]: pec };
  var HTTP = { ["HTTP"]: http };
  var logo={["profile_logo"]:selectedImage!=""?image:null}

  let final=[]

    final.push(user_id,type,name, last_name,email_id,mobile,address1,civic_Nr,City,C_A_P,Country,VAT_nr,Fiscal_Code,PEC,HTTP,selectedImage!=""?logo:null)

    //  console.log('final='+JSON.stringify(final))
  

  const editProfile=async()=>{
    setApiLoader(true);
    let webApirUrl=`https://www.hidetrade.eu/app/APIs/UpdateProfile/UpdateProfile.php`;
    axios.post(webApirUrl, final).then((response)=>{
      console.log('response in edit profile='+JSON.stringify(response.data))
      setApiLoader(false);
      Alert.alert('','User Profile Updated Successfully',[{text:'Ok', style:'cancel', onPress:()=>props.navigation.dispatch(StackActions.replace('User Profile'))}])
    }).catch((err)=>console.log('error='+JSON.stringify(err)))
  }

  const onDeleteAccount = async () => {
    Alert.alert("Confirmation", "Are You Sure Want To Delete Your Account ?", [{
      text : "Yes", onPress : async () => {
        if (type.user_type === "Tanneries" && Platform.OS === "android") {
          setApiLoader(true);
          const subsciptionCancelled = await turnOffNextMonthSubscription();
          if (subsciptionCancelled) {
            ToastAndroid.show("Next Month Subscription Cancelled", ToastAndroid.LONG);
            // call delete api
            const isDeleted = await deleteUser();
            if (isDeleted) {
              await AsyncStorage.removeItem("LoginStatus")
              await AsyncStorage.removeItem("user_id")
              await AsyncStorage.removeItem("user_type");
              setApiLoader(false);
              ToastAndroid.show("Your Account Deleted", ToastAndroid.LONG);
              props.navigation.navigate("Login");
            } else {
              setApiLoader(false);
              ToastAndroid.show("Can't Delete Account, Try In Some Time", ToastAndroid.LONG);
            }
          } else {
            setApiLoader(false);
            ToastAndroid.show("Can't Delete Account, Try In Some Time", ToastAndroid.LONG);
          }
        } else {
          // call delete api
          setApiLoader(true);
          const isDeleted = await deleteUser();
          if (isDeleted) {
            await AsyncStorage.removeItem("LoginStatus")
            await AsyncStorage.removeItem("user_id")
            await AsyncStorage.removeItem("user_type");
            setApiLoader(false);
            if (Platform.OS === "android")
              ToastAndroid.show("Your Account Deleted", ToastAndroid.LONG);
            props.navigation.navigate("Login");
          } else {
            setApiLoader(false);
            if (Platform.OS === "android")
              ToastAndroid.show("Your Account Deleted", ToastAndroid.LONG);
          }
        }
      }
    }, {
      text : "No", onPress : () => {

      }
    }]);
  }

  const turnOffNextMonthSubscription = async () => {
    let apiUrl = "https://hide-trade.onrender.com";
    const result = await axios.post(apiUrl + "/cancel-subscription-update", { subId : subId, status : true });
    console.log(result.data);
    console.log(result.status);
    return (result.status === 200);
  }

  const deleteUser = async () => {
    let apiUrl = "https://www.hidetrade.eu/app/APIs/DeleteSingleUser/DeleteSingleUser.php";

    console.log(user_id.user_id);

    let arr = new FormData();
    arr.append('user_id', user_id.user_id);

    console.log(arr);

    const result = await axios.post(apiUrl,arr, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        return arr;
      },
    });

    console.log(result.data);
    return result.data.status;
  }

  // Edit profile ends 

  // logout starts 

  const doLogout = async () => {

    Alert.alert('','Do you want to logout?',[{text:"Yes",style:'cancel',onPress:async()=>{
      setApiLoader(true)
      await AsyncStorage.removeItem("LoginStatus")
      await AsyncStorage.removeItem("user_id")
      await AsyncStorage.removeItem("user_type");
      setApiLoader(false)
      props.navigation.navigate("Login")
    }},{text:'No', style:'cancel'}])
  };

  // logout ends 

  return (
    <KeyboardAvoidingView style={{backgroundColor: "white",flex:1 }} behavior={Platform.OS == "ios" && "padding"}>
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {apiLoader ? (
        <SpinView
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 10 }}>
            
            {/* Image starts   */}
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <TouchableOpacity onPress={pickImage}>
                {profile.logo_upload.length != 0 ? (
                  <View>
                    {
                    image.lastIndexOf("jpeg") > -1 ||
                    image.lastIndexOf("jpg") > -1 ||
                    image.lastIndexOf("png") > -1 ? (
                      <Image
                        source={{
                          uri:selectedImage!=""?selectedImage: image.lastIndexOf("jpeg") > -1 || image.lastIndexOf("jpg") > -1 || image.lastIndexOf("png") > -1 ?(`https://www.hidetrade.eu/app/UPLOAD_file/`+image):selectedImage
                        }}
                        style={{ width: 120, height: 120, borderRadius: 20 }} 
                      />
                    ) :(
                    <Image source={{uri:selectedImage}} style={{ width: 120, height: 120, borderRadius: 20 }}  />
                    )
                    }
                  </View>
                ) :selectedImage!=""?(<Image source={{uri:selectedImage}} style={{ width: 120, height: 120, borderRadius: 20 }}/>): 
                (
                  <View>
                    <Ionicons name="person-circle-outline" size={100} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {/* Image ends */}

            <View style={{ marginVertical: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  mode="outlined"
                  label={"First Name"}
                  activeOutlineColor={Colors.buttonBackground}
                  allowFontScaling={false}
                  maxFontSizeMultiplier={1}
                  value={first_name}
                  onChangeText={(value) => setFirst_Name(value)}
                  style={{ backgroundColor: "white", width: "48%" }}
                />
                <TextInput
                  mode="outlined"
                  label={"Last Name"}
                  activeOutlineColor={Colors.buttonBackground}
                  allowFontScaling={false}
                  maxFontSizeMultiplier={1}
                  value={lastName}
                  onChangeText={(value) => setLastName(value)}
                  style={{ backgroundColor: "white", width: "48%" }}
                />
              </View>
              <TextInput
                mode="outlined"
                label={"Enter EmailID"}
                value={email}
                onChangeText={(value) => setEmail(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
                editable={false}
              />
              <TextInput
                mode="outlined"
                label={"Mobile No."}
                value={mob}
                onChangeText={(value) => setMob(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"Address"}
                value={address}
                onChangeText={(value) => setAddress(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"Civic Nr"}
                value={civic}
                onChangeText={(value) => setCivic(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <TextInput
                mode="outlined"
                label={"C.A.P"}
                value={cap}
                onChangeText={(value) => setCap(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"City"}
                value={city}
                onChangeText={(value) => setCity(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"Country"}
                value={country}
                onChangeText={(value) => setCountry(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"VAT nr"}
                value={vat}
                onChangeText={(value) => setVat(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"Fiscal Code"}
                value={fiscal}
                onChangeText={(value) => setFiscal(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"PEC"}
                value={pec}
                onChangeText={(value) => setPec(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"HTTP"}
                value={http}
                onChangeText={(value) => setHttp(value)}
                style={{ marginTop: 5, backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
            </View>

            <View style={{marginTop:20, marginHorizontal:'10%', marginBottom:10}}>
              <ButtonComp title={"Insert/Update Leather Details"} onPress={() => props.navigation.navigate("Sub Category ", {user_type:user_type,final: final })} />
            </View>


            <View style={{ 
              marginBottom: Platform.OS=='ios'?20:10,
             flexDirection:'row', justifyContent:'space-evenly' }}>
                <View><ButtonForProfile title={"Update"} onPress={editProfile} /></View>
                <View><ButtonForLogout title={"Logout"} onPress={doLogout} /></View>
            </View>
            <View style={{ 
              marginBottom: Platform.OS=='ios'?20:10,
             flexDirection:'row', justifyContent:'space-evenly' }}>
                <View><ButtonForProfile title={"Delete Account"} onPress={onDeleteAccount} /></View>
            </View>

          </View>
        </ScrollView>
      )}
    </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;
