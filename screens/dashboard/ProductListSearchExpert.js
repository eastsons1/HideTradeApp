import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const ProductListSearchExpert = (props) => {
  const [product, setProduct] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const user_id = props.route.params.user_id;
  console.log("user id in product=" + user_id);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=Agents&user_id=${user_id}`;
      axios
        .get(webApirUrl)
        .then((res) => {
          setProduct(res.data.User_Details);
          setApiLoader(false);
          setDataLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const windows = useWindowDimensions();

  console.log("products in expert products=" + JSON.stringify(product));

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
        <ScrollView>
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            {product != undefined ? (
              product.map((value, i) => (
                <View>
                  <Text allowFontScaling={false} style={styles.headingName}>
                    {value.first_name} {value.last_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.text,
                      fontWeight: "700",
                      textAlign: "center",
                      marginTop: 20,
                    }}
                    allowFontScaling={false}
                  >
                    Leathers Available
                  </Text>

                  <View
                    style={{
                      borderWidth: 0.5,
                      marginTop: 10,
                      backgroundColor: "grey",
                    }}
                  ></View>

                  <View>
                    {value.Products_List.length != 0 ? (
                      <FlatList
                        data={value.Products_List}
                        renderItem={({ item }) => (
                          <View>
                            {console.log("1234")}

                            <TouchableOpacity
                              onPress={() =>
                                props.navigation.navigate("Product Details  ", {
                                  product_id: item.product_id,
                                })
                              }
                              style={{
                                marginTop: 10,
                                alignItems:
                                  value.Products_List.length > 1
                                    ? "center"
                                    : "flex-start",
                                flex: 1,
                                marginBottom: 10,
                              }}
                            >
                              <View>
                                {item.product_upload_images.length == 0 ? (
                                  <Image
                                    source={require("../../assets/Johnny.png")}
                                    style={{ width: 120, height: 120 }}
                                  />
                                ) : (
                                  <Image
                                    style={{
                                      width: 120,
                                      height: 120,
                                      borderRadius: 8,
                                    }}
                                    source={{
                                      uri:
                                        `http://www.hidetrade.eu/app/UPLOAD_file/` +
                                        item.product_upload_images[0]
                                          .images_name,
                                    }}
                                  />
                                )}
                                <View style={{ flexDirection: "row" }}>
                                  <Text allowFontScaling={false}>Product:</Text>
                                  <Text allowFontScaling={false}>
                                    {item.product_title}
                                  </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Category:{" "}
                                  </Text>
                                  <Text allowFontScaling={false}>
                                    {item.product_categories.map((abc) => (
                                      <Text
                                        allowFontScaling={false}
                                        style={{ fontWeight: "normal" }}
                                      >
                                        {abc.category}
                                      </Text>
                                    ))}
                                  </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold", width: 160 }}
                                    numberOfLines={1}
                                  >
                                    Size:{" "}
                                    {item.product_sizes.map((abc) => (
                                      <Text
                                        allowFontScaling={false}
                                        style={{ fontWeight: "normal" }}
                                      >
                                        {abc.product_size}{" "}
                                      </Text>
                                    ))}
                                  </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Raw Defects:{" "}
                                  </Text>
                                  <Text
                                    style={{ width: 60 }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    allowFontScaling={false}
                                  >
                                    {item.product_rawdefects.map((abc) => (
                                      <Text
                                        allowFontScaling={false}
                                        style={{ fontWeight: "normal" }}
                                      >
                                        {abc.rawDefects}
                                      </Text>
                                    ))}
                                  </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                  <Text
                                    style={{ fontWeight: "bold", width: 160 }}
                                    numberOfLines={1}
                                  >
                                    Country:{" "}
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal" }}
                                    >
                                      {value.Country}
                                    </Text>
                                  </Text>
                                </View>

                                {/* <View style={{ flexDirection: "row" }}>
                                  <Text allowFontScaling={false}>Selection:</Text>
                                  {item.product_selected_leathers_selection.map(
                                    (abc) => (
                                      <View>
                                        <Text allowFontScaling={false}>{abc.selection},</Text>
                                      </View>
                                    )
                                  )}
                                </View> */}
                                <View style={{ flexDirection: "row" }}>
                                  <Text allowFontScaling={false}>Price:</Text>
                                  <Text allowFontScaling={false}>
                                    {item.product_price}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                        numColumns={2}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{
                            textAlignVertical: "center",
                            fontWeight: "bold",
                          }}
                        >
                          No Products Available
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text allowFontScaling={false}>No Products Available</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    opacity: 1,
    zIndex: 5,
  },
  headingName: {
    color: Colors.headerBackground,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductListSearchExpert;
