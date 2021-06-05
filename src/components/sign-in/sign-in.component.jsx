import React from 'react';
import {connect} from 'react-redux';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//import { auth } from '../../firebase/firebase.utils';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';



class SignIn extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            email: '',
            password: ''
        }
        
    }
    handleChange = async event =>{
        const {value, name } = event.target ;
        this.setState({[name]: value})
       

    }
    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;
    
        emailSignInStart(email, password);
      };
    render(){
        const {isGoogleSignInStart}= this.props;
        return (
            <div className = 'sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit = {this.handleSubmit}>
                    <FormInput name = 'email' 
                    type='email' 
                    value = {this.state.email} 
                    required
                    label = "email"
                    handleChange ={this.handleChange}
                    />

                 
                    <FormInput name = 'password'
                     type='password' 
                     value = {this.state.password} 
                     required
                     label = "password"
                     handleChange ={this.handleChange}/>
                    
                    <div className='buttons'>
                    <CustomButton type="submit" >  Sign In</CustomButton>
                    <CustomButton type ='button' onClick={ isGoogleSignInStart } isGoogleSignIn> Sign in with Google </CustomButton>
                    </div>
                   
                </form>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
isGoogleSignInStart: () => dispatch(googleSignInStart()),
emailSignInStart : (email, password) => dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchToProps)(SignIn); 