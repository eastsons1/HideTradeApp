import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const SearchTanneriesBuyLeather = (props) => {
  const [text, setText] = useState("");
  const [state, setState] = useState({ data: [], loading: false });
  const { data, loading } = state;
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  //   const fetchAPI = async () => {
  //     try {
  //           const response = await fetch(
  //               `https://www.hidetrade.eu/app/APIs/ViewUserTypeList/ViewUserTypeList.php?user_type=Tanneries`
  //           );
  //           const data = await response.json();
  //           console.log(data);
  //           setState({ data, loading: false });
  //       } catch (error) {
  //           console.log(error);
  //       }
  //   };

  useEffect( () => {
    //fetchAPI();
    if(dataLoad==false){
      setApiLoader(true)
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewUserTypeList/ViewUserTypeList.php?user_type=Tanneries`;
    axios
      .get(webApirUrl)
      .then((res) => {
        //console.log("data in search=" + JSON.stringify(res.data));
        const data = res.data;
        console.log('response in search tannery='+JSON.stringify(res.data))
        setState({ data, loading: false });
        setDataLoaded(true)
        setApiLoader(false)
      })
      .catch((err) => console.log(err));
    }
  }, []);

  const filterData = text
    // ? data.User_Type_List.filter((item) => {
      ? data.User_Details.filter((item) => {
        const itemData =
          item.first_name.toUpperCase() + " " + item.last_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    // : data.User_Type_List;
    :data.User_Details

  //console.log("data=" + JSON.stringify(data.User_Type_List));

  //console.log('state outside useEffect='+JSON.stringify(state))
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {apiLoader ? (
      <SpinView style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>
      ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <FlatList style={{marginTop:10}}
                data={filterData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>props.navigation.navigate('Tannery Profile',{user_id:item.user_id,first_name:item.first_name})}>
                    <View style={{ flexDirection: "row",marginTop: 10 }}>
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
                        {/* {item.Products_List!=0?
                          (<View>
                            <Text allowFontScaling={false} style={{ fontSize: 13 }}numberOfLines={1} ellipsizeMode='tail'>{item.Products_List[0].product_title.length!=0?item.Products_List[0].product_title:null}, {item.Products_List[1]!=undefined?item.Products_List[1].product_title:null}</Text>
                            <Text allowFontScaling={false} style={{ fontSize: 13 }}>{item.Products_List[0].product_categories.length!=0?item.Products_List[0].product_categories[0].category:null}, {item.Products_List[1]!=undefined?item.Products_List[1].product_categories[0].category:null}</Text>
                            <Text allowFontScaling={false} style={{ fontSize: 13 }}>{item.Products_List[0].product_sizes.length!=0?item.Products_List[0].product_sizes[0].product_size:null}</Text>
                          </View>
                          ):(
                          <View><Text>No Products Available</Text></View>)
                        } */}
                        {item.leather_condition.length!=0 && 
                          <View>
                            <Text allowFontScaling={false} style={{ fontSize: 13 }}>{item.leather_condition[0].Leather_Condition}, {item.leather_condition[1]!=undefined && item.leather_condition[1].Leather_Condition}</Text>
                          </View>
                        }
                        {item.kind_of_leather.length!=0 && 
                          <View>
                            <Text allowFontScaling={false} style={{ fontSize: 13 }}>{item.kind_of_leather[0].kind_of_leather_on_sell}, {item.kind_of_leather[1]!=undefined && item.kind_of_leather[1].kind_of_leather_on_sell}</Text>
                          </View>
                        }
                        {item.leather_condition.length==0 && item.kind_of_leather.length==0 && <Text>No data found</Text>}
                        {/* <Text allowFontScaling={false} style={{ fontSize: 13 }}>{item.mobile}</Text>
                        <Text allowFontScaling={false} style={{ fontSize: 13 }}>{item.email}</Text>
                        <Text allowFontScaling={false} style={{ fontSize: 13 }}>{item.address1}</Text> */}
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

export default SearchTanneriesBuyLeather;
