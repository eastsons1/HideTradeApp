import React from "react";
import { View, Text, Button } from "react-native";

const Sell = (props) => {
  return (
    <View>
      <Text allowFontScaling={false}>Sell</Text>
      <Button title="Next" onPress={()=>props.navigation.navigate("Sell Leathers")} />
    </View>
  );
};

export default Sell;