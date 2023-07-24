import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, Image,StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import Constants from "expo-constants";
import { TextInput } from "react-native-paper";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import Colors from "../../constants/Colors";
import ButtonComp from "../../components/ButtonComp";
import SpinView from "../../components/Spin";
import { Dropdown } from "react-native-element-dropdown";


const data = [
  // { label: "Admin", value: "1" },
  { label: "Asia", value: "1" },
  { label: "Europe", value: "2" },
  { label: "Australia", value: "3" },
  { label: "South America", value: "4" },
  { label: "North America", value: "5" },
  { label: "Antarctica", value: "6" },
  { label: "Africa", value: "7" },
  

];

const Signup = (props) => {
  const tanneries = props.route.params.Tanneries;
  // console.log("tanniries=" + tanneries);
  const agents = props.route.params.Agents;
  // console.log("agents=" + agents);



  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [city, setCity] = useState("");
  const [cap, setCap] = useState("");
  const [country, setCountry] = useState("");
  const [Continents, setContinents] = useState("");

  const [vat, setVat] = useState("");
  const [fiscal, setFiscal] = useState("");
  const [pec, setPec] = useState("");
  const [http, setHttp] = useState("");
  const [civic, setCivic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mob, setMob] = useState("");
  const [address, setAddress] = useState("");
  const [apiLoader, setApiLoader]=useState(false)

  const [image, setImage] = useState('');
  const [imageUri, setImageUri]=useState('')

  const pickImage = async () => {
    //setApiLoader(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      // setImage((value) => [result.uri]);
      setImage(result.base64);
      setImageUri(result.uri)
      console.log('result uri='+result.uri)
      //signupHandler({ uri: result.uri });
      //setApiLoader(false);
    }
    // setTimeout(() => {
    //   //setApiLoader(false);
    // }, 5000);
  };

  // console.log('image uri='+JSON.stringify(image))

  // const signupHandler = useCallback(async (imageUri) => {
  //   console.log('inside signup handler')
  //   if (
  //     fname != "" &&
  //     lname != "" &&
  //     email != "" &&
  //     password != "" &&
  //     mob != "" &&
  //     address != "" && image!=""
  //   ) {
  //     setApiLoader(true);
  //     console.log('inside if')
  //     const data = new FormData();
  //     data.append("user_type", tanneries != undefined ? 'tanneries' : 'agents');
  //     data.append("fname", fname);
  //     data.append("lname", lname);
  //     data.append("user_name", username);
  //     data.append("email", email);
  //     data.append("password", password);
  //     data.append("mobile", mob);
  //     data.append("address", address);
  //     data.append("Civic_Nr", civic);
  //     data.append("City", city);
  //     data.append("C_A_P", cap);
  //     data.append("Country", country);
  //     data.append("VAT_nr", vat);
  //     data.append("Fiscal_Code", fiscal);
  //     data.append("PEC", pec);
  //     data.append("HTTP", http);
  //     data.append("logo_upload",{uri:image, name: "image.jpg",type: "image/jpg"});
  //     console.log('data in form data='+JSON.stringify(data))
  //     let webapiurl = `https://www.hidetrade.eu/app/APIs/UserRegistration/UserRegistration.php`;
  //     let res = await fetch(webapiurl, {
  //       method: "post",
  //       body: data,
  //       headers: {
  //         Accept: "*/*",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     let responseJSON = await res.json();
  //     console.log("response=" + JSON.stringify(responseJSON));
  //     if (responseJSON.status == true) {
  //       setApiLoader(false)
  //       Alert.alert("", "Success",[{text:'Ok', onPress:()=>props.navigation.navigate("Login")}]);
  //     } else {
  //       setApiLoader(false)
  //       Alert.alert(responseJSON.message);
  //     }
  //   }else if(fname==''){
  //     Alert.alert("","Kindly fill first name")
  //   }else if(lname==''){
  //     Alert.alert("","Kindly fill last name")
  //   }else if(email==''){
  //     Alert.alert("","Kindly fill email")
  //   }else if(password==''){
  //     Alert.alert("","Kindly fill password")
  //   }else if(fname==''){
  //     Alert.alert("","Kindly fill mobile number")
  //   }else if(address==''){
  //     Alert.alert("","Kindly fill address")
  //   } else if(image.length==0){
  //     Alert.alert("","Kindly select image")
  //   } 
  //   else {
  //       Alert.alert("","Kindly fill the important fields")
  //   }
  // }, [
  //   fname,
  //   lname,
  //   username,
  //   email,
  //   password,
  //   mob,
  //   address,
  //   civic,
  //   city,
  //   cap,
  //   country,
  //   vat,
  //   fiscal,
  //   pec,
  //   http,
  //   tanneries,
  //   agents,
  // ]);

  let arr=[]
  const signupHandler=()=>{
    if (fname != "" && lname != "" && email != "" && password != "" && mob != "" && address != "" && image!='') {
        setApiLoader(true);
        // arr=[{
        //     "user_type":tanneries != undefined ? 'Tanneries' : 'Agents',
        //     "fname":fname,
        //     "lname":lname,
        //     "user_name":username,
        //     "email":email,
        //     "password":password,
        //     "mobile":mob,
        //     "address":address,
        //     "Civic_Nr":civic,
        //     "City":city,
        //     "C_A_P":cap,
        //     "Country":country,
        //     "Continents":Continents,
        //     "VAT_nr":vat,
        //     "Fiscal_Code":fiscal,
        //     "PEC":pec,
        //     "HTTP":http
        //   },
        //   [{
        //     "logo_upload":image
        //   }]
        // ]
        // console.log('array='+JSON.stringify(arr))

        // let webApirUrl=`https://www.hidetrade.eu/app/APIs/UserRegistration/UserRegistration.php`;
        let webApirUrl=`https://www.hidetrade.eu/app/APIs/UserRegistration/UserRegistration.php`;


        const axios = require('axios');
        let data = JSON.stringify([
          {
            "user_type": tanneries != undefined ? 'Tanneries' : 'Agents',
            "fname": fname,
            "lname": lname,
            "user_name": username,
            "email": email,
            "password": password,
            "mobile": mob,
            "address": address,
            "Civic_Nr": civic,
            "City": city,
            "C_A_P": cap,
            "Country": country,
            "Continents": Continents,
            "VAT_nr": vat,
            "Fiscal_Code": fiscal,
            "PEC": pec,
            "HTTP": http
          },
          [
            {
              "kind_of_leather_on_sell": "Bovine"
            },
            {
              "kind_of_leather_on_sell": "Hourses"
            },
            {
              "leather_condition": "Raw"
            },
            {
              "leather_condition": "Crust"
            },
            {
              "kind_of_tanning_leathers": "Wet white"
            },
            {
              "kind_of_tanning_leathers": "Wet blue"
            },
            {
              "size_of_category_leather": "L-Size"
            },
            {
              "size_of_category_leather": "M-Size"
            },
            {
              "logo_upload": "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"
            }
          ]
        ]);
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://www.hidetrade.eu/app/APIs/UserRegistration/UserRegistration.php',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setApiLoader(false)
            if(response.data.Status==false){
              Alert.alert('','This Email id already exists. Please use another one.',[{text:'Ok', style:'cancel'}])
            }
            if(response.data.Status==true){
              Alert.alert('','An email has been sent to your registered email ID. Kindly verify and try to login again.',[{text:'Ok', style:'cancel',onPress:()=>props.navigation.navigate("Login")}])
            }        })
        .catch((error) => {
          console.log(error);
        });
        

        // axios.post(webApirUrl,arr).then((response)=>{
        //   console.log('response in user registration='+JSON.stringify(response.data))
        //   setApiLoader(false)
        //   if(response.data.Status==false){
        //     Alert.alert('','This Email id already exists. Please use another one.',[{text:'Ok', style:'cancel'}])
        //   }
        //   if(response.data.Status==true){
        //     Alert.alert('','User Registration Successful',[{text:'Ok', style:'cancel',onPress:()=>props.navigation.navigate("Login")}])
        //   }
        // }).catch((err)=>Alert.alert('','Kindly recheck',[{text:'Ok', style:'cancel'}]));
        
      }
      else if(fname==''){
            Alert.alert("","Kindly fill first name")
          }else if(lname==''){
            Alert.alert("","Kindly fill last name")
          }else if(email==''){
            Alert.alert("","Kindly fill email")
          }else if(password==''){
            Alert.alert("","Kindly fill password")
          }else if(fname==''){
            Alert.alert("","Kindly fill mobile number")
          }else if(address==''){
            Alert.alert("","Kindly fill address")
          } else if(image.length==0){
            Alert.alert("","Kindly select image")
          } 
          else {
              Alert.alert("","Kindly fill the important fields")
          }
    }

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "white",
    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View
      style={{flex:1}}
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
        </SpinView>):
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 10 }}>
          <Ionicons name="chevron-back-outline" size={30} onPress={()=>props.navigation.goBack()} />
          <View style={{ marginTop: 20 }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={pickImage}>
                {imageUri.length!=0?<Image 
                  source={{uri:`${imageUri}`}} 
                  // source={{uri:`data:image/jpg;base64,${image}`}}
                  style={{ width: 100, height: 100, borderRadius:20 }} />:
                <Ionicons name="person-circle-outline" size={100}/>}
              </TouchableOpacity>
              {/* <Text allowFontScaling={false}
                style={{ fontSize: 25, color: Colors.text, fontWeight: "bold" }}
              >
                Logo
              </Text> */}
            </View>
            <View style={{ marginTop: 20 }}>
              <TextInput
                label={"--Select User Type--"}
                value={agents != undefined ? agents : tanneries}
                mode="outlined"
                editable={false}
                style={{ backgroundColor: "white" }}
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"Username"}
                value={username}
                onChangeText={(value) => setUsername(value)}
                style={{ backgroundColor: "white", marginTop: 5 }}
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              />
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  mode="outlined"
                  label={"First Name"}
                  value={fname}
                  onChangeText={(value) => setFname(value)}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "49%",
                    marginRight: 5,
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
                <TextInput
                  mode="outlined"
                  label={"Last Name"}
                  value={lname}
                  onChangeText={(value) => setLname(value)}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "50%",
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
              </View>

              <View style={{ flexDirection: "row" }}>
                <TextInput
                  mode="outlined"
                  label={"City"}
                  value={city}
                  onChangeText={(value) => setCity(value)}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "49%",
                    marginRight: 5,
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
                <TextInput
                  mode="outlined"
                  label={"C.A.P"}
                  value={cap}
                  onChangeText={(value) => setCap(value)}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "50%",
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
              </View>
              <TextInput
                mode="outlined"
                label={"Address"}
                value={address}
                onChangeText={(value) => setAddress(value)}
                style={{ backgroundColor: "white", marginTop: 5 }}
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              />

              <TextInput
                mode="outlined"
                label={"Civic Nr"}
                value={civic}
                onChangeText={(value) => setCivic(value)}
                style={{ backgroundColor: "white", marginTop: 5 }}
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              />

              <View style={{ flexDirection: "row" }}>
                <TextInput
                  mode="outlined"
                  label={"Country"}
                  value={country}
                  onChangeText={(value) => {
                    setCountry(value);
                  }}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "49%",
                    marginRight: 5,
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
                <TextInput
                  mode="outlined"
                  label={"VAT nr"}
                  value={vat}
                  onChangeText={(value) => setVat(value)}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "50%",
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
              </View>

              <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "black" }]}
              placeholderStyle={{ fontSize: 16 }}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              //search
              //maxHeight={300}
              labelField="label"
              valueField="value"
              maxHeight={200}
              placeholder={!isFocus ? "Continents" : "..."}
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
              {/* <TextInput
                mode="outlined"
                label={"Continents"}
                value={Continents}
                onChangeText={(value) => setContinents(value)}
                style={{ backgroundColor: "white", marginTop: 5 }}
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              /> */}

              

              <View style={{ flexDirection: "row" }}>
                <TextInput
                  mode="outlined"
                  label={"Fiscal Code"}
                  value={fiscal}
                  onChangeText={(value) => setFiscal(value)}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "49%",
                    marginRight: 5,
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
                <TextInput
                  mode="outlined"
                  label={"PEC"}
                  value={pec}
                  onChangeText={(value) => setPec(value)}
                  style={{
                    backgroundColor: "white",
                    marginTop: 5,
                    width: "50%",
                  }}
                  activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
              </View>
              <TextInput
                mode="outlined"
                label={"HTTP"}
                value={http}
                onChangeText={(value) => setHttp(value)} autoCapitalize='none'
                style={{ backgroundColor: "white", marginTop: 5 }}
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              />
              
              <TextInput
                mode="outlined"
                label={"Enter EmailID"}
                value={email}
                onChangeText={(value) => setEmail(value)}
                style={{ backgroundColor: "white", marginTop: 5 }}autoCapitalize='none'
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"Enter Password"}
                value={password}
                onChangeText={(value) => setPassword(value)}
                style={{ backgroundColor: "white", marginTop: 5 }}autoCapitalize='none'
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              />
              <TextInput
                mode="outlined"
                label={"Mobile No."}
                value={mob}
                keyboardType="number-pad"
                onChangeText={(value) => setMob(value)}
                style={{ backgroundColor: "white", marginTop: 5 }}
                activeOutlineColor={Colors.buttonBackground}allowFontScaling={false}maxFontSizeMultiplier={1}
              /> 
            </View>
            <View style={{ marginVertical: 40 }}>
              <ButtonComp title={"Sign Up"} onPress={signupHandler} />
            </View>
          </View>
        </View>
      </ScrollView>
      }
      
    </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
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
  dropdown: {
    height: 50,
    //borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    opacity:0.7
  },
  icon: {
    marginRight: 5,
  },
})
