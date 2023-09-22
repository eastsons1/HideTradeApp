import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const SizePageBuyLeatherSearchProduct = (props) => {
  const [size, setSize] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var kindOfLeather = props.route.params.kindOfLeather;
  var tanningLeather = props.route.params.tanningLeather;

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllProductSize/ViewAllProductSize.php`;
      axios
        .get(webApiUrl)
        .then((res) => {
          setSize(res.data.Output);
          setApiLoader(false);
          setDataloaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log("size=" + JSON.stringify(size));

  const renderSize = ({ item, index }) => {
    const { psize_id, product_size } = item;
    const isSelected = selected.filter((i) => i === product_size).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== product_size));
          } else {
            setSelected((prev) => [...prev, product_size]);
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
        <Text
          style={{
            color: isSelected ? "white" : "white",
            fontWeight: "600",
            fontSize: 18,
          }}
          allowFontScaling={false}
        >
          {product_size}
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
        <SpinView
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          />
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>Loading...</Text>
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
                }}
                allowFontScaling={false}
              >
                What is the size of the category of the leathers are you looking
                for?
              </Text>
              {size != undefined ? (
                <View>
                  <FlatList
                    numColumns={3}
                    data={size}
                    key={size.psize_id}
                    renderItem={renderSize}
                    scrollEnabled={false}
                  />
                </View>
              ) : null}
            </View>
          </ScrollView>
          <View>
            <Text
              style={{
                marginHorizontal: 10,
                color: Colors.text,
                marginBottom: 10,
                textAlign: "center",
              }}
              allowFontScaling={false}
            >
              To facilitate the categorization of leathers, we have decided to
              divide the sizes into these three macro categories. You will be
              able to enter all the exact size data at a later time.
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              <View>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => props.navigation.goBack()}
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
                    allowFontScaling={false}
                    style={{
                      fontSize: 22,
                      alignSelf: "center",
                      color: "#9EBDB8",
                    }}
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
                      props.navigation.navigate("Preservation Type", {
                        multi_category: multi_category,
                        kindOfShape: kindOfShape,
                        kindOfLeather: kindOfLeather,
                        size: selected,
                      });
                    } else if (
                      multi_category == "Pickled" ||
                      multi_category == "Tanned"
                    ) {
                      props.navigation.navigate("Tanning Leather ", {
                        multi_category: multi_category,
                        kindOfShape: kindOfShape,
                        kindOfLeather: kindOfLeather,
                        size: selected,
                      });
                    } else {
                      props.navigation.navigate("Tanning Leather ", {
                        multi_category: multi_category,
                        kindOfShape: kindOfShape,
                        kindOfLeather: kindOfLeather,
                        size: selected,
                      });
                    }
                  }}
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
    backgroundColor: Colors.inactiveState,
    borderRadius: 8,
    margin: 2,
    width: 110,
    height: 110,
    flex: 1,
  },
});

export default SizePageBuyLeatherSearchProduct;
