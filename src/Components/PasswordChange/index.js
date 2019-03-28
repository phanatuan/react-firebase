import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

const PasswordChangePage = () => {
  return (
    <div>
      <h1>Password Change</h1>
      <PasswordChangeForm />
    </div>
  );
};

const INITIAL_STATE = {
  // currentPassword: '',
  newPassword: '',
  error: null
};

class PasswordChangeFormBase extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { currentPassword, newPassword } = this.state;
    this.props.firebase
      .doPasswordUpdate(newPassword)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { newPassword, error } = this.state;
    const isInvalid = newPassword === '';
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {/* <input
          value={currentPassword}
          type="password"
          name="passwordOne"
          placeholder="Current Password"
          onChange={this.onChange}
        /> */}
          <input
            value={newPassword}
            placeholder="New Passsword"
            type="password"
            name="newPassword"
            onChange={this.onChange}
          />
          <button type="submit" disabled={isInvalid}>
            Change Password
          </button>
        </form>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const PasswordChangeForm = compose(
  withRouter,
  withFirebase
)(PasswordChangeFormBase);

export { PasswordChangeForm };
export default PasswordChangePage;
