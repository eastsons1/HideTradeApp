import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from "axios";

import ButtonComp from '../../components/ButtonComp'
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const TanneriesProfileSearchTanneriesBuyLeather = (props) => {
  const [profile, setProfile] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [response, setResponse] = useState(undefined);
  const [strCount, setStrCount] = useState(1);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackTextPermission, setFeedbackTextPermission] = useState(0);
  const [id, setId] = useState(undefined);
  const [show, setShow] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [textShow, setTextShow] = useState(false)
  const [ifAccepted, setIfAccepted] = useState(false)
  const [userType, setUserType] = useState('')

  var user_id = props.route.params.user_id;

  const first_name = props.route.params.first_name;
  //console.log('user id='+first_name);

  const getDetails=async()=>{
    setUserType(await AsyncStorage.getItem('user_type'))
    setId(await AsyncStorage.getItem("user_id"));
  }

  useEffect(() => {
    getDetails()
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/SearchTanneries/SearchTanneries.php?first_name=${first_name}&user_type=Tanneries`;
      console.log('webapiurl=' + webApiUrl)
      axios.get(webApiUrl).then(async (res) => {
        console.log("abc");
        // console.log('response='+JSON.stringify(res.data.Output));
        console.log('response=' + JSON.stringify(res.data.User_Details));
        //setProfile(res.data.User_Details);
        console.log("response of profile=" + JSON.stringify(res.data.User_Details));
        // setProfile(res.data.Output);
        setProfile(res.data.User_Details);

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
        console.log("list of feedback in tannery profile=" + JSON.stringify(responseJSON));
        if (responseJSON.Status == true) {
          setResponse(responseJSON.Feedback_Details);
        } else {
          setResponse("");
        }


        setApiLoader(false);
        setDataLoaded(true);
      }).catch((err) => console.log(err));
    }
  }, [getDetails]);

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
    //console.log('response in feedback after button press'+JSON.stringify(responseJSON));

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
    //console.log('response in feedback after button press='+JSON.stringify(responseJSON1));

    if (
      responseJSON1.Permission ==
      "Permission for feedback has been given or Approved."
    ) {
      console.log("you may write your feedback");
      setFeedbackTextPermission(1);
    } else {
      if (responseJSON.Status == true) {
        if (responseJSON.Message == 'Request for Rating and Review has been Sent Successfully.') {
          Alert.alert("", responseJSON.Message);
          setTextShow(true)
        } else {
          Alert.alert('', responseJSON.Message)
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
        Alert.alert("", responseJSON.Message, [{
          text: 'Ok', style: 'cancel', onPress: () => {
            setApiLoader(true)
            let webApiUrl = `https://www.hidetrade.eu/app/APIs/SearchTanneries/SearchTanneries.php?first_name=${first_name}&user_type=Tanneries`;
            console.log('webapiurl=' + webApiUrl)
            axios.get(webApiUrl).then(async (res) => {
              console.log("abc");
              // console.log('response='+JSON.stringify(res.data.Output));
              //setProfile(res.data.User_Details);
              console.log("response of profile=" + JSON.stringify(res.data.User_Details));
              setProfile(res.data.User_Details)
              // setProfile(res.data.Output);

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
              console.log("list of feedback in tannery profile=" + JSON.stringify(responseJSON));
              if (responseJSON.Status == true) {
                setResponse(responseJSON.Feedback_Details);
              } else {
                setResponse("");
              }
            }).catch((err) => console.log(err));
            setApiLoader(false)
          }


        }]);
      } else if (responseJSON.Status == false) {
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

  // console.log("expoert profile=" + JSON.stringify(expertProfile));

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
        <SpinView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{ fontWeight: 'bold', marginTop: 10 }}>Loading...</Text>
        </SpinView>
      ) : (
        <View style={{ marginHorizontal: 10, marginTop: 20, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {profile != undefined || profile != null ? (
                <View>
                  <Text allowFontScaling={false} style={styles.headingName}>
                    {profile[0].first_name} {profile[0].last_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between", paddingLeft: 10
                    }}
                  >
                    <View>
                      <Text allowFontScaling={false} style={{ marginTop: 20 }}>{profile[0].address}</Text>
                      <Text allowFontScaling={false}>{profile[0].Country}</Text>
                      <Text allowFontScaling={false}>{profile[0].mobile}</Text>
                      <Text allowFontScaling={false}>{profile[0].email}</Text>
                      <Text allowFontScaling={false} style={{ color: 'red' }}>{profile[0].HTTP}</Text>
                    </View>
                    {profile[0].profile_image.length > 0 ? (
                      <Image
                        source={{
                          uri:
                            `http://www.hidetrade.eu/app/UPLOAD_file/` +
                            profile[0].profile_image,
                        }}
                        resizeMode="cover"
                        style={{ width: 110, height: 110, borderRadius: 10 }}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/Johnny.png")}
                        style={{ width: 120, height: 120 }}
                      />
                    )}
                    {/* <Image
                      source={{
                        uri:
                          `http://www.hidetrade.eu/app/UPLOAD_file/` +
                          profile.profile_image,
                      }}
                      resizeMode="contain"
                      style={{ width: 120, height: 120 }}
                    /> */}
                  </View>

                  {/* <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(
                        "Products",
                        { user_id: profile.user_id }
                      )
                    }
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
                    {userType != 'Agents' &&
                  <View style={{ height: 50, width: "65%", marginTop: 10, flexDirection: 'row',marginLeft:10 }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("Products", { user_id: profile[0].user_id })}
                      activeOpacity={0.5}
                      style={{ height: 50, width: "50%", backgroundColor: "#018786", justifyContent: 'center', borderRadius: 3 }}>
                      <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center', fontWeight: '500' }}>
                        Products
                      </Text>
                    </TouchableOpacity>
                  </View>
                   }

                  <View style={{ borderWidth: 0.5, marginTop: 10, backgroundColor: "grey" }}></View>


                  <ScrollView style={{ height: response != "" ? 140 : 30 }} nestedScrollEnabled={true}><View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    {response != "" ? (
                      response.map((value, index) => (
                        <View>{index == 0 ? (<View
                          style={{
                            borderRadius: 10,
                            padding: 10, marginVertical: 10,
                            backgroundColor: "#B8D1D1", shadowOffset: { width: 5, height: 5 }, shadowRadius: 2, shadowOpacity: 0.5, elevation: 4
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
                        </View>) : null}
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

                    <View>
                      {response != "" && <Text style={{ textAlign: 'right', color: 'red' }} onPress={() => setShow(!show)}>{show != true ? 'Show More' : 'Show Less'}</Text>}

                      {show == true &&
                        response != "" ? (
                        response.map((value, index) => (
                          <View>{index != 0 ? (<View
                            style={{
                              borderRadius: 10,
                              padding: 10, marginVertical: 10,
                              backgroundColor: "#B8D1D1", shadowOffset: { width: 5, height: 5 }, shadowRadius: 2, shadowOpacity: 0.5, elevation: 4
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
                          </View>) : null}
                          </View>
                        ))
                      ) : null}
                    </View>


                  </View>
                  </ScrollView>
                  {feedbackTextPermission == 1 ? (
                    <View>
                      <View style={{ borderWidth: 0.5, marginTop: 10, backgroundColor: "grey" }}></View>

                      <View style={{ width: 40 }}>
                        <StarRating
                          disabled={false}
                          maxStars={5} animation='rotate'
                          rating={strCount} starSize={25}
                          //selectedStar={(rating) => onStarRatingPress(rating)}
                          selectedStar={(rating) => setStrCount(rating)}
                        //fullStarColor={Colors.buttonCompColor}
                        //halfStarEnabled={true}
                        />
                      </View>
                      <TextInput
                        mode="outlined"
                        value={feedbackText}
                        onChangeText={(value) => setFeedbackText(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                      />
                      <View style={{ marginVertical: 10, marginHorizontal: "20%" }}>
                        <ButtonComp title={"Submit"} onPress={onFeedbackEnter} />
                      </View>
                    </View>
                  ) : null}
                  <View style={{ borderWidth: 0.5, marginTop: 10, backgroundColor: "grey" }}></View>


                  {/* {profile[0].Tanneries_Leather_Condition != "" ? ( */}
                  {/* {profile[0].leather_condition.length != 0 ? (
                    <View>
                      <Text allowFontScaling={false} style={styles.subHeading}>
                        Leather's condition on sell
                      </Text>
                      <View>
                        <FlatList
                          data={profile[0].leather_condition}
                          numColumns={3}
                          renderItem={({ item }) => (
                            <View
                              style={{
                                alignItems: "center",
                                flex: 1,
                                marginTop: 10,
                              }}
                            >
                              <Image source={{uri:`http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/`+item.Leather_Condition_image}} style={{width:80, height:80}} />
                              <Text allowFontScaling={false}>{item.Leather_Condition}</Text>
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Text allowFontScaling={false} style={styles.subHeading}>
                        Leather's condition on sell
                      </Text>
                      <Text allowFontScaling={false} style={{textAlign:'center', marginTop:10}}>No data available</Text>
                    </View>
                  )} */}


                  {/* 
                  {
                    (profile[0].kind_of_leather.length!= 0 ? (
                      <View>
                        <Text allowFontScaling={false} style={styles.subHeading}>
                          Kind of leathers on sell
                        </Text>
                        <View>
                          <FlatList
                            data={profile[0].kind_of_leather}
                            numColumns={3}
                            renderItem={({ item }) => (
                              <View
                                style={{
                                  alignItems: "center",
                                  flex: 1,
                                  marginTop: 10,
                                }}
                              >
                                <Image source={{uri:`https://www.hidetrade.eu/app/UPLOAD_file/`+item.kind_of_leather_on_sell_image}} style={{width:80, height:80}} />
                                <Text allowFontScaling={false}>{item.kind_of_leather_on_sell}</Text>
                              </View>
                            )}
                          />
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Text allowFontScaling={false} style={styles.subHeading}>
                          Kind of leathers on sell
                        </Text>
                        <Text allowFontScaling={false} style={{textAlign:'center', marginTop:10}}>No data available</Text>
                      </View>
                    ))
                  } */}

                  <Text allowFontScaling={false} style={styles.subHeading}>Leathers we deal with</Text>
                  {profile[0].leather_condition.length != 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text allowFontScaling={false} style={styles.subSubHeading}>Leather's Condition</Text>
                      <FlatList
                        data={profile[0].leather_condition}
                        numColumns={3}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              alignItems: "center",
                              flex: 1,
                              marginTop: 10,
                            }}
                          ><Image source={{ uri: `http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/` + item.Leather_Condition_image }} style={{ width: 80, height: 80 }} />
                          </View>
                        )}
                      />
                    </View>
                  )}

                  {profile[0].kind_of_leather.length != 0 && (
                    <View style={{ marginTop: 20 }}>
                      <Text allowFontScaling={false} style={styles.subSubHeading}>Kind Of Leather</Text>
                      <FlatList
                        data={profile[0].kind_of_leather}
                        numColumns={3}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              alignItems: "center",
                              flex: 1,
                              marginTop: 10,
                            }}
                          ><Image source={{ uri: `https://www.hidetrade.eu/app/UPLOAD_file/` + item.kind_of_leather_on_sell_image }} style={{ width: 80, height: 80 }} />
                          </View>
                        )}
                      />
                    </View>
                  )}

                  {profile[0].Tanning_Leathers_array.length != 0 && (
                    <View style={{ marginTop: 20 }}>
                      <Text allowFontScaling={false} style={styles.subSubHeading}>Tanning Leather</Text>
                      <FlatList
                        data={profile[0].Tanning_Leathers_array}
                        numColumns={3}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              alignItems: "center",
                              flex: 1,
                              marginTop: 10,
                            }}
                          >
                            {/* <Text>{item.tanningLeathers}</Text> */}
                            <Image source={{ uri: `http://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/` + item.tanningLeathers_image }} style={{ width: 80, height: 80 }} />
                          </View>
                        )}
                      />
                    </View>
                  )}

                  {profile[0].Select_Size_array.length != 0 && (
                    <View style={{ marginTop: 20 }}>
                      <Text allowFontScaling={false} style={styles.subSubHeading}>Size Of Leather</Text>
                      <FlatList
                        data={profile[0].Select_Size_array}
                        numColumns={3}
                        renderItem={({ item }) => (
                          <View style={{ justifyContent: 'space-evenly', flex: 1, marginTop: 10 }}><View
                            style={styles.item}
                          >
                            <Text style={{
                              color: "white",
                              fontWeight: "600", textAlign: 'center',
                              fontSize: 18, textAlignVertical: 'center'
                            }} allowFontScaling={false}
                            >
                              {item.Select_Size}
                            </Text>
                          </View></View>
                        )}
                      />
                    </View>
                  )}

                  {profile[0].leather_condition.length == 0 && profile[0].kind_of_leather == 0 && (
                    <View>
                      <Text style={{ textAlign: 'center' }}>No Data Available</Text>
                    </View>
                  )}


                  <View>

                    {profile[0].Products_List.length != 0 && (
                      <View>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                          <Text style={styles.subHeading}>Products</Text>
                          {/* <Text><Text style={styles.subHeading}>Products</Text><Text onPress={()=>props.navigation.navigate("Products",{ user_id: profile[0].user_id })} style={{color:'red'}}>View All</Text></Text> */}
                        </View>
                        {userType != 'Agents' &&
                        <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 15 }} onPress={() => props.navigation.navigate("Products", { user_id: profile[0].user_id })}><Text style={{ color: 'red', textAlign: 'right', marginRight: 10 }}>View All</Text><Image source={require('../../assets/ByClient/BOTTOMNEXT.png')} style={{ width: 10, height: 10, alignSelf: 'center', tintColor: 'red' }} /></TouchableOpacity>
                        }
                        <FlatList data={profile[0].Products_List} numColumns={3} renderItem={({ item, index }) => (
                          <View style={{
                            alignItems: "center",
                            flex: 1,
                            marginTop: 10,
                          }}>
                            {index < 3 && (
                              <View style={{
                                alignItems: "center",
                                flex: 1,
                              }}>
                                {item.product_upload_images.length != 0 ? (
                                  <Image source={{ uri: `https://www.hidetrade.eu/app/UPLOAD_file/` + item.product_upload_images[0].images_name }} resizeMode='contain' style={{ width: 80, height: 80, borderRadius: 20 }} />
                                ) : (
                                  <Image source={require('../../assets/IconUpload3.png')} style={{ width: 80, height: 80 }} />
                                )}
                                {/* <Text>{item.product_title}</Text> */}
                              </View>
                            )}
                          </View>
                        )} />

                      </View>
                    )}
                  </View>


                  {/* <View style={{marginHorizontal:'25%', marginTop:20}}>
                    <ButtonComp title={'Products'} onPress={()=>props.navigation.navigate("Products",{ user_id: profile[0].user_id })} />
                  </View> */}

                </View>
              ) : null}

            </View>
          </ScrollView>
          <View>
            <View>
              {feedbackTextPermission != 1 && showButton != false && ifAccepted == false ? <View style={{ marginVertical: 10, marginHorizontal: "20%" }}>
                <ButtonComp title={textShow == false ? "Request for Feedback" : "Feedback Request Sent"} onPress={() => Feedback()} />
              </View> : null}
            </View>
            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              <View>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => props.navigation.goBack()}
                >
                  <Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{ width: 20, height: 20, marginHorizontal: 10, alignSelf: 'center' }} />
                  <Text allowFontScaling={false}
                    style={{ fontSize: 22, alignSelf: "center", color: "#9EBDB8", }}
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
  headingName: {
    color: Colors.headerBackground,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeading: {
    // marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subSubHeading: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  item: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    backgroundColor: Colors.inactiveState,
    borderRadius: 8,
    margin: 2,
    width: 80,
    height: 80,
    alignSelf: 'center',
    flex: 1, maxWidth: 80
  }
});

export default TanneriesProfileSearchTanneriesBuyLeather;
