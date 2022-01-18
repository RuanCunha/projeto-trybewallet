import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requestFetchAPI from '../services/requestAPI';
import { actionSaveExpense, getCurrencies } from '../actions';
// import { fetchAPICurrencies } from '../actions';

const alimentacao = 'Alimentação';
class Form extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setAPIOptions = this.setAPIOptions.bind(this);
  }

  componentDidMount() {
    this.setAPIOptions();
  }
  // Ajuda com o Thunk de Mariana Saraiva:
  // https://github.com/tryber/sd-016-b-project-trybewallet/pull/55

  setAPIOptions() {
    const { setFetchAPI } = this.props;
    requestFetchAPI()
      .then((response) => {
        this.setState({ exchangeRates: response });
        const array = Object.keys(response);
        setFetchAPI(array);
      });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  handleClick() {
    const { id } = this.state;
    const { setExpense } = this.props;
    setExpense(this.state);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: alimentacao,
    });
    this.setAPIOptions();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currenciesArray } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor da despesa:
          <input
            type="text"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            type="number"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currenciesArray
              .filter((e) => e !== 'USDT')
              .map((e) => <option key={ e } data-testid={ e }>{e}</option>) }
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento:
          <select
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value={ alimentacao }>Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currenciesArray: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setExpense: PropTypes.func.isRequired,
  setFetchAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesArray: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setFetchAPI: (state) => dispatch(getCurrencies(state)),
  setExpense: (state) => dispatch(actionSaveExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
