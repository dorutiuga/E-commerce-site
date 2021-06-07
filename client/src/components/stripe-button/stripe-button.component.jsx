import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './stripe-button.styles.scss';
import axios from 'axios';
import { response } from 'express';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price*100; 
    const publishableKey = 'pk_test_51InK4nH1FgHdkq7Zlaxxq11YVyi58UrLMd5Yl94YYIGPWfESqoaiBVoAk0u0zfMYgeoqojAVK2N5PXBgWVZAm0Fy00SyQuBOvD';

  const  onToken = token => {
       axios({
           url: 'payment',
           method: 'post',
           data: {
               amount: priceForStripe,
                token 
           }
       }).then(response =>{
                alert("Payment succesful")
       }).catch(error => {
           console.log('Payment error: ', JSON.parse(error));
           alert('There was an issue with your payment. Please make sure you use the provided credit card');
       });
    }

    return (
        <StripeCheckout 
        label = 'PAY NOW'
        name ='Crwon Clothing Ltd.'
        billingAddress
        shippingAddress
        image = 'https://svgshare.com/i/CUz.svg'
        description ={`Your total is $${price}`}
        amount = {priceForStripe}
        panelLabel = 'PAY NOW'
        token =  {onToken}
        stripeKey = {publishableKey}
        />
    );
}
export default StripeCheckoutButton;