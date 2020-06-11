import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument 
        //addCollectionAndDocuments 
       } from './firebase/firebase.utils';
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
//import { selectCollectionsForPreview } from "./redux/shop/shop.selectors"; //just used once


class App extends React.Component{
  //Removed because we added Redux (see mapDispatchToProps)
  // constructor(){
  //     super();

  //     this.state = {
  //       currentUser: null
  //     };
  // }

  unsuscribeFromAuth = null;

  componentDidMount(){
    //const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);  //Crea usuario

        userRef.onSnapshot(snapShot => { //Se suscribe
          // this.setState({
          setCurrentUser({ 
              id: snapShot.id,
                ...snapShot.data()
          });
        });
      }
      
      //this.setState({ currentUser: userAuth });  //removed due now use redux
      setCurrentUser( userAuth );
      //add shop collecion to firebase once:
      //addCollectionAndDocuments('collections' , collectionsArray.map( ({ title, items }) => ({ title, items })  )); 
    });
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }
  
  render(){
    return (<div>
      {/* <Header currentUser={this.state.currentUser} /> It now uses redux */}
      <Header  />
      <Switch>
        <Route exact path='/' component={HomePage} />
        {/* <Route path='/hats' component={HatsPage} /> */}
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUp/>) }/>
      </Switch>
    </div>)
  }
}

const mapStateToProps = createStructuredSelector({ //userReducer
  currentUser: selectCurrentUser//,
  //collectionsArray: selectCollectionsForPreview  //just used once
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);