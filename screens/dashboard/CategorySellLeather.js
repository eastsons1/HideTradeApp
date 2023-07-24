import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const CategorySellLeather = (props) => {
  const [category, setCategory] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  var productName = props.route.params.productName;

  const renderCategory = ({ item, index }) => {
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
              `http://www.hidetrade.eu/app/APIs/ViewAllLeatherShapeList/` +
              image_name,
          }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllLeatherShapeList/ViewAllLeatherShapeList.php`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in category=" + JSON.stringify(res.data));
        setCategory(res.data);
        setApiLoader(false);
        setDataloaded(true);
      });
    }
  }, []);

  // useEffect(() => {
  //   let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllCategory/ViewAllCategory.php`;
  //   axios
  //     .get(webApiUrl)
  //     .then((res) => {
  //       console.log("response in category=" + JSON.stringify(res.data));
  //       setCategory(res.data);
  //       console.log("abc=" + JSON.stringify(category));
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
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
        <View style={{ flex: 1 }}>
          <ScrollView style={{}}>
            <View
              style={{ marginBottom: 15, marginHorizontal: 10, marginTop: 15 }}
            >
              <Text allowFontScaling={false}
                style={{ color: Colors.text, fontSize: 18, marginBottom: 20, textAlign:'center', fontWeight:'bold' }}
              >
                What kind of shape do you want to sell?
              </Text>
              <View>
                {category != undefined ? (
                  <View>
                    <FlatList
                      numColumns={3}
                      data={category.Output}
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
                      renderItem={renderCategory}
                      scrollEnabled={false}
                    />
                  </View>
                ) : null}
                {/* {category != undefined ? (
              // category.Output.map((value) =>
              <View>
                <FlatList
                  numColumns={3}
                  data={category.Output}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{ justifyContent: "space-evenly", flex: 1 }}
                    >
                      <View style={{ marginBottom: 15 }}>
                        <Text>{item.cat_title}</Text>
                      </View>
                 
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : 
            null} */}
              </View>
            </View>
          </ScrollView>
          <View style={{}}>
            <Text
              style={{
                marginHorizontal: 10,
                color: Colors.text,
                marginBottom: 10, textAlign:'center'
              }} allowFontScaling={false}
            >
              Multiple selections are allowed but we suggest that you create
              seperate saler notices for each different product
            </Text>
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
                  onPress={() => {
                    if (selected != "") {
                      props.navigation.navigate("Sub-Category", {
                        productName: productName,
                        category: selected,
                      });
                    } else {
                      Alert.alert("", "Please choose Category", [
                        { text: "Ok", style: "cancel" },
                      ]);
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 1
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

export default CategorySellLeather;
