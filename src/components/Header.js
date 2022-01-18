import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  // Funcao e auxilio de Jonatas Passos
  // https://github.com/tryber/sd-016-b-project-trybewallet/pull/86
  sumValuesExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, cur) => {
      const cambio = cur.exchangeRates[cur.currency].ask;
      return acc + (Number(cur.value) * cambio);
    }, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">{ this.sumValuesExpenses().toFixed(2) }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
