require('dotenv').config();
const axios = require('axios');

const API_ENDPOINT = 'https://min-api.cryptocompare.com';
const API_PATH = '/data/pricemulti';

const COINS = 'BTC,ETH';
const CURRENCY = 'JPY,USD';

const API_URL = `${API_ENDPOINT}${API_PATH}?fsyms=${COINS}&tsyms=${CURRENCY}`;

const BTC_ALERT = process.env.BTC_ALERT ? Number(process.env.BTC_ALERT) : undefined;
const ETH_ALERT = process.env.ETH_ALERT ? Number(process.env.ETH_ALERT) : undefined;

const apiClient = axios.create({
    headers: {
        'Authorization': `Apikey ${process.env.API_KEY}`
    }
});

const compareBTC = (BTC) => {
    if (BTC_ALERT) {
        if (BTC.JPY >= BTC_ALERT) {
            console.log('[ALERT] BTC has exceeded BTC alert');
        }
    }

    console.log(`BTC is worth $${BTC.USD} and ${BTC.JPY} yen`);
};

const compareETH = (ETH) => {
    if (ETH_ALERT) {
        if (ETH.JPY >= ETH_ALERT) {
            console.log('[ALERT] ETH has exceeded ETH alert');
        }
    }

    console.log(`ETH is worth $${ETH.USD} and ${ETH.JPY} yen`);
};

const sendRequest = async () => {
    try {
        const response = await apiClient.get(API_URL);

        compareBTC(response.data.BTC);
        compareETH(response.data.ETH);
    } catch (error) {
        console.error('error fetching data', error);
    } finally {
        setTimeout(sendRequest, 5000);
    }
};

sendRequest();
