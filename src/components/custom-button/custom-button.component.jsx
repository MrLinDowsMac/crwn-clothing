import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({ children, ...otherProps}) => (
    <button className='custom-button' {...otherProps} >
         {children} {/*children is what is inside <CustomButton>children</CustomButton> */}
    </button>
);

export default CustomButton;