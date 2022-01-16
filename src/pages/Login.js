import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionSaveEmail } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInput);
  }

  validateInput() {
    const SIX = 6;
    const { email, password } = this.state;
    // Regex Valida E-mail: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regexValidateEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i;
    const emailValidate = regexValidateEmail.test(String(email).toLowerCase());
    return (emailValidate && password.length >= SIX)
      ? this.setState({ isDisabled: false })
      : this.setState({ isDisabled: true });
  }

  handleClick() {
    const { history, emailDispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    emailDispatch(email);
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            name="email"
            placeholder="email@dominio.com"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            placeholder="******"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </label>
      </form>
    );
  }
}

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (payload) => dispatch(actionSaveEmail(payload)) });

export default connect(null, mapDispatchToProps)(Login);
