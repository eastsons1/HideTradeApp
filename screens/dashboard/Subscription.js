import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Image, Switch, Text, ToastAndroid, View } from "react-native";
import ButtonComp from "../../components/ButtonComp";
import SpinView from "../../components/Spin";
import Colors from "../../constants/Colors";

export default function Subscription(props) {

    const apiUrl = "https://hide-trade.onrender.com";

    const isFocused = useIsFocused();

    const subId = props.route.params.subId;
    const timestamp = props.route.params.timestamp;

    const [loading, setloading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [card, setcard] = useState("");
    const [cusId, setcusId] = useState("");
    const [last4, setlast4] = useState("");
    const [holdername, setholdername] = useState("");
    const [exp, setexp] = useState("");
 
    const fetchData = async () => {
        setloading(true);

        const date = new Date(Number(timestamp)*1000);
        setexp(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());

        console.log(subId)

        const subDetails = await axios.post(apiUrl + "/retrive-subsciption", { subId : subId });
        setToggle(!subDetails.data.cancel);

        const payDetails = await axios.post(apiUrl + "/get-payment-method-details", { payId : subDetails.data.payId });
        console.log(payDetails.data)
        setcusId(payDetails.data.data.customer);
        console.log(cusId);
        setcard(payDetails.data.data.card.brand);
        setlast4(" .... " + payDetails.data.data.card.last4);
        setholdername(payDetails.data.data.billing_details.name);

        setloading(false);
    };

    const onTogglePressed = async () => {
        if (toggle) {
            Alert.alert("Monthly Subscription", "Are You Sure You Want to Cancel Next Month Subscription ? ", [{ 
                text : "Yes", onPress: () => {
                    axios.post(apiUrl + "/cancel-subscription-update", { subId : subId, status : true }).then((res) => {
                        ToastAndroid.show("Next Month Subscription Canceled", ToastAndroid.LONG);
                        setToggle(false);
                    }).catch((err) => {
                        ToastAndroid.show("Something Bad Happen Try Again", ToastAndroid.LONG);
                    });
                }
            }, {
                text : "No", onPress : () => {
                    
                }
            }]);
        } else {
            axios.post(apiUrl + "/cancel-subscription-update", { subId : subId, status : false }).then((res) => {
                ToastAndroid.show("Next Month Subscription Enabled", ToastAndroid.LONG);
                setToggle(true);
            }).catch((err) => {
                ToastAndroid.show("Something Bad Happen Try Again", ToastAndroid.LONG);
            });
        }
    }


    const onCardDetailsChange = async () => {
        const result = await axios.post(apiUrl + "/checkout-session", { subId : subId, cusId : cusId });
        console.log(result.data.session.id);
        if (result) {
            props.navigation.navigate("Change Card", { id : result.data.session.id })
        }
    }
 
    useEffect(() => {
        fetchData();
    }, [isFocused]);

    return (
        <View style={{ flex: 1, backgroundColor: "white"}}>
            {loading ? (
                <SpinView
                    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
                >
                    <Image
                        source={require("../../assets/loader.jpg")}
                        resizeMode="contain"
                        resizeMethod="scale"
                        style={{ width: 80, height: 80 }}
                    />
                    <Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
                </SpinView>
            ): (
                <View>
                    <View style={{flexDirection:'row', marginTop : 50,  marginHorizontal : 10 }}>
                        <Text style={{ color : 'black', fontWeight : "700", fontSize : 16, width : "65%" }}>Current Plan : </Text>
                        <Text style={{ color : 'gray', fontWeight : "600", fontSize : 16 }}>$ 15.00/Month </Text>
                    </View>

                    <View style={{flexDirection:'row', marginTop : 10,  marginHorizontal : 10 }}>
                        <Text style={{ color : 'black', fontWeight : "700", fontSize : 16, width : "65%" }}>Current Plan Ends : </Text>
                        <Text style={{ color : 'gray', fontWeight : "600", fontSize : 16 }}>{exp}</Text>
                    </View>

                    <View style={{flexDirection:'row', marginTop : 10,  marginHorizontal : 10 }}>
                        <Text style={{ color : 'black', fontWeight : "700", fontSize : 16, width : "65%" }}>Card : </Text>
                        <Text style={{ color : 'gray', fontWeight : "600", fontSize : 16 }}>{card}</Text>
                    </View>

                    <View style={{flexDirection:'row', marginTop : 10,  marginHorizontal : 10 }}>
                        <Text style={{ color : 'black', fontWeight : "700", fontSize : 16, width : "65%" }}>Last 4 : </Text>
                        <Text style={{ color : 'gray', fontWeight : "600", fontSize : 16 }}>{last4}</Text>
                    </View>

                    <View style={{flexDirection:'row', marginTop : 50,  marginHorizontal : 10 }}>
                        <Text style={{ color : 'black', fontWeight : "700", fontSize : 16, width : "85%" }}>Next Month Subscription : </Text>
                        <Switch 
                            style={{ marginTop : -15 }}
                            value={toggle}
                            trackColor={{false: 'black', true: '#62B0A2'}}
                            thumbColor={"white"}
                            onChange={onTogglePressed}
                        />
                    </View>

                    <View style={{ marginTop : 50, marginHorizontal : 10 }}>
                        <ButtonComp title="CHANGE CARD" style={{ borderRadius : 15 }} onPress={onCardDetailsChange}/>
                    </View>
                </View>
            )}
        </View>
    );
}