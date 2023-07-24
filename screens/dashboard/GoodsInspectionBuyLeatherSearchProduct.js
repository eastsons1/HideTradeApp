import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,Image
} from "react-native";

import Colors from "../../constants/Colors";
import { SelectCountry } from "react-native-element-dropdown";

const GoodsInspectionBuyLeatherSearchProduct = (props) => {
  const data = [
    { id: "1", value: "Yes" },
    { id: "2", value: "Not" },
  ];
  const [goodsInspection, setGoodsInspection] = useState(data);
  const [selected, setSelected] = useState([]);

  // var productName=props.route.params.productName;
  // var category=props.route.params.category;
  // var subCategory=props.route.params.subCategory;
  // var size=props.route.params.size;
  // var leatherCondition=props.route.params.leatherCondition;
  // var tanningLeather=props.route.params.tanningLeather;
  // var substanceThickness=props.route.params.substanceThickness;
  // var fromValue=props.route.params.fromValue;
  // var toValue=props.route.params.toValue;
  // var destination=props.route.params.destination;
  // var trim=props.route.params.trim;
  // var flay=props.route.params.flay;
  // var rawDefects=props.route.params.rawDefects;
  // var hairLeather=props.route.params.hairLeather;
  // var color=props.route.params.color;
  // var certificate=props.route.params.certificate;
  // var kindOfPacking=props.route.params.kindOfPacking;
  // var kindOfShipment=props.route.params.kindOfShipment;
  // var lastInfo=props.route.params.lastInfo;

  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var kindOfLeather = props.route.params.kindOfLeather;
  var size = props.route.params.size;
  var preservationType = props.route.params.preservationType;
  var trim = props.route.params.trim;
  var flayType = props.route.params.flayType;
  var rawDefectsType = props.route.params.rawDefectsType;
  var hairType = props.route.params.hairType;
  var colorOfHair = props.route.params.colorOfHair;
  var certificateType = props.route.params.certificateType;
  var selection = props.route.params.selection;
  var tanningLeather = props.route.params.tanningLeather;
  var substanceThickness = props.route.params.substanceThickness;
  var fromValue = props.route.params.fromValue;
  var toValue = props.route.params.toValue;
  var destination = props.route.params.destination;
  var selectedCountry = props.route.params.selectedCountry;
  var selectedCity = props.route.params.selectedCity;
  var selectedContinent = props.route.params.selectedContinent;


  const renderGoodsInspection = ({ item, index }) => {
    const { id, value } = item;
    const isSelected = selected.filter((i) => i === value).length > 0;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (isSelected) {
              setSelected((prev) => prev.filter((i) => i !== value));
            } else {
              setSelected((prev) => [value]);
            }
          }}
          style={[
            styles.item,
            isSelected && { backgroundColor: "#447D74" },
          ]}
        >
          <Text
            style={{
              color: isSelected ? "white" : "white",
              fontWeight: "600",
              fontSize: 18,
            }}allowFontScaling={false}
          >
            {value}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
              fontWeight: "500",
              marginBottom: 10,
            }}
          >
            Do you agree to have the goods inspected by the buyer?
          </Text>
          <FlatList
            data={goodsInspection}
            renderItem={renderGoodsInspection}
            numColumns={2}
            scrollEnabled={false}
            style={{ marginTop: 10 }}
          />
        </View>
      </ScrollView>
      <View>
        {/* <Text style={{color:Colors.text, fontWeight:'500', marginHorizontal:10, fontSize:16}}>Enter any additional information you wish to provide for your leathers</Text> */}
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
              onPress={() => {
                if (multi_category == "Crust" || multi_category == "Finished")
                  {props.navigation.navigate(
                    "Product List ",
                    {
                      multi_category: multi_category,
                      kindOfShape: kindOfShape,
                      kindOfLeather: kindOfLeather,
                      size: size,
                      selection: selection,
                      tanningLeather: tanningLeather,
                      substanceThickness: substanceThickness,
                      fromValue: fromValue,
                      toValue: toValue,
                      trim: trim,
                      flayType: flayType,
                      rawDefectsType: rawDefectsType,
                      hairType: hairType,
                      colorOfHair: colorOfHair,
                      certificateType: certificateType,
                      selectedCountry: selectedCountry,
                      selectedCity: selectedCity,
                      selectedContinent:selectedContinent,
                      goodsInspection: selected,
                      destination: destination,
                    }
                  );
                } else if(multi_category == "Pickled" || multi_category == "Tanned"){
                    props.navigation.navigate("Product List ",{
                        multi_category: multi_category,
                        kindOfShape: kindOfShape,
                        kindOfLeather: kindOfLeather,
                        size: size,
                        selection: selection,
                        tanningLeather: tanningLeather,
                        substanceThickness: substanceThickness,
                        fromValue: fromValue,
                        toValue: toValue,
                        trim: trim,
                        flayType: flayType,
                        rawDefectsType: rawDefectsType,
                        hairType: hairType,
                        colorOfHair: colorOfHair,
                        certificateType: certificateType,
                        selectedCountry: selectedCountry,
                        selectedCity: selectedCity,
                        selectedContinent: selectedContinent,
                        goodsInspection: selected
                    })
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    //flex: 1,
    //paddingTop: Constants.statusBarHeight,
    //backgroundColor: "#fff",
    //padding: 8,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    //    alignContent:'center',
    //borderWidth: 1,
    backgroundColor: '#A4AD9A',
    borderRadius: 8,
    //marginHorizontal: 2,
    height: 70,
    width: 120,
  },
});

export default GoodsInspectionBuyLeatherSearchProduct;
