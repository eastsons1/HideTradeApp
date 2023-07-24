import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,ActivityIndicator
} from "react-native";
import axios from "axios";
import { Divider } from "react-native-paper";
import Checkbox from "expo-checkbox";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const IndividualProductBuyLeatherSearchProduct = (props) => {
  var product_id = props.route.params.product_id;
  console.log("product id=" + product_id);

  const [product, setProduct] = useState(undefined);
  const [inspection, setInspection] = useState(undefined);
  const [packingList, setPakingList] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webapiurl = `https://www.hidetrade.eu/app/APIs/ProductDataAPI/singleProductsFullDetailsLot.php?product_id=${product_id}`;
      axios.get(webapiurl).then((res) => {
      
        console.log("product response=" + JSON.stringify(res.data));
        setProduct(res.data.Product_Short_Details);
        console.log("dsjfnnsf=" + JSON.stringify(product));
        if (res.data.Status){
          
          product.map((value) => {
            if (value.inspection_possible != "Yes") {
              setInspection(false);
            } else {
              setInspection(true);
            }
          });
          
        }
       
        setDataLoaded(true);
        setApiLoader(false);
      });
    }
  }, [product, inspection]);

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
      <SpinView style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>
      ) : (
        <ScrollView>
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <View>
              <Text allowFontScaling={false} style={styles.headingName}>
                {product && product.map((value) => value.product_title)}
              </Text>
            </View>

            <Divider style={{ borderWidth: 0.25, marginVertical: 15 }} />

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{width:'70%'}}>
                  {product && product.map((value) => (
                    <View 
                    //style={{ alignItems: "center", flex: 1 }}
                    >
                      {/* <Text>Material:{value.product_title}</Text> */}
                      <Text  allowFontScaling={false}style={{fontWeight:'bold'}}>Selection: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.Selected_Leathers == "Yes" ? `${value.selection}`: `Table Roll`}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', width:'100%', marginVertical:5}} numberOfLines={1}>
                        Category:
                        {value.product_Leaher_shape?.map((values) => (
                          <Text allowFontScaling={false} style={{fontWeight:'normal'}} >{values.title} </Text>
                        ))}
                      </Text>
                      
                      <Text  allowFontScaling={false}style={{fontWeight:'bold',marginVertical:5}}>Sub-Category: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.sub_category_name}</Text></Text>

                      <Text allowFontScaling={false} style={{fontWeight:'bold', width:'100%',marginVertical:5}} numberOfLines={1}>
                        Origin:{" "}
                        {/* <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.Country_Name? value.Country_Name : value.continents} </Text>
                         */}
                        <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.Country_Name} </Text>

                      </Text>
                      <Text  allowFontScaling={false}style={{fontWeight:'bold'}}>Conditions: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_categories[0].category}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', width:'100%',marginVertical:5}} numberOfLines={1}>
                        Tanning:
                        {value.product_tanning_leathers?.map((values) => (
                          <Text allowFontScaling={false} style={{fontWeight:'normal',}} > {values.tanningLeathers} </Text>
                        ))}
                      </Text>
                      {/* <Text  allowFontScaling={false}style={{fontWeight:'bold',marginTop:10}}>Tanning: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{''}</Text></Text> */}
                      <Text allowFontScaling={false} style={{ fontWeight: 'bold' ,marginTop:5}}>Substance: <Text allowFontScaling={false} style={{ fontWeight: 'normal' }}>{value.thiknessType}, {value.thinkessFrom}, {value.thinknessTo}</Text></Text>

                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Wheight Category:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.weightCatType}-{value.weightCatType2} ({value.weightCatType3}) {value.weightSelectionSize}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Surface Category:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}> {value.surfaceCatType}-{value.surfaceCatType2} ({value.surfaceCatType3}) {value.surfaceSelectionSize}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}> Color:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_color?.map((values)=>(<Text>{values.Color}, </Text>))}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}> Inspection:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.inspection_possible}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Quantity:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.Selected_Leathers == "Yes" ? `${value.selectionQuantity} ${value.selectionQuantityUnit}`: `${value.tableRollLeatherQty} ${value.tableRollLeatherQtySelection}`}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Specifications:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.specification}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Price:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.Selected_Leathers == "Yes" ? `${value.SelectionPrice} ${value.SelectionPriceUnit} / ${value.selectionQuantityUnit}`: `${value.tableRollLeatherPrice} ${value.tableRollLeatherPriceUnit?value.tableRollLeatherPriceUnit: ''} / ${value.tableRollLeatherQtySelection}`}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', width:'100%'}} numberOfLines={1}>
                        Size:
                        {value.product_sizes?.map((values) => (
                          <Text allowFontScaling={false} style={{fontWeight:'normal'}}> {values.product_size} </Text>
                        ))}
                      </Text>
                     
                      {/* <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Raw Defects: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_rawdefects.map((values)=>(<Text>{values.rawDefects}, </Text>))} </Text></Text> */}
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Preservation:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_Preservation?.map((values)=>(<Text>{values.title} </Text>))}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Destinations:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.Product_Destination}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Trim:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_Trim_Type?.map((values)=>(<Text>{values.Trim_Type_leather} </Text>))}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Flay:{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_Flay_Type?.map((values)=>(<Text>{values.flayLeather}  </Text>))}</Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Raw Defects: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_rawdefects?.map((values)=>(<Text>{values.rawDefects} </Text>))} </Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Kind of hair: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_leather_type?.map((values)=>(<Text>{values.HaveLeatherType} </Text>))} </Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Hair color: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_color?.map((values)=>(<Text>{values.Color} </Text>))} </Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Packing: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_Packaging_data?.map((values)=>(<Text>{values.pakingArrange} </Text>))} </Text></Text>
                      <Text allowFontScaling={false} style={{fontWeight:'bold', marginVertical:5}}>Shipment: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_shipment_arrange?.map((values)=>(<Text>{values.shipmentArrange} </Text>))} </Text></Text>




                    </View>
                  ))}
                </View>
                <View>
                  {product && product.map((value) => (
                    <View>
                      {value.product_upload_images.length==0
                      // value.product_upload_images == null ||
                      // value.product_upload_images == undefined ||
                      // value.product_upload_images == "" ||
                      // value.product_upload_images == [] 
                      ? (
                        <Image source={require('../../assets/IconUpload3.png')} style={{width:120, height:120}}  />
                      ) : (
                        <Image
                          style={{ width: 120, height: 120, borderRadius: 8 }}
                          source={{
                            uri:
                              `http://www.hidetrade.eu/app/UPLOAD_file/` +
                              value.product_upload_images[0].images_name,
                          }}
                        />
                      )}
                      {/* <Text allowFontScaling={false} style={{ color: Colors.text, marginTop: 10 }}>
                        {value.Price}/leather
                      </Text> */}
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <Divider style={{ borderWidth: 0.5, marginVertical: 15 }} />

            <View style={{marginTop:10}}>
              <Text allowFontScaling={false} style={styles.document}>
                View Documents and Certificates
              </Text>

              <ScrollView
                contentContainerStyle={{
                  justifyContent: "space-around",
                  flex: 1,alignItems:'center'
                }}
                horizontal={true}
              >
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(
                        "Docs/Certificate ",
                        { product: product }
                      )
                    }
                  >
                    {/* <Image
                      source={require("../../assets/IconDocuments.png")}
                      style={{
                        width: 80,
                        height: 80,
                        marginTop: 10,
                        alignSelf: "center",
                      }}
                      resizeMode="contain"
                    /> */}
                     <Image
                    style={{ width: 80, height: 80, marginTop:10, alignSelf:'center' }}
                    source={require("../../assets/IconUpload6.png")}
                  />
                    <Text allowFontScaling={false} style={{textAlign:'center'}}>Docs/Certificates</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  {product?.map((value)=>(
                      <TouchableOpacity>
                    {/* <Image
                      source={require("../../assets/IconDocuments.png")}
                      style={{
                        width: 80,
                        height: 80,
                        marginTop: 10,
                        alignSelf: "center",
                      }}
                      resizeMode="contain"
                    /> */}<Image
                    style={{ width: 80, height: 80, marginTop:10, alignSelf:'center' }}
                    source={require("../../assets/ByClient/IconPakinglist.png")} resizeMode='contain'
                   />
                    {/* <Text allowFontScaling={false} style={{textAlign:'center'}}>Paking List</Text> */}
                    <Text allowFontScaling={false} style={{ }}>Packing :{" "} <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value.product_Packaging_data?.map((values)=>(<Text>{values.pakingArrange} </Text>))}</Text></Text>
                  </TouchableOpacity>
                    
                  ))}
                 
                </View>
              </ScrollView>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{ flex: 1 }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",
                    marginVertical: 240,
                    backgroundColor: "white",
                    marginHorizontal: 40,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => !setModalVisible(!modalVisible)}
                  >
                    <Text allowFontScaling={false}>Address Here(Press me to close)</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              <ScrollView
                contentContainerStyle={{
                  justifyContent: "space-around",
                  flex: 1,
                  marginTop: 25,alignItems:'center'
                }}
                horizontal={true}
              >
               <View>
                {product?.map((value) => (
                  <TouchableOpacity>
                  <Image
                      source={require("../../assets/IconDocuments.png")}
                      style={{
                        width: 80,
                        height: 80,
                        marginTop: 10,
                        alignSelf: "center",
                      }}
                      resizeMode="contain"
                    />
                    <Text allowFontScaling={false} style={{textAlign:'center'}}>where : {value.where_are_leathers_comp_address ? value.where_are_leathers_comp_address :value.where_are_leathers_other_address}</Text>
                  </TouchableOpacity>
                ))}
                </View>

                <View style={{ justifyContent: "flex-end" }}>
                  <TouchableOpacity>
                    {/* <Checkbox
                      style={{ width: 50, height: 50, alignSelf: "center" }}
                      //disabled={false}
                      value={inspection}
                      // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text>Where are the leathers</Text> */}
                     <View style={{ width: 60, height: 60, alignSelf: "center", borderColor: '#000', borderWidth: 1 ,}}>
                      {inspection ?
                        <Image source={require('../../assets/check.png')} style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}/>
                        :
                        <Image source={require('../../assets/cross.png')} style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}/>
                      }
                    </View>
                    <Text allowFontScaling={false} style={{textAlign:'center'}}>Inspection</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
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
  document: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.headerBackground,
    fontSize: 20,
    paddingBottom:20
  },
});

export default IndividualProductBuyLeatherSearchProduct;
