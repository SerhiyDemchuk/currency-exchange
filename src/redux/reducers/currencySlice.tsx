import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddedCurrency, ICurrency } from "../../models/ICurrency";
import { fetchCurrencies, fetchExchange } from "./actionCreators";

interface currencyState {
    allCurrencies: Array<IAddedCurrency>;
    isLoading: boolean;
    addedCurrencies: Array<IAddedCurrency>;
    isAdded: boolean;
    error: string;
    exchangeIsLoading: boolean;
    currencyExchanged: string;
    searchCurrency: string;
}

const initialState: currencyState = {
    allCurrencies: [],
    addedCurrencies: [],
    isAdded: false,
    isLoading: false,
    error: '',
    exchangeIsLoading: false,
    currencyExchanged: '',
    searchCurrency: '',
}

export const currencySlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        hydrate: (state, action) => {
            // do not do state = action.payload it will not update the store
            return action.payload;
        },
        addCurrency(state, action: PayloadAction<IAddedCurrency>) {
            if (action.payload.isAdded === true) {
                state.addedCurrencies.push(action.payload);
            };
            state.allCurrencies.forEach((item: IAddedCurrency) => {
                if (item.currency === action.payload.currency) {
                    item.isAdded = action.payload.isAdded;
                };
            });
        },
        removeCurrency(state, action: PayloadAction<IAddedCurrency>) {
            state.addedCurrencies.splice(state.addedCurrencies.findIndex((arrow) => arrow.currency === action.payload.currency), 1);
            state.allCurrencies.forEach((item: IAddedCurrency) => {
                if (item.currency === action.payload.currency) {
                    item.isAdded = action.payload.isAdded;
                };
            });
        },
        searchCurrency(state, action: PayloadAction<string>) {
            state.searchCurrency = action.payload;
        }
    },
    extraReducers: {
        [fetchCurrencies.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCurrencies.fulfilled.type]: (state, action: PayloadAction<ICurrency>) => {
            state.isLoading = false;
            state.error = '';
            Object.keys(action.payload).map((value: string) => (
                state.allCurrencies.push({ currency: value, isAdded: false })
            ))
        },
        [fetchCurrencies.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [fetchExchange.pending.type]: (state) => {
            state.exchangeIsLoading = true;
        },
        [fetchExchange.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.exchangeIsLoading = false;
            state.error = '';
            state.currencyExchanged = action.payload;
        },
        [fetchExchange.pending.type]: (state, action: PayloadAction<string>) => {
            state.exchangeIsLoading = false;
            state.error = action.payload;
        },
    }
});

export default currencySlice.reducer;
