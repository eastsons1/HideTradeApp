import { useEffect, useState } from 'react';
import { Platform  } from 'react-native';
import Purchases, { 
    CustomerInfo, PurchasesOffering 
} from 'react-native-purchases';

const APIKeys = {
    apple : "appl_qYexIugUPTwbdCRyOJSFdkVMLag", //old account
    //apple : "appl_unltkNFpBSKVRhLBjFcvWEJyKay", 
    google : "google_purchase_key"
};

const useRevenueCat = async () => {
        console.log('useRevenueCatuseRevenueCatuseRevenueCatuseRevenueCatuseRevenueCat')
    if (Platform.OS == "android") {
        console.log('Android')
        Purchases.configure({ apiKey :  APIKeys.google });
        return;
    } else {
        console.log('IOSssssss')
        Purchases.configure({ apiKey : APIKeys.apple });
    }

    let offerings;
   // let offerings1;
    let ci;

    try {
        console.log('PRInce')
        offerings =  (await Purchases.getOfferings()).current;
        console.log((await Purchases.getOfferings()).current,'JJJJJJJJJJJJJ')
     // const  offerings1 =  await Purchases.getOfferings()
       ci = await Purchases.getCustomerInfo();
       console.log("Customer Info:", ci);
       console.log("offerings :", offerings);

        console.log("CIoooooooooooo")
        console.log(ci,'IIIIIII')
       // console.log(offerings1,'offeringsofferingsofferings')

    } catch(error) {
        console.log(error)
    }

    console.log("hellllll",ci)

    return { offerings, ci };
}

export { useRevenueCat };