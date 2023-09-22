import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const ProductListBuyLeatherSearchArea = (props) => {
  const selectedCountry = props.route.params.selectedCountry;
  const selectedCity = props.route.params.selectedCity;
  const selectedContinent = props.route.params.selectedContinent;

  console.log("country=" + selectedCountry);
  console.log("city=" + selectedCity);
  console.log("continent" + selectedContinent);

  const [productList, setProductList] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/SearchProduct/SearchLotProductByCountryOrContinent.php`;
      let object = [
        {
          country: selectedCountry,
        },
        { continents: selectedContinent },
      ];

      console.log(
        "object=IIIIIIIIIIIIIIIIIIIIIIIIIII" + JSON.stringify(object)
      );
      axios
        .post(webApirUrl, object)
        .then((res) => {
          //console.log("response=" + JSON.stringify(res.data));
          if (res.data != null || res.data != undefined) {
            setProductList(res.data.Search_Product_Details);
            setApiLoader(false);
            setDataLoaded(true);
          } else {
            setProductList(null);
            setApiLoader(false);
            setDataLoaded(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log("product list=" + JSON.stringify(productList));

  return (
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
        //   /><ActivityIndicator size={"large"} color='red' />
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
        <View style={{ marginHorizontal: 10, marginTop: 5, marginBottom: 140 }}>
          <Text allowFontScaling={false} style={styles.heading}>
            Results List
          </Text>
          <Text allowFontScaling={false} style={styles.countryHeading}>
            {selectedCountry}
          </Text>
          <View style={{ marginTop: 15 }}>
            {/* {productList != undefined || productList != null ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={productList}
                renderItem={({ item }) => (
                  
                )}
              />
            )  */}
            {productList != undefined || productList != null ? (
              <FlatList
                // inverted
                showsVerticalScrollIndicator={false}
                data={productList}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("Product Details", {
                          product_id: item.product_id,
                        })
                      }
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 15,
                          marginTop: 10,
                        }}
                      >
                        {item.product_title}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        {item.product_upload_images.length != 0 ? (
                          <View style={{ width: "40%" }}>
                            <Image
                              source={{
                                uri:
                                  `https://www.hidetrade.eu/app/UPLOAD_file/` +
                                  item.product_upload_images[0].images_name,
                              }}
                              style={{ width: 100, height: 85 }}
                              resizeMode="cover"
                            />
                          </View>
                        ) : (
                          <View style={{ width: "40%" }}>
                            <Image
                              source={require("../../assets/IconUpload3.png")}
                              style={{ width: 120, height: 120 }}
                            />
                          </View>
                        )}

                        <View style={{ flexShrink: 1 }}>
                          <View style={{}}>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold" }}
                            >
                              Selection:{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.Selected_Leathers == "Yes"
                                  ? `${item.selection}`
                                  : `Table Roll`}{" "}
                              </Text>
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{
                                fontWeight: "bold",
                                width: "100%",
                                marginVertical: 5,
                              }}
                              numberOfLines={1}
                            >
                              Category :{" "}
                              {item.product_Leaher_shape?.map((values) => (
                                <Text
                                  allowFontScaling={false}
                                  style={{ fontWeight: "normal" }}
                                >
                                  {values.title}{" "}
                                </Text>
                              ))}
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", marginVertical: 5 }}
                            >
                              Sub-Category:{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.sub_category_name}
                              </Text>
                            </Text>

                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold" }}
                            >
                              Origin:{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.Country_Name}
                              </Text>
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{
                                fontWeight: "bold",
                                width: "100%",
                                marginVertical: 5,
                              }}
                              numberOfLines={1}
                            >
                              Conditions :{" "}
                              {item.product_categories.map((values) => (
                                <Text
                                  allowFontScaling={false}
                                  style={{ fontWeight: "normal" }}
                                >
                                  {values.category}{" "}
                                </Text>
                              ))}
                            </Text>

                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", width: "100%" }}
                              numberOfLines={1}
                            >
                              Tanning :{" "}
                              {item.product_tanning_leathers?.map((values) => (
                                <Text
                                  allowFontScaling={false}
                                  style={{ fontWeight: "normal" }}
                                >
                                  {values.tanningLeathers},{" "}
                                </Text>
                              ))}
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", marginVertical: 5 }}
                            >
                              Substance:{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.Selected_Leathers == "Yes"
                                  ? `${item.thiknessType}  ${item.thinkessFrom}`
                                  : `${item.thinknessTo}`}
                              </Text>
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", marginVertical: 5 }}
                            >
                              Weight Category:{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.weightCatType}-{item.weightCatType2} (
                                {item.weightCatType3}){" "}
                                {item.weightSelectionSize}
                              </Text>
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", marginVertical: 5 }}
                            >
                              Surface Category:{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {" "}
                                {item.surfaceCatType}-{item.surfaceCatType2} (
                                {item.surfaceCatType3}){" "}
                                {item.surfaceSelectionSize}
                              </Text>
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", width: "100%" }}
                              numberOfLines={1}
                            >
                              Color :{" "}
                              {item.product_color.map((values) => (
                                <Text
                                  allowFontScaling={false}
                                  style={{ fontWeight: "normal" }}
                                >
                                  {values.Color}{" "}
                                </Text>
                              ))}
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", marginVertical: 5 }}
                            >
                              Inspection:{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.inspection_possible}
                              </Text>
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", marginVertical: 5 }}
                            >
                              Quantity :{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.Selected_Leathers == "Yes"
                                  ? `${item.selectionQuantity} ${item.selectionQuantityUnit}`
                                  : `${item.tableRollLeatherQty} ${item.tableRollLeatherQtySelection}`}
                              </Text>
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontWeight: "bold", marginVertical: 5 }}
                            >
                              Price :{" "}
                              <Text
                                allowFontScaling={false}
                                style={{ fontWeight: "normal" }}
                              >
                                {item.Selected_Leathers == "Yes"
                                  ? `${item.SelectionPrice} ${item.SelectionPriceUnit} / ${item.selectionQuantityUnit}`
                                  : `${item.tableRollLeatherPrice} ${
                                      item.tableRollLeatherPriceUnit
                                        ? item.tableRollLeatherPriceUnit
                                        : ""
                                    } / ${item.tableRollLeatherQtySelection}`}
                              </Text>
                            </Text>

                            <Text
                              allowFontScaling={false}
                              style={{
                                width: "100%",
                                fontWeight: "bold",
                                marginVertical: 5,
                              }}
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

                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold',marginVertical:5 }}>Selection: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.selection}</Text></Text> */}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderWidth: 0.5,
                        marginTop: 10,
                        backgroundColor: "grey",
                      }}
                    ></View>
                  </View>
                )}
              />
            ) : (
              <View style={{ alignItems: "center" }}>
                {console.log("product lst buy leather")}
                <Text
                  allowFontScaling={false}
                  style={{ textAlignVertical: "center" }}
                >
                  No products available for current filters
                </Text>
              </View>
            )}
          </View>
        </View>
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
  countryHeading: {
    color: Colors.text,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "400",
    marginTop: 10,
  },
  heading: {
    color: Colors.headerBackground,
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default ProductListBuyLeatherSearchArea;
