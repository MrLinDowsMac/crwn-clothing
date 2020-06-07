import React from 'react';
import  StripeCheckout  from "react-stripe-checkout";

const StripeCheckoutButton = ( { price } ) => {
    const priceForStripe = price * 100; //unit conversion 
    const publishableKey = 'pk_test_51GrAFoKRjEU37zuonvsnQdP8Ase6echg2nt9Z0YDe3rvKtytyL8T5FmHLGblan4J0UmAisKeW2sNGwOefKNUyeeU00jjvuUNyo';

    const onToken = token => {
        console.log(token);
        //Processing payment should be here?
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            bitcoin />
    )

}

export default StripeCheckoutButton;
