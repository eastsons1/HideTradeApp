import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,ActivityIndicator
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const AgentsListFeedback = (props) => {
  const [text, setText] = useState("");
  const [state, setState] = useState({ data: [], loading: false });
  const { data, loading } = state;

  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewUserTypeList/ViewUserTypeList.php?user_type=Agents`;
      axios
        .get(webApirUrl)
        .then((res) => {
          console.log("data in search=" + JSON.stringify(res.data));
          const data = res.data;
          setState({ data, loading: false });
          setApiLoader(false);
          setDataLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const filterData = text
    ? data.User_Details.filter((item) => {
        const itemData =
          item.first_name.toUpperCase() + " " + item.last_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : data.User_Details;

  //console.log("data=" + JSON.stringify(data.User_Type_List));

  //console.log('state outside useEffect='+JSON.stringify(state))
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
        <SpinView style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          />
          <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>
      ) : (
        <ScrollView>
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 10,
                color: Colors.text,
                fontWeight: "500",
                marginBottom: 10,
              }}allowFontScaling={false}
            >
              Which tanneries are you searching?
            </Text>
            {loading == false ? (
              <View>
                <TextInput
                  onChangeText={(text) => setText(text)}
                  value={text}
                  mode="outlined"
                  label={"Search"}
                  style={{ backgroundColor: "white", height: 50, fontSize: 16 }}
                  activeOutlineColor={Colors.buttonBackground}
                  right={<TextInput.Icon name="magnify" size={28} />}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
                <FlatList
                  data={filterData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("Agents Profile", {
                          first_name: item.first_name,
                        })
                      }
                    >
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        {item.profile_image.length > 0 ? (
                          <Image
                            source={{
                              uri:
                                `http://www.hidetrade.eu/app/UPLOAD_file/` +
                                item.profile_image,
                            }}
                            resizeMode="cover"
                            style={{
                              width: 70,
                              height: 70,
                              marginRight: 30,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../../assets/Johnny.png")}
                            style={{ width: 70, height: 70, marginRight: 30 }}
                          />
                        )}
                        <View>
                          <Text
                            style={{
                              //marginTop: 15,
                              color: "red",
                              fontWeight: "500",
                            }}allowFontScaling={false}
                          >
                            {item.first_name} {item.last_name}
                          </Text>
                          <Text style={{ fontSize: 13 }}allowFontScaling={false}>{item.mobile}</Text>
                          <Text style={{ fontSize: 13 }}allowFontScaling={false}>{item.email}</Text>
                          <Text style={{ fontSize: 13 }}allowFontScaling={false}>{item.address1}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : (
              <Text allowFontScaling={false}>Loading</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default AgentsListFeedback;
