import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import axios from "axios";

import Colors from "../../constants/Colors";

const TanningLeatherSearchExpert = (props) => {
  const [tanningLeather, setTanningLeather] = useState(undefined);
  const [selected, setSelected] = useState([]);

  var leather_conditions=props.route.params.leather_conditions;

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
          isSelected && { backgroundColor: Colors.buttonBackground },
        ]}
      >
        <Image
          style={{ width: 100, height: 100 }}
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
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/ViewAllKindOfTanningLeatherForBuyList.php`;
    axios.get(webApiUrl).then((res) => {
      setTanningLeather(res.data);
    });
  }, []);

  console.log('selected='+selected)

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 15 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: Colors.text,
              fontWeight: "500",
              marginBottom: 10,
            }}allowFontScaling={false}
          >
            What kind of tanning have the leathers you want to
          </Text>
          <View>
            {tanningLeather != undefined ? (
              <View>
                <FlatList
                  numColumns={3}
                  data={tanningLeather.Output}
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
                  renderItem={renderTanningLeather}
                  scrollEnabled={false}
                />
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" size={30} color={Colors.text} />
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
              onPress={() =>
                props.navigation.navigate("Kind Of Leather",{leather_conditions:leather_conditions, tanningLeatherType:selected})
              } 
            >
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  color: Colors.text,
                }}allowFontScaling={false}
              >
                Next
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={30}
                color={Colors.text}
              />
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
    margin: 10,
    width: 110,
    height: 110,
  },
});

export default TanningLeatherSearchExpert;
