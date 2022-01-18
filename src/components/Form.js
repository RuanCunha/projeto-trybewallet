import React, { Component } from 'react';
import { connect } from 'react-redux';
import requestFetchAPI from '../services/requestAPI';
import { fetchAPICurrencies } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      currenciesArray: [],
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
    requestFetchAPI()
      .then((response) => this.setState({ currenciesArray: Object.keys(response) }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { id } = this.state;
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
    });
  }

  render() {
    const { value, description, currency, method, tag, currenciesArray } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor da despesa:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            type="number"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currenciesArray
              .filter((e) => e !== 'USDT')
              .map((e) => <option key={ e }>{e}</option>) }
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
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

const mapDispatchToProps = (dispatch) => ({
  setFetchAPI: () => dispatch(fetchAPICurrencies()),
});

export default connect(null, mapDispatchToProps)(Form);
