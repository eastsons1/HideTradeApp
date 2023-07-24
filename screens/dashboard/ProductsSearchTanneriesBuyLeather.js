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

const ProductsSearchTanneriesBuyLeather = (props) => {
  const [product, setProduct] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);


  const user_id = props.route.params.user_id;
  console.log("user id in product=" + user_id);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=Tanneries&user_id=${user_id}`;
      axios
        .get(webApirUrl)
        .then((res) => {
          setProduct(res.data.User_Details);
          console.log("ViewSingleUserList response=" + JSON.stringify(res.data.User_Details));
          setApiLoader(false);
          setDataLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const windows = useWindowDimensions();

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
          /><Text style={{ fontWeight: 'bold', marginTop: 10 }}>Loading...</Text>
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
                    Available Leathers
                  </Text>

                  <View style={{ borderWidth: 0.5, marginTop: 10, backgroundColor: "grey" }}></View>


                  <View >
                    {value.Products_List.length != 0 ? (
                      <FlatList
                        inverted
                        data={value.Products_List}
                        contentContainerStyle={{
                        }}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate("Product Details  ", {
                                product_id: item.product_id,
                              })
                            }
                            style={{
                              marginTop: 10,
                              // alignItems: value.Products_List.length > 1 ? "center" : "flex-start",
                              flex: 1,
                              marginBottom: 10,
                              // backgroundColor: 'red',
                              // flexDirection:'row'


                            }}
                          >
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ marginTop: 15 }}>
                                {item.product_upload_images.length == 0 ? (
                                  <Image source={require('../../assets/IconUpload3.png')} style={{ width: 120, height: 120 }} />
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
                                        item.product_upload_images[0].images_name,
                                    }}
                                  />
                                )}
                              </View>


                              <View style={{ marginLeft: 10, padding: 10 }}>
                                 <View style={{ flexDirection: "row", }}>
                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold", width: 200, }}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                  >
                                    Product :{" "}
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal" }}
                                    >
                                      {item.product_title}
                                    </Text>
                                  </Text>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Selection :{" "}
                                  </Text>

                                  <Text allowFontScaling={false}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal", width: 10 }}
                                      ellipsizeMode='tail'
                                      numberOfLines={1}
                                    >
                                      {item.Selected_Leathers == "Yes" ? `${item.selection}` : `Table Roll`}
                                    </Text>
                                  </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>

                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Category :{" "}
                                  </Text>

                                  <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%' }} numberOfLines={1}>

                                    {item.product_Leaher_shape?.map(
                                      (values) => (
                                        <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{values.title}, </Text>
                                      )
                                    )}

                                  </Text>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Sub-category :{" "}
                                  </Text>
                                  <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%', }} numberOfLines={1}>

                                    {item.Sub_Category_Details?.map(
                                      (values) => (
                                        <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{values.brand_title}, </Text>
                                      )
                                    )}

                                  </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>

                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Origin :{" "}
                                  </Text>

                                  {<Text allowFontScaling={false}>
                                    {/* For the time being showing continent */}
                                    {item.originORcountryName}</Text>}

                                </View>


                                <View style={{ flexDirection: "row" }}>

                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Conditions :{" "}
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
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Tanning :{" "}
                                  </Text>

                                  <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%', }} numberOfLines={1}>

                                    {item.product_tanning_leathers?.map(
                                      (values) => {
                                        return <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{values.tanningLeathers}, </Text>
                                      }
                                    )}
                                  </Text>


                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Substance :{" "}
                                  </Text>
                                  <Text allowFontScaling={false}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal", width: 10 }}
                                      ellipsizeMode='tail'
                                      numberOfLines={1}
                                    >
                                      {item.thinkessFrom}-{item.thinknessTo} ({item.thiknessType})
                                    </Text>
                                  </Text>
                                </View>



                                {/* <View style={{ flexDirection: "row" }}>

                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Tannings:{" "}
                                  </Text>

                                </View> */}

                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Wheight Category :{" "}
                                  </Text>
                                  <Text allowFontScaling={false}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal", width: 10 }}
                                      ellipsizeMode='tail'
                                      numberOfLines={1}
                                    >
                                      {item.weightCatType}-{item.weightCatType2} ({item.weightCatType3}) {item.weightSelectionSize}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Surface Category :{" "}
                                  </Text>
                                  <Text allowFontScaling={false}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal", width: 10 }}
                                      ellipsizeMode='tail'
                                      numberOfLines={1}
                                    >
                                      {item.surfaceCatType}-{item.surfaceCatType2} ({item.surfaceCatType3}) {item.surfaceSelectionSize}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Color :{" "}
                                  </Text>
                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "normal", width: 180 }}
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                  >
                                    {item.product_color?.map((values) => (<Text>{values.Color}, </Text>))}
                                  </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Inspection :{" "}
                                  </Text>
                                  <Text allowFontScaling={false}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal", width: 10 }}
                                      ellipsizeMode='tail'
                                      numberOfLines={1}
                                    >
                                      {item.inspection_possible}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>

                                  <Text
                                    allowFontScaling={false}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Quantity :{" "}
                                  </Text>

                                  <Text allowFontScaling={false} >
                                    {item.Selected_Leathers == "Yes" ? `${item.selectionQuantity} ${item.selectionQuantityUnit}` : `${item.tableRollLeatherQty} ${item.tableRollLeatherQtySelection}`}</Text>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    allowFontScaling={false} style={{ fontWeight: "bold" }}
                                  >
                                    Specifications :{" "}
                                  </Text>
                                  <Text allowFontScaling={false}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{ fontWeight: "normal", width: 10 }}
                                      ellipsizeMode='tail'
                                      numberOfLines={1}
                                    >
                                      {item.specification}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>


                                  <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%' }} numberOfLines={1}>
                                    Price :{" "}
                                    <Text allowFontScaling={false} style={{ fontWeight: 'normal', marginLeft: 2 }}>
                                      {item.Selected_Leathers == "Yes" ? `${item.SelectionPrice} ${item.SelectionPriceUnit} / ${item.selectionQuantityUnit}` : `${item.tableRollLeatherPrice} ${item.tableRollLeatherPriceUnit ? item.tableRollLeatherPriceUnit : ''} / ${item.tableRollLeatherQtySelection}`}
                                    </Text>

                                  </Text>
                                </View>


                              </View>

                            </View>
                          </TouchableOpacity>
                        )}
                      // numColumns={2}
                      />
                    ) : (
                      <View style={{}}>
                        {console.log("no products")}
                        <Text
                          style={{
                            textAlign: "center",
                            height: "100%",
                            paddingTop: 300,
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                          allowFontScaling={false}
                        >
                          No Products Found
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View style={{}}>
                {console.log("no products")}
                <Text
                  style={{
                    textAlign: "center",
                    height: "100%",
                    paddingTop: 300,
                  }}
                  allowFontScaling={false}
                >
                  No Products Found
                </Text>
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

export default ProductsSearchTanneriesBuyLeather;
