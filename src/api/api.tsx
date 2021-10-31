import axios from 'axios';

export const getCurrencies = () => {
    return axios.get('https://api.exchangerate.host/latest')
        .then(response => response.data.rates);
}

export const getCurrencyExchange = (amount: string) => {
    return axios.get(`https://api.exchangerate.host/convert?from=EUR&to=USD&amount=${amount}`)
        .then(response => response.data.result);
}