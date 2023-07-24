import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,Platform
} from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const SubstanceThicknessSellLeather = (props) => {
  const data = [
    { id: "1", substance: "Min" },
    { id: "2", substance: "Max" },
    { id: "3", substance: "Average" },
  ];

  var productName = props.route.params.productName;
  var category = props.route.params.category;
  var subCategory = props.route.params.subCategory;
  var size = props.route.params.size;
  var leatherCondition = props.route.params.leatherCondition;
  var tanningLeather = props.route.params.tanningLeather;
  var origin = props.route.params.origin;
  var continent=props.route.params.continent
  var Specification=props.route.params.Specification

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

  var labelSelection7=props.route.params.labelSelection7;
  var quantitySelection7=props.route.params.quantitySelection7;
  var labelSelectionUnit7=props.route.params.labelSelectionUnit7;
  var priceSelection7=props.route.params.priceSelection7;
  var labelSelectionPrice7=props.route.params.labelSelectionPrice7;

  //const [substance, setSubstance] = useState(data);
  const [substance, setSubstance] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllSubstansesAndThicknessList/ViewAllSubstansesAndThicknessList.php`;
      axios.get(webApiUrl).then((res) => {
        console.log(
          "response in substance and thickness=" + JSON.stringify(res.data)
        );
        setSubstance(res.data.Output);
        setApiLoader(false);
        setDataloaded(true);
      });
    }
  }, []);

  const renderSubstance = ({ item, index }) => {
    const { id, title } = item;
    const isSelected = selected.filter((i) => i === title).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== title));
          } else {
            setSelected((prev) => [title]);
          }
        }}
        style={[
          styles.item,
          isSelected && { backgroundColor: Colors.buttonBackground },
        ]}
      >
        <Text
          style={{
            color: isSelected ? "white" : "white",
            fontWeight: "600",
            fontSize: 18,textAlign:'center'
          }}
          allowFontScaling={false}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  console.log("selected in subatance=" + selected);

  //   const onChangeText={(text) => {
  //     const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/)
  //     if (validated) {
  //        setValue(text)
  //     }
  // }}

  const onChangeText = (text) => {
    //const validated = text.match(/^[a-zA-Z]*$/g)
    const re = /^\d+\.\d{0,2}$/;
    // if(re.test(text)){
    if (text.match(/^\d{1,}(\.\d{0,2})?$/)) {
      console.log("from value inside reg");
      setFromValue(text);
    }
  };

  const handleChangeFrom = (event) =>{
    let x, i
    if(fromValue.length==2){
      x=fromValue+",";
      for( i=2;i<=fromValue.length;i++){
        x=x+event[i]
      }  
    }else{
      x=event
    }
    setFromValue(x)
  };

  const handleChangeTo = (event) =>{
    let x, i
    if(toValue.length==2){
      x=toValue+",";
      for( i=2;i<=toValue.length;i++){
        x=x+event[i]
      }  
    }else{
      x=event
    }
    setToValue(x)
  };


  console.log("from value=" + fromValue);

  console.log("weight category=" + weightCatType);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
        <View style={{ flex: 1 }}>
          <ScrollView nestedScrollEnabled={true}>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: Colors.text,
                  fontWeight: "bold",
                }}
                allowFontScaling={false}
              >
                What are substance and thickness of the leathers you want to
                sell?
              </Text>
              <FlatList
                data={substance}
                renderItem={renderSubstance}
                numColumns={3}
                scrollEnabled={false}
                style={{ marginTop: 10 }}
              />
              <View
                style={{
                  marginTop: 35,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 18,
                    fontWeight: "500",
                    alignSelf: "center",
                  }}
                  allowFontScaling={false}
                >
                  Thickness
                </Text>
                <TextInput
                  label={"From"}
                  mode="outlined"
                  style={{ width: 100, height: 35, backgroundColor: "white" }}
                  activeOutlineColor={Colors.buttonBackground}
                  keyboardType={Platform.OS=='ios'?"numbers-and-punctuation":"decimal-pad"}
                  value={fromValue}
                  onChangeText={handleChangeFrom}maxFontSizeMultiplier={1}
                  // value={
                  //   fromValue == ""
                  //     ? fromValue
                  //     : parseFloat(fromValue).toFixed(2)
                  // }
                  // onChangeText={(value) => {
                  //   setFromValue(value);
                  //   console.log("inside n change");
                  // }}
                  allowFontScaling={false}
                ></TextInput>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 18,
                    fontWeight: "500",
                    alignSelf: "center",
                  }}
                  allowFontScaling={false}
                >
                  -
                </Text>
                <TextInput
                  label={"To"}
                  mode="outlined"
                  style={{ width: 100, height: 35, backgroundColor: "white" }}
                  activeOutlineColor={Colors.buttonBackground}
                  keyboardType={Platform.OS=='ios'?"numbers-and-punctuation":"decimal-pad"}
                  value={toValue}
                  onChangeText={handleChangeTo}maxFontSizeMultiplier={1}
                  // value={
                  //   toValue == "" ? toValue : parseFloat(toValue).toFixed(2)
                  // }
                  // onChangeText={(value) => setToValue(value)}
                  allowFontScaling={false}
                ></TextInput>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 18,
                    fontWeight: "500",
                    alignSelf: "center",
                  }}
                  allowFontScaling={false}
                >
                  mm
                </Text>
              </View>
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
                  // onPress={()=>props.navigation.navigate('DestinationSellLeather',{
                  //   productName:productName, category:category, subCategory:subCategory, size:size,leatherCondition:leatherCondition, tanningLeather:tanningLeather,substanceThickness:selected, fromValue:fromValue, toValue:toValue }
                  //   )}
                  onPress={() => {
                    if (
                      leatherCondition == "Pickled" ||
                      leatherCondition == "Tanned"
                    ) {
                      props.navigation.navigate("Destination", {
                        productName: productName,
                        category: category,
                        subCategory: subCategory,
                        size: size,
                        leatherCondition: leatherCondition,
                        tanningLeather: tanningLeather,
                        substanceThickness: selected,
                        fromValue: fromValue,
                        toValue: toValue,
                        origin: origin,
                        continent:continent,
                        Specification:Specification,
                        // weightCatType: parseFloat(weightCatType).toFixed(2),
                        // weightCatType2: parseFloat(weightCatType2).toFixed(2),
                        // weightCatType3: parseFloat(weightCatType3).toFixed(2),
                        weightCatType: weightCatType,
                        weightCatType2: weightCatType2,
                        weightCatType3: weightCatType3,
                        weightSelectionSize: weightSelectionSize,

                        // surfaceCatType: parseFloat(surfaceCatType).toFixed(2),
                        // surfaceCatType2: parseFloat(surfaceCatType2).toFixed(2),
                        // surfaceCatType3: parseFloat(surfaceCatType3).toFixed(2),
                        surfaceCatType: surfaceCatType,
                        surfaceCatType2: surfaceCatType2,
                        surfaceCatType3: surfaceCatType3,
                        surfaceSelectionSize: surfaceSelectionSize,

                        labelTableRoll: labelTableRoll,
                        quantityTableRoll: quantityTableRoll,
                        priceTableRoll: priceTableRoll,
                        labelTablePrice: labelTablePrice,

                        labelSelection:labelSelectionUnit!=null || labelSelectionPrice!=null? labelSelection:null,
                        quantitySelection:quantitySelection,
                        labelSelectionUnit:labelSelectionUnit,
                        labelSelectionPrice:labelSelectionPrice,
                        priceSelection:priceSelection,
                        
                        labelSelection2:labelSelectionUnit2!=null || labelSelectionPrice2!=null? labelSelection2:null,
                        quantitySelection2:quantitySelection2,
                        labelSelectionUnit2:labelSelectionUnit2,
                        labelSelectionPrice2:labelSelectionPrice2,
                        priceSelection2:priceSelection2,

                        labelSelection3:labelSelectionUnit3!=null || labelSelectionPrice3!=null? labelSelection3:null,
                        quantitySelection3:quantitySelection3,
                        labelSelectionUnit3:labelSelectionUnit3,
                        labelSelectionPrice3:labelSelectionPrice3,
                        priceSelection3:priceSelection3,

                        labelSelection4:labelSelectionUnit4!=null || labelSelectionPrice4!=null? labelSelection4:null,
                        quantitySelection4:quantitySelection4,
                        labelSelectionUnit4:labelSelectionUnit4,
                        labelSelectionPrice4:labelSelectionPrice4,
                        priceSelection4:priceSelection4,

                        labelSelection5:labelSelectionUnit5!=null || labelSelectionPrice5!=null? labelSelection5:null,
                        quantitySelection5:quantitySelection5,
                        labelSelectionUnit5:labelSelectionUnit5,
                        labelSelectionPrice5:labelSelectionPrice5,
                        priceSelection5:priceSelection5,

                        labelSelection6:labelSelectionUnit6!=null || labelSelectionPrice6!=null? labelSelection6:null,
                        quantitySelection6:quantitySelection6,
                        labelSelectionUnit6:labelSelectionUnit6,
                        labelSelectionPrice6:labelSelectionPrice6,
                        priceSelection6:priceSelection6,

                        labelSelection7:labelSelectionUnit7!=null || labelSelectionPrice7!=null? labelSelection7:null,
                        quantitySelection7:quantitySelection7,
                        labelSelectionUnit7:labelSelectionUnit7,
                        labelSelectionPrice7:labelSelectionPrice7,
                        priceSelection7:priceSelection7,


                      });
                    } else if (
                      leatherCondition == "Crust" ||
                      leatherCondition == "Finished"
                    ) {
                      props.navigation.navigate("Destination", {
                        productName: productName,
                        category: category,
                        subCategory: subCategory,
                        size: size,
                        leatherCondition: leatherCondition,
                        tanningLeather: tanningLeather,
                        substanceThickness: selected,
                        fromValue: fromValue,
                        toValue: toValue,
                        origin: origin,
                        continent:continent,
                        Specification:Specification,
                        // weightCatType: parseFloat(weightCatType).toFixed(2),
                        // weightCatType2: parseFloat(weightCatType2).toFixed(2),
                        // weightCatType3: parseFloat(weightCatType3).toFixed(2),
                        weightCatType: weightCatType,
                        weightCatType2: weightCatType2,
                        weightCatType3: weightCatType3,
                        weightSelectionSize: weightSelectionSize,

                        // surfaceCatType: parseFloat(surfaceCatType).toFixed(2),
                        // surfaceCatType2: parseFloat(surfaceCatType2).toFixed(2),
                        // surfaceCatType3: parseFloat(surfaceCatType3).toFixed(2),
                        surfaceCatType: surfaceCatType,
                        surfaceCatType2: surfaceCatType2,
                        surfaceCatType3: surfaceCatType3,
                        surfaceSelectionSize: surfaceSelectionSize,

                        labelTableRoll: labelTableRoll,
                        quantityTableRoll: quantityTableRoll,
                        priceTableRoll: priceTableRoll,
                        labelTablePrice: labelTablePrice,

                        labelSelection:labelSelectionUnit!=null || labelSelectionPrice!=null? labelSelection:null,
                        quantitySelection:quantitySelection,
                        labelSelectionUnit:labelSelectionUnit,
                        labelSelectionPrice:labelSelectionPrice,
                        priceSelection:priceSelection,
                        
                        labelSelection2:labelSelectionUnit2!=null || labelSelectionPrice2!=null? labelSelection2:null,
                        quantitySelection2:quantitySelection2,
                        labelSelectionUnit2:labelSelectionUnit2,
                        labelSelectionPrice2:labelSelectionPrice2,
                        priceSelection2:priceSelection2,

                        labelSelection3:labelSelectionUnit3!=null || labelSelectionPrice3!=null? labelSelection3:null,
                        quantitySelection3:quantitySelection3,
                        labelSelectionUnit3:labelSelectionUnit3,
                        labelSelectionPrice3:labelSelectionPrice3,
                        priceSelection3:priceSelection3,

                        labelSelection4:labelSelectionUnit4!=null || labelSelectionPrice4!=null? labelSelection4:null,
                        quantitySelection4:quantitySelection4,
                        labelSelectionUnit4:labelSelectionUnit4,
                        labelSelectionPrice4:labelSelectionPrice4,
                        priceSelection4:priceSelection4,

                        labelSelection5:labelSelectionUnit5!=null || labelSelectionPrice5!=null? labelSelection5:null,
                        quantitySelection5:quantitySelection5,
                        labelSelectionUnit5:labelSelectionUnit5,
                        labelSelectionPrice5:labelSelectionPrice5,
                        priceSelection5:priceSelection5,

                        labelSelection6:labelSelectionUnit6!=null || labelSelectionPrice6!=null? labelSelection6:null,
                        quantitySelection6:quantitySelection6,
                        labelSelectionUnit6:labelSelectionUnit6,
                        labelSelectionPrice6:labelSelectionPrice6,
                        priceSelection6:priceSelection6,

                        labelSelection7:labelSelectionUnit7!=null || labelSelectionPrice7!=null? labelSelection7:null,
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    //padding: 8,
    margin: 10,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    // backgroundColor: Colors.inactiveState,
    backgroundColor:'#82A8BE',
    borderRadius: 8,
    marginHorizontal:'0.4%',
    marginVertical:'0.4%',
    width: '32.5%',
    height: 110,
    //flex:1
  },
});

export default SubstanceThicknessSellLeather;
