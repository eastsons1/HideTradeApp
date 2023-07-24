import React from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {Ionicons} from '@expo/vector-icons'

const DocsCertificateBuyLeatherSearchProduct = (props) => {
  var product = props.route.params.product;
  console.log("product=" + JSON.stringify(product));
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Text>Docs and certificates</Text> */}
      <ScrollView>
        {product.map((value) => (
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            {value.product_upload_documents == null ||
            value.product_upload_documents == undefined ||
            value.product_upload_documents == [] ||
            value.product_upload_documents == "" ? (
              <View style={{alignItems:'center'}}>
                <Text allowFontScaling={false} style={{fontSize:25 }}>No Documents Uploaded</Text>
              </View>
            ) : (
              value.product_upload_documents.map((abc) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      var url = `http://www.hidetrade.eu/app/UPLOAD_file/${abc.upload_document_name}`;
                      Linking.canOpenURL(url).then((supported) => {
                        if (supported) {
                          Linking.openURL(url);
                        } else {
                          console.log("Don't know how to open URI: " + url);
                        }
                      });
                    }}
                    style={{ flexDirection: "row" }}
                  >
                    <Ionicons name="document-outline" size={40} />
                    <Text allowFontScaling={false} style={{ alignSelf: "center" }}>
                      {/* http://www.hidetrade.eu/app/UPLOAD_file/ */}
                      {abc.upload_document_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DocsCertificateBuyLeatherSearchProduct;
