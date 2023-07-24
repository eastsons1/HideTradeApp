import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,Image, ActivityIndicator, Platform
} from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const SubstanceThicknessBuyLeatherSearchProduct = (props) => {
  const data = [
    { id: "1", substance: "Min" },
    { id: "2", substance: "Max" },
    { id: "3", substance: "Average" },
  ];

  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var kindOfLeather = props.route.params.kindOfLeather;
  var size = props.route.params.size;
  var preservationType = props.route.params.preservationType;
  var tanningLeather = props.route.params.tanningLeather;
  var selection = props.route.params.selection;
  var destination=props.route.params.destination;
  var tanningLeather=props.route.params.tanningLeather;
  var leatherColor=props.route.params.leatherColor;

  //const [substance, setSubstance] = useState(data);
  const [substance, setSubstance] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    if(dataLoad==false){
      setApiLoader(true)
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
          }} allowFontScaling={false}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  console.log("selected in subatance=" + selected);

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

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
      <ScrollView nestedScrollEnabled={true}>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: Colors.text,
              fontWeight: "bold",marginBottom:20
            }}allowFontScaling={false}
          >
            What are substance and thickness of the leathers you are looking for?
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
                fontWeight: "bold",
                alignSelf: "center",
              }}allowFontScaling={false}
            >
              Thickness
            </Text>
            <TextInput
              label={"From"}
              mode="outlined"
              style={{ width: 100, height: 35, backgroundColor: "white" }}
              activeOutlineColor={Colors.buttonBackground}
              keyboardType={Platform.OS=='ios'?"numbers-and-punctuation":"decimal-pad"}
              // value={fromValue==""?fromValue: parseFloat(fromValue).toFixed(2)}
              // onChangeText={(value) => setFromValue(value)}
              value={fromValue}
              onChangeText={handleChangeFrom}
              allowFontScaling={false}maxFontSizeMultiplier={1}
            ></TextInput>
            <Text
              style={{
                color: Colors.text,
                fontSize: 18,
                fontWeight: "500",
                alignSelf: "center",
              }}allowFontScaling={false}maxFontSizeMultiplier={1}
            >
              -
            </Text>
            <TextInput
              label={"To"}
              mode="outlined"
              style={{ width: 100, height: 35, backgroundColor: "white" }}
              activeOutlineColor={Colors.buttonBackground}
              keyboardType={Platform.OS=='ios'?"numbers-and-punctuation":"decimal-pad"}
              // value={toValue==""?toValue: parseFloat(toValue).toFixed(2)}
              // onChangeText={(value) => setToValue(value)}allowFontScaling={false}
              value={toValue}
              onChangeText={handleChangeTo}maxFontSizeMultiplier={1}
            ></TextInput>
            <Text
              style={{
                color: Colors.text,
                fontSize: 18,
                fontWeight: "500",
                alignSelf: "center",
              }}allowFontScaling={false}maxFontSizeMultiplier={1}
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
                if (multi_category == "Pickled" || multi_category == "Tanned") {
                  props.navigation.navigate(
                    "Trim",
                    {
                      multi_category: multi_category,
                      kindOfShape: kindOfShape,
                      kindOfLeather: kindOfLeather,
                      size: size,
                      selection: selection,
                      tanningLeather: tanningLeather,
                      substanceThickness: selected,
                      fromValue: fromValue,
                      toValue: toValue,
                      destination:destination,
                    }
                  );
                } else if(multi_category=='Crust' || multi_category=='Finished'){
                  props.navigation.navigate("Trim",{
                    multi_category: multi_category,
                    kindOfShape: kindOfShape,
                    kindOfLeather: kindOfLeather,
                    size: size,
                    selection: selection,
                    destination:destination,
                    substanceThickness: selected,
                    fromValue: fromValue,
                    toValue: toValue, tanningLeather:tanningLeather, 
                    leatherColor:leatherColor
                  })
                } else{return}
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
    margin: 10,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    backgroundColor:'#82A8BE',
    borderRadius: 8,
    marginHorizontal:'0.4%',
    marginVertical:'0.4%',
    width: '32.5%',
    height: 110,
    //flex:1
  },
});

export default SubstanceThicknessBuyLeatherSearchProduct;
