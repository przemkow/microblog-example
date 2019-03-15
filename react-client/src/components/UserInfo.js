import React from 'react';
import {graphql} from "react-apollo";
import {currentUser} from "../graphql/queries";

function UserInfo({ currentUserQuery }) {
  return (
    <div className="p-2">
      { currentUserQuery.loading ? 'loading...' : currentUserQuery.me.email }
    </div>
  );
}

export default graphql(currentUser, {name: 'currentUserQuery'})(UserInfo);
