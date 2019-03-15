import React from 'react';
import {Link} from "react-router-dom";
import { onLogout, isLoggedIn } from "../react-apollo";
import UserInfo from "./UserInfo";
import { withRouter } from 'react-router-dom'

function NavBar(props) {
  function logout() {
    props.history.push('/login');
    onLogout();
  };

  return (
    <nav className="navbar navbar-dark bg-primary justify-content-between">
      <div className="container">
        <Link className="navbar-brand" to="/">Microblog</Link>
        {isLoggedIn() ? (
          <div className="d-flex">
            <UserInfo></UserInfo>
            <button className="btn navbar-link" onClick={logout}>
              Logout
            </button>
          </div>) : null
        }
      </div>
    </nav>
  );

}

export default withRouter(NavBar);
