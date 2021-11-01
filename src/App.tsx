import { Paper, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import { fetchCurrencies } from './redux/reducers/actionCreators';
import { RootState } from './redux/store';
import AllCurrencies from './screens/AllCurrencies';
import CurrencyExchange from './screens/CurrencyExchange';
import MyCurrencies from './screens/MyCurrencies';

const App: React.FC = () => {
    const { isLoading } = useTypedSelector((state: RootState) => state.currencyReducer);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        dispatch(fetchCurrencies());
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <Stack>
                        <>Loading...</>
                    </Stack>
                ) : (
                    <Paper>
                        <header>
                            <Header />
                        </header>
                        <Switch>
                            <Route
                                path="/"
                                exact
                                render={() => <Redirect to={'/all_currencies'} />}
                            />
                            <Route
                                path="/all_currencies"
                                component={AllCurrencies}
                            />
                            <Route
                                path="/my_currencies"
                                component={MyCurrencies}
                            />
                            <Route
                                path="/currency"
                                component={CurrencyExchange}
                            />
                        </Switch>
                    </Paper>
                )
            }
        </>
    )
};

export default App;
