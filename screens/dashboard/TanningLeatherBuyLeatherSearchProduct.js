import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const TanningLeatherBuyLeatherSearchProduct = (props) => {
  const [tanningLeather, setTanningLeather] = useState(undefined);
  const [selected, setSelected] = useState([]);

  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var size = props.route.params.size;
  var kindOfLeather = props.route.params.kindOfLeather;

  const renderTanningLeather = ({ item, index }) => {
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
          isSelected && {
            backgroundColor: Colors.buttonBackground,
          },
        ]}
      >
        <Image
          style={[ {width: 108, height: 108}, isSelected && {width:108, height:108}  ]}
          source={{
            uri:
              "http://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/" +
              image_name,
          }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/ViewAllKindOfTanningLeatherForBuyList.php`;
      axios.get(webApiUrl).then((res) => {
        setTanningLeather(res.data);
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  }, []);

  console.log("selected=" + selected);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
          <View style={{ flex: 1 }}>
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
                  What kind of tanning are you looking for?
                </Text>
                <View>
                  {tanningLeather != undefined ? (
                    <View>
                      <FlatList
                        numColumns={3}
                        data={tanningLeather.Output}
                        renderItem={renderTanningLeather}
                        scrollEnabled={false}
                      />
                    </View>
                  ) : null}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>

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
              onPress={
                () => {
                  if (
                    multi_category == "Pickled" ||
                    multi_category == "Tanned"
                  ) {
                    props.navigation.navigate("Selection", {
                      multi_category: multi_category,
                      kindOfShape: kindOfShape,
                      kindOfLeather: kindOfLeather,
                      size: size,
                      tanningLeather: selected,
                    });
                  }
                  else if(multi_category=='Crust' || multi_category=='Finished'){
                    props.navigation.navigate("Selection",{
                      multi_category: multi_category,
                      kindOfShape: kindOfShape,
                      kindOfLeather: kindOfLeather,
                      size: size,
                      tanningLeather: selected,
                    })
                  }
                }
                //props.navigation.navigate("KindOfLeatherBuyLeatherSearchProduct",{multi_category:multi_category,kindOfShape:kindOfShape, tanningLeather:selected})
              }
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
export default TanningLeatherBuyLeatherSearchProduct;
