import React from 'react';
import { SignUpLink } from '../SignUp';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In Form</h1>
      <SignInForm />
      <SignUpLink />
      <PasswordForgetLink />
    </div>
  );
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = e => {
    console.log('Signing in');
    e.preventDefault();
    let { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => this.setState({ error }));
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === '' || password === '';
    const { onChange, onSubmit } = this;
    return (
      <>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            type="text"
          />
          <input
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            type="password"
          />
          <button disabled={isInvalid}>Sign In</button>
        </form>
        {error && <p>{error.message}</p>}
      </>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInLink = () => (
  <p>
    Have an Account?
    <span>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </span>
  </p>
);

export { SignInLink };
export default SignInPage;
