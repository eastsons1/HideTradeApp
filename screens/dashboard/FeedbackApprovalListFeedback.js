import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FeedbackApprovalListFeedback = (props) => {
  const [id, setId] = useState(undefined);
  const [fId, setFId] = useState(undefined);
  const [ok, setOk]=useState(0)

  const getDetails=async()=>{
    setId(await AsyncStorage.getItem("user_id"));
  }

  useEffect(() => {
    getDetails()
  }, [getDetails]);

  const onPressOk=async()=>{
    console.log('inside on press ok')
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsAcceptRequest.php`;
    const data=new FormData();
    data.append('asked_by_rating_review_user1_id','142')
    data.append('loggedIn_user_id',id)
    data.append('requestmsgPermission',1)
    let res=await fetch(webApiUrl,{
        method:"post",
        body:data,
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
        }, 
      });
      let responseJSON=await res.json();
      if(responseJSON.Status==true){
        console.log('true inside JSON')
        Alert.alert('',responseJSON.Message)
      } else {
        console.log('some problem occured')
      }
  }

  const onPressCancel=async()=>{
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsAcceptRequest.php`;
    const data=new FormData();
    data.append('asked_by_rating_review_user1_id','142')
    data.append('loggedIn_user_id',id)
    data.append('requestmsgPermission',0)
    let res=await fetch(webApiUrl,{
        method:"post",
        body:data,
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
        }, 
      });
      let responseJSON=await res.json();
      if(responseJSON.Status==true){
        Alert.alert('',responseJSON.Message)
      } else {
        console.log('some problem occured')
      }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("", "Do you want to accept feedback?", [
            { text: "Accept", style: "cancel", onPress:()=>onPressOk() },
            { text: "Reject", style: "cancel", onPress:()=>onPressCancel() }
          ]);
        }}
      >
        <Text allowFontScaling={false}>Feedback approval list</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackApprovalListFeedback;
