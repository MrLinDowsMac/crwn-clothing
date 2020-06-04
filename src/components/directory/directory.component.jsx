import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from "../../redux/directory/directory.selector";

import './directory.styles.scss';


const Directory = ({ sections }) =>  {
  return (
    <div className="directory-menu">
       {
           sections.map(({id, ...otherProps}) => ( //ES6 Trick for de-structuring several props
            <MenuItem key={id} {...otherProps} /> //Spreading this values here
        ))}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);