export interface ICurrency {
    [key: string]: number;
};

export interface ICurrencies {
    rates: ICurrency;
};

export interface IAddedCurrency {
    currency: string;
    isAdded: boolean;
}