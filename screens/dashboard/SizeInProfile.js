import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { StackActions } from "@react-navigation/native";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";
import ButtonComp from "../../components/ButtonComp";

const SizeInProfile = (props) => {
  const [size, setSize] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  const finalTanning = props.route.params.finalTanning;
  const user_type = props.route.params.user_type;

  var Select_Size = selected.map((value) => ({ ["Select_Size"]: value }));

  const final = finalTanning.concat(Select_Size);
  //   console.log("final Size=" + JSON.stringify(final));

  //   var multi_category = props.route.params.multi_category;
  //   var kindOfShape = props.route.params.kindOfShape;
  //   var kindOfLeather = props.route.params.kindOfLeather;
  //   var tanningLeather = props.route.params.tanningLeather;

  useEffect(() => {
    if (dataLoad == false) {
      setApiLoader(true);
      let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllProductSize/ViewAllProductSize.php`;
      axios
        .get(webApiUrl)
        .then((res) => {
          setSize(res.data.Output);
          setApiLoader(false);
          setDataloaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const editProfile = async () => {
    console.log("inside edit profile");
    // console.log("inside final of edit profile=" + JSON.stringify(final));
    setApiLoader(true);
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/UpdateProfile/UpdateProfile.php`;
    axios
      .post(webApirUrl, final)
      .then((response) => {
        // console.log(
        //   "response in edit profile=" + JSON.stringify(response.data)
        // );
        setApiLoader(false);
        Alert.alert("", "User Profile Updated Successfully", [
          {
            text: "Ok",
            style: "cancel",
            onPress: () =>
              // props.navigation.navigate('User Profile')
              props.navigation.dispatch(StackActions.replace("User Profile")),
          },
        ]);
      })
      .catch((err) => console.log("error=" + JSON.stringify(err)));
  };

  const renderSize = ({ item, index }) => {
    const { psize_id, product_size } = item;
    const isSelected = selected.filter((i) => i === product_size).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== product_size));
          } else {
            setSelected((prev) => [...prev, product_size]);
          }
        }}
        style={[
          styles.item,
          isSelected && {
            backgroundColor: Colors.buttonBackground,
            //marginHorizontal: 5,
          },
        ]}
      >
        <Text
          style={{
            color: isSelected ? "white" : "white",
            fontWeight: "600",
            fontSize: 18,
          }}
          allowFontScaling={false}
        >
          {product_size}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {apiLoader ? (
        <SpinView
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          />
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>Loading...</Text>
        </SpinView>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ marginHorizontal: 10 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginTop: 10,
                  color: Colors.text,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
                allowFontScaling={false}
              >
                What size category of the leathers you want to sell?
              </Text>
              {size != undefined ? (
                <View>
                  <FlatList
                    numColumns={3}
                    data={size}
                    key={size.psize_id}
                    renderItem={renderSize}
                    scrollEnabled={false}
                  />
                </View>
              ) : null}
            </View>
          </ScrollView>
          <View>
            <Text
              style={{
                marginHorizontal: 10,
                color: Colors.text,
                marginBottom: 10,
                textAlign: "center",
              }}
              allowFontScaling={false}
            >
              To facilitate the categorization of leathers, we have decided to
              divide the sizes into these three macro categories. You will be
              able to enter all the exact size data at a later time.
            </Text>
            <View style={{ marginHorizontal: "10%", marginBottom: 20 }}>
              <ButtonComp title={"Update"} onPress={editProfile} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    //padding: 8,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    backgroundColor: Colors.inactiveState,
    borderRadius: 8,
    margin: 2,
    width: 110,
    height: 110,
    flex: 1,
  },
});

export default SizeInProfile;
