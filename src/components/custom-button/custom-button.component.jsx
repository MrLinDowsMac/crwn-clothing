import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({children, thirdPartyProviderSignIn, ...otherProps}) => (
    <button className={`${thirdPartyProviderSignIn != null ? thirdPartyProviderSignIn + '-sign-in' : ''} custom-button`} {...otherProps} >
         {children} {/*children is what is inside <CustomButton>children</CustomButton> */}
    </button>
);

export default CustomButton;