import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SpinView from "../../components/Spin";

const ListFeedback = (props) => {
  const [id, setId] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [response, setResponse] = useState(undefined);

  const getDetails=async()=>{
    if (dataLoad == false) {
      setId(await AsyncStorage.getItem("user_id"));
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
      const data = new FormData();
      data.append("user_id_who_got_ratings", id);
      let res = await fetch(webApirUrl, {
        method: "post",
        body: data,
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
        },
      });
      let responseJSON = await res.json();
      console.log("list of feedback=" + JSON.stringify(responseJSON));
      if (responseJSON.Status == true) {
        setResponse(responseJSON.Feedback_Details);
        setDataLoaded(true);
        setApiLoader(false);
      } else {
        setResponse("");
        setDataLoaded(true);
        setApiLoader(false);
      }
    }
  }

  useEffect(() => {
    getDetails()
  }, [id, response, getDetails]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {apiLoader ? (
    //    <View
    //    style={{
    //      width: "100%",
    //      height: "100%",
    //      justifyContent: "center",
    //      alignItems: "center",
    //      backgroundColor: "#ffffff",
    //      opacity: 1,
    //      zIndex: 5,
    //    }}
    //  >
    //    <Image
    //      source={require("../../assets/loader.jpg")}
    //      resizeMode="contain"
    //      resizeMethod="scale"
    //      style={{ width: 100, height: 100, marginBottom:10 }}
    //     /><ActivityIndicator size={"large"} color='red' />
    //  </View>
    <SpinView style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>
      ) : (
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          {response != "" ? response.map((value)=> (
            <View>
              <Text allowFontScaling={false}>{value.userId}</Text>
              <Text allowFontScaling={false}>{value.comments}</Text>
            </View>
          )) : (
            <View style={{alignItems:'center', height:'100%', justifyContent:'center'}}>
              <Text allowFontScaling={false} style={{fontWeight:'bold'}}>No Details Found.</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ListFeedback;
