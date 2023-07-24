import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,Image, ActivityIndicator
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const FlayLeatherBuyLeatherSearchProduct = (props) => {
  const [flay, setFlay] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var kindOfLeather = props.route.params.kindOfLeather;
  var size = props.route.params.size;
  var preservationType = props.route.params.preservationType;
  var trim = props.route.params.trim;
  var selection = props.route.params.selection;
  var tanningLeather = props.route.params.tanningLeather;
  var substanceThickness = props.route.params.substanceThickness;
  var fromValue = props.route.params.fromValue;
  var toValue = props.route.params.toValue;
  var trim = props.route.params.trim;
  var destination = props.route.params.destination;
  var leatherColor=props.route.params.leatherColor;

  useEffect(() => {
    if(dataLoad==false){
      setApiLoader(true)
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllFlayTypeLeatherList/ViewAllFlayTypeLeatherList.php`;
      axios.get(webApiUrl).then((res) => {
        setFlay(res.data.Output);
        setApiLoader(false);
      setDataloaded(true);
      });
    }
   
  }, []);

  const renderFlay = ({ item, index }) => {
    const { id, title } = item;
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
        <Text
          style={{
            color: isSelected ? "white" : "white",
            fontWeight: "600",
            fontSize: 18,
          }}allowFontScaling={false}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

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
          What kind of fly can you accept?
          </Text>
          <FlatList
            data={flay}
            renderItem={renderFlay}
            numColumns={3}
            scrollEnabled={false}
            style={{ marginTop: 10 }}
          />
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
                if (multi_category == "Raw") {
                  props.navigation.navigate(
                    "Raw Defects ",
                    {
                      multi_category: multi_category,
                      kindOfShape: kindOfShape,
                      kindOfLeather: kindOfLeather,
                      size: size,
                      preservationType: preservationType,
                      trim: trim,
                      flayType: selected,
                      selection: selection,
                      destination:destination,
                    }
                  );
                } else if (
                  multi_category == "Pickled" ||
                  multi_category == "Tanned"
                ) {
                  props.navigation.navigate(
                    "Raw Defects ",
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
                      flayType: selected,
                      destination:destination,
                    }
                  );
                }
                else{
                  props.navigation.navigate("Raw Defects ",{
                    multi_category: multi_category,
                    kindOfShape: kindOfShape,
                    kindOfLeather: kindOfLeather,
                    size: size,
                    selection: selection,
                    destination:destination,
                    substanceThickness: substanceThickness,
                    fromValue: fromValue,
                    toValue: toValue,
                    trim:trim,
                    flayType:selected, tanningLeather:tanningLeather,
                    leatherColor:leatherColor
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
    backgroundColor: Colors.inactiveState,
    borderRadius: 8,
    marginHorizontal:'0.4%',
    marginVertical:'0.4%',
    width: '32.5%',
    height: 110,
    //flex:1
  },
});

export default FlayLeatherBuyLeatherSearchProduct;
