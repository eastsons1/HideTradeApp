import React, { useEffect, useState } from "react";
import { Image, Text, View, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";

import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/signup/Login";
import Colors from "../constants/Colors";
import Home from "../screens/dashboard/Home";
import RegisterAs from "../screens/signup/RegisterAs";
import Signup from "../screens/signup/Signup";
import Buy from "../screens/dashboard/Buy";
import Feedback from "../screens/dashboard/Feedback";
import Profile from "../screens/dashboard/Profile";
import ForgotPassword from "../screens/signup/ForgotPassword";
import SellLeathersProductName from "../screens/dashboard/SellLeathersProductName";
import CategorySellLeather from "../screens/dashboard/CategorySellLeather";
import SubCategorySellLeather from "../screens/dashboard/SubCategorySellLeather";
import SizePageSellLeather from "../screens/dashboard/SizePageSellLeather";
import LeatherConditionSellLeather from "../screens/dashboard/LeatherConditionSellLeather";
import TanningLeatherSellLeather from "../screens/dashboard/TanningLeatherSellLeather";
import TanningLeatherOriginSellLeather from "../screens/dashboard/TannningLeatherOriginSellLeather";
import SubstanceThicknessSellLeather from "../screens/dashboard/SubstanceThicknessSellLeather";
import KindOfTrimSellLeather from "../screens/dashboard/KindOfTrimSellLeather";
import FlayLeatherSellLeather from "../screens/dashboard/FlayLeatherSellLeather";
import RawDefectsSellLeather from "../screens/dashboard/RawDefectsSellLeather";
import HairLeatherSellLeather from "../screens/dashboard/HairLeatherSellLeather";
import CertificateLeatherSellLeather from "../screens/dashboard/CertificateLeatherSellLeather";
import KindOfPackingSellLeather from "../screens/dashboard/KindOfPackingSellLeather";
import KindOfShipmentSellLeather from "../screens/dashboard/KindOfShipmentSellLeather";
import LastInformationSellLeather from "../screens/dashboard/LastInformationSellLeather";
import GoodsInspectionSellLeather from "../screens/dashboard/GoodsInspectionSellLeather";
import PutUpForSale from "../screens/dashboard/PutUpForSale";
import LeatherConditionSearchExpert from "../screens/dashboard/LeatherConditionSearchExpert";
import TanningLeatherSearchExpert from "../screens/dashboard/TanningLeatherSearchExpert";
import KindOfLeatherSearchExpert from "../screens/dashboard/KindOfLeatherSearchExpert";
import CountryAndCitySearchExpert from "../screens/dashboard/CountryAndCitySearchExpert";
import LeatherConditionBuyLeatherSearchProduct from "../screens/dashboard/LeatherConditionBuyLeatherSearchProduct";
import KindOfShapeBuyLeatherSearchProduct from "../screens/dashboard/KindOfShapeBuyLeatherSearchProduct";
import KindOfLeatherBuyLeatherSearchProduct from "../screens/dashboard/KindOfLeatherBuyLeatherSearchProduct";
import SizePageBuyLeatherSearchProduct from "../screens/dashboard/SizePageBuyLeatherSearchProduct";
import PictureUploadSellLeather from "../screens/dashboard/PictureUploadSellLeather";
import DestinationSellLeather from "../screens/dashboard/DestinationSellLeather";
import SearchTanneriesBuyLeather from "../screens/dashboard/SearchTanneriesBuyLeather";
import KindOfPreservationBuyLeatherSearchProduct from "../screens/dashboard/KindOfPreservationBuyLeatherSearchProduct";
import TanneriesProfileSearchTanneriesBuyLeather from "../screens/dashboard/TanneriesProfileSearchTanneriesBuyLeather";
import SearchAreaBuyProductSearchArea from "../screens/dashboard/SearchAreaBuyProductSearchArea";
import ProductsSearchTanneriesBuyLeather from "../screens/dashboard/ProductsSearchTanneriesBuyLeather";
import ProductListBuyLeatherSearchArea from "../screens/dashboard/ProductListBuyLeatherSearchArea";
import OriginBuyLeatherSearchProduct from "../screens/dashboard/OriginBuyLeatherSearchProduct";
import KindOfTrimBuyLeatherSearchProduct from "../screens/dashboard/KindOfTrimBuyLeatherSearchProduct";
import FlayLeatherBuyLeatherSearchProduct from "../screens/dashboard/FlayLeatherBuyLeatherSearchProduct";
import RawDefectsBuyLeatherSearchProduct from "../screens/dashboard/RawDefectsBuyLeatherSearchProduct";
import HairLeatherBuyLeatherSearchProduct from "../screens/dashboard/HairLeatherBuyLeatherSearchProduct";
import CertificateLeatherBuyLeatherSearchProduct from "../screens/dashboard/CertificateLeatherBuyLeatherSearchProduct";
import CountryAndCitySearchBuyLeatherSearchProduct from "../screens/dashboard/CountryAndCitySearchBuyLeatherSearchProduct";
import ProductListBuyLeatherSearchProduct from "../screens/dashboard/ProductListBuyLeatherSearchProduct";
import DocumentUploadSellLeather from "../screens/dashboard/DocumentUploadSellLeather";
import ExpertListSearchExpert from "../screens/dashboard/ExpertListSearchExpert";
import IndividualProductSearchTanneriesBuyLeather from "../screens/dashboard/IndividualProductSearchTanneriesBuyLeather";
import TanningLeatherBuyLeatherSearchProduct from "../screens/dashboard/TanningLeatherBuyLeatherSearchProduct";
import IndividualExpertProfileSearchExpert from "../screens/dashboard/IndividualExpertProfileSearchExpert";
import CategoryInProfile from "../screens/dashboard/CategoryInProfile";
import SubCategoryInProfile from "../screens/dashboard/SubCategoryInProfile";
import IndividualProductBuyLeatherSearchProduct from "../screens/dashboard/IndividualProductBuyLeatherSearchProduct";
import IndividualProductBuyLeatherSearchArea from "../screens/dashboard/IndividualProductBuyLeatherSearchArea";
import ProductListSearchExpert from "../screens/dashboard/ProductListSearchExpert";
import UserProfile from "../screens/dashboard/UserProfile";
import SubstanceThicknessBuyLeatherSearchProduct from "../screens/dashboard/SubstanceThicknessBuyLeatherSearchProduct";
import DestinationBuyLeatherSearchProduct from "../screens/dashboard/DestinationBuyLeatherSearchProduct";
import ColorBuyLeatherSearchProduct from "../screens/dashboard/ColorBuyLeatherSearchProduct";
import GoodsInspectionBuyLeatherSearchProduct from "../screens/dashboard/GoodsInspectionBuyLeatherSearchProduct";
import KindOfPreservationSellLeather from "../screens/dashboard/KindOfPreservationSellLeather";
import ColorSellLeather from "../screens/dashboard/ColorSellLeather";
import PreviewSellLeather from "../screens/dashboard/PreviewSellLeather";
import PackingListUploadImageSellLeather from "../screens/dashboard/PackingListUploadImageSellLeather";
import DocsCertificatesSearchTanneriesBuyLeather from "../screens/dashboard/DocsCertificatesSerachTanneriesBuyLeather";
import DocsCertificateBuyLeatherSearchProduct from "../screens/dashboard/DocsCertificateBuyLeatherSearchProduct";
import DocsCertificateBuyLeatherSearchArea from "../screens/dashboard/DocsCertificateBuyLeatherSearchArea";
import TanneriesListFeedback from "../screens/dashboard/TanneriesListFeedback";
import TanneriesProfileFeedback from "../screens/dashboard/TanneriesProfileFeedback";
import ApprovalListFeedback from "../screens/dashboard/ApprovalListFeedback";
import ListFeedback from "../screens/dashboard/ListFeedback";
import AgentsListFeedback from "../screens/dashboard/AgentsListFeedback";
import AgentsProfileFeedback from "../screens/dashboard/AgentsProfileFeedback";
import TanningInProfile from "../screens/dashboard/TanningInProfile";
import SizeInProfile from "../screens/dashboard/SizeInProfile";
import PreviewDocsCertificatesSellLeather from "../screens/dashboard/PreviewDocsCertificatesSellLeather";
import PreviewPackingListSellLeather from "../screens/dashboard/PreviewPackingListSellLeather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckoutScreen from "../screens/paymentScreens/checkout";
import Subscription from "../screens/dashboard/Subscription";
import MyStripeCheckout from "../screens/paymentScreens/changeCard";

const HomeTabNavigator = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const SellTab = createNativeStackNavigator();
const HomeScreenNavigator = createNativeStackNavigator();
const BuyTab = createNativeStackNavigator();
const ProfileTab = createNativeStackNavigator();
const FeedbackTab = createNativeStackNavigator();

export const ProfileTabScreens = () => {
  return (
    <ProfileTab.Navigator>
      <ProfileTab.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Profile",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ProfileTab.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        })}
      />
      <ProfileTab.Screen
        name="Category "
        component={CategoryInProfile}
        options={{
          headerBackVisible: false,
          headerTitle: "Category",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ProfileTab.Screen
        name="Sub Category "
        component={SubCategoryInProfile}
        options={{
          headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Sub Category",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ProfileTab.Screen
        name="Tanning Leather   "
        component={TanningInProfile}
        options={{
          headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Tanning Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ProfileTab.Screen
        name="Size Page "
        component={SizeInProfile}
        options={{
          headerBackVisible: true,
          headerBackTitle: "",
          headerTitle: "Size Page",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <ProfileTab.Screen
        name="Subscription"
        component={Subscription}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        })}
      />

      <ProfileTab.Screen
        name="Change Card"
        component={MyStripeCheckout}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        })}
      />
    </ProfileTab.Navigator>
  );
};

export const BuyTabScreens = () => {
  return (
    <BuyTab.Navigator screenOptions={{ gestureEnabled: false }}>
      <BuyTab.Screen
        name="Buy"
        component={Buy}
        options={{
          //headerBackVisible: true,
          headerBackTitle: "",
          headerTitle: "Buy Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          gestureEnabled: false,
        }}
      />
      <BuyTab.Screen
        name="Leather Condition "
        component={LeatherConditionBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Leather Condition",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Leather Shape"
        component={KindOfShapeBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Leather Shape",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Tanning Leather "
        component={TanningLeatherBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Tanning Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Leather Type"
        component={KindOfLeatherBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Leather Type",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Size Category"
        component={SizePageBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Size Category",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Search Tannery"
        component={SearchTanneriesBuyLeather}
        options={{
          headerBackVisible: true,
          headerBackTitle: "",
          headerTitle: "Search Tannery",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Preservation Type"
        component={KindOfPreservationBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Preservtion Type",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Tannery Profile"
        component={TanneriesProfileSearchTanneriesBuyLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Tannery Profile",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Search Area"
        component={SearchAreaBuyProductSearchArea}
        options={{
          headerBackVisible: false,
          headerTitle: "Search Area",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Products"
        component={ProductsSearchTanneriesBuyLeather}
        options={{
          headerBackVisible: true,
          headerBackTitle: "",
          headerTitle: "Products",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Product List"
        component={ProductListBuyLeatherSearchArea}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Product List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Docs/Certificate"
        component={DocsCertificateBuyLeatherSearchArea}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Docs/Certificate",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Product Details"
        component={IndividualProductBuyLeatherSearchArea}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Product Details",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Selection"
        component={OriginBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Selection",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Substance and Thickness "
        component={SubstanceThicknessBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Substance and Thickness",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Goods Inspection "
        component={GoodsInspectionBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Goods Inspection",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Leather Color "
        component={ColorBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Leather Color",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Destination "
        component={DestinationBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Destination",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Trim"
        component={KindOfTrimBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Trim",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Flay Leather "
        component={FlayLeatherBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Flay Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Raw Defects "
        component={RawDefectsBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Raw Defects",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Hair Leather "
        component={HairLeatherBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Hair Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Certificates and Documents"
        component={CertificateLeatherBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Certificates and Documents",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Country"
        component={CountryAndCitySearchBuyLeatherSearchProduct}
        options={{
          headerBackVisible: false,
          headerTitle: "Country",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Product List "
        component={ProductListBuyLeatherSearchProduct}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Product List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Product Details "
        component={IndividualProductBuyLeatherSearchProduct}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Product Details",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Docs/Certificate "
        component={DocsCertificateBuyLeatherSearchProduct}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Docs/Certificate",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Product Details  "
        component={IndividualProductSearchTanneriesBuyLeather}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Product Details",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <BuyTab.Screen
        name="Docs/Certificate  "
        component={DocsCertificatesSearchTanneriesBuyLeather}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Docs/Certificates",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </BuyTab.Navigator>
  );
};

export const HomeScreens = () => {
  return (
    <HomeScreenNavigator.Navigator
      initialRouteName="Home"
      screenOptions={() => ({ gestureEnabled: false })}
    >
      <HomeScreenNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerBackVisible: false,
          headerTitle: "Home",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          gestureEnabled: false,
        }}
      />
      <HomeScreenNavigator.Screen
        name="Leather Condition  "
        component={LeatherConditionSearchExpert}
        options={{
          headerBackVisible: false,
          headerTitle: "Leather Condition",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeScreenNavigator.Screen
        name="Tanning Leather  "
        component={TanningLeatherSearchExpert}
        options={{
          headerBackVisible: false,
          headerTitle: "Tanning Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeScreenNavigator.Screen
        name="Kind Of Leather"
        component={KindOfLeatherSearchExpert}
        options={{
          headerBackVisible: false,
          headerTitle: "Kind Of Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeScreenNavigator.Screen
        name="Country "
        component={CountryAndCitySearchExpert}
        options={{
          headerBackVisible: false,
          headerTitle: "Country",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeScreenNavigator.Screen
        name="Result List"
        component={ExpertListSearchExpert}
        options={{
          headerBackVisible: true,
          headerTitle: "Result List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeScreenNavigator.Screen
        name="Expert Profile"
        component={IndividualExpertProfileSearchExpert}
        options={{
          headerBackVisible: false,
          headerTitle: "Expert Profile",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <HomeScreenNavigator.Screen
        name="Product List  "
        component={ProductListSearchExpert}
        options={{
          headerBackVisible: true,
          headerTitle: "Product List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </HomeScreenNavigator.Navigator>
  );
};

export const SellTabScreens = () => {
  return (
    <SellTab.Navigator>
      <SellTab.Screen
        name="Sell Leathers"
        component={SellLeathersProductName}
        options={{
          // headerShown:false,
          headerTitle: "Sell Leathers",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Category"
        component={CategorySellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Category",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Sub-Category"
        component={SubCategorySellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Sub-Category",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Size Page"
        component={SizePageSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Size Page",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Leather Condition"
        component={LeatherConditionSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Leather Condition",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Preservation"
        component={KindOfPreservationSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Preservation",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Tanning Leather"
        component={TanningLeatherSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Tanning Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Origin"
        component={TanningLeatherOriginSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Origin",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Substance and Thickness"
        component={SubstanceThicknessSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Substance and Thickness",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Leather Color"
        component={ColorSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Leather Color",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Kind Of Trim Leather"
        component={KindOfTrimSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Kind Of Trim Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Flay Leather"
        component={FlayLeatherSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Flay Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Raw Defects"
        component={RawDefectsSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Raw Defects",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Hair Leather"
        component={HairLeatherSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Hair Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Certificate Leather"
        component={CertificateLeatherSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Certificate Leather",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Packing Type"
        component={KindOfPackingSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Packing Type",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Shipment Type"
        component={KindOfShipmentSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Shipment Type",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Additional Information"
        component={LastInformationSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Additional Information",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Goods Inspection"
        component={GoodsInspectionSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Goods Inspection",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Sale"
        component={PutUpForSale}
        options={{
          headerBackVisible: false,
          headerTitle: "Sale",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Pictures"
        component={PictureUploadSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Pictures",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Destination"
        component={DestinationSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Destination",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Document Upload"
        component={DocumentUploadSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Document Upload",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Preview"
        component={PreviewSellLeather}
        options={{
          headerBackVisible: false,
          headerTitle: "Preview",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Packing List"
        component={PackingListUploadImageSellLeather}
        options={{
          //headerBackVisible: false,
          headerTitle: "Packing List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="Product Details"
        component={IndividualProductSearchTanneriesBuyLeather}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Product Details",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="PreviewDocsCertificatesSellLeather"
        component={PreviewDocsCertificatesSellLeather}
        options={{
          //headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Docs/Certificates",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <SellTab.Screen
        name="PreviewPackingListSellLeather"
        component={PreviewPackingListSellLeather}
        options={{
          headerBackVisible: false,
          headerBackTitle: "",
          headerTitle: "Packing List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </SellTab.Navigator>
  );
};

export const FeedbackNavigator = () => {
  return (
    <FeedbackTab.Navigator>
      <FeedbackTab.Screen
        name="Feedback"
        component={Feedback}
        options={({ navigation }) => ({
          headerBackVisible: false,
          //headerShown:false,
          headerTitle: "Feedback",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          //headerRight:()=>(<View><Text onPress={()=>{navigation.navigate("Approval List")}} style={{color:'white', fontSize:16, fontWeight:'bold'}}>Approval List</Text></View>)
        })}
      />
      <FeedbackTab.Screen
        name="Approval List"
        component={ApprovalListFeedback}
        options={({ navigation }) => ({
          //headerBackVisible: false,
          headerTitle: "Approval List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: "",
          // headerRight:()=>(<View><Text onPress={()=>{navigation.navigate("ListFeedback")}} style={{color:'white', fontSize:20, fontWeight:'bold'}}>List</Text></View>)
        })}
      />
      <FeedbackTab.Screen
        name="Tanneries List"
        component={TanneriesListFeedback}
        options={({ navigation }) => ({
          //rheaderBackVisible: false,
          headerTitle: "Tanneries List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: "",
          // headerRight:()=>(<View><Text onPress={()=>{navigation.navigate("ApprovalListFeedback")}} style={{color:'white', fontSize:20, fontWeight:'bold'}}>List</Text></View>)
        })}
      />
      <FeedbackTab.Screen
        name="Tanneries Profile"
        component={TanneriesProfileFeedback}
        options={{
          //headerBackVisible: false,
          headerTitle: "Tanneries Profile",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: "",
        }}
      />
      <FeedbackTab.Screen
        name="Feedback List"
        component={ListFeedback}
        options={{
          //headerBackVisible: false,
          headerTitle: "Feedback List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: "",
        }}
      />
      <FeedbackTab.Screen
        name="Agent List"
        component={AgentsListFeedback}
        options={({ navigation }) => ({
          //headerBackVisible: false,
          headerTitle: "Agent List",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: "",
          // headerRight:()=>(<View><Text onPress={()=>{navigation.navigate("ApprovalListFeedback")}} style={{color:'white', fontSize:20, fontWeight:'bold'}}>List</Text></View>)
        })}
      />
      <FeedbackTab.Screen
        name="Agents Profile"
        component={AgentsProfileFeedback}
        options={{
          //headerBackVisible: false,
          headerTitle: "Agents Profile",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.headerBackground },
          headerTintColor: "white",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: "",
        }}
      />
    </FeedbackTab.Navigator>
  );
};

export const TabNavigator = () => {
  const isFocused = useIsFocused();

  const [userType, setUserType] = useState();
  const setDetails = async () => {
    setUserType(await AsyncStorage.getItem("user_type"));
  };
  useEffect(() => {
    setDetails();
  });
  console.log(">>>>>@@@>>>>>>", userType);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {isFocused ? (
        <HomeTabNavigator.Navigator
          initialRouteName="Home "
          screenOptions={({ props }) => ({
            tabBarInactiveTintColor: "#dbdbdb",
            tabBarActiveTintColor: "white",
            tabBarStyle: { height: Platform.OS == "android" ? 60 : 100 },
            tabBarShowLabel: true,
            // tabBarShowLabel:false,
            // tabBarLabel:()=>(<View style={{paddingBottom:10}}><Text>H</Text></View>),
            tabBarLabelStyle: { margin: 0, padding: 0, flex: 1 },
            tabBarIconStyle: {},
            tabBarItemStyle: { justifyContent: "center", flex: 1 },
            tabBarIconStyle: { marginTop: 12 },
            //tabBarLabelStyle:({ marginBottom:6}),
            tabBarBackground: (props) => (
              <View
                style={{ backgroundColor: Colors.headerBackground, flex: 1 }}
              ></View>
            ),
          })}
        >
          <HomeTabNavigator.Screen
            name="Home"
            component={HomeScreens}
            options={({ navigation }) => ({
              tabBarIcon: ({ focused }) =>
                focused ? (
                  // <Icon name="home" size={26} color={"white"} />
                  <Image
                    source={require("../assets/BottomTabIcons/HOMEWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 30 : 35,
                      height: Platform.OS == "android" ? 30 : 35,
                      tintColor: "white",
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ) : (
                  // <Icon name="home-outline" size={24} color={'#dbdbdb'} />
                  <Image
                    source={require("../assets/BottomTabIcons/HOMEWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 25 : 30,
                      height: Platform.OS == "android" ? 25 : 30,
                      tintColor: "white",
                      opacity: 0.8,
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ),
              tabBarActiveTintColor: "white",
              //  tabBarLabel:({focused})=>focused?(<Text allowFontScaling={false} style={{color:'white', fontSize:9, marginBottom:9}}>Home</Text>):(<Text allowFontScaling={false} style={{color:'#dbdbdb',fontSize:9, marginBottom:9}}>Home</Text>),
              tabBarItemStyle: {},
              tabBarAllowFontScaling: true,
              tabBarInactiveTintColor: "#dbdbdb",
              headerShown: false,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: Colors.headerBackground },
              headerTintColor: "white",
              headerTitleStyle: { fontWeight: "bold" },
            })}
          />

          <HomeTabNavigator.Screen
            name="Buy "
            component={BuyTabScreens}
            options={({ navigation }) => ({
              tabBarIcon: ({ focused }) =>
                focused ? (
                  // <Image source={require('../assets/ByClient/BUYGREEN.png')} style={{width:Platform.OS=='android'?40:35, height:Platform.OS=='android'?40:35, tintColor: "white", }} resizeMode={Platform.OS=='android'?'center':'contain'} />

                  <Image
                    source={require("../assets/BottomTabIcons/BUYWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 30 : 35,
                      height: Platform.OS == "android" ? 30 : 35,
                      tintColor: "white",
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ) : (
                  // <Image source={require('../assets/ByClient/BUYWHITE.png')} style={{width:Platform.OS=='android'?31:30, height:Platform.OS=='android'?31:30, tintColor: '#dbdbdb'}}  resizeMode={Platform.OS=='android'?'center':'contain'}  />
                  <Image
                    source={require("../assets/BottomTabIcons/BUYWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 25 : 30,
                      height: Platform.OS == "android" ? 25 : 30,
                      tintColor: "white",
                      opacity: 0.8,
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ),
              headerTitleAlign: "center",
              // tabBarLabel: ({ focused }) => focused ? (<Text allowFontScaling={false} style={{ color: 'white', fontSize: 9, marginBottom: 9 }}>Buy</Text>) : (<Text allowFontScaling={false} style={{ color: '#dbdbdb', fontSize: 10, marginBottom: 10 }}>Buy</Text>),
              headerShown: false,
              //headerTitle: "Buy Leathers",
              headerStyle: { backgroundColor: Colors.headerBackground },
              headerTintColor: "white",
              headerTitleStyle: { fontWeight: "bold" },
            })}
          />

          {userType != "Agents" && (
            <HomeTabNavigator.Screen
              name="Sell"
              component={SellTabScreens}
              options={({ navigation }) => ({
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    // <Image source={require('../assets/ByClient/SELLGREEN.png')} style={{width:Platform.OS=='android'?40:35, height:Platform.OS=='android'?40:35, tintColor: "white", }} resizeMode={Platform.OS=='android'?'center':'contain'}  />
                    <Image
                      source={require("../assets/BottomTabIcons/SELLWHITE.png")}
                      style={{
                        marginBottom: 10,
                        width: Platform.OS == "android" ? 30 : 35,
                        height: Platform.OS == "android" ? 30 : 35,
                        tintColor: "white",
                      }}
                      resizeMode={
                        Platform.OS == "android" ? "center" : "contain"
                      }
                    />
                  ) : (
                    // <Image source={require('../assets/ByClient/SELLWHITE.png')} style={{width:Platform.OS=='android'?35:30, height:Platform.OS=='android'?35:30, tintColor: '#dbdbdb'}}  resizeMode={Platform.OS=='android'?'center':'contain'}  />
                    <Image
                      source={require("../assets/BottomTabIcons/SELLWHITE.png")}
                      style={{
                        marginBottom: 10,
                        width: Platform.OS == "android" ? 25 : 30,
                        height: Platform.OS == "android" ? 25 : 30,
                        tintColor: "white",
                        opacity: 0.8,
                      }}
                      resizeMode={
                        Platform.OS == "android" ? "center" : "contain"
                      }
                    />
                  ),
                headerShown: false,
                //  tabBarLabel: ({ focused }) => focused ? (<Text allowFontScaling={false} style={{ color: 'white', fontSize: 9, marginBottom: 9 }}>Sell</Text>) : (<Text allowFontScaling={false} style={{ color: '#dbdbdb', fontSize: 9, marginBottom: 9 }}>Sell</Text>),
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: Colors.headerBackground },
                headerTintColor: "white",
                headerTitleStyle: { fontWeight: "bold" },
              })}
            />
          )}
          <HomeTabNavigator.Screen
            name="Feedback "
            component={FeedbackNavigator}
            options={({ navigation }) => ({
              tabBarIcon: ({ focused }) =>
                focused ? (
                  // <Image source={require('../assets/ByClient/FEEDBACKGREEN.png')} style={{width:Platform.OS=='android'?35:35, height:Platform.OS=='android'?35:35, tintColor: "white", }} resizeMode={Platform.OS=='android'?'center':'contain'}  />
                  <Image
                    source={require("../assets/BottomTabIcons/FEEDBACKWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 30 : 35,
                      height: Platform.OS == "android" ? 30 : 35,
                      tintColor: "white",
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ) : (
                  // <Image source={require('../assets/ByClient/FEEDBACKWHITE.png')} style={{width:Platform.OS=='android'?30:30, height:Platform.OS=='android'?30:30, tintColor: '#dbdbdb'}}  resizeMode={Platform.OS=='android'?'center':'contain'}  />
                  <Image
                    source={require("../assets/BottomTabIcons/FEEDBACKWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 25 : 30,
                      height: Platform.OS == "android" ? 25 : 30,
                      tintColor: "white",
                      opacity: 0.8,
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ),
              headerShown: false,
              //  tabBarLabel:({focused})=>focused?(<Text allowFontScaling={false} style={{color:'white', fontSize:9, marginBottom:9}}>Feedback</Text>):(<Text allowFontScaling={false} style={{color:'#dbdbdb',fontSize:9, marginBottom:9}}>Feedback</Text>),
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: Colors.headerBackground },
              headerTintColor: "white",
              headerTitleStyle: { fontWeight: "bold" },
            })}
          />
          <HomeTabNavigator.Screen
            name="Profile"
            component={ProfileTabScreens}
            options={({ navigation }) => ({
              tabBarIcon: ({ focused }) =>
                focused ? (
                  // <Icon name="person" size={26} color={"white"} />
                  // <Image source={require('../assets/ByClient/PROFILEGREEN.png')} style={{width:Platform.OS=='android'?35:35, height:Platform.OS=='android'?35:35, tintColor: "white", }} resizeMode={Platform.OS=='android'?'center':'contain'}  />
                  <Image
                    source={require("../assets/BottomTabIcons/PROFILEWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 30 : 35,
                      height: Platform.OS == "android" ? 30 : 35,
                      tintColor: "white",
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ) : (
                  // <Icon name="person-outline" size={24} color={'#dbdbdb'} />
                  // <Image source={require('../assets/ByClient/PROFILEWHITE.png')} style={{width:Platform.OS=='android'?30:30, height:Platform.OS=='android'?30:30, tintColor: '#dbdbdb'}}  resizeMode={Platform.OS=='android'?'center':'contain'}  />
                  <Image
                    source={require("../assets/BottomTabIcons/PROFILEWHITE.png")}
                    style={{
                      marginBottom: 10,
                      width: Platform.OS == "android" ? 25 : 30,
                      height: Platform.OS == "android" ? 25 : 30,
                      tintColor: "white",
                      opacity: 0.8,
                    }}
                    resizeMode={Platform.OS == "android" ? "center" : "contain"}
                  />
                ),
              headerShown: false,
              // tabBarLabel:({focused})=>focused?(<Text allowFontScaling={false} style={{color:'white', fontSize:9, marginBottom:9}}>Profile</Text>):(<Text allowFontScaling={false} style={{color:'#dbdbdb',fontSize:9, marginBottom:9}}>Profile</Text>),
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: Colors.headerBackground },
              headerTintColor: "white",
              headerTitleStyle: { fontWeight: "bold" },
            })}
          />
        </HomeTabNavigator.Navigator>
      ) : null}
    </View>
  );
};

// export const DrawerTabScreens=()=>{
//   return(<DrawerTab.Navigator>
//     <DrawerTab.Screen name="Drawerssss" component={DrawerTestScreen}  />
//   </DrawerTab.Navigator>)
// }
// export default DrawerTabScreens;

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name='Drawer' component={DrawerTabScreens} /> */}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerStyle: { backgroundColor: Colors.status },
        }}
      />
      <Stack.Screen
        name="RegisterAs"
        component={RegisterAs}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerStyle: { backgroundColor: Colors.status },
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerStyle: { backgroundColor: Colors.status },
        }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerStyle: { backgroundColor: Colors.status },
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          animation: "slide_from_left",
          headerShown: false,
          headerStyle: { backgroundColor: Colors.status },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
