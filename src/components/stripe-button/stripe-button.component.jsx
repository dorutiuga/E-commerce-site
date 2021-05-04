import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './stripe-button.styles.scss';


const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price*100; 
    const publishableKey = 'pk_test_51InK4nH1FgHdkq7Zlaxxq11YVyi58UrLMd5Yl94YYIGPWfESqoaiBVoAk0u0zfMYgeoqojAVK2N5PXBgWVZAm0Fy00SyQuBOvD';

  const  onToken = token => {
        console.log(token);
        alert("Payment successful");
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