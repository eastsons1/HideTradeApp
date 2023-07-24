import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,ActivityIndicator
} from "react-native";
import axios from "axios";
// import * as Progress from "react-native-progress";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const ExpertListSearchExpert = (props) => {
  const windows = useWindowDimensions();

  var leather_conditions = props.route.params.leather_conditions;
  var kindOfLeatherType = props.route.params.kindOfLeatherType;
  var selectedCountry = props.route.params.selectedCountry;
  var selectedCity = props.route.params.selectedCity;
  var selectedContinent = props.route.params.selectedContinent;


  // console.log('leather condition='+leather_conditions)
  // console.log('tanningLeather='+tanningLeatherType);
  // console.log('kind of leather='+kindOfLeatherType);
  // console.log('selected country='+selectedCountry);
  // console.log('selected city='+selectedCity);

  // var array=[];
  // array=['a','b'];
  // console.log('array='+array);

  // for(let i=0;i<array.length;i++){
  //   console.log(i+"="+array[i])
  //   console.log('array='+array)
  // }

  // const arr2=leather_conditions.map(value=>({['LeatherConditionInterested']:value}));
  // console.log('array2='+JSON.stringify(arr2));
  // const arr3=tanningLeatherType.map(value=>({['xyz']:value}));
  // console.log('array3='+JSON.stringify(arr3));
  // const mixed=arr2.concat(arr3);
  // console.log('mixed='+JSON.stringify(mixed))

  // const sendArray=[{['LeatherConditionInterested']:'raw'}]
  // console.log('sendarray='+JSON.stringify(sendArray))

  var arr1 = leather_conditions.map((value) => ({
    ["leather_conditions"]: value,
  }));
  console.log("arr1=" + JSON.stringify(arr1));
  var arr2 = kindOfLeatherType.map((value) => ({ ["kind_of_leather"]: value }));
  console.log("kind of leather=" + JSON.stringify(arr2));
  var arr3 = [{ country: selectedCountry }, { city: selectedCity }, {continent:selectedContinent},];

  var final = arr1.concat(arr2, arr3);
  console.log("final=" + JSON.stringify(final));

  const [agentData, setAgentData] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/SearchExpertOrAgent/SearchExpertOrAgent.php`;
      //console.log('inside useEffect array='+JSON.stringify(arr2));
      axios.post(webApirUrl, final).then((res) => {
        setAgentData(res.data.Search_Expert_Details);
        console.log("response in expert list=" + JSON.stringify(res.data));
        setApiLoader(false);
        setDataLoaded(true);
      });
    }
  }, []);

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
        //     style={{ width: 100, height: 100, marginBottom:10 }}
        // /><ActivityIndicator size={"large"} color='red' />
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
        <View style={{ marginHorizontal: 10, marginTop: 5 }}>
          <Text allowFontScaling={false} style={styles.heading}>Experts</Text>
          {agentData != undefined ? (
            <FlatList
              data={agentData}
              keyExtractor={(item) => item.user_id} style={{marginBottom:40}}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Expert Profile", {
                        user_id: item.user_id,
                      })
                    }
                  >
                    <View style={{ flexDirection: "row" }}>
                      {item.profile_image == "" ? (
                        <Image
                          source={require("../../assets/Johnny.png")}
                          style={{ width: 100, height: 100 }}
                        />
                      ) : (
                        <Image
                          style={{ width: 100, height: 100, marginTop:10, borderRadius:10 }}
                          source={{
                            uri:
                              "https://www.hidetrade.eu/app/UPLOAD_file/" +
                              item.profile_image,
                          }}
                        />
                      )}
                      <View style={{ justifyContent: "center", marginLeft:10 }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            fontSize: 16,
                          }}allowFontScaling={false}
                        >
                          {item.first_name} {item.last_name}
                        </Text>
                        <Text allowFontScaling={false}>{item.Country}</Text>
                        <Text allowFontScaling={false}>{item.City}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{borderWidth:0.5,marginTop:10,backgroundColor:"grey"}}></View>

                  {/* <Progress.Bar
                    color="grey"
                    style={{ width: "100%", height: 1, marginTop: 10 }}
                    progress={1}
                  /> */}
                </View>
              )}
            />
          ) : (
            <View style={{}}>
              <Text
                style={{
                  textAlign: "center",
                  height: "100%",
                  paddingTop: 300,fontWeight:'bold', fontSize:20
                }}allowFontScaling={false}
              >
                No Search Result
              </Text>
            </View>
          )}
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
  heading: {
    color: Colors.text,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ExpertListSearchExpert;
