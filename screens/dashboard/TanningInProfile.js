import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,Alert
} from "react-native";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";
import ButtonComp from "../../components/ButtonComp";

const TanningInProfile = (props) => {
  const [tanningLeather, setTanningLeather] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const finalCat = props.route.params.finalCat;
  const user_type = props.route.params.user_type;

  var tanningLeathers = selected.map((value) => ({
    ["tanningLeathers"]: value,
  }));

  const finalTanning = finalCat.concat(tanningLeathers);
  console.log("final tanning=" + JSON.stringify(finalTanning));

  const editProfile=async()=>{
    console.log('inside edit profile')
    console.log('inside final of tanning profile='+JSON.stringify(finalTanning))
    setApiLoader(true);
    let webApirUrl=`https://www.hidetrade.eu/app/APIs/UpdateProfile/UpdateProfile.php`;
    axios.post(webApirUrl, finalTanning).then((response)=>{
        console.log('response in tanning profile='+JSON.stringify(response.data))
        setApiLoader(false);
        Alert.alert('','User Profile Updated Successfully',[{text:'Ok', style:'cancel',onPress:()=>props.navigation.navigate('User Profile')}])
      }).catch((err)=>console.log('error='+JSON.stringify(err)))
  }

  const renderTanningLeather = ({ item, index }) => {
    const { id, title, image_name } = item;
    const isSelected = selected.filter((i) => i === title).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== title));
          } else {
            setSelected((prev) => [...prev, title]);
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
              "http://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/" +
              image_name,
          }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/ViewAllKindOfTanningLeatherForBuyList.php`;
      axios.get(webApiUrl).then((res) => {
        console.log("response in new screen=" + JSON.stringify(res.data));
        setTanningLeather(res.data);
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
              {user_type == "tanneries" ? (
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
                  What kind of tanning have leathers you want to sell?
                </Text>
              ) : (
                <Text style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginTop: 10,
                    color: Colors.text,
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}>What kind of tanning have leathers you want to sell?</Text>
              )}
              <View>
                {tanningLeather != undefined ? (
                  <View>
                    <FlatList
                      numColumns={3}
                      data={tanningLeather.Output}
                      renderItem={renderTanningLeather}
                      scrollEnabled={false}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>
          <View>
            {user_type=='Tanneries'?<View style={{ flexDirection: "row", marginBottom: 15 }}>
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
                  onPress={() => props.navigation.navigate("Size Page ",{user_type:user_type, finalTanning:finalTanning, })}
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
            </View>:<View style={{marginHorizontal:'10%', marginBottom:20}}><ButtonComp title={"Update"} onPress={editProfile} /></View>}
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
    //backgroundColor: Colors.inactiveState,
    borderRadius: 8,
    marginVertical: "0.4%",
    marginHorizontal: "0.4%",
    width: "32.5%",
    height: 120,
    //flex:1
  },
});

export default TanningInProfile;
