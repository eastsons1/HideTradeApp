import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions, ScrollView
} from "react-native";


import Colors from "../../constants/Colors";

const SizePageSellLeather = (props) => {
    const screen=useWindowDimensions();
  const size = props.route.params.size;
  console.log("size in size=" + JSON.stringify(size));

  var productName=props.route.params.productName;
  var category=props.route.params.category;
  var subCategory=props.route.params.subCategory;

  const [sizePage, setSizePage] = React.useState(size);
  const [selected, setSelected] = React.useState([]);

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
          isSelected && { backgroundColor: Colors.buttonBackground },
        ]}
      >
        <Text
          style={{
            color: isSelected ? "white" : "white",
            fontWeight: "600",
            fontSize: 18,
          }}allowFontScaling={false}
        >
          {product_size}
        </Text>
      </TouchableOpacity>
    );
  };
  console.log('selected='+selected)

  return (
    <View style={styles.container}>
        <ScrollView>
      <View style={{ marginHorizontal: 10}}>
          <Text allowFontScaling={false} style={{textAlign:'center', fontSize:20, marginTop:15, color:Colors.text, fontWeight:'bold', marginBottom:20}}>Which size have the leathers do you wanna sell?</Text>
        <FlatList
          data={sizePage}
          renderItem={renderSize}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
      </ScrollView>
      <View>
        <Text
          style={{
            marginHorizontal: 10,
            color: Colors.text,
            marginBottom: 10,textAlign:'center'
          }} allowFontScaling={false}
        >To facililate the categorization of leathers, we have decided to divide the sizes into three macro categories you will be able to enter all the exact size data at a later time
        </Text>
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
              }} onPress={()=>props.navigation.navigate("Leather Condition",{productName:productName, category:category, subCategory:subCategory, size:selected})}
            >
              <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#62B0A2" }}
            >
              Next
            </Text>
            <Image source={require('../../assets/ByClient/BOTTOMNEXT.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    flex:1
  },
});

export default SizePageSellLeather;
