import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,Image
} from "react-native";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";

const ColorBuyLeatherSearchProduct = (props) => {
  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var kindOfLeather = props.route.params.kindOfLeather;
  var size = props.route.params.size;
  var selection = props.route.params.selection;
  var destination = props.route.params.destination;
  var tanningLeather = props.route.params.tanningLeather;

  const [leatherColor, setLeatherColor]=useState('');

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <Text style={{
              textAlign: "center",
              fontSize: 20,
              color: Colors.text,
              fontWeight: "bold",marginBottom:20
            }}allowFontScaling={false}>Enter leather color you want to search</Text>
          <TextInput mode="outlined" label={'Leather Color'} value={leatherColor} onChangeText={(value)=>setLeatherColor(value)}allowFontScaling={false}maxFontSizeMultiplier={1} />
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.goBack()}
            >
              <Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
                  <Text
                    style={{
                      fontSize: 22,
                      alignSelf: "center",
                      color: "#9EBDB8" ,
                    }}allowFontScaling={false}
                  >
                    Back
                  </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
              onPress={() => {
                props.navigation.navigate(
                  "Substance and Thickness ",
                  {
                    multi_category: multi_category,
                    kindOfShape: kindOfShape,
                    kindOfLeather: kindOfLeather,
                    size: size,
                    selection: selection,
                    destination: destination,
                    tanningLeather: tanningLeather,
                    leatherColor:leatherColor
                  }
                );
              }}
            >
              <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#62B0A2" }}
            >
              Next
            </Text>
            <Image source={require('../../assets/ByClient/BOTTOMNEXT.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ColorBuyLeatherSearchProduct;
