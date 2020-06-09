import React from 'react';
import CollectionsOverview  from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

class ShopPage extends React.Component {
   
   unsuscribeFromSnapshot = null

   componentDidMount(){
      const collectionRef = firestore.collection('collections');

      collectionRef.onSnapshot(async snapshot => {
            console.log(snapshot);
            convertCollectionsSnapshotToMap(snapshot);
         });
   }
   
   render(){
      const { match } = this.props;
      return (<div className='shop-page'>
             { /* match object from App.js*/ }
             <Route exact path={`${match.path}`} 
                component={CollectionsOverview} />
             <Route path={`${match.path}/:collectionId`} 
                component={CollectionPage} />
          </div>)
   }
}
         

export default ShopPage;