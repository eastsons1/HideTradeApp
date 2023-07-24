import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,ActivityIndicator, Alert
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const LeatherConditionBuyLeatherSearchProduct = (props) => {
  const [leatherCondition, setLeatherCondition] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/ViewAllLeatherConditionList.php`;
      axios.get(webApiUrl).then((res) => {
        setLeatherCondition(res.data);
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  }, []);

  //console.log('selected='+selected[0])
  for (let i = 0; i < selected.length; i++) {
    console.log(i + "=" + selected[i]);
    console.log("array=" + selected);
  }

  const renderCondition = ({ item, index }) => {
    const { id, title, image_name } = item;
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
          isSelected && {
            backgroundColor: Colors.buttonBackground,
            //marginHorizontal: 5,
          },
        ]}
      >
        <Image
          style={[ {width: 108, height: 108}, isSelected && {width:108, height:108}  ]}
          source={{
            uri:
              "http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/" +
              image_name,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
        // /><ActivityIndicator size={"large"} color='red' />
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
                  What conditions of leathers are you looking for?
                </Text>
                <View>
                  {leatherCondition != undefined ? (
                    <View>
                      <FlatList
                        numColumns={3}
                        data={leatherCondition.Output}
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
                        renderItem={renderCondition}
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
              onPress={() => {
                if (selected == "Raw") {
                  props.navigation.navigate(
                    "Leather Shape",
                    { multi_category: selected }
                  );
                } else if (selected == "Pickled" || selected == "Tanned") {
                  props.navigation.navigate(
                    "Leather Shape",
                    { multi_category: selected }
                  );
                } else if(selected=='Crust' || selected=='Finished'){
                  props.navigation.navigate("Leather Shape",{multi_category:selected})
                } else{Alert.alert('',"Kindly Select Leather Condition",[{text:'Ok', style:'cancel'}])}
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

export default LeatherConditionBuyLeatherSearchProduct;
