import React from 'react';
import CollectionsOverview  from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from '../../components/with-spinner/with-spinner.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
   state = {
      loading: true
   };

   unsuscribeFromSnapshot = null

   componentDidMount(){
      const { updateCollections } = this.props;
      const collectionRef = firestore.collection('collections');

      // this.unsuscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
         collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
            //console.log(collectionsMap);
         });
      
      //Used once to avoid creating manually collections in firebase
      // collectionRef.onSnapshot(async snapshot => {
      //       console.log(snapshot);
      //       convertCollectionsSnapshotToMap(snapshot);
      //    });
   }
   
   render(){
      const { match } = this.props;
      const { loading } = this.state;
      return (<div className='shop-page'>
             { /* match object from App.js*/ }
             <Route exact path={`${match.path}`} 
                render={(props) => <CollectionsOverviewWithSpinner isLoading={loading}{...props} />} />
             <Route path={`${match.path}/:collectionId`} 
                render={(props) => <CollectionPageWithSpinner isLoading={loading}{...props} /> } />
          </div>)
   }
}

const mapDispatchToProps = dispatch => ({
   updateCollections: collectionsMap => 
   dispatch(updateCollections(collectionsMap))
})
         
export default connect(null, mapDispatchToProps)(ShopPage)
//export default ShopPage;