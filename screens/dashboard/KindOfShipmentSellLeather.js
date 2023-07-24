import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,ActivityIndicator
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const KindOfShipmentSellLeather = (props) => {
  const [kindOfShipment, setKindOfShipment] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

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

  const renderKindOfShipment = ({ item, index }) => {
    const { id, title, image_name } = item;
    const isSelected = selected.filter((i) => i === title).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== title));
          } else {
            setSelected((prev) => [...prev, title]);
          }
        }}
        style={[
          styles.item,
          isSelected && { backgroundColor: Colors.buttonBackground },
        ]}
      >
        <Image
           style={[ {width: 108, height: 108}, isSelected && {width:108, height:108}  ]}
          source={{
            uri:
              "https://www.hidetrade.eu/app/APIs/ViewAllShipmentArrangeList/" +
              image_name,
          }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if(dataLoad==false){
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllShipmentArrangeList/ViewAllShipmentArrangeList.php`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in new screen=" + JSON.stringify(res.data));
        setKindOfShipment(res.data);
        setApiLoader(false);
        setDataloaded(true);
      });
    }
  
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {apiLoader ? (
      // <View
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
      //     style={{ width: 100, height: 100, marginBottom: 10 }}
      //   />
      //   <ActivityIndicator size={"large"} color="red" />
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
        <View style={{flex:1}}>
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
            What kind of shipment can you arrange?
          </Text>
          {kindOfShipment != undefined ? (
            <View>
              <FlatList
                numColumns={3}
                data={kindOfShipment.Output}
                // renderItem={({ item, index }) => (
                //   <TouchableOpacity style={{ margin: 10 }}>
                //     {/* <View style={{marginBottom:15}}>
                //       <Text>{item.title}</Text>
                //     </View> */}
                //     {/* {console.log("inside flatlist")} */}
                //     <Image
                //       style={{ width: 100, height: 100 }}
                //       source={{
                //         uri:
                //           "http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/" +
                //           item.image_name,
                //       }}
                //     />
                //   </TouchableOpacity>
                // )}
                renderItem={renderKindOfShipment}
                scrollEnabled={false}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View>
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
              //   props.navigation.navigate("LastInformationSellLeather",{productName:productName, category:category, subCategory:subCategory, size:size,leatherCondition:leatherCondition, tanningLeather:tanningLeather,substanceThickness:substanceThickness, fromValue:fromValue, toValue:toValue, destination:destination, trim:trim, flay:flay, rawDefects:rawDefects, hairLeather:hairLeather, color:color, certificate:certificate, kindOfPacking:kindOfPacking, kindOfShipment:selected})
              // }
              onPress={() => {
                if (leatherCondition == "Raw") {
                  props.navigation.navigate("Additional Information", {
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
                    kindOfShipment: selected,
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
                  props.navigation.navigate("Additional Information", {
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
                    kindOfShipment: selected,
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
                  leatherCondition == "Crust" ||
                  leatherCondition == "Finished"
                ) {
                  props.navigation.navigate("Additional Information", {
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
                    kindOfShipment: selected,
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
                    leatherColor:leatherColor,

                    labelSelection7:labelSelection7,
                    quantitySelection7:quantitySelection7,
                    labelSelectionUnit7:labelSelectionUnit7,
                    labelSelectionPrice7:labelSelectionPrice7,
                    priceSelection7:priceSelection7,
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
      </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    //padding: 8,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    //backgroundColor: Colors.inactiveState,
    borderRadius: 8,
    marginVertical: "0.4%",
      marginHorizontal:'0.4%',
    width: "32.5%",
    height: 120,
    //flex:1
  },
});

export default KindOfShipmentSellLeather;
