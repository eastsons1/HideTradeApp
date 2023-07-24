import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,Image
} from "react-native";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";

const LastInformationSellLeather = (props) => {
  var productName = props.route.params.productName;
  var category = props.route.params.category;
  var subCategory = props.route.params.subCategory;
  var size = props.route.params.size;
  var leatherCondition = props.route.params.leatherCondition;
  var tanningLeather = props.route.params.tanningLeather;
  var substanceThickness = props.route.params.substanceThickness;
  var fromValue = props.route.params.fromValue;
  var toValue = props.route.params.toValue;
  var destination = props.route.params.destination;
  var trim = props.route.params.trim;
  var flay = props.route.params.flay;
  var rawDefects = props.route.params.rawDefects;
  var hairLeather = props.route.params.hairLeather;
  var color = props.route.params.color;
  var certificate = props.route.params.certificate;
  var kindOfPacking = props.route.params.kindOfPacking;
  var kindOfShipment = props.route.params.kindOfShipment;
  var preservationType = props.route.params.preservationType;
  var origin=props.route.params.origin;
  var continent=props.route.params.continent
  var Specification=props.route.params.Specification

  var weightCatType=props.route.params.weightCatType
  var weightCatType2=props.route.params.weightCatType2
  var weightCatType3=props.route.params.weightCatType3
  var weightSelectionSize=props.route.params.weightSelectionSize
  var surfaceCatType=props.route.params.surfaceCatType
  var surfaceCatType2=props.route.params.surfaceCatType2
  var surfaceCatType3=props.route.params.surfaceCatType3
  var surfaceSelectionSize=props.route.params.surfaceSelectionSize

  var labelTableRoll=props.route.params.labelTableRoll;
  var quantityTableRoll=props.route.params.quantityTableRoll;
  var priceTableRoll=props.route.params.priceTableRoll;
  var labelTablePrice=props.route.params.labelTablePrice;

  var labelSelection=props.route.params.labelSelection;
  var quantitySelection=props.route.params.quantitySelection;
  var labelSelectionUnit=props.route.params.labelSelectionUnit;
  var priceSelection=props.route.params.priceSelection;
  var labelSelectionPrice=props.route.params.labelSelectionPrice;
  
  var labelSelection2=props.route.params.labelSelection2;
  var quantitySelection2=props.route.params.quantitySelection2;
  var labelSelectionUnit2=props.route.params.labelSelectionUnit2;
  var priceSelection2=props.route.params.priceSelection2;
  var labelSelectionPrice2=props.route.params.labelSelectionPrice2;
  
  var labelSelection3=props.route.params.labelSelection3;
  var quantitySelection3=props.route.params.quantitySelection3;
  var labelSelectionUnit3=props.route.params.labelSelectionUnit3;
  var priceSelection3=props.route.params.priceSelection3;
  var labelSelectionPrice3=props.route.params.labelSelectionPrice3;

  var labelSelection4=props.route.params.labelSelection4;
  var quantitySelection4=props.route.params.quantitySelection4;
  var labelSelectionUnit4=props.route.params.labelSelectionUnit4;
  var priceSelection4=props.route.params.priceSelection4;
  var labelSelectionPrice4=props.route.params.labelSelectionPrice4;

  var labelSelection5=props.route.params.labelSelection5;
  var quantitySelection5=props.route.params.quantitySelection5;
  var labelSelectionUnit5=props.route.params.labelSelectionUnit5;
  var priceSelection5=props.route.params.priceSelection5;
  var labelSelectionPrice5=props.route.params.labelSelectionPrice5;

  var labelSelection6=props.route.params.labelSelection6;
  var quantitySelection6=props.route.params.quantitySelection6;
  var labelSelectionUnit6=props.route.params.labelSelectionUnit6;
  var priceSelection6=props.route.params.priceSelection6;
  var labelSelectionPrice6=props.route.params.labelSelectionPrice6;
  var leatherColor=props.route.params.leatherColor;

  var labelSelection7=props.route.params.labelSelection7;
  var quantitySelection7=props.route.params.quantitySelection7;
  var labelSelectionUnit7=props.route.params.labelSelectionUnit7;
  var priceSelection7=props.route.params.priceSelection7;
  var labelSelectionPrice7=props.route.params.labelSelectionPrice7;

  const [lastInfo, setLastInfo] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: Colors.text,
              fontWeight: "bold",
              marginBottom: 20,
            }}allowFontScaling={false}
          >
            The Last Information
          </Text>
          <TextInput
            mode="outlined"
            style={{ backgroundColor: "white", height: 120 }}
            activeOutlineColor={Colors.buttonBackground}
            label={"..."}
            value={lastInfo}allowFontScaling={false}maxFontSizeMultiplier={1}
            onChangeText={(value) => setLastInfo(value)}
          ></TextInput>
        </View>
      </ScrollView>
      <View>
        <Text
          style={{
            color: Colors.text,
            fontWeight: "500",
            marginHorizontal: 10,
            fontSize: 16,textAlign:'center'
          }}allowFontScaling={false}
        >
          Enter any additional information you wish to provide for your leathers
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.goBack()}
            >
             <Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
            <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#9EBDB8" , }}
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
              // onPress={() =>
              //   props.navigation.navigate("GoodsInspectionSellLeather",{productName:productName, category:category, subCategory:subCategory, size:size,leatherCondition:leatherCondition, tanningLeather:tanningLeather,substanceThickness:substanceThickness, fromValue:fromValue, toValue:toValue, destination:destination, trim:trim, flay:flay, rawDefects:rawDefects, hairLeather:hairLeather, color:color, certificate:certificate, kindOfPacking:kindOfPacking, kindOfShipment:kindOfShipment, lastInfo:lastInfo})
              // }
              onPress={() => {
                if (leatherCondition == "Raw") {
                  props.navigation.navigate("Goods Inspection", {
                    productName: productName,
                    category: category,
                    subCategory: subCategory,
                    size: size,
                    leatherCondition: leatherCondition,
                    preservationType: preservationType,
                    destination: destination,
                    trim: trim,
                    flay: flay,
                    rawDefects: rawDefects,
                    hairLeather: hairLeather,
                    color: color,
                    certificate: certificate,
                    kindOfPacking: kindOfPacking,
                    kindOfShipment: kindOfShipment,
                    lastInfo: lastInfo,
                    origin:origin,
                    continent:continent,
                    Specification:Specification,
                    weightCatType:weightCatType,
                    weightCatType2:weightCatType2,
                    weightCatType3:weightCatType3,
                    weightSelectionSize:weightSelectionSize,

                    surfaceCatType:surfaceCatType,
                    surfaceCatType2:surfaceCatType2,
                    surfaceCatType3:surfaceCatType3,
                    surfaceSelectionSize:surfaceSelectionSize,

                    labelTableRoll:labelTableRoll,
                    quantityTableRoll:quantityTableRoll,
                    priceTableRoll:priceTableRoll,
                    labelTablePrice:labelTablePrice,

                    labelSelection:labelSelection,
                    quantitySelection:quantitySelection,
                    labelSelectionUnit:labelSelectionUnit,
                    labelSelectionPrice:labelSelectionPrice,
                    priceSelection:priceSelection,
                    
                    labelSelection2:labelSelection2,
                    quantitySelection2:quantitySelection2,
                    labelSelectionUnit2:labelSelectionUnit2,
                    labelSelectionPrice2:labelSelectionPrice2,
                    priceSelection2:priceSelection2,

                    labelSelection3:labelSelection3,
                    quantitySelection3:quantitySelection3,
                    labelSelectionUnit3:labelSelectionUnit3,
                    labelSelectionPrice3:labelSelectionPrice3,
                    priceSelection3:priceSelection3,

                    labelSelection4:labelSelection4,
                    quantitySelection4:quantitySelection4,
                    labelSelectionUnit4:labelSelectionUnit4,
                    labelSelectionPrice4:labelSelectionPrice4,
                    priceSelection4:priceSelection4,

                    labelSelection5:labelSelection5,
                    quantitySelection5:quantitySelection5,
                    labelSelectionUnit5:labelSelectionUnit5,
                    labelSelectionPrice5:labelSelectionPrice5,
                    priceSelection5:priceSelection5,

                    labelSelection6:labelSelection6,
                    quantitySelection6:quantitySelection6,
                    labelSelectionUnit6:labelSelectionUnit6,
                    labelSelectionPrice6:labelSelectionPrice6,
                    priceSelection6:priceSelection6,

                    labelSelection7:labelSelection7,
                    quantitySelection7:quantitySelection7,
                    labelSelectionUnit7:labelSelectionUnit7,
                    labelSelectionPrice7:labelSelectionPrice7,
                    priceSelection7:priceSelection7,
                  });
                } else if (
                  leatherCondition == "Pickled" ||
                  leatherCondition == "Tanned"
                ) {
                  props.navigation.navigate("Goods Inspection", {
                    productName: productName,
                    category: category,
                    subCategory: subCategory,
                    size: size,
                    leatherCondition: leatherCondition,
                    tanningLeather: tanningLeather,
                    substanceThickness: substanceThickness,
                    fromValue: fromValue,
                    toValue: toValue,
                    destination: destination,
                    trim: trim,
                    flay: flay,
                    rawDefects: rawDefects,
                    hairLeather: hairLeather,
                    color: color,
                    certificate: certificate,
                    kindOfPacking: kindOfPacking,
                    kindOfShipment: kindOfShipment,
                    lastInfo: lastInfo,
                    origin:origin,
                    continent:continent,
                    Specification:Specification,
                    weightCatType:weightCatType,
                    weightCatType2:weightCatType2,
                    weightCatType3:weightCatType3,
                    weightSelectionSize:weightSelectionSize,
  
                    surfaceCatType:surfaceCatType,
                    surfaceCatType2:surfaceCatType2,
                    surfaceCatType3:surfaceCatType3,
                    surfaceSelectionSize:surfaceSelectionSize,

                    labelTableRoll:labelTableRoll,
                    quantityTableRoll:quantityTableRoll,
                    priceTableRoll:priceTableRoll,
                    labelTablePrice:labelTablePrice,

                    labelTableRoll:labelTableRoll,
                    quantityTableRoll:quantityTableRoll,
                    priceTableRoll:priceTableRoll,
                    labelTablePrice:labelTablePrice,

                    labelSelection:labelSelection,
                    quantitySelection:quantitySelection,
                    labelSelectionUnit:labelSelectionUnit,
                    labelSelectionPrice:labelSelectionPrice,
                    priceSelection:priceSelection,
                    
                    labelSelection2:labelSelection2,
                    quantitySelection2:quantitySelection2,
                    labelSelectionUnit2:labelSelectionUnit2,
                    labelSelectionPrice2:labelSelectionPrice2,
                    priceSelection2:priceSelection2,

                    labelSelection3:labelSelection3,
                    quantitySelection3:quantitySelection3,
                    labelSelectionUnit3:labelSelectionUnit3,
                    labelSelectionPrice3:labelSelectionPrice3,
                    priceSelection3:priceSelection3,

                    labelSelection4:labelSelection4,
                    quantitySelection4:quantitySelection4,
                    labelSelectionUnit4:labelSelectionUnit4,
                    labelSelectionPrice4:labelSelectionPrice4,
                    priceSelection4:priceSelection4,

                    labelSelection5:labelSelection5,
                    quantitySelection5:quantitySelection5,
                    labelSelectionUnit5:labelSelectionUnit5,
                    labelSelectionPrice5:labelSelectionPrice5,
                    priceSelection5:priceSelection5,

                    labelSelection6:labelSelection6,
                    quantitySelection6:quantitySelection6,
                    labelSelectionUnit6:labelSelectionUnit6,
                    labelSelectionPrice6:labelSelectionPrice6,
                    priceSelection6:priceSelection6,

                    labelSelection7:labelSelection7,
                    quantitySelection7:quantitySelection7,
                    labelSelectionUnit7:labelSelectionUnit7,
                    labelSelectionPrice7:labelSelectionPrice7,
                    priceSelection7:priceSelection7,

                  });
                } else if (
                  leatherCondition == "Crust" ||
                  leatherCondition == "Finished"
                ) {
                  props.navigation.navigate("Goods Inspection", {
                    productName: productName,
                    category: category,
                    subCategory: subCategory,
                    size: size,
                    leatherCondition: leatherCondition,
                    tanningLeather: tanningLeather,
                    substanceThickness: substanceThickness,
                    fromValue: fromValue,
                    toValue: toValue,
                    destination: destination,
                    trim: trim,
                    flay: flay,
                    rawDefects: rawDefects,
                    hairLeather: hairLeather,
                    color: color,
                    certificate: certificate,
                    kindOfPacking: kindOfPacking,
                    kindOfShipment: kindOfShipment,
                    lastInfo: lastInfo,
                    origin:origin,
                    continent:continent,
                    Specification:Specification,
                    weightCatType:weightCatType,
                    weightCatType2:weightCatType2,
                    weightCatType3:weightCatType3,
                    weightSelectionSize:weightSelectionSize,
  
                    surfaceCatType:surfaceCatType,
                    surfaceCatType2:surfaceCatType2,
                    surfaceCatType3:surfaceCatType3,
                    surfaceSelectionSize:surfaceSelectionSize,

                    labelTableRoll:labelTableRoll,
                    quantityTableRoll:quantityTableRoll,
                    priceTableRoll:priceTableRoll,
                    labelTablePrice:labelTablePrice,
                    
                    labelSelection:labelSelection,
                    quantitySelection:quantitySelection,
                    labelSelectionUnit:labelSelectionUnit,
                    labelSelectionPrice:labelSelectionPrice,
                    priceSelection:priceSelection,
                    
                    labelSelection2:labelSelection2,
                    quantitySelection2:quantitySelection2,
                    labelSelectionUnit2:labelSelectionUnit2,
                    labelSelectionPrice2:labelSelectionPrice2,
                    priceSelection2:priceSelection2,

                    labelSelection3:labelSelection3,
                    quantitySelection3:quantitySelection3,
                    labelSelectionUnit3:labelSelectionUnit3,
                    labelSelectionPrice3:labelSelectionPrice3,
                    priceSelection3:priceSelection3,

                    labelSelection4:labelSelection4,
                    quantitySelection4:quantitySelection4,
                    labelSelectionUnit4:labelSelectionUnit4,
                    labelSelectionPrice4:labelSelectionPrice4,
                    priceSelection4:priceSelection4,

                    labelSelection5:labelSelection5,
                    quantitySelection5:quantitySelection5,
                    labelSelectionUnit5:labelSelectionUnit5,
                    labelSelectionPrice5:labelSelectionPrice5,
                    priceSelection5:priceSelection5,

                    labelSelection6:labelSelection6,
                    quantitySelection6:quantitySelection6,
                    labelSelectionUnit6:labelSelectionUnit6,
                    labelSelectionPrice6:labelSelectionPrice6,
                    priceSelection6:priceSelection6,

                    labelSelection7:labelSelection7,
                    quantitySelection7:quantitySelection7,
                    labelSelectionUnit7:labelSelectionUnit7,
                    labelSelectionPrice7:labelSelectionPrice7,
                    priceSelection7:priceSelection7,

                    leatherColor:leatherColor
                  });
                }
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

export default LastInformationSellLeather;
