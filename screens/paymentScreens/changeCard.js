import { ToastAndroid } from 'react-native';
import StripeCheckout from 'react-native-stripe-checkout-webview';

import Pkey from "../../constants/key";

export default function MyStripeCheckout(props){
    return(
        <StripeCheckout 
            stripePublicKey={Pkey.publishableKey}
            checkoutSessionInput={{
                sessionId : props.route.params.id
            }}
            onSuccess={(data) => {
                props.navigation.goBack();
            }}
            onCancel={() => {
                ToastAndroid.show("Couldn't update the card try again!")
                props.navigation.goBack();
            }}
        />
    );
}