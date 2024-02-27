import React, { useEffect, useRef } from "react";
import { Animated, View, ActivityIndicator, StyleSheet,Image } from "react-native";

const SpinView = (props) => {
  const Spin = useRef(new Animated.Value(0)).current;
  const SpinValue = Spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "0deg"],
  });
  useEffect(() => {
    Animated.timing(Spin, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [Spin]);
  const dot1Opacity = new Animated.Value(0);
  const dot2Opacity = new Animated.Value(0);
  const dot3Opacity = new Animated.Value(0);
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot1Opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        // transform: [{ rotate: SpinValue }], // Bind opacity to animated value
      }}
    >
      {/* {props.children} */}
      <Image
            source={require("../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /> 
        
      <View style={styles.container}>
        <Animated.View
          style={[styles.dot, { opacity: dot1Opacity }]}
        />
        <Animated.View
          style={[styles.dot, { opacity: dot2Opacity }]}
        />
        <Animated.View
          style={[styles.dot, { opacity: dot3Opacity }]}
        />
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginHorizontal: 5, // Adjust spacing between dots as needed
  },
});
export default SpinView;
