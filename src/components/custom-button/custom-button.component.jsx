import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({children, thirdPartyProviderSignIn, inverted, ...otherProps}) => (
    <button className={`${thirdPartyProviderSignIn != null ?
                        thirdPartyProviderSignIn + '-sign-in' : ''} 
                        ${inverted ? 'inverted' : '' } custom-button` } {...otherProps} >
         {children} {/*children is what is inside <CustomButton>children</CustomButton> */}
    </button>
);

export default CustomButton;