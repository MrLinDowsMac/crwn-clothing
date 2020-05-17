import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component{
  constructor(){
      super();

      this.state = {
        currentUser: null
      };
  }

  unsuscribeFromAuth = null;

  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user});
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);  //Crea usuario

        userRef.onSnapshot(snapShot => { //Se suscribe
          this.setState({
            currentUser: {
              id: snapShot.id,
                ...snapShot.data()
            }
          });

          //console.log(this.state);
        });
      }
      //console.log("userAuth");
      //console.log(userAuth);
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }
  
  render(){
    return (<div>
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        {/* <Route path='/hats' component={HatsPage} /> */}
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUp} />
      </Switch>
    </div>)
  }
}

export default App;