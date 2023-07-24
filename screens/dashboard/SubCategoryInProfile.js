import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import ButtonComp from "../../components/ButtonComp";
import SpinView from "../../components/Spin";

const SubCategoryInProfile = (props) => {
  const [subCategory, setSubCategory] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const windows = useWindowDimensions();

  const user_type = props.route.params.user_type;
  const final = props.route.params.final;
  console.log("user type in sub category=" + user_type);

  var sub_category=selected.map((value)=>({['sub_category']:value}))

  const finalSub=final.concat(sub_category)

  // console.log('final sub='+JSON.stringify(finalSub))



  // const productCategory = props.route.params.pcategory;
  // const final=props.route.params.final;
  // console.log('final in sub cateory='+JSON.stringify(final))
  // console.log("p category=" + productCategory);

  // var pcategory=productCategory.map((value)=>({['pcategory']:value}))
  //   var sub_category=selected.map((value)=>({['sub_category']:value}))
  // console.log('selected='+selected);
  // console.log('sub category='+JSON.stringify(sub_category));

  // const finalsFinal=final.concat(pcategory, sub_category);
  // console.log('final after concat='+JSON.stringify(finalsFinal))

  // const editProfile = useCallback(async () => {
  //   let webApirUrl = `https://www.hidetrade.eu/app/APIs/UpdateProfile/UpdateProfile.php`;
  //   axios.post(webApirUrl, finalsFinal).then((res) => {
  //     console.log("updated? =" + JSON.stringify(res.data));
  //     Alert.alert("", res.data.message, [{ text: "Ok", style: "cancel" }]);
  //   });
  // }, [
  //   finalsFinal
  // ]);

  //let final = [];

  const renderSubCategory = ({ item, index }) => {
    const { brand_id, brand_title, image_name } = item;
    const isSelected = selected.filter((i) => i === brand_title).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== brand_title));
          } else {
            setSelected((prev) => [...prev, brand_title]);
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
              "https://www.hidetrade.eu/app/UPLOAD_file/" +
              image_name,
          }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/SubcategoryDataAPI/RestController.php?view=all`;
      axios.get(webApiUrl).then((res) => {
        setSubCategory(res.data);
        setApiLoader(false);
        setDataloaded(true);
      });
    }
  }, []);

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
            <View style={{ marginHorizontal: 10 }}>
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
                  What kind of leather you would like to sell?
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
                allowFontScaling={false}>What kind of leathers you are able to inspect?</Text>
              )}
              {subCategory != undefined ? (
                <View>
                  <FlatList
                    numColumns={3}
                    data={subCategory.output}
                    renderItem={renderSubCategory}
                    scrollEnabled={false}
                  />
                </View>
              ) : null}
            </View>
          </ScrollView>
          {/* footer starts */}
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
                  onPress={() => props.navigation.navigate("Category ",{finalSub:finalSub, user_type:user_type})}
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
        // footer ends
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

export default SubCategoryInProfile;
