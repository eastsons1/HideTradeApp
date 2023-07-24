import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,ActivityIndicator
} from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";

import Colors from "../../constants/Colors";
import ButtonComp from "../../components/ButtonComp";
import SpinView from "../../components/Spin";

const AgentsProfileFeedback = (props) => {
  const [profile, setProfile] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [id, setId] = useState(undefined);
  const [fId, setFId] = useState(undefined);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackTextPermission, setFeedbackTextPermission] = useState(0);
  const [response, setResponse] = useState(undefined);
  const [strCount, setStrCount] = useState(1);
  const [showButton, setShowButton]=useState(true)
  const [textShow, setTextShow]=useState(false)
  const [ifAccepted, setIfAccepted]=useState(false)

  const first_name = props.route.params.first_name;
  //console.log('user id='+first_name);

  const getDetails=async()=>{
    setId(await  AsyncStorage.getItem("user_id"));
  }
  
  useEffect(() => {
    if (dataLoad == false) {
      
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/SearchTanneries/SearchTanneries.php?first_name=${first_name}&user_type=Agents`;
      console.log("webapiurl=" + webApiUrl);
      axios.get(webApiUrl).then(async (res) => {
        console.log("abc");
        console.log("response=" + JSON.stringify(res.data.User_Details));
        setFId(res.data.User_Details[0].user_id);
        //setProfile(res.data.User_Details);
        console.log("response of profile=" + JSON.stringify(res.data));
        setProfile(res.data.User_Details);

        let webapiurl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
        const data = new FormData();
        data.append("user_id_who_got_ratings", fId);
        let responseFeedback = await fetch(webapiurl, {
          method: "post",
          body: data,
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        });
        let responseJSON = await responseFeedback.json();
        console.log("list of feedback=" + JSON.stringify(responseJSON));
        if (responseJSON.Status == true) {
          setResponse(responseJSON.Feedback_Details);
        } else {
          setResponse("");
        }

        // new edit 

        let webapi = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/CheckAcceptedRejectedRatingsFeedbackRequests.php`;
        console.log('id='+id+"fid="+fId)
        const dataAcceptOrReject = new FormData();
        dataAcceptOrReject.append("asked_by_rating_review_user1_id", id);
        dataAcceptOrReject.append("user_id_who_will_get_ratings", fId);
        let responseFeedbackRequest = await fetch(webapi, {
          method: "post",
          body: dataAcceptOrReject,
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        });
        let responseJSON1 = await responseFeedbackRequest.json();
        console.log('response in feedback after button press='+JSON.stringify(responseJSON1));

        if (
          responseJSON1.Permission ==
          "Permission for feedback has been given or Approved."
        ) {
          console.log("you may write your feedback");
          setFeedbackTextPermission(1);
        } else {
          setFeedbackTextPermission(0);
          // if (responseJSON1.Status == true) {
          //   Alert.alert("", responseJSON1.Message);
          // } else if(responseJSON1.Status==false){
          //   console.log("some problem occured="+responseJSON1.Message);
          //   setFeedbackTextPermission(0);
          // }
        }

        // new edit ends 

        setApiLoader(false);
        setDataLoaded(true);
      });
    }
  }, [id, fId, response, feedbackTextPermission]);

  const Feedback = async () => {
    console.log("inside feedback button");
    console.log("id=" + id + " fId=" + fId);
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/SendPermissionRequestReviewsRatings.php`;
    const data = new FormData();
    data.append("asked_by_rating_review_user1_id", id);
    data.append("to_rating_review_user2_id", fId);
    let res = await fetch(webApiUrl, {
      method: "post",
      body: data,
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
    });
    let responseJSON = await res.json();
    console.log('response in feedback after button press'+JSON.stringify(responseJSON));

    let webapiurl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/CheckAcceptedRejectedRatingsFeedbackRequests.php`;
    const dataAcceptOrReject = new FormData();
    dataAcceptOrReject.append("asked_by_rating_review_user1_id", id);
    dataAcceptOrReject.append("user_id_who_will_get_ratings", fId);
    let response = await fetch(webapiurl, {
      method: "post",
      body: dataAcceptOrReject,
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
    });
    let responseJSON1 = await response.json();
    //console.log('response in feedback after button press='+JSON.stringify(responseJSON1));

    if (
      responseJSON1.Permission ==
      "Permission for feedback has been given or Approved."
    ) {
      console.log("you may write your feedback");
      setFeedbackTextPermission(1);
    } else {
      if (responseJSON.Status == true) {
        if(responseJSON.Message=='Request for Rating and Review has been Sent Successfully.'){
          Alert.alert("", responseJSON.Message);
          setTextShow(true)
        }else {
          Alert.alert('',responseJSON.Message)
          setShowButton(false)
        }
      } else {
        console.log("some problem occured");
      }
    }
  };

  const onFeedbackEnter = async () => {
    if (feedbackText != "") {
      console.log("text feedback=" + feedbackText);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/SubmitFeedbackOrRatingsReviews.php`;
      const data = new FormData();
      data.append("logged_in_user_id", id);
      data.append("user_id_who_will_get_ratings", fId);
      data.append("ratingNumber", strCount);
      data.append("title", "Feedback");
      data.append("comments", feedbackText);
      console.log("data=" + JSON.stringify(data));
      let res = await fetch(webApirUrl, {
        method: "post",
        body: data,
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
        },
      });
      let responseJSON = await res.json();
      console.log(
        "response json of feedback text=" + JSON.stringify(responseJSON)
      );
      if (responseJSON.Status == true) {
        Alert.alert("", responseJSON.Message);
         
          let webapiurl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
          const data = new FormData();
          data.append("user_id_who_got_ratings", fId);
          let responseFeedback = await fetch(webapiurl, {
            method: "post",
            body: data,
            headers: {
              Accept: "*/*",
              "Content-Type": "multipart/form-data",
            },
          });
          let responseJSON = await responseFeedback.json();
          console.log("list of feedback=" + JSON.stringify(responseJSON));
          if (responseJSON.Status == true) {
            setResponse(responseJSON.Feedback_Details);
          } else {
            setResponse("");
          }

      } else if (responseJSON.Status == false) {
        Alert.alert("", responseJSON.Message);
        setIfAccepted(true)
        setFeedbackTextPermission(0)
      }
    } else {
      Alert.alert("", "Please enter feedback", [
        { text: "Ok", style: "cancel" },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {apiLoader ? (
        // <View style={styles.loader}>
        //   <Image
        //   source={require("../../assets/loader.jpg")}
        //   resizeMode="contain"
        //   resizeMethod="scale"
        //   style={{ width: 100, height: 100, marginBottom:10 }}
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
        <View style={{ marginHorizontal: 10, marginTop: 20, flex: 1 }}>
          <ScrollView>
            <View>
              {profile != undefined || profile != null ? (
                <View>
                  <Text style={styles.headingName}allowFontScaling={false}>
                    {profile[0].first_name} {profile[0].last_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",paddingLeft:10
                    }}
                  >
                    <View>
                      <Text style={{ marginTop: 20 }}allowFontScaling={false}>{profile[0].address}</Text>
                      <Text allowFontScaling={false}>{profile[0].Country}</Text>
                      <Text allowFontScaling={false}>{profile[0].mobile}</Text>
                      <Text allowFontScaling={false}>{profile[0].email}</Text>
                      <Text style={{color:'red'}} allowFontScaling={false}>{profile[0].HTTP}</Text>
                    </View>
                    {profile[0].profile_image.length > 0 ? (
                      <Image
                        source={{
                          uri:
                            `http://www.hidetrade.eu/app/UPLOAD_file/` +
                            profile[0].profile_image,
                        }}
                        resizeMode="contain"
                        style={{ width: 120, height: 120 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Johnny.png")}
                        style={{ width: 120, height: 120 }}
                      />
                    )}
                  </View>

                  <View style={{borderWidth:1, backgroundColor:'grey', width:'100%', marginTop:10, opacity:0.5}} />

                </View>
              ) : null}
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              {response != "" ? (
                response.map((value) => (
                  <View
                    style={{
                      borderRadius: 10,
                      padding: 10,marginVertical:10,
                      backgroundColor: "#B8D1D1", shadowOffset:{width:5, height:5}, shadowRadius:2, shadowOpacity:0.5, elevation:4
                    }}
                  >
                    {/* <Text style={{fontWeight:'bold', fontSize:18}} allowFontScaling={false}>{value.user_name_who_give_rating[0].first_name} {value.user_name_who_give_rating[0].last_name}</Text> */}
                    <View style={{ width: 40 }}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={value.ratingNumber}
                        animation='rotate'
                        //buttonStyle={{width:40, height:20}}
                        starSize={15}
                        //halfStarEnabled={true}
                      />
                    </View>
                    <Text style={{}} allowFontScaling={false}>{value.comments}</Text>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    //height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }} allowFontScaling={false}>
                    No Feedbacks Found
                  </Text>
                </View>
              )}
            </View>
            {feedbackTextPermission == 1 ? (
              <View>
                <View style={{borderWidth:1, backgroundColor:'grey', width:'100%', marginTop:10, opacity:0.5}} />
                <View style={{ width: 40 }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={strCount} starSize={25}animation='rotate'
                    //selectedStar={(rating) => onStarRatingPress(rating)}
                    selectedStar={(rating) => setStrCount(rating)}
                    //fullStarColor={Colors.buttonCompColor}
                    //halfStarEnabled={true}
                  />
                </View>
                <TextInput
                  mode="outlined"
                  value={feedbackText}
                  onChangeText={(value) => setFeedbackText(value)}allowFontScaling={false}maxFontSizeMultiplier={1}
                />
                <View style={{ marginVertical: 10, marginHorizontal: "20%" }}>
                  <ButtonComp title={"Submit"} onPress={onFeedbackEnter} />
                </View>
              </View>
            ) : null}
          </ScrollView>
          <View>
            {feedbackTextPermission!=1 && showButton!=false &&  ifAccepted==false ?<View style={{ marginVertical: 10, marginHorizontal: "20%" }}>
            <ButtonComp title={textShow==false?"Request for Feedback":"Feedback Request Sent"} onPress={() => Feedback()} />
            </View>:null}
          </View>
        </View>
      )}
      {/* <View style={{ marginHorizontal: 10 }}>
        <View style={{ marginVertical: 10, marginHorizontal: "20%" }}>
        {feedbackTextPermission==1 ?<ButtonComp title={"Request for Feedback"} onPress={() => Feedback()} />:<ButtonComp title={"Enter Feedback"} onPress={() => Feedback()} />}
          <ButtonComp title={"Request for Feedback"} onPress={() => Feedback()} />
        </View>
      </View> */}
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
  headingName: {
    color: Colors.headerBackground,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AgentsProfileFeedback;
