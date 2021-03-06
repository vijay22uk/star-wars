import React, { Component } from 'react';
import { Login, Home, PlanetDetails } from './Components/';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Store from './Store';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  onLogin = (_characterData, cb) => {
    this.setState({
      characterData: _characterData.results[0]
    });
    Store.setAuth(true);
    Store.setUserDetails(_characterData.results[0]);
    cb();
  }
  render() {
    if(this.state.hasError){
      return (<p className="alert alert-info">
      Something went wrong
      </p>)
    }
    return (
      <Router>
        <div className="App">
          <Route path="/Login" exact render={(props)=> <Login { ...props } onLogin={this.onLogin}/>
          } />
          <PrivateRoute exact path='/planet/:id' component={PlanetDetails} />
          <PrivateRoute path='/' exact component={Home} />
        </div>
      </Router>

    );
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Store.isAuthenticated
      ? <Component {...props} {...Store.getUserDetails()} />
      : <Redirect to='/login' {...props} />
  )} />
)

export default App;
