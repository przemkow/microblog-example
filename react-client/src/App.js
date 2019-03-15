import React, { Component } from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ApolloProvider } from "react-apollo";
import { apolloClient } from "./react-apollo";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={apolloClient}>
          <NavBar></NavBar>
          <div className="container pt-4">
            <Route path="/" exact component={Home}></Route>
            <Route path="/login/" component={Login}></Route>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
