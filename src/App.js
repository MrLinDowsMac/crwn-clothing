import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from "./redux/user/user.actions";

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
    //const { setCurrentUser } = this.props;

    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);  //Crea usuario

        userRef.onSnapshot(snapShot => { //Se suscribe
          // this.setState({
          this.props.setCurrentUser({ 
              id: snapShot.id,
                ...snapShot.data()
          });
        });
      }
      
      //this.setState({ currentUser: userAuth });
      this.props.setCurrentUser( userAuth );
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
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUp/>) }/>
      </Switch>
    </div>)
  }
}

const mapStateToProps = ({ user }) => ({ //userReducer
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);