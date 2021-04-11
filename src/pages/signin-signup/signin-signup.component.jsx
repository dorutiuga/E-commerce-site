import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import './signin-signup.style.scss';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInSignUpPage = () =>(
    <div className = 'sign-in-sign-up'>
         <SignIn></SignIn>
         <SignUp></SignUp>
    </div>
);

export default SignInSignUpPage;