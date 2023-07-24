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

const ProductListBuyLeatherSearchProduct = (props) => {
  var selectedCountry = props.route.params.selectedCountry;
  var selectedCity = props.route.params.selectedCity;
  var selectedContinent = props.route.params.selectedContinent;

  var multi_category = props.route.params.multi_category;
  var kindOfShape = props.route.params.kindOfShape;
  var kindOfLeather = props.route.params.kindOfLeather;
  var size = props.route.params.size;
  var preservationType = props.route.params.preservationType;
  var trim = props.route.params.trim;
  var flayType = props.route.params.flayType;
  var rawDefectsType = props.route.params.rawDefectsType;
  var hairType = props.route.params.hairType;
  var colorOfHair = props.route.params.colorOfHair;
  var certificateType = props.route.params.certificateType;
  var selection = props.route.params.selection;
  var tanningLeather = props.route.params.tanningLeather;
  var substanceThickness = props.route.params.substanceThickness;
  var fromValue = props.route.params.fromValue;
  var toValue = props.route.params.toValue;
  var destination = props.route.params.destination;
  var goodsInspection = props.route.params.goodsInspection;
  var leatherColor = props.route.params.leatherColor;

  const arr100 = { ["thickness_from"]: fromValue };
  console.log("thickness from=" + JSON.stringify(arr100));

  const arr1 = multi_category.map((value) => ({ ["multi_category"]: value }));

  let final;

  useEffect(() => {
    if (multi_category == "Raw") {
      // const arr2 = kindOfShape.map((value) => ({ ["kind_of_shape"]: value }));
      const arr2 = kindOfShape && kindOfShape.map((value) => ({ ["leather_shape"]: value }));
      const arr3 = kindOfLeather && kindOfLeather.map((value) => ({ ["sub_category"]: value }));
      const arr4 = size && size.map((value) => ({ ["size"]: value }));
      const arr5 = preservationType && preservationType.map((value) => ({
        ["preservation"]: value,
      }));
      const arr6 = trim && trim.map((value) => ({ ["trim_type"]: value }));
      const arr7 = flayType && flayType.map((value) => ({ ["flay_type"]: value }));
      const arr8 = rawDefectsType && rawDefectsType.map((value) => ({ ["raw_defects"]: value }));
      const arr9 = hairType && hairType.map((value) => ({ ["leather_type"]: value }));
      const arr10 = colorOfHair && colorOfHair.map((value) => ({ ["color"]: value }));
      const arr11 =  certificateType && certificateType.map((value) => ({
        ["Certificates"]: value,
      }));
      const arr12 = [{ country: selectedCountry }, { city: selectedCity }, { continent: selectedContinent }];
      const arr13 = selection && selection.map((value) => ({ ["selection_type"]: value }));
      const arr14 = destination && destination.map((value) => ({
        ["Product_Destination"]: value,
      }));

      final = arr1.concat(
        arr2,
        arr3,
        arr4,
        arr5,
        arr6,
        arr7,
        arr8,
        arr9,
        arr10,
        arr11,
        arr12,
        // arr13,
        arr14
      );
      console.log("final=" + JSON.stringify(final));
    } else if (multi_category == "Pickled" || multi_category == "Tanned") {
      const arr2 = kindOfShape && kindOfShape.map((value)=> ({ ["kind_of_shape"]: value }));
      const arr3 = kindOfLeather && kindOfLeather.map((value) => ({ ["sub_category"]: value }));
      const arr4 = size && size.map((value)=> ({ ["size"]: value }));
      const arr5 = tanningLeather && tanningLeather.map((value) => ({
        ["tanning_leathers"]: value,
      }));
      const arr6 = trim && trim.map((value) => ({ ["trim_type"]: value }));
      const arr7 = flayType && flayType.map((value) => ({ ["flay_type"]: value }));
      const arr8 = rawDefectsType && rawDefectsType.map((value) => ({ ["raw_defects"]: value }));
      const arr9 = hairType && hairType.map((value) => ({ ["leather_type"]: value }));
      const arr10 = colorOfHair && colorOfHair.map((value)=> ({ ["color"]: value }));
      const arr11 = certificateType && certificateType.map((value)  => ({
        ["Certificates"]: value,
      }));
      const arr12 = [{ country: selectedCountry }, { city: selectedCity }, { continent: selectedContinent },];
      const arr13 = selection && selection.map((value) => ({ ["selection_type"]: value }));
      const arr14 = substanceThickness && substanceThickness.map((value) => ({
        ["thickness_type"]: value,
      }));
      const arr15 = { ["thickness_from"]: fromValue };
      const arr16 = { ["thickness_to"]: toValue };
      const arr17 = destination && destination.map((value) => ({
        ["Product_Destination"]: value,
      }));

      final = arr1.concat(
        arr2,
        arr3,
        arr4,
        arr5,
        arr6,
        arr7,
        arr8,
        arr9,
        arr10,
        arr11,
        arr12,
        // arr13,
        arr14,
        arr15,
        arr16,
        arr17
      );
      console.log("final in second condition=" + JSON.stringify(final));

      //substance and thickness keys missing from request api
    } else if (multi_category == "Crust" || multi_category == "Finished") {
      const arr2 = kindOfShape && kindOfShape.map((value) => ({ ["kind_of_shape"]: value }));
      const arr3 = kindOfLeather && kindOfLeather.map((value) => ({ ["sub_category"]: value }));
      const arr4 = size && size.map((value) => ({ ["size"]: value }));
      const arr5 = tanningLeather && tanningLeather.map((value) => ({
        ["tanning_leathers"]: value,
      }));
      const arr6 = trim && trim.map((value) => ({ ["trim_type"]: value }));
      const arr7 = flayType && flayType.map((value) => ({ ["flay_type"]: value }));
      const arr8 = rawDefectsType && rawDefectsType.map((value) => ({ ["raw_defects"]: value }));
      const arr9 = hairType && hairType.map((value) => ({ ["leather_type"]: value }));
      const arr10 = colorOfHair && colorOfHair.map((value) => ({ ["color"]: value }));
      const arr11 = certificateType && certificateType.map((value) => ({
        ["Certificates"]: value,
      }));
      const arr12 = [{ country: selectedCountry }, { city: selectedCity }, { continent: selectedContinent }];
      const arr13 = selection && selection.map((value) => ({ ["selection_type"]: value }));
      const arr14 = substanceThickness && substanceThickness.map((value) => ({
        ["thickness_type"]: value,
      }));
      const arr15 = { ["thickness_from"]: fromValue };
      const arr16 = { ["thickness_to"]: toValue };
      const arr17 = { ["leather_color"]: leatherColor };
      const arr18 = destination && destination.map((value) => ({
        ["Product_Destination"]: value,
      }));

      final = arr1.concat(
        arr2,
        arr3,
        arr4,
        arr5,
        arr6,
        arr7,
        arr8,
        arr9,
        arr10,
        arr11,
        arr12,
        // arr13,
        arr14,
        arr15,
        arr16,
        arr17,
        arr18
      );
      console.log("final in third condition=" + JSON.stringify(final));
    }
  }, []);

  //const arr14=tanningLeather.map((value)=>({['tanning_leathers']:value}))

  const [productList, setProductList] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect( () => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/SearchProduct/SearchLotProduct.php`;
      let object = [
        {
          country: selectedCountry,
        },
        { continents: selectedContinent },


      ];
      console.log("final inside useEfect=" + JSON.stringify(final));

      //console.log("object=" + JSON.stringify(object));
      axios
        .post(webApirUrl, final)
        .then((res) => {
          // console.log("response=" + JSON.stringify(res.data));
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
        <SpinView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{ fontWeight: 'bold', marginTop: 10 }}>Loading...</Text>
        </SpinView>
      ) : (
        <View style={{ marginHorizontal: 10, marginTop: 5, paddingBottom: 60 }}>
          <Text allowFontScaling={false} style={styles.heading}>Results List</Text>
          {/* <Text style={styles.countryHeading}>{selectedCountry}</Text> */}
          <View style={{ marginVertical: 15 }}>
            {productList != undefined || productList != null ? (
              <FlatList

                showsVerticalScrollIndicator={false}
                data={productList}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("Product Details ", {
                          product_id: item.product_id,
                        })
                      }
                    ><Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 10 }}>
                        {item.product_title}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        {item.product_upload_images && item.product_upload_images.length != 0 ? (
                          <View style={{ width: '39%', }}>

                            <Image
                              source={{
                                uri:
                                  `https://www.hidetrade.eu/app/UPLOAD_file/` +
                                  item.product_upload_images[0].images_name,
                              }}
                              style={{ width: 100, height: 95 }}
                              resizeMode='cover'
                            />
                          </View>
                        ) : (
                          <View style={{ width: '38%',padding:10 }}>

                            <Image source={require('../../assets/IconUpload3.png')} style={{ width: 120, height: 120 }} />
                          </View>
                        )}

                        <View style={{ flexShrink: 1 }}>
                          <View style={{}}>
                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Tannery Name: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.product_Sub_category_name} Tannery</Text></Text> */}
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Selection: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.Selected_Leathers == "Yes" ? `${item.selection}` : `Table Roll`} </Text></Text>
                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Product: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.product_title}</Text></Text> */}

                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Category: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.category} </Text></Text> */}
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%', }} numberOfLines={1}>
                              Category :{" "}
                              {item.product_categories?.map((values) => (
                                <Text allowFontScaling={false} style={{ fontWeight: 'normal' }} >{values.category} </Text>
                              ))}
                            </Text>


                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Sub-Category: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.Subcategory_Name} </Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Origin: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.originORcountryName}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%', }} numberOfLines={1}>
                              Conditions :{" "}
                              {item.product_Leaher_shape?.map((values) => (
                                <Text allowFontScaling={false} style={{ fontWeight: 'normal' }} >{values.title} </Text>
                              ))}
                            </Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%' }} numberOfLines={1}>
                              Tanning :{" "}
                              
                                <Text allowFontScaling={false} style={{ fontWeight: 'normal' }} >{item.tanningLeathers} </Text>
                              
                            </Text>

                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Substance: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.thiknessType}, {item.thinkessFrom}, {item.thinknessTo}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Wheigt category: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}> {item.weightCatType}-{item.weightCatType2} ({item.weightCatType3}) {item.weightSelectionSize}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Surface category: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}> {item.surfaceCatType}-{item.surfaceCatType2} ({item.surfaceCatType3}) {item.surfaceSelectionSize}</Text></Text>
                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Color: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.whichColor}</Text></Text> */}
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%',}} numberOfLines={1}>
                              Color :{" "}
                              {item.product_color?.map((values) => (
                                <Text allowFontScaling={false} style={{ fontWeight: 'normal' }} >{values.Color} </Text>
                              ))}
                            </Text>
                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Certificate: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.certificates}</Text></Text> */}

                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Inspection: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.inspection_possible}</Text></Text>

                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%' }} numberOfLines={1}>
                              Quantity :{" "}
                              <Text allowFontScaling={false} style={{ fontWeight: 'normal', marginLeft: 2 }}>
                                {item.Selected_Leathers == "Yes" ? `${item.selectionQuantity} ${item.selectionQuantityUnit}` : `${item.tableRollLeatherQty} ${item.tableRollLeatherQtySelection}`}
                              </Text>

                            </Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Specification: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.specification}</Text></Text>

                            <Text allowFontScaling={false} style={{ fontWeight: 'bold', width: '100%' }} numberOfLines={1}>
                              Price :{" "}
                              <Text allowFontScaling={false} style={{ fontWeight: 'normal', marginLeft: 2 }}>
                                {item.Selected_Leathers == "Yes" ? `${item.SelectionPrice} ${item.SelectionPriceUnit} / ${item.selectionQuantityUnit}` : `${item.tableRollLeatherPrice} ${item.tableRollLeatherPriceUnit ? item.tableRollLeatherPriceUnit : ''} / ${item.tableRollLeatherQtySelection}`}
                              </Text>
                            </Text>
                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Size: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.product_size}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Preservation: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.title}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Destination: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.Product_Destination}</Text></Text>

                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Trim: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.wannaSellLeather}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Flay: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.flayLeather}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Raw Defects: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.rawDefects}</Text></Text>

                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Kind of Hair: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.HaveLeatherType}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Hair Color: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.whichColor}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Packing: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.rawDefects}</Text></Text>
                            <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Shipment: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.rawDefects}</Text></Text> */}







                            {/* <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>Selection: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{item.selection}</Text></Text> */}

                          </View>
                        </View>
                      </View>
                      {/* <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          color: Colors.text,
                          fontWeight: "500",
                        }}allowFontScaling={false}
                      >
                        ${item.product_price}
                      </Text> */}
                    </TouchableOpacity>
                    <View style={{ borderWidth: 0.5, marginTop: 10, backgroundColor: "grey" }}></View>

                  </View>
                )}
              />
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text allowFontScaling={false} style={{ textAlignVertical: "center" }}>
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

export default ProductListBuyLeatherSearchProduct;
