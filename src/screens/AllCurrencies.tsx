import React from 'react'
import { makeStyles } from '@mui/styles';
import Item from '../components/Item'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { RootState } from '../redux/store';
import { Stack, Theme } from '@mui/material';
import SearchInput from '../components/SearchInput';
import { IAddedCurrency } from '../models/ICurrency';
import { currencySlice } from '../redux/reducers/currencySlice';

interface Props {

}

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    pageTitle: {
        maxWidth: 545,
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        }
    }
}));

const AllCurrencies: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { allCurrencies, searchCurrency } = useTypedSelector((store: RootState) => store.currencyReducer);
    const dispatch = useTypedDispatch();

    const searchCurrencyName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(currencySlice.actions.searchCurrency(e.target.value as string));
    };

    const handleCurrency = (currencyName: string, isAdded: boolean) => {
        if (isAdded === false) {
            dispatch(currencySlice.actions.removeCurrency({ currency: currencyName, isAdded }));
        };
        dispatch(currencySlice.actions.addCurrency({ currency: currencyName, isAdded }));
    };

    const filterArray = (array: IAddedCurrency[]) => {
        return array.filter((value: IAddedCurrency) => {
            if (searchCurrency === '') return value.currency;
            if (value.currency.toUpperCase().includes(searchCurrency.toUpperCase())) {
                return value.currency;
            };
        });
    };

    return (
        <Stack marginX="20px">
            <main className={classes.main}>
                <Stack className={classes.pageTitle} flexDirection="row" alignItems="center" justifyContent="space-between">
                    <h2>All currencies</h2>
                    <SearchInput searchCurrencyName={searchCurrencyName} />
                </Stack>
                {filterArray(allCurrencies).map((item: IAddedCurrency, index: number) => (
                    <Item
                        handleCurrency={handleCurrency}
                        key={index}
                        currencyName={item.currency}
                        isAdded={item.isAdded}
                    />
                ))}
            </main>
        </Stack>
    )
}

export default AllCurrencies;
