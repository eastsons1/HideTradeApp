import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const CategoryInProfile = (props) => {
  const [leatherCondition, setLeatherCondition] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const finalSub = props.route.params.finalSub;
  const user_type = props.route.params.user_type;
  // console.log("final in category=" + JSON.stringify(finalSub));

  var pcategory=selected.map((value)=>({['pcategory']:value}))

  const finalCat=finalSub.concat(pcategory);
  console.log('final cat='+JSON.stringify(finalCat))

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/ViewAllLeatherConditionList.php`;
      axios.get(webApiUrl).then((res) => {
        setLeatherCondition(res.data);
        setDataloaded(true);
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
            setSelected((prev) => [...prev, title]);
          }
        }}
        style={[
          styles.item,
          isSelected && { backgroundColor: Colors.buttonBackground },
        ]}
      >
        <Image
          style={[
            { width: 108, height: 108 },
            isSelected && { width: 108, height: 108 },
          ]}
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          <ScrollView>
            <View style={{ marginHorizontal: 15 }}>
              {user_type == "Tanneries" ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginTop: 10,
                    color: Colors.text,
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                  allowFontScaling={false}
                >
                  What are the conditions of the leathers you would like to
                  sell?
                </Text>
              ) : (
                <Text style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 10,
                  color: Colors.text,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
                allowFontScaling={false}>
                  Which condition of the leathers are you able to inspect?
                </Text>
              )}
              <View>
                {leatherCondition != undefined ? (
                  <View>
                    <FlatList
                      numColumns={3}
                      data={leatherCondition.Output}
                      renderItem={renderCondition}
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
                  //onPress={() => props.navigation.navigate('Profile',{category:selected})}
                >
                  <Image
                    source={require("../../assets/ByClient/BOTTOMBACK.png")}
                    style={{
                      width: 20,
                      height: 20,
                      marginHorizontal: 10,
                      alignSelf: "center",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      alignSelf: "center",
                      color: "#9EBDB8",
                    }}
                    allowFontScaling={false}
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
                   onPress={() => props.navigation.navigate("Tanning Leather   ", {user_type:user_type, finalCat:finalCat})}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 22,
                      alignSelf: "center",
                      color: "#62B0A2",
                    }}
                  >
                    Next
                  </Text>
                  <Image
                    source={require("../../assets/ByClient/BOTTOMNEXT.png")}
                    style={{
                      width: 20,
                      height: 20,
                      marginHorizontal: 10,
                      alignSelf: "center",
                    }}
                  />
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
    marginHorizontal: "0.4%",
    width: "32.5%",
    height: 120,
    //flex:1
  },
});

export default CategoryInProfile;
