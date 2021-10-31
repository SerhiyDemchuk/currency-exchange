import { Stack, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { fetchExchange } from '../redux/reducers/actionCreators';
import { RootState } from '../redux/store';

interface Props {

}

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    pageTitle: {
        maxWidth: 650,
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap'
        }
    },
}));


const CurrencyExchange: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { currencyExchanged } = useTypedSelector((state: RootState) => state.currencyReducer);
    const dispatch = useTypedDispatch();

    const exchangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(fetchExchange(e.target.value));
    }

    return (
        <Stack marginX="20px">
            <main className={classes.main}>
                <Stack className={classes.pageTitle} flexDirection="column" alignItems="flex-start" justifyContent="space-between">
                    <h3>EUR</h3>
                    <Stack
                    sx={{ maxWidth: 650, width: '100%'}} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between"
                    >
                        <Stack sx={{ maxWidth: 290, width: '100%'}}>
                            <h5>EUR</h5>
                            <TextField onChange={exchangeCurrency} />
                        </Stack>
                        <Stack sx={{ maxWidth: 290, width: '100%'}}>
                            <h5>USD</h5>
                            <TextField value={currencyExchanged} />
                        </Stack>
                    </Stack>
                </Stack>
            </main>
        </Stack>
    )
}

export default CurrencyExchange;
