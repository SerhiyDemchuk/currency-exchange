import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencies, getCurrencyExchange } from "../../api/api";

export const fetchCurrencies = createAsyncThunk(
    'fetchAll',
    async(_:void, thunkAPI) => {
        try {
            const response = await getCurrencies();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("An error occured :(");
        }
    }
);

export const fetchExchange = createAsyncThunk(
    'fetchExchange',
    async(amount: string, thunkAPI) => {
        try {
            const response = await getCurrencyExchange(amount);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("An error occured :(");
        };
    }
);