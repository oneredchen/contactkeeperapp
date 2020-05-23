import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import setAuthToken from './utils/setAuthToken';
//Component Imports 
import Navbar from './components/layouts/Navbar';
import Alerts from './components/layouts/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute'
//States Import
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

//If token exist in localStorage, it will be set in the headers globablly
if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App =() => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts/>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
