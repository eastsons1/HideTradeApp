import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import {Ionicons} from '@expo/vector-icons'


import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";
  const PreviewPackingListSellLeather = (props) => {
  const [image, setImage] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);
  // const [document, setDocument] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [uploadedFlag, setUploadedFlag] = useState(false);

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
  var lastInfo = props.route.params.lastInfo;
  var goodsInspection = props.route.params.goodsInspection;
  var preservationType = props.route.params.preservationType;
  var origin = props.route.params.origin;
  var continent = props.route.params.continent;
  var Specification=props.route.params.Specification;
  var weightCatType = props.route.params.weightCatType;
  var weightCatType2 = props.route.params.weightCatType2;
  var weightCatType3 = props.route.params.weightCatType3;
  var weightSelectionSize = props.route.params.weightSelectionSize;
  var surfaceCatType = props.route.params.surfaceCatType;
  var surfaceCatType2 = props.route.params.surfaceCatType2;
  var surfaceCatType3 = props.route.params.surfaceCatType3;
  var surfaceSelectionSize = props.route.params.surfaceSelectionSize;

  var labelTableRoll = props.route.params.labelTableRoll;
  var quantityTableRoll = props.route.params.quantityTableRoll;
  var priceTableRoll = props.route.params.priceTableRoll;
  var labelTablePrice = props.route.params.labelTablePrice;

  var labelSelection = props.route.params.labelSelection;
  var quantitySelection = props.route.params.quantitySelection;
  var labelSelectionUnit = props.route.params.labelSelectionUnit;
  var priceSelection = props.route.params.priceSelection;
  var labelSelectionPrice = props.route.params.labelSelectionPrice;

  var labelSelection2 = props.route.params.labelSelection2;
  var quantitySelection2 = props.route.params.quantitySelection2;
  var labelSelectionUnit2 = props.route.params.labelSelectionUnit2;
  var priceSelection2 = props.route.params.priceSelection2;
  var labelSelectionPrice2 = props.route.params.labelSelectionPrice2;

  var labelSelection3 = props.route.params.labelSelection3;
  var quantitySelection3 = props.route.params.quantitySelection3;
  var labelSelectionUnit3 = props.route.params.labelSelectionUnit3;
  var priceSelection3 = props.route.params.priceSelection3;
  var labelSelectionPrice3 = props.route.params.labelSelectionPrice3;

  var labelSelection4 = props.route.params.labelSelection4;
  var quantitySelection4 = props.route.params.quantitySelection4;
  var labelSelectionUnit4 = props.route.params.labelSelectionUnit4;
  var priceSelection4 = props.route.params.priceSelection4;
  var labelSelectionPrice4 = props.route.params.labelSelectionPrice4;

  var labelSelection5 = props.route.params.labelSelection5;
  var quantitySelection5 = props.route.params.quantitySelection5;
  var labelSelectionUnit5 = props.route.params.labelSelectionUnit5;
  var priceSelection5 = props.route.params.priceSelection5;
  var labelSelectionPrice5 = props.route.params.labelSelectionPrice5;

  var labelSelection6 = props.route.params.labelSelection6;
  var quantitySelection6 = props.route.params.quantitySelection6;
  var labelSelectionUnit6 = props.route.params.labelSelectionUnit6;
  var priceSelection6 = props.route.params.priceSelection6;
  var labelSelectionPrice6 = props.route.params.labelSelectionPrice6;
  var images=props.route.params.images
  var document = props.route.params.document;
  var packingList=props.route.params.packingList


  return (
    <View style={{ flex: 1, backgroundColor: "white" ,}}>
      {apiLoader ? (
      //   <View
      //   style={{
      //     width: "100%",
      //     height: "100%",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     backgroundColor: "#ffffff",
      //     opacity: 1,
      //     zIndex: 5,
      //   }}
      // >
      //   <Image
      //     source={require("../../assets/loader.jpg")}
      //     resizeMode="contain"
      //     resizeMethod="scale"
      //     style={{ width: 100, height: 100, marginBottom:10 }}
      //     /><ActivityIndicator size={"large"} color='red' />
      // </View>
      <SpinView style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>
      ) : (
        <View style={{ height: "100%" }}>
          <ScrollView>
            <Image
              source={{ uri: packingList }}
              style={{ width: '90%', height: 550, alignSelf:'center' }}
              resizeMode="stretch"
            />
          </ScrollView>
          
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  props.navigation.navigate("Preview", {
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
                    tanningLeather: tanningLeather,
                    substanceThickness: substanceThickness,
                    fromValue: fromValue,
                    toValue: toValue,
                    certificate: certificate,
                    kindOfPacking: kindOfPacking,
                    kindOfShipment: kindOfShipment,
                    lastInfo: lastInfo,
                    goodsInspection: goodsInspection,
                    tanningLeather: tanningLeather,
                    substanceThickness: substanceThickness,
                    fromValue: fromValue,
                    toValue: toValue,
                    origin: origin,
                    continent:continent,
                    Specification:Specification,
                    weightCatType: weightCatType,
                    weightCatType2: weightCatType2,
                    weightCatType3: weightCatType3,
                    weightSelectionSize: weightSelectionSize,

                    surfaceCatType: surfaceCatType,
                    surfaceCatType2: surfaceCatType2,
                    surfaceCatType3: surfaceCatType3,
                    surfaceSelectionSize: surfaceSelectionSize,

                    labelTableRoll: labelTableRoll,
                    quantityTableRoll: quantityTableRoll,
                    priceTableRoll: priceTableRoll,
                    labelTablePrice: labelTablePrice,

                    labelSelection: labelSelection,
                    quantitySelection: quantitySelection,
                    labelSelectionUnit: labelSelectionUnit,
                    labelSelectionPrice: labelSelectionPrice,
                    priceSelection: priceSelection,

                    labelSelection2: labelSelection2,
                    quantitySelection2: quantitySelection2,
                    labelSelectionUnit2: labelSelectionUnit2,
                    labelSelectionPrice2: labelSelectionPrice2,
                    priceSelection2: priceSelection2,

                    labelSelection3: labelSelection3,
                    quantitySelection3: quantitySelection3,
                    labelSelectionUnit3: labelSelectionUnit3,
                    labelSelectionPrice3: labelSelectionPrice3,
                    priceSelection3: priceSelection3,

                    labelSelection4: labelSelection4,
                    quantitySelection4: quantitySelection4,
                    labelSelectionUnit4: labelSelectionUnit4,
                    labelSelectionPrice4: labelSelectionPrice4,
                    priceSelection4: priceSelection4,

                    labelSelection5: labelSelection5,
                    quantitySelection5: quantitySelection5,
                    labelSelectionUnit5: labelSelectionUnit5,
                    labelSelectionPrice5: labelSelectionPrice5,
                    priceSelection5: priceSelection5,

                    labelSelection6: labelSelection6,
                    quantitySelection6: quantitySelection6,
                    labelSelectionUnit6: labelSelectionUnit6,
                    labelSelectionPrice6: labelSelectionPrice6,
                    priceSelection6: priceSelection6,
                    images: images,
                    document: document,
                    packingList:packingList
                  })
                }
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color={Colors.text}
                />
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
        </View>
      )}
    </View>
  );
};

export default PreviewPackingListSellLeather;
