import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert, Image
} from "react-native";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";

const SellLeathersProductName = (props) => {
  const [productName, setProductName] = useState("");
  console.log('product name='+productName);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text allowFontScaling={false} style={{ color: Colors.text, fontSize: 18, fontWeight: "bold", marginBottom:15 }}>
              Product Name
            </Text>
          </View>
          <View style={{}}>
            <TextInput
              mode="outlined"
              label={"Write the product name..."}
              value={productName}
              onChangeText={(value) => setProductName(value)}
              style={{ backgroundColor: "white", marginTop: 5, height: 120 }}maxFontSizeMultiplier={1}
              activeOutlineColor={Colors.buttonBackground} allowFontScaling={false}
            />
            <Text allowFontScaling={false}
              style={{ marginTop: 15, fontWeight: "500", color: Colors.text, textAlign:'center' }}
            >
              Enter a comprehensive name here to identify the leathers you want
              to sell. You will be able to enter all the more detailed
              information in the following steps
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        <View style={{}}>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={()=>props.navigation.navigate("Home")}>
            {/* <Icon name="chevron-back-outline" size={30} color={Colors.text} /> */}
            <View style={{justifyContent:'center'}}><Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} /></View>
            <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#9EBDB8", textAlignVertical:'center' }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "flex-end", flex: 1 }}
        >
          <TouchableOpacity onPress={()=>{if(productName!=''){ props.navigation.navigate("Category",{productName:productName})} else{Alert.alert('','Please enter Product name',[{text:'Ok',style:'cancel'}])}
          }}
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flex: 1
            }}
          >
            <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#62B0A2", textAlignVertical:'center'  }}
            >
              Next
            </Text>
            <View style={{justifyContent:'center'}}><Image source={require('../../assets/ByClient/BOTTOMNEXT.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} /></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SellLeathersProductName;
