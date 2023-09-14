import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Alert,
} from "react-native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import StarRating from "react-native-star-rating";
import { useIsFocused } from "@react-navigation/native";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";
import { Platform } from "expo-modules-core";

const UserProfile = (props) => {
  const [profile, setProfile] = useState(undefined);
  const [dataLoad, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const [id, setId] = useState(undefined);
  const [user_type, setUser_type] = useState(undefined);
  const [profile_id, setProfile_id] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [response, setResponse] = useState(undefined);
  const [show, setShow] = useState(false);

  // const ids=props.route.params.ids

  //   const user_id=AsyncStorage.getItem("user_id");
  //   const user_type=AsyncStorage.getItem("user_type")

  //const first_name = props.route.params.first_name;
  //console.log('user id='+first_name);

  const isFocused = useIsFocused();

  const apiCall = async () => {
    if (dataLoad == false) {
      setApiLoader(true);
      setId(await AsyncStorage.getItem("user_id"));
      setUser_type(await AsyncStorage.getItem("user_type"));

      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=${user_type}&user_id=${id}`;
      console.log("webapiurl=" + webApiUrl);
      axios.get(webApiUrl).then(async (res) => {
        console.log("abc");
        //console.log('response='+JSON.stringify(res.data.Output));
        //setProfile(res.data.User_Details);
        console.log(
          "response of profile in api call=" + JSON.stringify(res.data)
        );
        setProfile(res.data.User_Details);

        let webapiurl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
        const data = new FormData();
        data.append("user_id_who_got_ratings", id);
        let responseFeedback = await fetch(webapiurl, {
          method: "post",
          body: data,
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        });

        let responseJSON = await responseFeedback.json();
        console.log(
          "list of feedback in user profile in api call=" +
            JSON.stringify(responseJSON)
        );
        if (responseJSON.Status == true) {
          setResponse(responseJSON.Feedback_Details);
        } else {
          setResponse("");
        }

        setApiLoader(false);
        setDataLoaded(true);
      });
    }
  };

  const getDetails = async () => {
    setId(await AsyncStorage.getItem("user_id"));
    setUser_type(await AsyncStorage.getItem("user_type"));
  };

  useEffect(() => {
    if (isFocused) {
      if (dataLoad == false) {
        setApiLoader(true);
        getDetails();

        if (id != undefined && user_type != undefined) {
          let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=${user_type}&user_id=${id}`;
          console.log("webapiurl=" + webApiUrl);
          axios.get(webApiUrl).then(async (res) => {
            console.log("abc");
            //console.log('response='+JSON.stringify(res.data.Output));
            //setProfile(res.data.User_Details);
            console.log("response of profile=" + JSON.stringify(res.data));
            setProfile(res.data.User_Details);

            let webapiurl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
            const data = new FormData();
            data.append("user_id_who_got_ratings", id);
            let responseFeedback = await fetch(webapiurl, {
              method: "post",
              body: data,
              headers: {
                Accept: "*/*",
                "Content-Type": "multipart/form-data",
              },
            });

            let responseJSON = await responseFeedback.json();
            console.log(
              "list of feedback in user profile=" + JSON.stringify(responseJSON)
            );
            if (responseJSON.Status == true) {
              setResponse(responseJSON.Feedback_Details);
            } else {
              setResponse("");
            }

            setApiLoader(false);
            setDataLoaded(true);
          });
        }
      }
    }
  }, [id, user_type, response]);

  console.log(profile, "MMMMMMMMMMMMMMMMMMMMMMMM");

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewSingleUserList/ViewSingleUserList.php?user_type=${user_type}&user_id=${id}`;
  //   console.log("webapiurl=" + webApiUrl);
  //   axios.get(webApiUrl).then(async (res) => {
  //     console.log("abc");
  //     //console.log('response='+JSON.stringify(res.data.Output));
  //     //setProfile(res.data.User_Details);
  //     console.log("response of profile=" + JSON.stringify(res.data));
  //     setProfile(res.data.User_Details);

  //     let webapiurl = `https://www.hidetrade.eu/app/APIs/ReviewsRatings/RatingsReviewsListUserWhoGot.php`;
  //     const data = new FormData();
  //     data.append("user_id_who_got_ratings", id);
  //     let responseFeedback = await fetch(webapiurl, {
  //       method: "post",
  //       body: data,
  //       headers: {
  //         Accept: "*/*",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     let responseJSON = await responseFeedback.json();
  //     console.log(
  //       "list of feedback in user profile=" + JSON.stringify(responseJSON)
  //     );
  //   });
  //   setRefreshing(false);
  // }, [id, user_type]);

  console.log("id in profile=" + id);
  console.log("type in profile=" + user_type);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isFocused && (
        <View style={{ flex: 1 }}>
          {apiLoader ? (
            // <View style={styles.loader}>
            //   <Image
            //   source={require("../../assets/loader.jpg")}
            //   resizeMode="contain"
            //   resizeMethod="scale"
            //   style={{ width: 100, height: 100, marginBottom:10 }}
            // /><ActivityIndicator size={"large"} color='red' />
            // </View>
            <SpinView
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              {console.log("inside spinview")}
              <Image
                source={require("../../assets/loader.jpg")}
                resizeMode="contain"
                resizeMethod="scale"
                style={{ width: 80, height: 80 }}
              />
              <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                Loading...
              </Text>
            </SpinView>
          ) : (
            <View style={{ marginHorizontal: 10, marginTop: 20, flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  {profile != undefined || profile != null ? (
                    <View>
                      {profile.map((value) => (
                        <View>
                          <Text
                            allowFontScaling={false}
                            style={styles.headingName}
                          >
                            {value.first_name} {value.last_name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <Text
                                allowFontScaling={false}
                                style={{ marginTop: 20 }}
                              >
                                {value.address}
                              </Text>
                              <Text allowFontScaling={false}>
                                {value.Country}
                              </Text>
                              <Text allowFontScaling={false}>
                                {value.mobile}
                              </Text>
                              <Text allowFontScaling={false}>
                                {value.email}
                              </Text>
                              <Text
                                allowFontScaling={false}
                                style={{ color: "red" }}
                              >
                                {value.HTTP}
                              </Text>
                            </View>
                            {/* <Image
                        source={{
                          uri:
                            `http://www.hidetrade.eu/app/UPLOAD_file/` +
                            value.profile_image,
                        }}
                        resizeMode="contain"
                        style={{ width: 150, height: 150 }}
                      /> */}
                            {/* {value.profile_image == null ||
                        value.profile_image == undefined ||
                        value.profile_image == "" ||
                        value.profile_image == [] ? (
                          <Image
                            source={require("../../assets/Johnny.png")}
                            style={{ width: 120, height: 120 }}
                          />
                        ) : (
                          <Image
                            style={{ width: 120, height: 120, borderRadius: 8 }}
                            source={{
                              uri:
                                `http://www.hidetrade.eu/app/UPLOAD_file/` +
                                value.profile_image,
                            }}
                          />
                        )} */}
                            {value.logo_upload.length > 0 ? (
                              <Image
                                source={{
                                  uri:
                                    `http://www.hidetrade.eu/app/UPLOAD_file/` +
                                    value.logo_upload,
                                }}
                                //resizeMode="contain"
                                style={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: 8,
                                }}
                              />
                            ) : (
                              <Image
                                source={require("../../assets/Johnny.png")}
                                style={{ width: 120, height: 120 }}
                              />
                            )}
                          </View>

                          {/* <TouchableOpacity
                      // onPress={() =>
                      //   props.navigation.navigate(
                      //     "ProductsSearchTanneriesBuyLeather",
                      //     { user_id: value.user_id }
                      //   )
                      // }
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            color: Colors.text,
                            fontWeight: "bold",
                          }}
                        >
                          Products
                        </Text>
                      </View>
                    </TouchableOpacity> */}

                          {/* <View style={{ height: 50, width: "65%", marginTop: 10, flexDirection: 'row' }}>

                          <TouchableOpacity
                          onPress={()=>props.navigation.navigate("Products",{ user_id: profile[0].user_id })}
                            activeOpacity={0.5}
                            style={{ height: 50, width: "50%", backgroundColor: "#018786", justifyContent: 'center', borderRadius: 3 }}>
                            <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center', fontWeight: '500' }}>
                              Products
                            </Text>
                          </TouchableOpacity>

                          
                        </View> */}

                          <View
                            style={{
                              borderWidth: 1,
                              backgroundColor: "grey",
                              width: "100%",
                              marginTop: 10,
                              opacity: 0.5,
                            }}
                          />

                          <ScrollView
                            style={{ height: response != "" ? 140 : 30 }}
                            nestedScrollEnabled={true}
                          >
                            <View
                              style={{
                                marginHorizontal: 10,
                                marginVertical: 10,
                              }}
                            >
                              {response != "" ? (
                                response.map((value, index) => (
                                  <View>
                                    {index == 0 ? (
                                      <View
                                        style={{
                                          borderRadius: 10,
                                          padding: 10,
                                          marginVertical: 10,
                                          backgroundColor: "#B8D1D1",
                                          shadowOffset: { width: 5, height: 5 },
                                          shadowRadius: 2,
                                          shadowOpacity: 0.5,
                                          elevation: 4,
                                        }}
                                      >
                                        {/* <Text style={{fontWeight:'bold', fontSize:18}} allowFontScaling={false}>{value.user_name_who_give_rating[0].first_name} {value.user_name_who_give_rating[0].last_name}</Text> */}
                                        <View style={{ width: 40 }}>
                                          <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={value.ratingNumber}
                                            animation="shake"
                                            //buttonStyle={{width:40, height:20}}
                                            starSize={15}
                                            //halfStarEnabled={true}
                                          />
                                        </View>
                                        <Text
                                          style={{}}
                                          allowFontScaling={false}
                                        >
                                          {value.comments}
                                        </Text>
                                      </View>
                                    ) : null}
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
                                  <Text
                                    style={{
                                      fontWeight: "bold",
                                      textAlignVertical: "center",
                                    }}
                                    allowFontScaling={false}
                                  >
                                    No Feedbacks Found
                                  </Text>
                                </View>
                              )}
                            </View>

                            <View
                              style={{
                                marginHorizontal: 10,
                                marginVertical: 10,
                              }}
                            >
                              {response != "" && (
                                <Text
                                  style={{ textAlign: "right", color: "red" }}
                                  onPress={() => setShow(!show)}
                                >
                                  {show != true ? "Show More" : "Show Less"}
                                </Text>
                              )}

                              {show == true && response != ""
                                ? response.map((value, index) => (
                                    <View>
                                      {index != 0 ? (
                                        <View
                                          style={{
                                            borderRadius: 10,
                                            padding: 10,
                                            marginVertical: 10,
                                            backgroundColor: "#B8D1D1",
                                            shadowOffset: {
                                              width: 5,
                                              height: 5,
                                            },
                                            shadowRadius: 2,
                                            shadowOpacity: 0.5,
                                            elevation: 4,
                                          }}
                                        >
                                          {/* <Text style={{fontWeight:'bold', fontSize:18}} allowFontScaling={false}>{value.user_name_who_give_rating[0].first_name} {value.user_name_who_give_rating[0].last_name}</Text> */}
                                          <View style={{ width: 40 }}>
                                            <StarRating
                                              disabled={true}
                                              maxStars={5}
                                              rating={value.ratingNumber}
                                              animation="shake"
                                              //buttonStyle={{width:40, height:20}}
                                              starSize={15}
                                              //halfStarEnabled={true}
                                            />
                                          </View>
                                          <Text
                                            style={{}}
                                            allowFontScaling={false}
                                          >
                                            {value.comments}
                                          </Text>
                                        </View>
                                      ) : null}
                                    </View>
                                  ))
                                : null}
                            </View>
                          </ScrollView>

                          <View
                            style={{
                              borderWidth: 1,
                              backgroundColor: "grey",
                              width: "100%",
                              marginTop: 10,
                              opacity: 0.5,
                            }}
                          />

                          {/* {value.leather_condition.length > 0 ? (
                          <View>
                          
                            <Text
                              allowFontScaling={false}
                              style={styles.subHeading}
                            >
                              Leather's condition on sell
                            </Text>
                            <View>
                              <FlatList
                                data={value.leather_condition}
                                numColumns={2}
                                nestedScrollEnabled={true}
                                renderItem={({ item }) => (
                                  <View
                                    style={{
                                      alignItems: "center",
                                      flex: 1,
                                      marginTop: 10,
                                    }}
                                  >
                                    <Image
                                      source={{
                                        uri:
                                          `http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/` +
                                          item.Leather_Condition_image,
                                      }}
                                      style={{ width: 80, height: 80 }}
                                    />
                                    <Text allowFontScaling={false}>
                                      {item.Leather_Condition}
                                    </Text>
                                  </View>
                                )}
                              />
                            </View>
                          </View>
                        ) : (
                          <View>
                            <Text
                              allowFontScaling={false}
                              style={styles.subHeading}
                            >
                              Leather's condition on sell
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ textAlign: "center", marginTop: 10 }}
                            >
                              No data available
                            </Text>
                          </View>
                        )}
  
       
  
                        {value.kind_of_leather != "" ? (
                          <View>
                            <Text
                              allowFontScaling={false}
                              style={styles.subHeading}
                            >
                              Kind of leathers on sell
                            </Text>
                            <View>
                              <FlatList
                                data={value.kind_of_leather}
                                numColumns={2}
                                renderItem={({ item }) => (
                                  <View
                                    style={{
                                      alignItems: "center",
                                      flex: 1,
                                      marginTop: 10,
                                    }}
                                  >
                                    <Image
                                      source={{
                                        uri:
                                          `https://www.hidetrade.eu/app/UPLOAD_file/` +
                                          item.kind_of_leather_on_sell_image,
                                      }}
                                      style={{ width: 80, height: 80 }}
                                    />
                                    <Text allowFontScaling={false}>
                                      {item.kind_of_leather_on_sell}
                                    </Text>
                                  </View>
                                )}
                              />
                            </View>
                          </View>
                        ) : (
                          <View>
                            <Text
                              allowFontScaling={false}
                              style={styles.subHeading}
                            >
                              Kind of leathers on sell
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={{ textAlign: "center", marginTop: 10 }}
                            >
                              No data available
                            </Text>
                          </View>
                        )} */}

                          {user_type == "Tanneries" ? (
                            <Text
                              allowFontScaling={false}
                              style={styles.subHeading}
                            >
                              Leathers we deal with
                            </Text>
                          ) : (
                            <Text
                              allowFontScaling={false}
                              style={styles.subHeading}
                            >
                              Able to inspect
                            </Text>
                          )}
                          {value.leather_condition.length != 0 && (
                            <View>
                              <Text
                                allowFontScaling={false}
                                style={styles.subSubHeading}
                              >
                                Leather's Condition
                              </Text>
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
                                  >
                                    <Image
                                      source={{
                                        uri:
                                          `http://www.hidetrade.eu/app/APIs/ViewAllLeatherConditionList/` +
                                          item.Leather_Condition_image,
                                      }}
                                      style={{ width: 80, height: 80 }}
                                    />
                                    {/* <Text allowFontScaling={false}>{item.Leather_Condition}</Text> */}
                                  </View>
                                )}
                              />
                            </View>
                          )}

                          {value.kind_of_leather.length != 0 && (
                            <View style={{ marginTop: 20 }}>
                              <Text
                                allowFontScaling={false}
                                style={styles.subSubHeading}
                              >
                                Kind Of Leather
                              </Text>
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
                                  >
                                    <Image
                                      source={{
                                        uri:
                                          `https://www.hidetrade.eu/app/UPLOAD_file/` +
                                          item.kind_of_leather_on_sell_image,
                                      }}
                                      style={{ width: 80, height: 80 }}
                                    />
                                  </View>
                                )}
                              />
                            </View>
                          )}

                          {value.tanningLeathers.length != 0 && (
                            <View style={{ marginTop: 20 }}>
                              <Text
                                allowFontScaling={false}
                                style={styles.subSubHeading}
                              >
                                Tanning Leather
                              </Text>
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
                                    <Image
                                      source={{
                                        uri:
                                          `http://www.hidetrade.eu/app/APIs/ViewAllKindOfTanningLeatherForBuyList/` +
                                          item.Tanning_leathers_image,
                                      }}
                                      style={{ width: 80, height: 80 }}
                                    />
                                  </View>
                                )}
                              />
                            </View>
                          )}

                          {value.SizeLeathers.length != 0 && (
                            <View style={{ marginTop: 20 }}>
                              <Text
                                allowFontScaling={false}
                                style={styles.subSubHeading}
                              >
                                Size Of Leather
                              </Text>
                              <FlatList
                                data={value.SizeLeathers}
                                numColumns={3}
                                renderItem={({ item }) => (
                                  <View
                                    style={{
                                      justifyContent: "space-evenly",
                                      flex: 1,
                                      marginTop: 10,
                                    }}
                                  >
                                    <View style={styles.item}>
                                      <Text
                                        style={{
                                          color: "white",
                                          fontWeight: "600",
                                          textAlign: "center",
                                          fontSize: 18,
                                          textAlignVertical: "center",
                                        }}
                                        allowFontScaling={false}
                                      >
                                        {item.Select_Size}
                                      </Text>
                                    </View>
                                  </View>
                                )}
                              />
                            </View>
                          )}

                          {value.leather_condition.length == 0 &&
                            value.kind_of_leather == 0 && (
                              <View>
                                <Text style={{ textAlign: "center" }}>
                                  No Data Available
                                </Text>
                              </View>
                            )}
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              </ScrollView>
              <View>
                <View style={{ flexDirection: "row", marginBottom: 15 }}>
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
                      onPress={() =>
                        props.navigation.navigate("Profile", {
                          subId:
                            user_type === "Tanneries"
                              ? profile[0].subscription_id
                              : "",
                        })
                      }
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 22,
                          alignSelf: "center",
                          color: "#62B0A2",
                        }}
                      >
                        Edit Screen
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
                </View>
                {user_type === "Tanneries" && Platform.OS === "android" ? (
                  <View style={{ flexDirection: "row", marginBottom: 15 }}>
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
                        onPress={() =>
                          props.navigation.navigate("Subscription", {
                            timestamp: profile[0].timestamp,
                            subId: profile[0].subscription_id,
                          })
                        }
                      >
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 22,
                            alignSelf: "center",
                            color: "#62B0A2",
                          }}
                        >
                          {/* {profile[0].timestamp} */}
                          {/* {profile[0].subscription_id} */}
                          Subscription
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
                  </View>
                ) : null}
              </View>
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
  headingName: {
    color: Colors.headerBackground,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeading: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
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
    alignSelf: "center",
    flex: 1,
    maxWidth: 80,
  },
});

export default UserProfile;
