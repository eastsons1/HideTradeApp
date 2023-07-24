import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
//import * as ImagePicker from "expo-image-picker";
import {Ionicons} from '@expo/vector-icons'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as DocumentPicker from 'react-native-document-picker';
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

import Colors from "../../constants/Colors";

const PreviewDocsCertificatesSellLeather = (props) => {
  const [document, setDocument] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [fileResponse, setFileResponse] = useState([]);

  let fileBase64;

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    console.log("uploaded?" + result.uri);

    if ((result.type = "success")) {
      setDocument((value) => [...value, result.uri]);
      console.log("uploaded?" + result.uri);
      //setDocuments((value) => [...value, result]);
      fileBase64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });
      setDocuments((value) => [...value, fileBase64]);
      console.log('document new='+document)
      // console.log("filebase 64=" + fileBase64);
      // uploadDocument({ uri: fileBase64 });.
    }

    //console.log(result);
  };

  // console.log("documents=" + documents); 

  // const uploadDocument = async (fileBase64) => {
  //   // var document64Param = `${fileBase64.uri}`;
  //   var document64Param = fileBase64.uri;
  //   console.log("document 64 param=" + document64Param);
  //   let webApiUrl = `https://www.hidetrade.eu/app/APIs/AddProduct/AddProductMultiImages.php`;
  //   let object = [{ product_id: "0" }, { pdocument: document64Param }];
  //   console.log("insisde upload document=" + JSON.stringify(object));

  //   axios
  //     .post(webApiUrl, object)
  //     .then((res) => {
  //       console.log("response of document=" + JSON.stringify(res.data));
  //     })
  //     .catch((err) => {
  //       console.log("error in document=" + err);
  //     });
  // };

  useEffect( () => {
    document;
    //setImage(image)
    //AsyncStorage.setItem("image",image);
    // console.log("inside useffect=" + JSON.stringify(documents));
  }, [document, documents]);

  console.log("document=" + document.length);

  // const download=async()=>{
  //   FileSystem.downloadAsync(
  //   'http://techslides.com/demos/sample-videos/small.mp4',
  //   FileSystem.documentDirectory + 'small.mp4'
  // )
  //   .then(({ uri }) => {
  //     console.log('Finished downloading to ', uri);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });}

  //const [image, setImage] = useState(null);

  // const handleDocumentSelection = useCallback(async () => {
  //   try {
  //     const response = await DocumentPicker.getDocumentAsync({
  //       //presentationStyle: 'fullScreen',
  //       type:'*/*',
  //     });
  //     setFileResponse(response);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }, []);

  //   const uploadImage = async (base64String) => {
  //     //var image64Param=`data:image/jpg;base64,${base64String.uri}`;
  //     var image64Param = `${base64String.uri}`;
  //     let webApiUrl = `https://www.hidetrade.eu/app/APIs/AddProduct/AddProductMultiImages.php`;
  //     let object = [{ product_id: "0" }, { pimage: image64Param }];
  //     //console.log('object='+JSON.stringify(object))

  //     axios
  //       .post(webApiUrl, object)
  //       .then((res) => {
  //         console.log("response of picture=" + JSON.stringify(res.data));
  //       })
  //       .catch((err) => console.log(err));
  //   };

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
//   var document=props.route.params.document;
  var documentLocation=props.route.params.documentLocation;
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
  
  var d = props.route.params.document;
  var documentLocation=props.route.params.documentLocation;

  console.log(documentLocation)


  console.log("d=" + d.length);

  console.log("certificate in document=" + certificate);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 10 }}>
          {/* <TouchableOpacity
            //onPress={download}
            // onPress={pickDocument}
            //onPress={handleDocumentSelection}
          >
            <Text
              style={{
                color: Colors.text,
                fontSize: 20,
                textAlign: "center",
                marginTop: 20,
                fontWeight: "500",
              }}allowFontScaling={false}
            >
              Upload documents
            </Text>
          </TouchableOpacity> */}

          {certificate.length != 0 ? (
            certificate.map((value, index) => (
              <View style={{ marginTop: 10 }}>
                {/* <TouchableOpacity 
                > */}
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="document-outline" size={60} />
                    <Text allowFontScaling={false} style={{ alignSelf: "center" }}>{value}</Text>
                    {documents[index] ? (
                      <Text
                        style={{
                          alignSelf: "center",
                          textAlign: "right",
                          flex: 1,
                          marginRight: 20,
                          fontWeight: "bold",
                          color: "red",
                        }}allowFontScaling={false}
                      >
                        Uploaded
                      </Text>
                    ) : null}
                  </View>
                {/* </TouchableOpacity> */}
              </View>
            ))
          ) : d.length != 0 ? (
            <FlatList
              data={d}
              renderItem={({ item }) => (
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Image
                    source={{ uri: `data:image/png;base64,${item}` }}
                    style={{
                      width: 150,
                      height: 150,
                      marginTop: 10,
                      borderRadius: 8,
                    }}
                  />
                  <Text allowFontScaling={false}>Uploaded</Text>
                </View>
              )}
            />
          ) : (<View><Text allowFontScaling={false}>No Certificates Selected</Text></View>)}

        {/* <PDFReader source={{ uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540beelogical%252Fhidetrade/DocumentPicker/2429ec4d-b7db-41a2-b19f-76fdab50eddf.png' }} /> */}

          {/* {document != undefined ||
          document != null ||
          document != [] ||
          document != ""
            ? document.map((value) => (
                <View style={{ flexDirection: "row", justifyContent:'center'}}>
                  <Icon name="document-outline" size={80} />
                  <Text
                    style={{ marginTop: 20, width:'70%', alignSelf:'center', fontSize:16 }}
                    numberOfLines={1}
                    ellipsizeMode="head"
                  >
                    {value}
                  </Text>
                </View>
              ))
            : null} */}
            
        </View>

      </ScrollView>
      {/* <View>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              props.navigation.navigate("Preview", {
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
                document: documents,
                documentLocation:documentLocation,
              })
            }
          >
            <Icon name="chevron-back-outline" size={30} color={Colors.text} />
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
      </View> */}
    </View>
  );
};

export default PreviewDocsCertificatesSellLeather;
