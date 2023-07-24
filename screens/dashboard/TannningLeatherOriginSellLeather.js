import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator, KeyboardAvoidingView, Platform
} from "react-native";
import axios from "axios";
import { Button, Menu, Divider, Provider, TextInput } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import Constants from "expo-constants";


import Colors from "../../constants/Colors";
import RegisterButton from "../../components/RegisterButton";
import SpinView from "../../components/Spin";


const data2 = [

  { label: "I-A-TR1", value: "1" },
  { label: "II-B-TR2", value: "2" },
  { label: "III-C-TR3", value: "3" },
  { label: "IV-D-TR4", value: "4" },
  { label: "V-E", value: "5" },
  { label: "VI-F", value: "6" },
  { label: "VII-G-Waste", value: "7" },
];

const TanningLeatherOriginSellLeather = (props) => {
  var productName = props.route.params.productName;
  var category = props.route.params.category;
  var subCategory = props.route.params.subCategory;
  var size = props.route.params.size;
  var leatherCondition = props.route.params.leatherCondition;
  var tanningLeather = props.route.params.tanningLeather;
  var preservationType = props.route.params.preservationType;

  // country starts
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [countryDropDown, setCountryDropDown] = useState(undefined);
  const [continentDropDown, setContinentDropDown] = useState(undefined);
  const [Specification, setSpecification] = useState(undefined);




  const populateCountryOrOrigin = (continent) => {
    // setApiLoader(true);
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewAllCountryListBYContinent/ViewAllCountryListBYContinent.php?continent_name=${continent.name}`;

    axios.get(webApirUrl).then((res) => {
      setCountryDropDown(res.data.Country_List);
      // setApiLoader(false);
      // setDataloaded(true);
    })
  }


  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  console.log("value of country=" + label);

  //   country ends



  // continent starts//
  useEffect( () => {
    if (dataLoad == false) {
      setApiLoader(true)
      let webApirUrl = 'https://www.hidetrade.eu/app/APIs/ViewAllContinents/ViewAllContinents.php'
      axios.get(webApirUrl).then((res) => {
        console.log("🚀 ~ file: TannningLeatherOriginSellLeather.js ~ line 88 ~ axios.get ~ res", res.data)
        setContinentDropDown(res.data.Continents_List);
        setApiLoader(false)
        setDataloaded(true)
      })
    }
  })



  const [valueContinent, setValueContinent] = useState(null);
  const [labelContinent, setLabelContinent] = useState(null);
  const [isFocusContinent, setIsFocusContinent] = useState(false);


  //contenent end//

  const [valueSpecification, setValueSpecification] = useState(null);
  const [labelSpecification, setlabelSpecification] = useState(null);
  const [isFocusSpecification, setIsFocusSpecification] = useState(false);




  // weight  starts
  const data = [
    { id: "1", weight: "Min" },
    { id: "2", weight: "Max" },
    { id: "3", weight: "Average" },
  ];

  const [selectedWeight, setSelectedWeight] = useState([]);
  const [weight, setWeight] = useState(data);
  const [weightDropDown, setWeightDropDown] = useState(undefined);

  useEffect(() => {
    let webApiUrl = `https://www.hidetrade.eu/app/APIs/ViewAllMeasurementUnits/ViewAllMeasurementUnits.php`;
    axios.get(webApiUrl).then((res) => {
      console.log("response for weight=" + JSON.stringify(res.data));
      setWeightDropDown(res.data.measurement_units);
    });
  }, []);
  const [valueWeight, setValueWeight] = useState(null);
  const [labelWeight, setLabelWeight] = useState(null);
  const [isFocusWeight, setIsFocusWeight] = useState(false);

  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [avgWeight, setAvgWeight] = useState('');

  // const renderWeight = ({ item, index }) => {
  //   const { id, weight } = item;
  //   const isSelected = selectedWeight.filter((i) => i === weight).length > 0;
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         if (isSelected) {
  //           setSelectedWeight((prev) => prev.filter((i) => i !== weight));
  //         } else {
  //           setSelectedWeight((prev) => [weight]);
  //         }
  //       }}
  //       style={[
  //         styles.item,
  //         isSelected && {
  //           backgroundColor: Colors.buttonBackground,
  //           borderColor: Colors.buttonBackground,
  //         },
  //       ]}
  //     >
  //       <Text
  //         style={{
  //           color: isSelected ? "white" : "black",
  //           fontWeight: "600",
  //           fontSize: 14,
  //         }}
  //       >
  //         {weight}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  // weight ends

  //surface starts
  const dataSurface = [
    { id: "1", surface: "Min" },
    { id: "2", surface: "Max" },
    { id: "3", surface: "Average" },
  ];

  const [selectedSurface, setSelectedSurface] = useState([]);
  const [surface, setSurface] = useState(dataSurface);
  const [surfaceDropDown, setSurfaceDropDown] = useState(undefined);

  useEffect(() => {
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewAllSurfaceMeasurementUnits/ViewAllSurfaceMeasurementUnits.php`;
    axios.get(webApirUrl).then((res) => {
      setSurfaceDropDown(res.data.surface_measurement_units);
    });
  }, []);

  const [valueSurface, setValueSurface] = useState(null);
  const [labelSurface, setLabelSurface] = useState(null);
  const [isFocusSurface, setIsFocusSurface] = useState(false);

  const [minSurface, setMinSurface] = useState('');
  const [maxSurface, setMaxSurface] = useState('');
  const [avgSurface, setAvgSurface] = useState('');

  // const renderSurface = ({ item, index }) => {
  //   const { id, surface } = item;
  //   const isSelected = selectedSurface.filter((i) => i === surface).length > 0;
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         if (isSelected) {
  //           setSelectedSurface((prev) => prev.filter((i) => i !== surface));
  //         } else {
  //           setSelectedSurface((prev) => [surface]);
  //         }
  //       }}
  //       style={[
  //         styles.item,
  //         isSelected && {
  //           backgroundColor: Colors.buttonBackground,
  //           borderColor: Colors.buttonBackground,
  //         },
  //       ]}
  //     >
  //       <Text
  //         style={{
  //           color: isSelected ? "white" : "black",
  //           fontWeight: "600",
  //           fontSize: 14,
  //         }}
  //       >
  //         {surface}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  //surface ends

  //Table Roll Leather starts

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [tableRollDropDown, setTableRollDropDown] = useState(undefined);

  const [priceDropDown, setPriceDropDown] = useState(undefined);

  useEffect(() => {
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewAllSelectionMeasurementUnits/ViewAllSelectionMeasurementUnits.php`;
    axios.get(webApirUrl).then((res) => {
      console.log(
        "table roll down=" +
        JSON.stringify(res.data.selection_measurement_units)
      );
      setTableRollDropDown(res.data.selection_measurement_units);
    });
  }, []);

  const [valueTableRoll, setValueTableRoll] = useState(null);
  const [labelTableRoll, setLabelTableRoll] = useState(null);
  const [isFocusTableRoll, setIsFocusTableRoll] = useState(false);

  useEffect(() => {
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewAllSelectionPriceMeasurementUnits/ViewAllSelectionPriceMeasurementUnits.php`;
    axios.get(webApirUrl).then((res) => {
      console.log(
        "response in price=" +
        JSON.stringify(res.data.selection_price_measurement_units)
      );
      setPriceDropDown(res.data.selection_price_measurement_units);
      console.log("hahahah" + res.data.selection_price_measurement_units)
      setPriceDropDownSelection(res.data.selection_price_measurement_units);
      setPriceDropDownSelection2(res.data.selection_price_measurement_units);
      setPriceDropDownSelection3(res.data.selection_price_measurement_units);
      setPriceDropDownSelection4(res.data.selection_price_measurement_units);
      setPriceDropDownSelection5(res.data.selection_price_measurement_units);
      setPriceDropDownSelection6(res.data.selection_price_measurement_units);
      setPriceDropDownSelection7(res.data.selection_price_measurement_units);
    });
  }, []);

  const [valueTablePrice, setValueTablePrice] = useState(null);
  const [labelTablePrice, setLabelTablePrice] = useState(null);
  const [isFocusTablePrice, setIsFocusTablePrice] = useState(false);

  const [quantityTableRoll, setQuantityTableRoll] = useState('');
  const [priceTableRoll, setPriceTableRoll] = useState('');
  const [SpecificationsTableRoll, setSpecificationsTableRoll] = useState('');



  //Table roll leather ends

  //selection starts
  const [toggleCheckBoxSelected, setToggleCheckBoxSelected] = useState(false);
  const [selectionDropDown, setSelectionDropDown] = useState(undefined);

  const [selectionUnitDropDown, setSelectionUnitDropDown] = useState(undefined);

  const [priceDropDownSelection, setPriceDropDownSelection] =  useState(undefined);
   
  const [quantitySelection, setQuantitySelection] = useState('');
  const [priceSelection, setPriceSelection] = useState('')
  

  useEffect(() => {
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewAllSelectionMeasurementUnits/ViewAllSelectionMeasurementUnits.php`;
    axios.get(webApirUrl).then((res) => {
      console.log(
        "selection of dropdown=" +
        JSON.stringify(res.data.selection_measurement_units)
      );
      setSelectionUnitDropDown(res.data.selection_measurement_units);
      setSelectionUnitDropDown2(res.data.selection_measurement_units);
      setSelectionUnitDropDown3(res.data.selection_measurement_units);
      setSelectionUnitDropDown4(res.data.selection_measurement_units);
      setSelectionUnitDropDown5(res.data.selection_measurement_units);
      setSelectionUnitDropDown6(res.data.selection_measurement_units);
      setSelectionUnitDropDown7(res.data.selection_measurement_units);
    });
  }, []);

  const [valueSelection, setValueSelection] = useState(null);
  const [labelSelection, setLabelSelection] = useState(null);
  const [isFocusSelection, setIsFocusSelection] = useState(false);

  const [valueSelectionUnit, setValueSelectionUnit] = useState(null);
  const [labelSelectionUnit, setLabelSelectionUnit] = useState(null);
  const [isFocusSelectionUnit, setIsFocusSelectionUnit] = useState(false);

  useEffect(() => {
    let webApirUrl = `https://www.hidetrade.eu/app/APIs/ViewAllSelectionTypeList/ViewAllSelectionTypeList.php`;
    axios.get(webApirUrl).then((res) => {
      console.log("selection response=" + JSON.stringify(res.data));
      setSelectionDropDown(res.data.Output);
      setSelectionDropDown2(res.data.Output);
      setSelectionDropDown3(res.data.Output);
      setSelectionDropDown4(res.data.Output);
      setSelectionDropDown5(res.data.Output);
      setSelectionDropDown6(res.data.Output);
      setSelectionDropDown7(res.data.Output)
    });
  }, []);
  console.log('selection drop down=' + selectionDropDown)
  const [valueSelectionPrice, setValueSelectionPrice] = useState(null);
  const [labelSelectionPrice, setLabelSelectionPrice] = useState(null);
  const [isFocusSelectionPrice, setIsFocusSelectionPrice] = useState(false);
  //selection ends

  //selection 2 starts

  const [selectionDropDown2, setSelectionDropDown2] = useState(undefined);

  const [selectionUnitDropDown2, setSelectionUnitDropDown2] =
    useState(undefined);

  const [priceDropDownSelection2, setPriceDropDownSelection2] =
    useState(undefined);

  const [valueSelection2, setValueSelection2] = useState(null);
  const [labelSelection2, setLabelSelection2] = useState(null);
  const [isFocusSelection2, setIsFocusSelection2] = useState(false);

  const [valueSelectionUnit2, setValueSelectionUnit2] = useState(null);
  const [labelSelectionUnit2, setLabelSelectionUnit2] = useState(null);
  const [isFocusSelectionUnit2, setIsFocusSelectionUnit2] = useState(false);

  const [valueSelectionPrice2, setValueSelectionPrice2] = useState(null);
  const [labelSelectionPrice2, setLabelSelectionPrice2] = useState(null);
  const [isFocusSelectionPrice2, setIsFocusSelectionPrice2] = useState(false);

  const [quantitySelection2, setQuantitySelection2] = useState('');
  const [priceSelection2, setPriceSelection2] = useState('');

  // selection 2 ends

  //selection 3 starts

  const [selectionDropDown3, setSelectionDropDown3] = useState(undefined);

  const [selectionUnitDropDown3, setSelectionUnitDropDown3] =
    useState(undefined);

  const [priceDropDownSelection3, setPriceDropDownSelection3] =
    useState(undefined);

  const [valueSelection3, setValueSelection3] = useState(null);
  const [labelSelection3, setLabelSelection3] = useState(null);
  const [isFocusSelection3, setIsFocusSelection3] = useState(false);

  const [valueSelectionUnit3, setValueSelectionUnit3] = useState(null);
  const [labelSelectionUnit3, setLabelSelectionUnit3] = useState(null);
  const [isFocusSelectionUnit3, setIsFocusSelectionUnit3] = useState(false);

  const [valueSelectionPrice3, setValueSelectionPrice3] = useState(null);
  const [labelSelectionPrice3, setLabelSelectionPrice3] = useState(null);
  const [isFocusSelectionPrice3, setIsFocusSelectionPrice3] = useState(false);

  const [quantitySelection3, setQuantitySelection3] = useState('');
  const [priceSelection3, setPriceSelection3] = useState('');

  // selection 3 ends

  //selection 4 starts

  const [selectionDropDown4, setSelectionDropDown4] = useState(undefined);

  const [selectionUnitDropDown4, setSelectionUnitDropDown4] =
    useState(undefined);

  const [priceDropDownSelection4, setPriceDropDownSelection4] =
    useState(undefined);

  const [valueSelection4, setValueSelection4] = useState(null);
  const [labelSelection4, setLabelSelection4] = useState(null);
  const [isFocusSelection4, setIsFocusSelection4] = useState(false);

  const [valueSelectionUnit4, setValueSelectionUnit4] = useState(null);
  const [labelSelectionUnit4, setLabelSelectionUnit4] = useState(null);
  const [isFocusSelectionUnit4, setIsFocusSelectionUnit4] = useState(false);

  const [valueSelectionPrice4, setValueSelectionPrice4] = useState(null);
  const [labelSelectionPrice4, setLabelSelectionPrice4] = useState(null);
  const [isFocusSelectionPrice4, setIsFocusSelectionPrice4] = useState(false);

  const [quantitySelection4, setQuantitySelection4] = useState('');
  const [priceSelection4, setPriceSelection4] = useState('');

  // selection 4 ends

  //selection 5 starts

  const [selectionDropDown5, setSelectionDropDown5] = useState(undefined);

  const [selectionUnitDropDown5, setSelectionUnitDropDown5] =
    useState(undefined);

  const [priceDropDownSelection5, setPriceDropDownSelection5] =
    useState(undefined);

  const [valueSelection5, setValueSelection5] = useState(null);
  const [labelSelection5, setLabelSelection5] = useState(null);
  const [isFocusSelection5, setIsFocusSelection5] = useState(false);

  const [valueSelectionUnit5, setValueSelectionUnit5] = useState(null);
  const [labelSelectionUnit5, setLabelSelectionUnit5] = useState(null);
  const [isFocusSelectionUnit5, setIsFocusSelectionUnit5] = useState(false);

  const [valueSelectionPrice5, setValueSelectionPrice5] = useState(null);
  const [labelSelectionPrice5, setLabelSelectionPrice5] = useState(null);
  const [isFocusSelectionPrice5, setIsFocusSelectionPrice5] = useState(false);

  const [quantitySelection5, setQuantitySelection5] = useState('');
  const [priceSelection5, setPriceSelection5] = useState('');

  // selection 5 ends

  //selection 6 starts
  const [selectionDropDown6, setSelectionDropDown6] = useState(undefined);

  const [selectionUnitDropDown6, setSelectionUnitDropDown6] =
    useState(undefined);

  const [priceDropDownSelection6, setPriceDropDownSelection6] =
    useState(undefined);

  const [valueSelection6, setValueSelection6] = useState(null);
  const [labelSelection6, setLabelSelection6] = useState(null);
  const [isFocusSelection6, setIsFocusSelection6] = useState(false);

  const [valueSelectionUnit6, setValueSelectionUnit6] = useState(null);
  const [labelSelectionUnit6, setLabelSelectionUnit6] = useState(null);
  const [isFocusSelectionUnit6, setIsFocusSelectionUnit6] = useState(false);

  const [valueSelectionPrice6, setValueSelectionPrice6] = useState(null);
  const [labelSelectionPrice6, setLabelSelectionPrice6] = useState(null);
  const [isFocusSelectionPrice6, setIsFocusSelectionPrice6] = useState(false);

  const [quantitySelection6, setQuantitySelection6] = useState('');
  const [priceSelection6, setPriceSelection6] = useState('');

  //selection 6 ends

  //selection 7 starts

  const [selectionDropDown7, setSelectionDropDown7] = useState(undefined);

  const [selectionUnitDropDown7, setSelectionUnitDropDown7] =
    useState(undefined);

  const [priceDropDownSelection7, setPriceDropDownSelection7] =
    useState(undefined);

  const [valueSelection7, setValueSelection7] = useState(null);
  const [labelSelection7, setLabelSelection7] = useState(null);
  const [isFocusSelection7, setIsFocusSelection7] = useState(false);

  const [valueSelectionUnit7, setValueSelectionUnit7] = useState(null);
  const [labelSelectionUnit7, setLabelSelectionUnit7] = useState(null);
  const [isFocusSelectionUnit7, setIsFocusSelectionUnit7] = useState(false);

  const [valueSelectionPrice7, setValueSelectionPrice7] = useState(null);
  const [labelSelectionPrice7, setLabelSelectionPrice7] = useState(null);
  const [isFocusSelectionPrice7, setIsFocusSelectionPrice7] = useState(false);

  const [quantitySelection7, setQuantitySelection7] = useState('');
  const [priceSelection7, setPriceSelection7] = useState('');

  //selection 7 ends

  // const onChangeText=(text)=>{
  //   //const validated = text.match(/^[a-zA-Z]*$/g)
  //   const re=/^\d+\.\d{0,2}$/
  //   // if(re.test(text)){
  //     if(re.test(text)){
  //     console.log('from value inside reg')
  //     setMinWeight(text)
  //   }
  // }

  console.log('weight from origin=' + minWeight)


  //  const addCommas = num => num.toString().replace(/\B(?=(\d{2}))/g, ",");
  //  const addCommas = num => num.toString().replace(/.(?=(..)*...$)/g, '$&,');
  //const addCommas = num => num.toString().match(/\B(?=(\d{2})(\d{2})(\d{3}))/).slice(1).join(',')
  // var validNumber = new RegExp(/^[1-9]\d(?:,[1-9]\d){0,2}$/)

  const handleChangeMinWeight = (event) => {
    let x, i
    if (minWeight.length == 2) {
      x = minWeight + ",";
      for (i = 2; i <= minWeight.length; i++) {
        x = x + event[i]
      }
    } else {
      x = event
    }
    setMinWeight(x)
  };

  const handleChangeMaxWeight = (event) => {
    let x, i
    if (maxWeight.length == 2) {
      x = maxWeight + ",";
      for (i = 2; i <= maxWeight.length; i++) {
        x = x + event[i]
      }
    } else {
      x = event
    }
    setMaxWeight(x)
  };

  const handleChangeAvgWeight = (event) => {
    let x, i
    if (avgWeight.length == 2) {
      x = avgWeight + ",";
      for (i = 2; i <= avgWeight.length; i++) {
        x = x + event[i]
      }
    } else {
      x = event
    }
    setAvgWeight(x)
  };

  const handleChangeMaxSurface = (event) => {
    let x, i
    if (maxSurface.length == 2) {
      x = maxSurface + ",";
      for (i = 2; i <= maxSurface.length; i++) {
        x = x + event[i]
      }
    } else {
      x = event
    }
    setMaxSurface(x)
  };

  const handleChangeMinSurface = (event) => {
    let x, i
    if (minSurface.length == 2) {
      x = minSurface + ",";
      for (i = 2; i <= minSurface.length; i++) {
        x = x + event[i]
      }
    } else {
      x = event
    }
    setMinSurface(x)
  };

  const handleChangeAvgSurface = (event) => {
    let x, i
    if (avgSurface.length == 2) {
      x = avgSurface + ",";
      for (i = 2; i <= avgSurface.length; i++) {
        x = x + event[i]
      }
    } else {
      x = event
    }
    setAvgSurface(x)
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }} behavior={Platform.OS === "ios" && "padding"}>
      {/* // <Provider> */}

      <View style={{ flex: 1 }}>
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
          // /><ActivityIndicator size={"large"} color='red' />
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
          <View style={{ marginHorizontal: 10, marginTop: 10, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text allowFontScaling={false} style={styles.headingIndividual}>
                Origin, Qualities and prices
              </Text>


              <View>
                <Dropdown
                  style={[styles.dropdown1, isFocusContinent && { borderColor: "black" }]}
                  placeholderStyle={{ fontSize: 16 }}
                  selectedTextStyle={styles.selectedTextStyle1}
                  inputSearchStyle={styles.inputSearchStyle1}
                  iconStyle={styles.iconStyle1}
                  data={continentDropDown}
                  //search
                  //maxHeight={300}
                  labelField="name"
                  valueField="code_1"
                  maxHeight={200}
                  placeholder={!isFocusContinent ? "Continents" : "..."}
                  //searchPlaceholder="Search..."
                  value={valueContinent}
                  onFocus={() => setIsFocusContinent(true)}
                  onBlur={() => setIsFocusContinent(false)}
                  onChange={(item) => {
                    console.log("🚀 ~ file: TannningLeatherOriginSellLeather.js ~ line 655 ~ //onChangeText ~ item", item)
                    setValueContinent(item.code_1);
                    setLabelContinent(item.name);
                    setIsFocusContinent(false);
                    populateCountryOrOrigin(item)
                  }}
                />
              </View>


              <View>
                {/* Country starts */}

                {/* {renderLabel()} */}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                  placeholderStyle={{ fontSize: 16 }}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={countryDropDown}
                  search
                  labelField="name"
                  valueField="id"
                  allowFontScaling={false}
                  //maxHeight={400}
                  placeholder={!isFocus ? " Origin " : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.id);
                    setLabel(item.name);
                    setIsFocus(false);
                  }}
                />{console.log('country=' + value)}

                {/* Country Ends */}
              </View>



              {/* weight category starts */}
              <View style={{ marginVertical: 20 }}>
                <Text allowFontScaling={false} style={styles.headingIndividual}>Weight Category</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                  <TextInput
                    mode="outlined"
                    label={"Min"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    //  value={minWeight==""?minWeight: parseFloat(minWeight).toFixed(2)}
                    //value={minWeight.toString()}
                    //value={minWeight.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    //value={minWeight==null || minWeight==''?'':parseInt(minWeight.  .match(/(\d{2})(\d{2})(\d{3})/).slice(1).join(',')) }
                    // value={minWeight==""?minWeight: parseFloat(minWeight)}
                    // onChangeText={(value)=>setMinWeight(value.length>2?(value.match(/(\d{2})(\d{2})(\d{3})/).slice(1).join(',')):value)} 
                    //value={minWeight.toLocaleString('en-IN', {maximumFractionDigits:0})}
                    // value={new Intl.NumberFormat("en-IN").format(minWeight)}
                    value={minWeight}
                    // onChangeText={handleChange}
                    onChangeText={handleChangeMinWeight}
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}

                  />
                  <TextInput
                    mode="outlined"
                    label={"Max"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    // value={maxWeight==""?maxWeight: parseFloat(maxWeight).toFixed(2)}
                    // onChangeText={(value)=>setMaxWeight(value)}allowFontScaling={false}
                    value={maxWeight}
                    onChangeText={handleChangeMaxWeight}
                    allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <TextInput
                    mode="outlined"
                    label={"Average"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    // value={avgWeight==""?avgWeight: parseFloat(avgWeight).toFixed(2)}
                    // onChangeText={(value)=>setAvgWeight(value)}allowFontScaling={false}
                    value={avgWeight}
                    allowFontScaling={false}
                    onChangeText={handleChangeAvgWeight}
                    maxFontSizeMultiplier={1}
                  />
                  {/* <FlatList
                    data={weight}
                    renderItem={renderWeight}
                    numColumns={3}
                    scrollEnabled={false}
                  /> */}
                  <Dropdown
                    style={[
                      styles.dropdownWeight,
                      isFocusWeight && { borderColor: "black" },
                    ]}
                    // containerStyle={{ height: 30 }}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={weightDropDown}
                    allowFontScaling={false}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusWeight ? "UM" : "..."}
                    value={valueWeight}
                    onFocus={() => setIsFocusWeight(true)}
                    onBlur={() => setIsFocusWeight(false)}
                    onChange={(item) => {
                      setValueWeight(item.id);
                      setLabelWeight(item.unit_code);
                      setIsFocusWeight(false);
                    }}
                  />
                </View>
              </View>
              {/* weight category ends */}

              {/* <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} /> */}

              {/* Surface category starts */}
              <View style={{ marginVertical: 20 }}>
                <Text allowFontScaling={false} style={styles.headingIndividual}>Surface Category</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                  <TextInput
                    mode="outlined"
                    label={"Min"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    allowFontScaling={false}
                    // value={minSurface==""?minSurface: parseFloat(minSurface).toFixed(2)}
                    // onChangeText={(value)=>setMinSurface(value)}allowFontScaling={false}
                    value={minSurface}
                    onChangeText={handleChangeMinSurface}
                    maxFontSizeMultiplier={1}
                  />
                  <TextInput
                    mode="outlined"
                    label={"Max"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    allowFontScaling={false}
                    // value={maxSurface==""?maxSurface: parseFloat(maxSurface).toFixed(2)}
                    // onChangeText={(value)=>setMaxSurface(value)}allowFontScaling={false}
                    value={maxSurface}
                    onChangeText={handleChangeMaxSurface}
                    maxFontSizeMultiplier={1}
                  />
                  <TextInput
                    mode="outlined"
                    label={"Average"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    allowFontScaling={false}
                    // value={avgSurface==""?avgSurface: parseFloat(avgSurface).toFixed(2)}
                    // onChangeText={(value)=>setAvgSurface(value)}allowFontScaling={false}
                    value={avgSurface}
                    onChangeText={handleChangeAvgSurface}
                    maxFontSizeMultiplier={1}
                  />
                  {/* <FlatList
                    data={surface}
                    renderItem={renderSurface}
                    numColumns={3}
                    scrollEnabled={false}
                  /> */}
                  <Dropdown
                    style={[
                      styles.dropdownWeight,
                      isFocusSurface && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    allowFontScaling={false}
                    iconStyle={styles.iconStyle}
                    data={surfaceDropDown}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSurface ? "UM" : "..."}
                    value={valueSurface}
                    onFocus={() => setIsFocusSurface(true)}
                    onBlur={() => setIsFocusSurface(false)}
                    onChange={(item) => {
                      setValueSurface(item.id);
                      setLabelSurface(item.unit_code);
                      setIsFocusSurface(false);
                    }}
                  />
                </View>
              </View>
              {/* Surface category ends */}

              {/* <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} /> */}

              {/* Selections, Quantities and prices starts */}

              <View style={{ marginVertical: 25 }}>
                <Text allowFontScaling={false} style={styles.headingIndividual}>
                  Selections, Quantities and Prices
                </Text>
                <View>
                  <View style={styles.tableRollView}>
                    <Text allowFontScaling={false} style={{ color: Colors.text, fontWeight: "500" }}>
                      Table Roll Leather
                    </Text>
                    <Checkbox
                      style={{ marginLeft: 10,}}
                      disabled={false}
                      value={toggleCheckBox}
                      onValueChange={(newValue) => { setToggleCheckBox(newValue); setToggleCheckBoxSelected(!newValue) }}
                    />
                  </View>

                  <View style={styles.tableRollQuantity}>
                    <Text allowFontScaling={false} style={{ alignSelf: "center", marginRight: 20, fontWeight: 'bold' }}>
                      Quantity
                    </Text>
                    <TextInput
                      mode="outlined"
                      //label={"Quantity"}
                      style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                      activeOutlineColor={Colors.buttonBackground}
                      keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                      value={quantityTableRoll}
                      onChangeText={(value) => setQuantityTableRoll(value)} allowFontScaling={false}
                      maxFontSizeMultiplier={1}
                    />
                    <Dropdown
                      style={[
                        styles.dropdownWeight, { width: 90 },
                        isFocusTableRoll && { borderColor: "black" },
                      ]}
                      placeholderStyle={{ fontSize: 16 }}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      allowFontScaling={false}
                      data={tableRollDropDown}
                      //search
                      labelField="unit_code"
                      valueField="id"
                      maxHeight={120}
                      placeholder={!isFocusTableRoll ? "UM" : "..."}
                      value={valueTableRoll}
                      onFocus={() => setIsFocusTableRoll(true)}
                      onBlur={() => setIsFocusTableRoll(false)}
                      onChange={(item) => {
                        setValueTableRoll(item.id);
                        setLabelTableRoll(item.unit_code);
                        setIsFocusTableRoll(false);
                      }}
                    />
                  </View>

                  <View style={styles.tableRollQuantity}>
                    <Text allowFontScaling={false} style={{ alignSelf: "center", marginRight: 20, fontWeight: 'bold' }}>
                      {"       "}
                      Price
                    </Text>
                    <TextInput
                      mode="outlined"
                      //label={"Price"}
                      style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                      activeOutlineColor={Colors.buttonBackground}
                      keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                      value={priceTableRoll}
                      onChangeText={(value) => setPriceTableRoll(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                    />
                    <Dropdown
                      style={[
                        styles.dropdownWeight, { width: 90 },
                        isFocusTablePrice && { borderColor: "black" },
                      ]}
                      placeholderStyle={{ fontSize: 16 }}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      allowFontScaling={false}
                      data={priceDropDown}
                      //search
                      labelField="unit_code"
                      valueField="id"
                      maxHeight={120}
                      placeholder={!isFocusTablePrice ? "UM" : "..."}
                      value={valueTablePrice}
                      onFocus={() => setIsFocusTablePrice(true)}
                      onBlur={() => setIsFocusTablePrice(false)}
                      onChange={(item) => {
                        setValueTablePrice(item.id);
                        setLabelTablePrice(item.unit_code);
                        setIsFocusTablePrice(false);
                      }}
                    />
                  </View>


                  <View style={{ flexDirection: 'row', height: 100, width: "60%", alignSelf: 'center', marginTop: 20, }}>
                    <View style={{ width: "50%", height:100}}>
                      <Text style={{ fontSize: 15, marginTop: 20, fontWeight: "bold" }}> Specification</Text>

                    </View>
                    <View   style={{ ...styles.tableRollQuantitySpecification, width: '50%' ,height:100,}}>
                    <TextInput
                    mode="outlined"
                    // label={"Please Enter"}
                    style={{  width: '100%',height:50 }}
                    activeOutlineColor={Colors.buttonBackground}
                    placeholder="ex"
                    // keyboardType="number-pad"
                    // keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    // value={maxWeight==""?maxWeight: parseFloat(maxWeight).toFixed(2)}
                    // onChangeText={(value)=>setMaxWeight(value)}allowFontScaling={false}
                    // value={maxWeight}
                    onChangeText={(val)=>setSpecification(val)}
                    // allowFontScaling={false} maxFontSizeMultiplier={1}
                   />

                    </View>
                  
                      {/* <Dropdown
                        style={[styles.SpecificationDropdown, isFocusSpecification && { borderColor: "black" }]}
                        placeholderStyle={{ fontSize: 16 }}
                        selectedTextStyle={styles.SpecificationselectedTextStyle}
                        inputSearchStyle={styles.SpecificationinputSearchStyle}
                        iconStyle={styles.SpecificationiconStyle}
                        data={data2}
                        //search
                        //maxHeight={300}
                        labelField="label"
                        valueField="value"
                        maxHeight={300}
                        placeholder={!isFocusSpecification ? "" : "..."}
                        //searchPlaceholder="Search..."
                        value={valueSpecification
                        }
                        onFocus={() => setIsFocusSpecification(true)}
                        onBlur={() => setIsFocusSpecification(false)}
                        onChange={(item) => {
                          setValueSpecification(item.value);
                          setlabelSpecification(item.label);
                          setIsFocusSpecification(false);
                        }}
                      /> */}

                 
                  </View>






                </View>
              </View>

              {/* Selections, Quantities and prices ends */}

              <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />

              {/* selections starts */}

              <View>
                <View style={{ ...styles.tableRollView, marginBottom: 10 }}>
                  <Text allowFontScaling={false} style={{ color: Colors.text, fontWeight: "500" }}>
                    Selected Leather
                  </Text>
                  <Checkbox
                    style={{ marginLeft: 10 }}
                    disabled={false}
                    value={toggleCheckBoxSelected}
                    onValueChange={(newValue) => {
                      setToggleCheckBoxSelected(newValue)
                      setToggleCheckBox(!newValue)
                    }
                    }
                  />
                </View>

                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: Colors.buttonBackground }} allowFontScaling={false}>{selectionDropDown != undefined ? selectionDropDown[0].title : null}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginBottom: 20 }}>
                  <Text style={{ textAlignVertical: 'center', alignSelf: "center", fontWeight: 'bold', marginRight: 20 }}>Quantity </Text>
                  <TextInput
                    mode="outlined"
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={quantitySelection}
                    onChangeText={(value) => setQuantitySelection(value)} allowFontScaling={false} maxFontSizeMultiplier={1} />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionUnit && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    allowFontScaling={false}
                    data={selectionUnitDropDown}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit ? "UM" : "..."}
                    value={valueSelectionUnit}
                    onFocus={() => setIsFocusSelectionUnit(true)}
                    onBlur={() => setIsFocusSelectionUnit(false)}
                    onChange={(item) => {
                      setValueSelectionUnit(item.id);
                      setLabelSelectionUnit(item.unit_code);
                      setIsFocusSelectionUnit(false);
                    }}
                  />
                </View>
                {/* <View style={styles.tableRollQuantity}>
                  <Dropdown
                    style={[
                      styles.dropdownselection,
                      isFocusSelection && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    allowFontScaling={false}
                    iconStyle={styles.iconStyle}
                    data={selectionDropDown}
                    //search
                    labelField="title"
                    valueField="id"
                    maxHeight={330}
                    placeholder={!isFocusSelection ? "UM" : "..."}
                    value={valueSelection}
                    onFocus={() => setIsFocusSelection(true)}
                    onBlur={() => setIsFocusSelection(false)}
                    onChange={(item) => {
                      setValueSelection(item.id);
                      setLabelSelection(item.title);
                      setIsFocusSelection(false);
                    }}
                  />

                  <Text
                    style={{
                      alignSelf: "center",
                      //marginRight: 10,
                      marginLeft: 10,
                      fontWeight:'bold', marginRight:5
                    }}allowFontScaling={false} 
                  >
                    Quantity:
                  </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Quantity"}
                    style={{...styles.tableRollQuantityInput, alignSelf:'auto', height:30}}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS=='ios'?"numbers-and-punctuation":"decimal-pad"}
                    value={quantitySelection}
                    onChangeText={(value)=>setQuantitySelection(value)}allowFontScaling={false}maxFontSizeMultiplier={1}
                  ></TextInput>
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit,
                      isFocusSelectionUnit && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    allowFontScaling={false}
                    data={selectionUnitDropDown}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit ? "UM" : "..."}
                    value={valueSelectionUnit}
                    onFocus={() => setIsFocusSelectionUnit(true)}
                    onBlur={() => setIsFocusSelectionUnit(false)}
                    onChange={(item) => {
                      setValueSelectionUnit(item.id);
                      setLabelSelectionUnit(item.unit_code);
                      setIsFocusSelectionUnit(false);
                    }}
                  />
                </View> */}

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>      Price </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={priceSelection}
                    onChangeText={(value) => setPriceSelection(value)} allowFontScaling={false} maxFontSizeMultiplier={1} />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionPrice && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={priceDropDownSelection}
                    allowFontScaling={false}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice ? "UM" : "..."}
                    value={valueSelectionPrice}
                    onFocus={() => setIsFocusSelectionPrice(true)}
                    onBlur={() => setIsFocusSelectionPrice(false)}
                    onChange={(item) => {
                      setValueSelectionPrice(item.id);
                      setLabelSelectionPrice(item.unit_code);
                      setIsFocusSelectionPrice(false);
                    }}
                  />
                </View>

                {/* <View style={styles.tableRollQuantity}>
                  <Text allowFontScaling={false} style={{ alignSelf: "center", marginRight: 5, fontWeight:'bold'}}>
                    {"      "}
                    Price:
                  </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={styles.tableRollQuantityInput}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS=='ios'?"numbers-and-punctuation":"decimal-pad"}
                    value={priceSelection}
                    onChangeText={(value)=>setPriceSelection(value)}allowFontScaling={false}maxFontSizeMultiplier={1}
                  ></TextInput>
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit,
                      isFocusSelectionPrice && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={priceDropDownSelection}
                    allowFontScaling={false}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice ? "UM" : "..."}
                    value={valueSelectionPrice}
                    onFocus={() => setIsFocusSelectionPrice(true)}
                    onBlur={() => setIsFocusSelectionPrice(false)}
                    onChange={(item) => {
                      setValueSelectionPrice(item.id);
                      setLabelSelectionPrice(item.unit_code);
                      setIsFocusSelectionPrice(false);
                    }}
                  />
                </View> */}

                <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />
              </View>

              {/* selection ends */}

              {/* selection starts 2*/}

              <View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: Colors.buttonBackground }} allowFontScaling={false}>{selectionDropDown != undefined ? selectionDropDown[1].title : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginBottom: 20 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>Quantity </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Quantity"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={quantitySelection2}
                    onChangeText={(value) => setQuantitySelection2(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionUnit2 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    allowFontScaling={false}
                    iconStyle={styles.iconStyle}
                    data={selectionUnitDropDown2}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit2 ? "UM" : "..."}
                    value={valueSelectionUnit2}
                    onFocus={() => setIsFocusSelectionUnit2(true)}
                    onBlur={() => setIsFocusSelectionUnit2(false)}
                    onChange={(item) => {
                      setValueSelectionUnit2(item.id);
                      setLabelSelectionUnit2(item.unit_code);
                      setIsFocusSelectionUnit2(false);
                    }}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>      Price </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={priceSelection2}
                    onChangeText={(value) => setPriceSelection2(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionPrice2 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    allowFontScaling={false}
                    iconStyle={styles.iconStyle}
                    data={priceDropDownSelection2}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice2 ? "UM" : "..."}
                    value={valueSelectionPrice2}
                    onFocus={() => setIsFocusSelectionPrice2(true)}
                    onBlur={() => setIsFocusSelectionPrice2(false)}
                    onChange={(item) => {
                      setValueSelectionPrice2(item.id);
                      setLabelSelectionPrice2(item.unit_code);
                      setIsFocusSelectionPrice2(false);
                    }}
                  />
                </View>

                <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />
              </View>

              {/* selection ends 2 */}

              {/* selection starts 3 */}

              <View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: Colors.buttonBackground }} allowFontScaling={false}>{selectionDropDown != undefined ? selectionDropDown[2].title : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginBottom: 20 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>Quantity </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Quantity"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={quantitySelection3}
                    onChangeText={(value) => setQuantitySelection3(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionUnit3 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    allowFontScaling={false}
                    iconStyle={styles.iconStyle}
                    data={selectionUnitDropDown3}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit3 ? "UM" : "..."}
                    value={valueSelectionUnit3}
                    onFocus={() => setIsFocusSelectionUnit3(true)}
                    onBlur={() => setIsFocusSelectionUnit3(false)}
                    onChange={(item) => {
                      setValueSelectionUnit3(item.id);
                      setLabelSelectionUnit3(item.unit_code);
                      setIsFocusSelectionUnit3(false);
                    }}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>      Price </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={priceSelection3}
                    onChangeText={(value) => setPriceSelection3(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionPrice3 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    allowFontScaling={false}
                    data={priceDropDownSelection3}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice3 ? "UM" : "..."}
                    value={valueSelectionPrice3}
                    onFocus={() => setIsFocusSelectionPrice3(true)}
                    onBlur={() => setIsFocusSelectionPrice3(false)}
                    onChange={(item) => {
                      setValueSelectionPrice3(item.id);
                      setLabelSelectionPrice3(item.unit_code);
                      setIsFocusSelectionPrice3(false);
                    }}
                  />
                </View>

                <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />
              </View>

              {/* selection ends 3 */}

              {/* selection starts 4 */}

              <View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: Colors.buttonBackground }} allowFontScaling={false}>{selectionDropDown != undefined ? selectionDropDown[3].title : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginBottom: 20 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>Quantity </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Quantity"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={quantitySelection4}
                    onChangeText={(value) => setQuantitySelection4(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionUnit4 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    allowFontScaling={false}
                    iconStyle={styles.iconStyle}
                    data={selectionUnitDropDown4}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit4 ? "UM" : "..."}
                    value={valueSelectionUnit4}
                    onFocus={() => setIsFocusSelectionUnit4(true)}
                    onBlur={() => setIsFocusSelectionUnit4(false)}
                    onChange={(item) => {
                      setValueSelectionUnit4(item.id);
                      setLabelSelectionUnit4(item.unit_code);
                      setIsFocusSelectionUnit4(false);
                    }}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>      Price </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={priceSelection4}
                    onChangeText={(value) => setPriceSelection4(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionPrice4 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    allowFontScaling={false}
                    data={priceDropDownSelection4}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice4 ? "UM" : "..."}
                    value={valueSelectionPrice4}
                    onFocus={() => setIsFocusSelectionPrice4(true)}
                    onBlur={() => setIsFocusSelectionPrice4(false)}
                    onChange={(item) => {
                      setValueSelectionPrice4(item.id);
                      setLabelSelectionPrice4(item.unit_code);
                      setIsFocusSelectionPrice4(false);
                    }}
                  />
                </View>

                <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />
              </View>

              {/* selection ends 4 */}

              {/* selection starts 5 */}
              <View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: Colors.buttonBackground }} allowFontScaling={false}>{selectionDropDown != undefined ? selectionDropDown[4].title : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginBottom: 20 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>Quantity </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Quantity"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={quantitySelection5}
                    onChangeText={(value) => setQuantitySelection5(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionUnit5 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={selectionUnitDropDown5}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit5 ? "UM" : "..."}
                    value={valueSelectionUnit5}
                    onFocus={() => setIsFocusSelectionUnit5(true)}
                    onBlur={() => setIsFocusSelectionUnit5(false)}
                    onChange={(item) => {
                      setValueSelectionUnit5(item.id);
                      setLabelSelectionUnit5(item.unit_code);
                      setIsFocusSelectionUnit5(false);
                    }}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>      Price </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={priceSelection5}
                    onChangeText={(value) => setPriceSelection5(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionPrice5 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={priceDropDownSelection5}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice5 ? "UM" : "..."}
                    value={valueSelectionPrice5}
                    onFocus={() => setIsFocusSelectionPrice5(true)}
                    onBlur={() => setIsFocusSelectionPrice5(false)}
                    onChange={(item) => {
                      setValueSelectionPrice5(item.id);
                      setLabelSelectionPrice5(item.unit_code);
                      setIsFocusSelectionPrice5(false);
                    }}
                  />
                </View>


                <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />
              </View>

              {/* selection ends 5 */}

              {/* selection starts 6 */}

              <View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: Colors.buttonBackground }} allowFontScaling={false}>{selectionDropDown != undefined ? selectionDropDown[5].title : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginBottom: 20 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>Quantity </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Quantity"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={quantitySelection6}
                    onChangeText={(value) => setQuantitySelection6(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionUnit6 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={selectionUnitDropDown6}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit6 ? "UM" : "..."}
                    value={valueSelectionUnit6}
                    onFocus={() => setIsFocusSelectionUnit6(true)}
                    onBlur={() => setIsFocusSelectionUnit6(false)}
                    onChange={(item) => {
                      setValueSelectionUnit6(item.id);
                      setLabelSelectionUnit6(item.unit_code);
                      setIsFocusSelectionUnit6(false);
                    }}
                  />

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>      Price </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={priceSelection6}
                    onChangeText={(value) => setPriceSelection6(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionPrice6 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={priceDropDownSelection6}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice6 ? "UM" : "..."}
                    value={valueSelectionPrice6}
                    onFocus={() => setIsFocusSelectionPrice6(true)}
                    onBlur={() => setIsFocusSelectionPrice6(false)}
                    onChange={(item) => {
                      setValueSelectionPrice6(item.id);
                      setLabelSelectionPrice6(item.unit_code);
                      setIsFocusSelectionPrice6(false);
                    }}
                  />
                </View>

                <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />
              </View>

              {/* selection ends 6 */}

              {/* selection starts 7 */}

              <View style={{ marginBottom: 30 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: Colors.buttonBackground }} allowFontScaling={false}>{selectionDropDown != undefined ? selectionDropDown[6].title : null}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, marginBottom: 20 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>Quantity </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Quantity"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={quantitySelection7}
                    onChangeText={(value) => setQuantitySelection7(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionUnit7 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={selectionUnitDropDown7}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionUnit7 ? "UM" : "..."}
                    value={valueSelectionUnit7}
                    onFocus={() => setIsFocusSelectionUnit7(true)}
                    onBlur={() => setIsFocusSelectionUnit7(false)}
                    onChange={(item) => {
                      setValueSelectionUnit7(item.id);
                      setLabelSelectionUnit7(item.unit_code);
                      setIsFocusSelectionUnit7(false);
                    }}
                  />

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                  <Text style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 20, alignSelf: "center" }}>      Price </Text>
                  <TextInput
                    mode="outlined"
                    //label={"Price"}
                    style={{ ...styles.tableRollQuantityInput, width: '23%' }}
                    activeOutlineColor={Colors.buttonBackground}
                    keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "decimal-pad"}
                    value={priceSelection7}
                    onChangeText={(value) => setPriceSelection7(value)} allowFontScaling={false} maxFontSizeMultiplier={1}
                  />
                  <Dropdown
                    style={[
                      styles.dropdownselectionUnit, { width: 90 },
                      isFocusSelectionPrice7 && { borderColor: "black" },
                    ]}
                    placeholderStyle={{ fontSize: 16 }}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={priceDropDownSelection7}
                    //search
                    labelField="unit_code"
                    valueField="id"
                    maxHeight={120}
                    placeholder={!isFocusSelectionPrice7 ? "UM" : "..."}
                    value={valueSelectionPrice7}
                    onFocus={() => setIsFocusSelectionPrice7(true)}
                    onBlur={() => setIsFocusSelectionPrice7(false)}
                    onChange={(item) => {
                      setValueSelectionPrice7(item.id);
                      setLabelSelectionPrice7(item.unit_code);
                      setIsFocusSelectionPrice7(false);
                    }}
                  />
                </View>

                <Divider style={{ borderWidth: 0.5, marginVertical: 20 }} />
              </View>

              {/* selection ends 7 */}
            </ScrollView>
          </View>
        )}
      </View>

      {/* footer starts */}

      <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.goBack()}
            >
              <Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{ width: 20, height: 20, marginHorizontal: 10, alignSelf: 'center' }} />
              <Text
                style={{
                  fontSize: 22,
                  alignSelf: "center",
                  color: "#9EBDB8",
                }} allowFontScaling={false}
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
          >{console.log('toggleCheckbox=' + toggleCheckBox)}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
              // onPress={() =>
              //   props.navigation.navigate("SubstanceThicknessSellLeather",
              //   {productName:productName, category:category, subCategory:subCategory, size:size,leatherCondition:leatherCondition, tanningLeather:tanningLeather}
              //   )
              // }
              onPress={() => {
                if (leatherCondition == "Raw") {
                  props.navigation.navigate("Destination", {
                    productName: productName,
                    category: category,
                    subCategory: subCategory,
                    size: size,
                    leatherCondition: leatherCondition,
                    preservationType: preservationType,
                    origin: value,
                    continent: labelContinent,
                    Specification: Specification,

                    weightCatType: minWeight,
                    weightCatType2: maxWeight,
                    weightCatType3: avgWeight,
                    weightSelectionSize: labelWeight,

                    surfaceCatType: minSurface,
                    surfaceCatType2: maxSurface,
                    surfaceCatType3: avgSurface,
                    surfaceSelectionSize: labelSurface,

                    labelTableRoll: toggleCheckBox == true ? (labelTableRoll) : null,
                    quantityTableRoll: toggleCheckBox == true ? (quantityTableRoll) : null,
                    priceTableRoll: toggleCheckBox == true ? (priceTableRoll) : null,
                    labelTablePrice: toggleCheckBox == true ? (labelTablePrice) : null,

                    // labelSelection:toggleCheckBoxSelected==true?(labelSelection):null,
                    labelSelection: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[0].title : null) : null,
                    quantitySelection: toggleCheckBoxSelected == true ? (quantitySelection) : null,
                    labelSelectionUnit: toggleCheckBoxSelected == true ? (labelSelectionUnit) : null,
                    labelSelectionPrice: toggleCheckBoxSelected == true ? (labelSelectionPrice) : null,
                    priceSelection: toggleCheckBoxSelected == true ? (priceSelection) : null,

                    labelSelection2: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[1].title : null) : null,
                    quantitySelection2: toggleCheckBoxSelected == true ? (quantitySelection2) : null,
                    labelSelectionUnit2: toggleCheckBoxSelected == true ? (labelSelectionUnit2) : null,
                    labelSelectionPrice2: toggleCheckBoxSelected == true ? (labelSelectionPrice2) : null,
                    priceSelection2: toggleCheckBoxSelected == true ? (priceSelection2) : null,

                    labelSelection3: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[2].title : null) : null,
                    quantitySelection3: toggleCheckBoxSelected == true ? (quantitySelection3) : null,
                    labelSelectionUnit3: toggleCheckBoxSelected == true ? (labelSelectionUnit3) : null,
                    labelSelectionPrice3: toggleCheckBoxSelected == true ? (labelSelectionPrice3) : null,
                    priceSelection3: toggleCheckBoxSelected == true ? (priceSelection3) : null,

                    labelSelection4: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[3].title : null) : null,
                    quantitySelection4: toggleCheckBoxSelected == true ? (quantitySelection4) : null,
                    labelSelectionUnit4: toggleCheckBoxSelected == true ? (labelSelectionUnit4) : null,
                    labelSelectionPrice4: toggleCheckBoxSelected == true ? (labelSelectionPrice4) : null,
                    priceSelection4: toggleCheckBoxSelected == true ? (priceSelection4) : null,

                    labelSelection5: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[4].title : null) : null,
                    quantitySelection5: toggleCheckBoxSelected == true ? (quantitySelection5) : null,
                    labelSelectionUnit5: toggleCheckBoxSelected == true ? (labelSelectionUnit5) : null,
                    labelSelectionPrice5: toggleCheckBoxSelected == true ? (labelSelectionPrice5) : null,
                    priceSelection5: toggleCheckBoxSelected == true ? (priceSelection5) : null,

                    labelSelection6: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[5].title : null) : null,
                    quantitySelection6: toggleCheckBoxSelected == true ? (quantitySelection6) : null,
                    labelSelectionUnit6: toggleCheckBoxSelected == true ? (labelSelectionUnit6) : null,
                    labelSelectionPrice6: toggleCheckBoxSelected == true ? (labelSelectionPrice6) : null,
                    priceSelection6: toggleCheckBoxSelected == true ? (priceSelection6) : null,

                    labelSelection7: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[6].title : null) : null,
                    quantitySelection7: toggleCheckBoxSelected == true ? (quantitySelection7) : null,
                    labelSelectionUnit7: toggleCheckBoxSelected == true ? (labelSelectionUnit7) : null,
                    labelSelectionPrice7: toggleCheckBoxSelected == true ? (labelSelectionPrice7) : null,
                    priceSelection7: toggleCheckBoxSelected == true ? (priceSelection7) : null,


                  });
                    console.log("🚀 ~ file: TannningLeatherOriginSellLeather.js ~ line 1843 ~ //onChangeText ~ Specification", Specification)
                   
                } else if (
                  leatherCondition == "Pickled" ||
                  leatherCondition == "Tanned"
                ) {
                  props.navigation.navigate("Substance and Thickness", {
                    productName: productName,
                    category: category,
                    subCategory: subCategory,
                    size: size,
                    leatherCondition: leatherCondition,
                    tanningLeather: tanningLeather,
                    origin: value,
                    continent: labelContinent,
                    Specification: Specification,


                    weightCatType: minWeight,
                    weightCatType2: maxWeight,
                    weightCatType3: avgWeight,
                    weightSelectionSize: labelWeight,

                    surfaceCatType: minSurface,
                    surfaceCatType2: maxSurface,
                    surfaceCatType3: avgSurface,
                    surfaceSelectionSize: labelSurface,
                    toggleCheckBoxSelected: toggleCheckBoxSelected,

                    labelTableRoll: toggleCheckBox == true ? (labelTableRoll) : null,
                    quantityTableRoll: toggleCheckBox == true ? (quantityTableRoll) : null,
                    priceTableRoll: toggleCheckBox == true ? (priceTableRoll) : null,
                    labelTablePrice: toggleCheckBox == true ? (labelTablePrice) : null,

                    labelSelection: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[0].title : null) : null,
                    quantitySelection: toggleCheckBoxSelected == true ? (quantitySelection) : null,
                    labelSelectionUnit: toggleCheckBoxSelected == true ? (labelSelectionUnit) : null,
                    labelSelectionPrice: toggleCheckBoxSelected == true ? (labelSelectionPrice) : null,
                    priceSelection: toggleCheckBoxSelected == true ? (priceSelection) : null,

                    labelSelection2: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[1].title : null) : null,
                    quantitySelection2: toggleCheckBoxSelected == true ? (quantitySelection2) : null,
                    labelSelectionUnit2: toggleCheckBoxSelected == true ? (labelSelectionUnit2) : null,
                    labelSelectionPrice2: toggleCheckBoxSelected == true ? (labelSelectionPrice2) : null,
                    priceSelection2: toggleCheckBoxSelected == true ? (priceSelection2) : null,

                    labelSelection3: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[2].title : null) : null,
                    quantitySelection3: toggleCheckBoxSelected == true ? (quantitySelection3) : null,
                    labelSelectionUnit3: toggleCheckBoxSelected == true ? (labelSelectionUnit3) : null,
                    labelSelectionPrice3: toggleCheckBoxSelected == true ? (labelSelectionPrice3) : null,
                    priceSelection3: toggleCheckBoxSelected == true ? (priceSelection3) : null,

                    labelSelection4: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[3].title : null) : null,
                    quantitySelection4: toggleCheckBoxSelected == true ? (quantitySelection4) : null,
                    labelSelectionUnit4: toggleCheckBoxSelected == true ? (labelSelectionUnit4) : null,
                    labelSelectionPrice4: toggleCheckBoxSelected == true ? (labelSelectionPrice4) : null,
                    priceSelection4: toggleCheckBoxSelected == true ? (priceSelection4) : null,

                    labelSelection5: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[4].title : null) : null,
                    quantitySelection5: toggleCheckBoxSelected == true ? (quantitySelection5) : null,
                    labelSelectionUnit5: toggleCheckBoxSelected == true ? (labelSelectionUnit5) : null,
                    labelSelectionPrice5: toggleCheckBoxSelected == true ? (labelSelectionPrice5) : null,
                    priceSelection5: toggleCheckBoxSelected == true ? (priceSelection5) : null,

                    labelSelection6: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[5].title : null) : null,
                    quantitySelection6: toggleCheckBoxSelected == true ? (quantitySelection6) : null,
                    labelSelectionUnit6: toggleCheckBoxSelected == true ? (labelSelectionUnit6) : null,
                    labelSelectionPrice6: toggleCheckBoxSelected == true ? (labelSelectionPrice6) : null,
                    priceSelection6: toggleCheckBoxSelected == true ? (priceSelection6) : null,

                    labelSelection7: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[6].title : null) : null,
                    quantitySelection7: toggleCheckBoxSelected == true ? (quantitySelection7) : null,
                    labelSelectionUnit7: toggleCheckBoxSelected == true ? (labelSelectionUnit7) : null,
                    labelSelectionPrice7: toggleCheckBoxSelected == true ? (labelSelectionPrice7) : null,
                    priceSelection7: toggleCheckBoxSelected == true ? (priceSelection7) : null,


                  });
                } else if (
                  leatherCondition == "Crust" ||
                  leatherCondition == "Finished"
                ) {
                  props.navigation.navigate("Substance and Thickness", {
                    productName: productName,
                    category: category,
                    subCategory: subCategory,
                    size: size,
                    leatherCondition: leatherCondition,
                    tanningLeather: tanningLeather,
                    origin: value,
                    continent: labelContinent,
                    Specification: Specification,


                    weightCatType: minWeight,
                    weightCatType2: maxWeight,
                    weightCatType3: avgWeight,
                    weightSelectionSize: labelWeight,

                    surfaceCatType: minSurface,
                    surfaceCatType2: maxSurface,
                    surfaceCatType3: avgSurface,
                    surfaceSelectionSize: labelSurface,

                    labelTableRoll: toggleCheckBox == true ? (labelTableRoll) : null,
                    quantityTableRoll: toggleCheckBox == true ? (quantityTableRoll) : null,
                    priceTableRoll: toggleCheckBox == true ? (priceTableRoll) : null,
                    labelTablePrice: toggleCheckBox == true ? (labelTablePrice) : null,

                    labelSelection: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[0].title : null) : null,
                    quantitySelection: toggleCheckBoxSelected == true ? (quantitySelection) : null,
                    labelSelectionUnit: toggleCheckBoxSelected == true ? (labelSelectionUnit) : null,
                    labelSelectionPrice: toggleCheckBoxSelected == true ? (labelSelectionPrice) : null,
                    priceSelection: toggleCheckBoxSelected == true ? (priceSelection) : null,

                    labelSelection2: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[1].title : null) : null,
                    quantitySelection2: toggleCheckBoxSelected == true ? (quantitySelection2) : null,
                    labelSelectionUnit2: toggleCheckBoxSelected == true ? (labelSelectionUnit2) : null,
                    labelSelectionPrice2: toggleCheckBoxSelected == true ? (labelSelectionPrice2) : null,
                    priceSelection2: toggleCheckBoxSelected == true ? (priceSelection2) : null,

                    labelSelection3: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[2].title : null) : null,
                    quantitySelection3: toggleCheckBoxSelected == true ? (quantitySelection3) : null,
                    labelSelectionUnit3: toggleCheckBoxSelected == true ? (labelSelectionUnit3) : null,
                    labelSelectionPrice3: toggleCheckBoxSelected == true ? (labelSelectionPrice3) : null,
                    priceSelection3: toggleCheckBoxSelected == true ? (priceSelection3) : null,

                    labelSelection4: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[3].title : null) : null,
                    quantitySelection4: toggleCheckBoxSelected == true ? (quantitySelection4) : null,
                    labelSelectionUnit4: toggleCheckBoxSelected == true ? (labelSelectionUnit4) : null,
                    labelSelectionPrice4: toggleCheckBoxSelected == true ? (labelSelectionPrice4) : null,
                    priceSelection4: toggleCheckBoxSelected == true ? (priceSelection4) : null,

                    labelSelection5: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[4].title : null) : null,
                    quantitySelection5: toggleCheckBoxSelected == true ? (quantitySelection5) : null,
                    labelSelectionUnit5: toggleCheckBoxSelected == true ? (labelSelectionUnit5) : null,
                    labelSelectionPrice5: toggleCheckBoxSelected == true ? (labelSelectionPrice5) : null,
                    priceSelection5: toggleCheckBoxSelected == true ? (priceSelection5) : null,

                    labelSelection6: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[5].title : null) : null,
                    quantitySelection6: toggleCheckBoxSelected == true ? (quantitySelection6) : null,
                    labelSelectionUnit6: toggleCheckBoxSelected == true ? (labelSelectionUnit6) : null,
                    labelSelectionPrice6: toggleCheckBoxSelected == true ? (labelSelectionPrice6) : null,
                    priceSelection6: toggleCheckBoxSelected == true ? (priceSelection6) : null,

                    labelSelection7: toggleCheckBoxSelected == true ? (selectionDropDown != undefined ? selectionDropDown[6].title : null) : null,
                    quantitySelection7: toggleCheckBoxSelected == true ? (quantitySelection7) : null,
                    labelSelectionUnit7: toggleCheckBoxSelected == true ? (labelSelectionUnit7) : null,
                    labelSelectionPrice7: toggleCheckBoxSelected == true ? (labelSelectionPrice7) : null,
                    priceSelection7: toggleCheckBoxSelected == true ? (priceSelection7) : null,


                  });
                }
              }}
            >
              <Text allowFontScaling={false}
                style={{ fontSize: 22, alignSelf: "center", color: "#62B0A2" }}
              >
                Next
              </Text>
              <Image source={require('../../assets/ByClient/BOTTOMNEXT.png')} style={{ width: 20, height: 20, marginHorizontal: 10, alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* footer ends */}

      {/* </Provider> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headingIndividual: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    // color: Colors.text,
    marginBottom: 10,
    color: Colors.buttonBackground
  },
  countryView: {
    borderWidth: 1,
    width: 200,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignSelf: "center",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8,
    margin: 2,
    //width: 100,
    height: 40,
    borderWidth: 0.5,
    flex: 1
  },
  insideMenuView: {
    borderWidth: 1,
    width: 80,
    height: 40,
    borderRadius: 6,
  },
  insideMenuText: {
    bottom: 8,
    backgroundColor: "white",
    width: 20,
    fontSize: 12,
    left: 5,
  },
  insideMenuTouchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    bottom: 5,
  },
  tableRollView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  tableRollQuantity: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  tableRollQuantityInput: {
    //width: 50,
    height: 30,
    backgroundColor: "white",
    marginRight: 10,
    textAlignVertical: 'center'
  },
  tableRollQuantitySpecification: {
    //width: 50,
    height: 50,
    backgroundColor: "white",
    marginRight: 10,
    textAlignVertical: 'center'
  },
  tableRollQuantityView: {
    borderWidth: 1,
    width: 80,
    height: 50,
    borderRadius: 6,
    alignSelf: "center",
    flex: 1,
    marginLeft: 10,
  },
  tableRollSizeText: {
    bottom: 8,
    backgroundColor: "white",
    width: 25,
    fontSize: 12,
    left: 5,
  },
  tableRollTouchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    bottom: 5,
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 72,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  dropdownWeight: {
    height: 33,
    width: 75,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8, alignSelf: 'flex-end'
  },
  dropdownselection: {
    height: 36,
    width: 120,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8, alignSelf: 'flex-end'
  },
  dropdownselectionUnit: {
    height: 33,
    width: 80,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8, alignSelf: 'flex-end'
  },
  placeholderStyle1: {
    fontSize: 16,
  },
  selectedTextStyle1: {
    fontSize: 16,
  },
  iconStyle1: {
    width: 20,
    height: 20,
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },
  dropdown1: {
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // marginTop: 10,
    opacity: 0.7
  },
  icon1: {
    marginRight: 5,
  },
  SpecificationDropdown: {
    // flexDirection: "row",
    justifyContent: "center",
    // marginTop: 20,
  },
  SpecificationplaceholderStyle: {
    fontSize: 16,
  },
  SpecificationselectedTextStyle: {
    fontSize: 16,
  },
  SpecificationiconStyle: {
    width: 20,
    height: 20,
  },
  SpecificationinputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  Specificationicon1: {
    marginRight: 5,
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    // padding: 10,
  },
});

export default TanningLeatherOriginSellLeather;
