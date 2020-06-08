import React from "react";

//import './custom-button.styles.scss';
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
         {children} {/*children is what is inside <CustomButton>children</CustomButton> */}
    </CustomButtonContainer>
);

export default CustomButton;