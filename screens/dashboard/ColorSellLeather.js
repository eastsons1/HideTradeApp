import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";

const ColorSellLeather = (props) => {
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
  var origin=props.route.params.origin;
  var continent=props.route.params.continent;
  var Specification=props.route.params.Specification;
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

  var labelSelection7=props.route.params.labelSelection7;
  var quantitySelection7=props.route.params.quantitySelection7;
  var labelSelectionUnit7=props.route.params.labelSelectionUnit7;
  var priceSelection7=props.route.params.priceSelection7;
  var labelSelectionPrice7=props.route.params.labelSelectionPrice7;

  const [leatherColor, setLeatherColor]=useState('');

  console.log('from='+fromValue);
  console.log('to='+toValue)

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text style={{
              textAlign: "center",
              fontSize: 20,
              color: Colors.text,
              fontWeight: "bold",marginBottom:20
            }}allowFontScaling={false}>Kindly Enter Leather Color</Text>
        <TextInput mode="outlined" label={'Leather Color'}maxFontSizeMultiplier={1} allowFontScaling={false} value={leatherColor} onChangeText={(value)=>setLeatherColor(value)} />
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" size={30} color={Colors.text} />
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  color: Colors.text,
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
                props.navigation.navigate("Kind Of Trim Leather", {
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
              }}
              // onPress={() => {
              //   props.navigation.navigate("SubstanceThicknessBuyLeatherSearchProduct",{
              //     multi_category: multi_category,
              //     kindOfShape: kindOfShape,
              //     kindOfLeather: kindOfLeather,
              //     size: size,
              //     selection: selection,
              //     destination:destination, tanningLeather:tanningLeather
              //   });
              // }}
            >
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  color: Colors.text,
                }}allowFontScaling={false}
              >
                Next
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={30}
                color={Colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ColorSellLeather;
