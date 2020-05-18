import React, { Component } from "react";

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth,signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: ''}); //if success, clean state
        } catch (error) {
            console.log(error);
        }

        // this.setState( { 
        //     email: '',
        //     password: '' 
        // });
    }

    handleChange = event => { //With this function I could use it with both email and password fields!
        const { value, name } = event.target;  //It gets the name of the target element
        this.setState({ [name] : value });     //and sets dynamically state with its corresponding field and vaue
    }

    render(){
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" value={this.state.email} 
                        type="email" required 
                        label="email"
                        handleChange={this.handleChange}/>
                    <FormInput name="password" value={this.state.password} 
                        type="password"  required 
                        handleChange={this.handleChange}
                        label="password" />
                    <div className='buttons'>
                        <CustomButton type="submit">
                            Sign in
                        </CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} thirdPartyProviderSignIn='google' >
                            Sign in with Google
                        </CustomButton>
                        {/* <CustomButton onClick={signInWithGoogle} thirdPartyProviderSignIn='facebook' >
                        Sign in with Facebook
                        </CustomButton> */}
                    </div>
                </form>

            </div>
        )
    }
}

export default SignIn;