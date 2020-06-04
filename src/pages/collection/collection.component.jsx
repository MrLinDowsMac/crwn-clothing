import React from "react";

import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

import './collection.styles.scss';
import { connect } from "react-redux";

const CollectionPage = ( { collection } ) => {
    //console.log(collection);
    const { title, items } = collection;
    return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
            items.map(item => {
               return <CollectionItem item={item} key={item.id} />
            })
            }
        </div>
    </div>
);
}

const mapStateToProps = (state, ownProps) => ({
    //This needs a second parameter because selector needs a part of state
    //depending on the URL parameter
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);