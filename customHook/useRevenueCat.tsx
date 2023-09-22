import { useEffect, useState } from 'react';
import { Platform  } from 'react-native';
import Purchases, { 
    CustomerInfo, PurchasesOffering 
} from 'react-native-purchases';

const APIKeys = {
   // apple : "appl_qYexIugUPTwbdCRyOJSFdkVMLag", old account
    apple : "appl_unltkNFpBSKVRhLBjFcvWEJyKay", 
    google : "google_purchase_key"
};

const useRevenueCat = async () => {
    
    if (Platform.OS == "android") {
        Purchases.configure({ apiKey :  APIKeys.google });
        return;
    } else {
        Purchases.configure({ apiKey : APIKeys.apple });
    }

    let offerings;
    let ci;

    try {

        offerings =  (await Purchases.getOfferings()).current;
        ci = await Purchases.getCustomerInfo();


        console.log("CI")
        console.log(ci)

    } catch(error) {
        console.log(error)
    }

    console.log("hellllll")

    return { offerings, ci };
}

export { useRevenueCat };