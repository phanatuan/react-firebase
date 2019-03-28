import React from 'react';
import { withFirebase, withRouter } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const PasswordForgetPage = () => {
  return (
    <div>
      <h1>Password Forget</h1>
      <PasswordForgetForm />
    </div>
  );
};

const INITITAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetFormBase extends React.Component {
  constructor() {
    super();
    this.state = { ...INITITAL_STATE };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let { email } = this.state;
    console.log('hello');
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITITAL_STATE });
      })
      // .then(this.props.history.push(ROUTES.LANDING))
      .catch(error => this.setState({ error }));
  };

  render() {
    let { error, email } = this.state;
    const isInvalid = email === '';
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Your Email Here"
          />
          <button type="submit" disabled={isInvalid}>
            Forgot My Password
          </button>
        </form>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export { PasswordForgetLink, PasswordForgetForm };
export default PasswordForgetPage;
