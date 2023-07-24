import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,Image, ActivityIndicator
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const HairLeatherBuyLeatherSearchProduct = (props) => {
  const [hairLeather, setHairLeather] = useState(undefined);
  const [color, setColor] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var kindOfLeather = props.route.params.kindOfLeather;
  var size = props.route.params.size;
  var preservationType = props.route.params.preservationType;
  var trim = props.route.params.trim;
  var flayType = props.route.params.flayType;
  var rawDefectsType = props.route.params.rawDefectsType;
  var selection = props.route.params.selection;
  var tanningLeather = props.route.params.tanningLeather;
  var substanceThickness = props.route.params.substanceThickness;
  var fromValue = props.route.params.fromValue;
  var toValue = props.route.params.toValue;
  var destination=props.route.params.destination;
  var leatherColor=props.route.params.leatherColor;

  useEffect(() => {
    if(dataLoad==false){
      setApiLoader(true)
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllHairTypeLeatherList/ViewAllHairTypeLeatherList.php`;
      axios
        .get(webApiUrl)
        .then((res) => {
          setHairLeather(res.data.Output);
        })
        .catch((err) => console.log(err));
      let webApiUrlColor = `https://www.hidetrade.eu/app/APIs/ViewAllColorLeatherList/ViewAllColorLeatherList.php`;
      axios
        .get(webApiUrlColor)
        .then((res) => {
          setColor(res.data.Output);
          setApiLoader(false);
      setDataloaded(true);
        })
        .catch((err) => console.log(err));
    }
  
  }, []);

  const renderHairLeather = ({ item, index }) => {
    const { id, title } = item;
    const isSelected = selected.filter((i) => i === title).length > 0;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              if (isSelected) {
                setSelected((prev) => prev.filter((i) => i !== title));
              } else {
                setSelected((prev) => [title]);
              }
            }}
            style={[
              styles.item,{alignSelf:'center', width:110,backgroundColor:'#62B0A2'},
              isSelected && {backgroundColor:'#61A375'}
              // isSelected && { backgroundColor:'#62B0A2' },
            ]}
          >
            <Text
              style={{
                color: isSelected ? "white" : "white",
                fontWeight: "600",
                fontSize: 18,textAlign:'center'
              }}allowFontScaling={false}
            >
              {title}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          {title == "Hair" ? (
            <Text style={{}}>
              In the case of skins other than sheep and goats, always select the
              Hair button
            </Text>
          ) : null}
        </View> */}
      </View>
    );
  };

  console.log("selected=" + selected);

  const renderColor = ({ item, index }) => {
    const { id, title } = item;
    const isSelected = selectedColor.filter((i) => i === title).length > 0;

    return (
      <TouchableOpacity
      onPress={() => {
        if (selected == "" || selected == null || selected == undefined) {
          return;
        } else if (selected == "Hair") {
          if (isSelected) {
            setSelectedColor([]);
            setSelectedColor((prev) => prev.filter((i) => i !== title));
          } else {
            setSelectedColor((prev) => [...prev, title]);
          }
        } else if (selected == "Wool") {
          if (isSelected) {
            setSelectedColor([]);
            setSelectedColor((prev) => prev.filter((i) => i !== title));
          } else {
            setSelectedColor((prev) => [...prev, title]);
          }
        }
      }}
        style={[
          styles.item,{backgroundColor:'#62B0A2'},
          isSelected && {backgroundColor:'#61A375'}
          // isSelected && { backgroundColor: '#447D74' },
        ]}
      >
        <Text
          style={{
            color: isSelected ? "white" : "white",
            fontWeight: "600",
            fontSize: 18,textAlign:'center'
          }}allowFontScaling={false}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  console.log("color=" + selectedColor);

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
            What kind of hair should have the leathers you are looking for?
          </Text>
          <FlatList
            data={hairLeather}
            renderItem={renderHairLeather}
            numColumns={3}
            scrollEnabled={false}
            style={{ marginTop: 10 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 40,
              color: Colors.text,
              fontWeight: "bold",
              //marginBottom: 10,
            }}allowFontScaling={false}
          >
            Which color
          </Text>
          <FlatList
            data={color}
            renderItem={renderColor}
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
                    "Certificates and Documents",
                    {
                      multi_category: multi_category,
                      kindOfShape: kindOfShape,
                      kindOfLeather: kindOfLeather,
                      size: size,
                      preservationType: preservationType,
                      trim: trim,
                      flayType: flayType,
                      rawDefectsType: rawDefectsType,
                      hairType: selected,
                      colorOfHair: selectedColor,
                      selection: selection,
                      destination:destination,
                    }
                  );
                } else if (
                  multi_category == "Pickled" ||
                  multi_category == "Tanned"
                ) {
                  props.navigation.navigate(
                    "Certificates and Documents",
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
                      hairType: selected,
                      colorOfHair: selectedColor,
                      destination:destination,
                    }
                  );
                } else{
                  props.navigation.navigate("Certificates and Documents",{
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
                    flayType:flayType,
                    rawDefectsType: rawDefectsType,
                    hairType: selected,
                    colorOfHair: selectedColor,tanningLeather:tanningLeather,
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
    justifyContent: "center",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    backgroundColor:'#447D74',
    borderRadius: 8,
    marginHorizontal:'0.4%',
    marginVertical:'0.4%',
    width: '32.5%',
    height: 110,
    //flex:1
  },
});

export default HairLeatherBuyLeatherSearchProduct;
