import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,ActivityIndicator, Alert
} from "react-native";
import axios from "axios";

import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";
import ButtonComp from "../../components/ButtonComp";
import SpinView from "../../components/Spin";

const IndividualExpertProfileSearchExpert = (props) => {
  var user_id = props.route.params.user_id;
  console.log("user id in expert=" + user_id);

  const [expertProfile, setExpertProfile] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [response, setResponse] = useState(undefined);
  const [strCount, setStrCount] = useState(1);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackTextPermission, setFeedbackTextPermission] = useState(0);
  const [id, setId]=useState(undefined)
  const [show, setShow]=useState(false)
  const [showButton, setShowButton]=useState(true)
  const [textShow, setTextShow]=useState(false)
  const [ifAccepted, setIfAccepted]=useState(false)

  const getDetails=async()=>{
    setId(await  AsyncStorage.getItem("user_id"));
  }
  
  useEffect(() => {
    if (dataLoad == false) {
      getDetails()
      setApiLoader(true);
      let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=Agents&user_id=${user_id}`;
      axios
        .get(webApirUrl)
        .then(async(res) => {
          console.log('response in expert profile='+JSON.stringify(res.data.User_Details))
          setExpertProfile(res.data.User_Details);

          let webapiurl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
          const data = new FormData();
          data.append("user_id_who_got_ratings", user_id);
          let responseFeedback = await fetch(webapiurl, {
            method: "post",
            body: data,
            headers: {
              Accept: "*/*",
              "Content-Type": "multipart/form-data",
            },
          });
          let responseJSON = await responseFeedback.json();
          console.log("list of feedback in expert profile=" + JSON.stringify(responseJSON));
          if (responseJSON.Status == true) {
            setResponse(responseJSON.Feedback_Details);
          } else {
            setResponse("");
          }

          setApiLoader(false);
          setDataLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user_id, id]);

  const Feedback = async () => {
    console.log("inside feedback button");
    console.log("id=" + id + " fId=" + user_id);
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/SendPermissionRequestReviewsRatings.php`;
    const data = new FormData();
    data.append("asked_by_rating_review_user1_id", id);
    data.append("to_rating_review_user2_id", user_id);
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
    dataAcceptOrReject.append("user_id_who_will_get_ratings", user_id);
    let response = await fetch(webapiurl, {
      method: "post",
      body: dataAcceptOrReject,
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
    });
    let responseJSON1 = await response.json();
    // console.log('response in feedback after button press='+JSON.stringify(responseJSON1));

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
      data.append("user_id_who_will_get_ratings", user_id);
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
        Alert.alert("", responseJSON.Message,[{text:'Ok', style:'cancel', onPress:()=>{
          setApiLoader(true)
          let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=Agents&user_id=${user_id}`;
          axios.get(webApirUrl).then(async(res)=>{
            let webapiurl=`https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
            const data = new FormData();
            data.append("user_id_who_got_ratings", user_id);
            let responseFeedback = await fetch(webapiurl, {
              method: "post",
              body: data,
              headers: {
                Accept: "*/*",
                "Content-Type": "multipart/form-data",
              },
            });
            let responseJSON = await responseFeedback.json();
            if (responseJSON.Status == true) {
              setResponse(responseJSON.Feedback_Details);
            } else {
              setResponse("");
            }
          }).catch((err) => console.log(err));
          setApiLoader(false)
        }}]);
      } 
      else if (responseJSON.Status == false) {
        setIfAccepted(true)
        setFeedbackTextPermission(0)
        Alert.alert("", responseJSON.Message);
      }
    } else {
      Alert.alert("", "Please enter feedback", [
        { text: "Ok", style: "cancel" },
      ]);
    }
  };

  console.log("expoert profile=" + JSON.stringify(expertProfile));

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
      //     source={require("../../assets/loader.jpg")}
      //     resizeMode="contain"
      //     resizeMethod="scale"
      //     style={{ width: 100, height: 100, marginBottom:10 }}
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
        <View style={{ marginHorizontal: 10, marginTop: 20, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {expertProfile != undefined || expertProfile != null ? (
                <View>
                  {expertProfile.map((value) => (
                    <View>
                      <Text allowFontScaling={false} style={styles.headingName}>
                        {value.first_name} {value.last_name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between", paddingLeft:10
                        }}
                      >
                        <View>
                          <Text allowFontScaling={false} style={{ marginTop: 20 }}>{value.address}</Text>
                          <Text allowFontScaling={false}>{value.Country}</Text>
                          <Text allowFontScaling={false}>{value.mobile}</Text>
                          <Text allowFontScaling={false}>{value.email}</Text>
                          <Text allowFontScaling={false}>{value.HTTP}</Text>
                        </View>
                        {value.profile_image.length > 0 ? (
                      <Image
                        source={{
                          uri:
                            `http://www.hidetrade.eu/app/UPLOAD_file/` +
                            value.profile_image,
                        }}
                        resizeMode="cover"
                        style={{ width: 110, height: 110, borderRadius:10 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Johnny.png")}
                        style={{ width: 120, height: 120 }}
                      />
                    )}
                      </View>

                      {/* <TouchableOpacity onPress={()=>props.navigation.navigate('Product List  ',{user_id: value.user_id})}
                      //   onPress={() =>
                      //     props.navigation.navigate(
                      //       "ProductsSearchTanneriesBuyLeather",
                      //       { user_id: profile.user_id }
                      //     )
                      //   }
                      >
                        <View>
                        <Text
                        style={{
                          fontSize: 18,
                          color: Colors.headerBackground,
                          fontWeight: "bold", textAlign:'center', marginTop:10
                        }}allowFontScaling={false}
                      >
                            Products
                          </Text>
                        </View>
                      </TouchableOpacity> */}

                  <View style={{borderWidth:0.5,marginTop:10,backgroundColor:"grey"}}></View>
                     

            <ScrollView style={{height:response!=""?140:30, }} nestedScrollEnabled={true}>
              <View style={{ marginHorizontal: 10, marginVertical: 10,  }}>
              {response != "" ? (
                response.map((value,index) => (
                  <View>{index==0 ? (<View
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
                        animation='shake'
                        //buttonStyle={{width:40, height:20}}
                        starSize={15}
                        //halfStarEnabled={true}
                      />
                    </View>
                    <Text style={{}} allowFontScaling={false}>{value.comments}</Text>
                  </View>):null}
                  </View>
                ))
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    
                    justifyContent: "center", alignSelf:'center', flex:1
                  }}
                >
                  <Text style={{ fontWeight: "bold", textAlignVertical:'center' }} allowFontScaling={false}>
                    No Feedbacks Found
                  </Text>
                </View>
              )}

              <View>
                {response!="" &&<Text style={{textAlign:'right', color:'red'}} onPress={()=>setShow(!show)}>{show!=true?'Show More':'Show Less'}</Text>}
                  
                {show==true &&
                response!=""?(
                  response.map((value, index)=>(
                    <View>{index!=0 ? (<View
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
                          animation='shake'
                          //buttonStyle={{width:40, height:20}}
                          starSize={15}
                          //halfStarEnabled={true}
                        />
                      </View>
                      <Text style={{}} allowFontScaling={false}>{value.comments}</Text>
                    </View>):null}
                    </View>
                  ))
                ):null}
              </View>

              
            </View></ScrollView>

            {feedbackTextPermission == 1 ? (
              <View>
                  <View style={{borderWidth:0.5,marginTop:10,backgroundColor:"grey"}}></View>
               
                <View style={{ width: "30%" }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={strCount}animation='rotate' starSize={25}
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

<View style={{borderWidth:0.5,marginTop:10,backgroundColor:"grey"}}></View>
           


                      <Text allowFontScaling={false} style={styles.subHeading}>Able to inspect</Text>
                      {value.leather_condition.length!=0 && (
                        <View style={{marginTop:10}}>
                          <Text allowFontScaling={false} style={styles.subSubHeading}>Leather's Condition</Text>
                          <FlatList
                              data={value.leather_condition}
                              numColumns={3}
                              renderItem={({ item }) => (
                                <View
                                  style={{
                                    alignItems: "center",
                                    flex: 1,
                                    marginTop: 10,
                                  }}
                                ><Image source={{uri:`http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/`+item.Leather_Condition_image}} style={{width:80, height:80}}/>
                                  {/* <Text allowFontScaling={false}>{item.Leather_Condition}</Text> */}
                                </View>
                              )}
                            />
                        </View>
                      )}

                      {value.kind_of_leather.length!=0 && (
                        <View style={{marginTop:20}}>
                        <Text allowFontScaling={false} style={styles.subSubHeading}>Kind Of Leather</Text>
                          <FlatList
                              data={value.kind_of_leather}
                              numColumns={3}
                              renderItem={({ item }) => (
                                <View
                                  style={{
                                    alignItems: "center",
                                    flex: 1,
                                    marginTop: 10,
                                  }}
                                ><Image source={{uri:`https://www.hidetrade.eu/app/UPLOAD_file/`+item.kind_of_leather_on_sell_image}} style={{width:80, height:80}} />
                                </View>
                              )}
                            />
                        </View>
                      )}

                      {value.tanningLeathers.length!=0 && (
                        <View style={{marginTop:20}}>
                          <Text allowFontScaling={false} style={styles.subSubHeading}>Tanning Leather</Text>
                          <FlatList
                              data={value.tanningLeathers}
                              numColumns={3}
                              renderItem={({ item }) => (
                                <View
                                  style={{
                                    alignItems: "center",
                                    flex: 1,
                                    marginTop: 10,
                                  }}
                                >
                                  <Image source={{uri:`http://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/`+item.Tanning_leathers_image}} style={{width:80, height:80}} />
                                </View>
                              )}
                            />
                        </View>
                      )}

                      {value.SizeLeathers.length!=0 && (
                        <View style={{marginTop:20}}>
                          <Text allowFontScaling={false} style={styles.subSubHeading}>Size Of Leather</Text>
                          <FlatList
                              data={value.SizeLeathers}
                              numColumns={3}
                              renderItem={({ item }) => (
                                <View style={{justifyContent:'space-evenly',flex:1, marginTop:10}}><View
                                  style={styles.item}
                                >
                                  <Text style={{
                                      color: "white",
                                      fontWeight: "600",textAlign:'center',
                                      fontSize: 18,textAlignVertical:'center'
                                    }}allowFontScaling={false}
                                  >
                                    {item.Select_Size}
                                  </Text>
                                </View></View>
                              )}
                            />
                        </View>
                      )}

                      {value.leather_condition.length==0 && value.kind_of_leather==0 && (
                        <View>
                          <Text style={{textAlign:'center'}}>No Data Available</Text>
                        </View>
                      )}


                      {/* {value.leather_condition != "" ? (
                        <View>
                          <View>
                            <FlatList
                              data={value.leather_condition}
                              numColumns={3}
                              renderItem={({ item }) => (
                                <View
                                  style={{
                                    alignItems: "center",
                                    flex: 1,
                                    marginTop: 10,
                                  }}
                                ><Image source={{uri:`http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/`+item.Leather_Condition_image}} style={{width:80, height:80}}/>
                                </View>
                              )}
                            />
                          </View>
                        </View>
                      ) : (
                        <View>
                        </View>
                      )} */}
  
                      {/* {value.kind_of_leather != "" ? (
                        <View>
                          <View>
                            <FlatList
                              data={value.kind_of_leather}
                              numColumns={3}
                              renderItem={({ item }) => (
                                <View
                                  style={{
                                    alignItems: "center",
                                    flex: 1,
                                    marginTop: 10,
                                  }}
                                ><Image source={{uri:`https://www.hidetrade.eu/app/UPLOAD_file/`+item.kind_of_leather_on_sell_image}} style={{width:80, height:80}} />
                                </View>
                              )}
                            />
                          </View>
                        </View>
                      ) : (
                        <View>
                          <Text allowFontScaling={false} style={{textAlign:'center', marginTop:10}}>No data available</Text>
                        </View>
                      )} */}

                    </View>
                  ))}
                </View>
              ) : null}
              
            </View>
          </ScrollView>
          <View>
          <View>
            {feedbackTextPermission!=1 && showButton!=false && ifAccepted==false ?<View style={{ marginVertical: 10, marginHorizontal: "20%" }}>
            <ButtonComp title={textShow==false?"Request for Feedback":"Feedback Request Sent"} onPress={() => Feedback()} />
            </View>:null}
          </View>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.goBack()}
            >
              
              <Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
            <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#9EBDB8" , }}
            >
              Back
            </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
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
    fontWeight: "500",
    textAlign: "center",
  },
  subHeading: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  headingName: {
    color: Colors.headerBackground,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subSubHeading:{fontSize: 14,fontWeight: "bold",textAlign: "center"},
  item:{
      alignItems: "center",
      justifyContent: "center",
      // borderWidth: 1,
      backgroundColor: Colors.inactiveState,
      borderRadius: 8,
      margin: 2,
      width: 80,
      height: 80,
      alignSelf:'center',
      flex:1, maxWidth:80
  }
});

export default IndividualExpertProfileSearchExpert;
