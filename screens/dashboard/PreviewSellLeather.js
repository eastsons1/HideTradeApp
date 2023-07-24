import React,{useState, useEffect} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image, Modal
} from "react-native";
import { Divider } from "react-native-paper";
import Checkbox from "expo-checkbox";

import Colors from "../../constants/Colors";

    const PreviewSellLeather = (props) => {

    const [inspection, setInspection] = useState(undefined);
    
    const [modalVisible, setModalVisible] = useState(false);

  var productName = props.route.params.productName;
  var category = props.route.params.category;
  var subCategory = props.route.params.subCategory;
  var size = props.route.params.size;
  var leatherCondition = props.route.params.leatherCondition;
  var tanningLeather = props.route.params.tanningLeather;
  var substanceThickness = props.route.params.substanceThickness;
  var fromValue = props.route.params.fromValue;
  var toValue = props.route.params.toValue;
  var destination = props.route.params.destination;
  var trim = props.route.params.trim;
  var flay = props.route.params.flay;
  var rawDefects = props.route.params.rawDefects;
  var hairLeather = props.route.params.hairLeather;
  var color = props.route.params.color;
  var certificate = props.route.params.certificate;
  var kindOfPacking = props.route.params.kindOfPacking;
  var kindOfShipment = props.route.params.kindOfShipment;
  var lastInfo = props.route.params.lastInfo;
  var goodsInspection = props.route.params.goodsInspection;
  var preservationType = props.route.params.preservationType;
  var images=props.route.params.images;
  var document=props.route.params.document;
  var documentLocation=props.route.params.documentLocation;
  var packingList=props.route.params.packingList;
  var continent=props.route.params.continents;
  var origin=props.route.params.origin;
  var Specification=props.route.params.Specification;

  var weightCatType = props.route.params.weightCatType;
  var weightCatType2 = props.route.params.weightCatType2;
  var weightCatType3 = props.route.params.weightCatType3;
  var weightSelectionSize = props.route.params.weightSelectionSize;
  var surfaceCatType = props.route.params.surfaceCatType;
  var surfaceCatType2 = props.route.params.surfaceCatType2;
  var surfaceCatType3 = props.route.params.surfaceCatType3;
  var surfaceSelectionSize = props.route.params.surfaceSelectionSize;

  var labelTableRoll = props.route.params.labelTableRoll;
  var quantityTableRoll = props.route.params.quantityTableRoll;
  var priceTableRoll = props.route.params.priceTableRoll;
  var labelTablePrice = props.route.params.labelTablePrice;

  var labelSelection = props.route.params.labelSelection;
  var quantitySelection = props.route.params.quantitySelection;
  var labelSelectionUnit = props.route.params.labelSelectionUnit;
  var priceSelection = props.route.params.priceSelection;
  var labelSelectionPrice = props.route.params.labelSelectionPrice;

  var labelSelection2 = props.route.params.labelSelection2;
  var quantitySelection2 = props.route.params.quantitySelection2;
  var labelSelectionUnit2 = props.route.params.labelSelectionUnit2;
  var priceSelection2 = props.route.params.priceSelection2;
  var labelSelectionPrice2 = props.route.params.labelSelectionPrice2;

  var labelSelection3 = props.route.params.labelSelection3;
  var quantitySelection3 = props.route.params.quantitySelection3;
  var labelSelectionUnit3 = props.route.params.labelSelectionUnit3;
  var priceSelection3 = props.route.params.priceSelection3;
  var labelSelectionPrice3 = props.route.params.labelSelectionPrice3;

  var labelSelection4 = props.route.params.labelSelection4;
  var quantitySelection4 = props.route.params.quantitySelection4;
  var labelSelectionUnit4 = props.route.params.labelSelectionUnit4;
  var priceSelection4 = props.route.params.priceSelection4;
  var labelSelectionPrice4 = props.route.params.labelSelectionPrice4;

  var labelSelection5 = props.route.params.labelSelection5;
  var quantitySelection5 = props.route.params.quantitySelection5;
  var labelSelectionUnit5 = props.route.params.labelSelectionUnit5;
  var priceSelection5 = props.route.params.priceSelection5;
  var labelSelectionPrice5 = props.route.params.labelSelectionPrice5;

  var labelSelection6 = props.route.params.labelSelection6;
  var quantitySelection6 = props.route.params.quantitySelection6;
  var labelSelectionUnit6 = props.route.params.labelSelectionUnit6;
  var priceSelection6 = props.route.params.priceSelection6;
  var labelSelectionPrice6 = props.route.params.labelSelectionPrice6;
  
  


  console.log("preservation=" + preservationType);
  console.log("tanning leather=" + tanningLeather);
  console.log("goods inspection="+goodsInspection);
  // console.log("images in preview="+images[0])
  // console.log('document='+document)

  console.log('document Location='+documentLocation)
  console.log('packing list preview='+packingList)

  useEffect(()=>{
    console.log("🚀 ~ file: PreviewSellLeather.js ~ line 61 ~ useEffect ~ props.route.params.address", props.route.params.address)
    if (goodsInspection != "Yes") {
      setInspection(false);
    } else {
      setInspection(true);
    }
  },[])


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 10, marginTop: 20 }}>
          <Text allowFontScaling={false} style={styles.headingName}>
            {productName} - {leatherCondition} Leather
          </Text>
          <Divider style={{ borderWidth: 0.25, marginVertical: 15 }} />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    
                    <Text allowFontScaling={false} style={{fontWeight:'bold'}}>Category: {category.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{value} </Text>))} </Text>
                    {/* <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>SubCategory: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{subCategory} </Text>))}</Text> */}

                    {/* <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>origin: {size.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{origin} </Text>))}</Text> */}
                    
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Size: {size.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{size} </Text>))}</Text>
                    {/* <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Origin: {size.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{origin} </Text>))}</Text> */}
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Conditions: <Text allowFontScaling={false} style={{fontWeight:'normal'}}>{leatherCondition}</Text></Text>
                    {preservationType == "" ||
                    preservationType == undefined ||
                    preservationType == null ? (
                        <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Tanning: {tanningLeather==undefined?(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>Not Selected</Text>):(<Text allowFontScaling={false}>{tanningLeather}</Text>)}</Text>
                    ) : (
                        <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Preservation: <Text allowFontScaling={false}style={{fontWeight:'normal'}}>{preservationType}</Text></Text>
                    )}
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Inspection: {goodsInspection==""?(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>Not Selected</Text>):(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{goodsInspection}</Text>)}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Destination: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{destination} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Trim: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{trim} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Flay: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{flay} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>RawDefects: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{rawDefects} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Color: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{color} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Specification: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{Specification} </Text>))}</Text>
                   
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>HairLeather: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{hairLeather} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>Certificate: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{certificate} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>lastInfo: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{lastInfo} </Text>))}</Text>
                    
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>KindOfPacking: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{kindOfPacking} </Text>))}</Text>
                    <Text allowFontScaling={false} style={{fontWeight:'bold',marginVertical:5}}>KindOfShipment: {subCategory.map((value)=>(<Text allowFontScaling={false} style={{fontWeight:'normal'}}>{kindOfShipment} </Text>))}</Text>

                </View>
                <View style={{}}>
                    {/* <Image
                        source={require("../../assets/IconDocuments.png")}
                        style={{ width: 120, height: 120 }}
                        resizeMode="contain"
                    /> */}
                    {images.length!=0?(<Image
                        source={{ uri: `data:image/png;base64,${images[0]}` }}
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 8,
                        }} resizeMode='contain'
                      />):<Image source={require('../../assets/IconUpload3.png')} style={{width:120, height:120}}  />}
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
                    onPress={()=>props.navigation.navigate('PreviewDocsCertificatesSellLeather',{
                      productName: productName,
                      category: category,
                      subCategory: subCategory,
                      size: size,
                      leatherCondition: leatherCondition,
                      preservationType: preservationType,
                      destination: destination,
                      trim: trim,
                      flay: flay,
                      rawDefects: rawDefects,
                      hairLeather: hairLeather,
                      color: color,
                      tanningLeather: tanningLeather,
                      substanceThickness: substanceThickness,
                      fromValue: fromValue,
                      toValue: toValue,
                      certificate: certificate,
                      kindOfPacking: kindOfPacking,
                      kindOfShipment: kindOfShipment,
                      lastInfo: lastInfo,
                      goodsInspection: goodsInspection,
                      tanningLeather: tanningLeather,
                      substanceThickness: substanceThickness,
                      fromValue: fromValue,
                      toValue: toValue,
                      origin:origin,
                      continent:continent,
                      Specification:Specification,
                      weightCatType: weightCatType,
                      weightCatType2: weightCatType2,
                      weightCatType3: weightCatType3,
                      weightSelectionSize: weightSelectionSize,

                      surfaceCatType: surfaceCatType,
                      surfaceCatType2: surfaceCatType2,
                      surfaceCatType3: surfaceCatType3,
                      surfaceSelectionSize: surfaceSelectionSize,

                      labelTableRoll: labelTableRoll,
                      quantityTableRoll: quantityTableRoll,
                      priceTableRoll: priceTableRoll,
                      labelTablePrice: labelTablePrice,

                      labelSelection: labelSelection,
                      quantitySelection: quantitySelection,
                      labelSelectionUnit: labelSelectionUnit,
                      labelSelectionPrice: labelSelectionPrice,
                      priceSelection: priceSelection,

                      labelSelection2: labelSelection2,
                      quantitySelection2: quantitySelection2,
                      labelSelectionUnit2: labelSelectionUnit2,
                      labelSelectionPrice2: labelSelectionPrice2,
                      priceSelection2: priceSelection2,

                      labelSelection3: labelSelection3,
                      quantitySelection3: quantitySelection3,
                      labelSelectionUnit3: labelSelectionUnit3,
                      labelSelectionPrice3: labelSelectionPrice3,
                      priceSelection3: priceSelection3,

                      labelSelection4: labelSelection4,
                      quantitySelection4: quantitySelection4,
                      labelSelectionUnit4: labelSelectionUnit4,
                      labelSelectionPrice4: labelSelectionPrice4,
                      priceSelection4: priceSelection4,

                      labelSelection5: labelSelection5,
                      quantitySelection5: quantitySelection5,
                      labelSelectionUnit5: labelSelectionUnit5,
                      labelSelectionPrice5: labelSelectionPrice5,
                      priceSelection5: priceSelection5,

                      labelSelection6: labelSelection6,
                      quantitySelection6: quantitySelection6,
                      labelSelectionUnit6: labelSelectionUnit6,
                      labelSelectionPrice6: labelSelectionPrice6,
                      priceSelection6: priceSelection6,
                      images: images,
                      // document:document
                      document: document,
                      documentLocation:documentLocation,
                      packingList:packingList
                    })}
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
                    <Text allowFontScaling={false}>Docs/Certificates</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity onPress={()=>props.navigation.navigate('PreviewPackingListSellLeather',{
                    productName: productName,
                    category: category,
                    subCategory: subCategory,
                    size: size,
                    leatherCondition: leatherCondition,
                    preservationType: preservationType,
                    destination: destination,
                    trim: trim,
                    flay: flay,
                    rawDefects: rawDefects,
                    hairLeather: hairLeather,
                    color: color,
                    tanningLeather: tanningLeather,
                    substanceThickness: substanceThickness,
                    fromValue: fromValue,
                    toValue: toValue,
                    certificate: certificate,
                    kindOfPacking: kindOfPacking,
                    kindOfShipment: kindOfShipment,
                    lastInfo: lastInfo,
                    goodsInspection: goodsInspection,
                    tanningLeather: tanningLeather,
                    substanceThickness: substanceThickness,
                    fromValue: fromValue,
                    toValue: toValue,
                    origin:origin,
                    continent:continent,
                    Specification:Specification,
                    weightCatType: weightCatType,
                    weightCatType2: weightCatType2,
                    weightCatType3: weightCatType3,
                    weightSelectionSize: weightSelectionSize,

                    surfaceCatType: surfaceCatType,
                    surfaceCatType2: surfaceCatType2,
                    surfaceCatType3: surfaceCatType3,
                    surfaceSelectionSize: surfaceSelectionSize,

                    labelTableRoll: labelTableRoll,
                    quantityTableRoll: quantityTableRoll,
                    priceTableRoll: priceTableRoll,
                    labelTablePrice: labelTablePrice,

                    labelSelection: labelSelection,
                    quantitySelection: quantitySelection,
                    labelSelectionUnit: labelSelectionUnit,
                    labelSelectionPrice: labelSelectionPrice,
                    priceSelection: priceSelection,

                    labelSelection2: labelSelection2,
                    quantitySelection2: quantitySelection2,
                    labelSelectionUnit2: labelSelectionUnit2,
                    labelSelectionPrice2: labelSelectionPrice2,
                    priceSelection2: priceSelection2,

                    labelSelection3: labelSelection3,
                    quantitySelection3: quantitySelection3,
                    labelSelectionUnit3: labelSelectionUnit3,
                    labelSelectionPrice3: labelSelectionPrice3,
                    priceSelection3: priceSelection3,

                    labelSelection4: labelSelection4,
                    quantitySelection4: quantitySelection4,
                    labelSelectionUnit4: labelSelectionUnit4,
                    labelSelectionPrice4: labelSelectionPrice4,
                    priceSelection4: priceSelection4,

                    labelSelection5: labelSelection5,
                    quantitySelection5: quantitySelection5,
                    labelSelectionUnit5: labelSelectionUnit5,
                    labelSelectionPrice5: labelSelectionPrice5,
                    priceSelection5: priceSelection5,

                    labelSelection6: labelSelection6,
                    quantitySelection6: quantitySelection6,
                    labelSelectionUnit6: labelSelectionUnit6,
                    labelSelectionPrice6: labelSelectionPrice6,
                    priceSelection6: priceSelection6,
                    images: images,
                    // document:document
                    document: document,
                    documentLocation:documentLocation,
                    packingList:packingList
                  })} >
                  <Image
                    style={{ width: 80, height: 80, marginTop:10, alignSelf:'center' }}
                    source={require("../../assets/ByClient/IconPakinglist.png")} resizeMode='contain'
                  />
                    <Text style={{textAlign:'center'}} allowFontScaling={false}>Paking List</Text>
                  </TouchableOpacity>
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
                   <Text allowFontScaling={false} style={{marginVertical:5}}>where : {props.route.params.address}</Text> 
                    
                    {/* <Text allowFontScaling={false} style={{textAlign:'center'}}>Where?</Text> */}
                  </TouchableOpacity>
                </View>

                <View style={{ justifyContent: "flex-end" }}>
                  <TouchableOpacity style={{marginLeft:20}}>
                    <View style={{ width: 60, height: 60, alignSelf: "center", borderColor: '#000', borderWidth: 1 ,}}>
                      {inspection ?
                        <Image source={require('../../assets/check.png')} style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}/>
                        :
                        <Image source={require('../../assets/cross.png')} style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}/>
                      }
                    </View>
                    {/* <Checkbox
                   
                      style={{ width: 50, height: 50, alignSelf: "center" }}
                      //value={goodsInspection}
                      // disabled={false}
                      value={inspection}
                      // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    /> */}
                    <Text allowFontScaling={false}>Inspection</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            <Divider style={{ borderWidth: 0.5, marginVertical: 15 }} />


        </View>
      </ScrollView>

      <View>
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
          {/* <View
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
            >
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  color: Colors.text,
                }}
              >
                Next
              </Text>
              <Icon
                name="chevron-forward-outline"
                size={30}
                color={Colors.text}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default PreviewSellLeather;
