import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Alert, ActivityIndicator, TouchableOpacity
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpinView from "../../components/Spin";


const ApprovalListFeedback = (props) => {
  const [data, setData] = useState(undefined);
  // const [id, setId] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [textChange, setTextChange]=useState('')
  const [textChangeReject, setTextChangeReject]=useState('')
  const [accpted, setAccepted]=useState(false)
  const [reject, setRejected]=useState(false)
  const [trial, setTrial]=useState([{abc:false, id:0}])

  // setId(AsyncStorage.getItem("user_id"));

  const id=AsyncStorage.getItem("user_id");

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      // setId(AsyncStorage.getItem("user_id"));
      console.log('trial='+JSON.stringify(trial))
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/UsersListWhoSendReviewRatingsPermissions.php?user_id_who_get_request=${id}`;
      axios
        .get(webApiUrl)
        .then((res) => {
          setData(res.data.Users_List_Who_Send_Review_Ratings_Request);
          console.log('data inside axios='+JSON.stringify(res.data))
          setDataLoaded(true);
          setApiLoader(false);
        })
        .catch((err) => console.log(err));
    }
  });

  const approvalList=()=>{
    setApiLoader(true)
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/UsersListWhoSendReviewRatingsPermissions.php?user_id_who_get_request=${id}`;
    axios.get(webApiUrl).then((res) => {
        setData(res.data.Users_List_Who_Send_Review_Ratings_Request);
        console.log('data inside axios='+JSON.stringify(res.data))
        setApiLoader(false);
      }).catch((err) => console.log(err));
  }

  console.log('data in approval list='+JSON.stringify(data))

  const onPressOk=async(fId)=>{
    console.log('inside on press ok')
    console.log('f id in approval list='+fId)
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsAcceptRequest.php`;
    const data=new FormData();
    data.append('asked_by_rating_review_user1_id',fId)
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
      console.log('response in approval list='+JSON.stringify(responseJSON))
      if(responseJSON.Status==true){
        console.log('true inside JSON')
        Alert.alert('',responseJSON.User_Details_Wants_To_Give_Feedback[0].Permission,[{text:'Ok',onPress:()=>approvalList()}])
        if(responseJSON.User_Details_Wants_To_Give_Feedback[0].Permission=='Permission Granted'){
          setTextChange(fId)
          // setAccepted(true)
          // setRejected(false)
        }
      } else {
        console.log('some problem occured')
      }
  }

  const onPressCancel=async(fId)=>{
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsAcceptRequest.php`;
    const data=new FormData();
    data.append('asked_by_rating_review_user1_id',fId)
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
        Alert.alert('',responseJSON.User_Details_Wants_To_Give_Feedback[0].Permission,[{text:'Ok',onPress:()=>approvalList()}])
        setTextChangeReject(fId)
        // setRejected(true)
        // setAccepted(false)
      } else {
        console.log('some problem occured')
      }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {apiLoader ? (
      //   <View
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
      //   source={require("../../assets/loader.jpg")}
      //   resizeMode="contain"
      //   resizeMethod="scale"
      //   style={{ width: 100, height: 100, marginBottom:10 }}
      //   /><ActivityIndicator size={"large"} color='red' />
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
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          {data!=undefined?(<FlatList
            data={data}
            keyExtractor={(item) => item.user_id}
            renderItem={({ item }) => (
              <View><View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/Johnny.png")}
                  style={{ width: 100, height: 100 }}
                />
                <View>
                  <Text
                    style={{ color: "red", fontWeight: "500", marginTop: 10 }}allowFontScaling={false}
                  >
                    {item.first_name} {item.last_name}
                  </Text>

                  <Text allowFontScaling={false}>{item.mobile}</Text>
                  <Text allowFontScaling={false} style={{width:'80%'}} ellipsizeMode='tail' numberOfLines={1} >{item.email}</Text>
                  <Text allowFontScaling={false}>{item.City}</Text>
                </View>
                <View style={{marginTop: 10, flexDirection:'row', alignItems:'center', justifyContent:'flex-end', flex:1}}>
                  <TouchableOpacity onPress={()=>onPressOk(item.user_id)}><Text allowFontScaling={false} style={{color:'green'}}>{item.approved_permission==1?"Accepted / ":"Accept / "}</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>onPressCancel(item.user_id)}><Text allowFontScaling={false} style={{color:'red'}}>{item.approved_permission!=1?"Rejected":"Reject"}</Text></TouchableOpacity>
                </View>
              </View>
              </View>
            )}
          />):(<View style={{alignItems:'center', height:'100%', justifyContent:'center'}}><Text allowFontScaling={false} style={{fontWeight:'bold'}}>No Requests</Text></View>)}
        </View>
      )}
    </View>
  );
};

export default ApprovalListFeedback;
