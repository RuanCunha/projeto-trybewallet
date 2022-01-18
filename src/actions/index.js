// Coloque aqui suas actions
import requestFetchAPI from '../services/requestAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const actionSaveEmail = (state) => ({
  type: SAVE_EMAIL, state,
});

export const actionSaveExpense = (state) => ({
  type: SAVE_EXPENSES, state,
});

export const getCurrencies = (payload) => ({ type: SAVE_CURRENCIES, payload });

export function fetchAPICurrencies() {
  return (dispatch) => requestFetchAPI().then((data) => dispatch(getCurrencies(data)));
}
