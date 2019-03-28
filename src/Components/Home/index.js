import React from 'react';
import { withAuthorization } from '../Session';

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <p>The Homepage is accessible by every signed in user</p>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
