import React, { Component } from "react";

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState( { 
            email: '',
            password: '' 
        });
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
                        type="email" placeholder="E-mail" required 
                        label="email"
                        handleChange={this.handleChange}/>
                    <FormInput name="password" value={this.state.password} 
                        type="password" placeholder="Password" required 
                        handleChange={this.handleChange}
                        label="password" />
                    <CustomButton type="submit">
                        Sign in
                    </CustomButton>
                </form>

            </div>
        )
    }
}

export default SignIn;