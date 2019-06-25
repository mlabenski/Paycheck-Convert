const axios = require('axios');
'use strict';
const fs = require('fs');

//api to get usd to btc:eth conversion https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=BTC,ETH

//getting the info from each paycheck
let rawData = fs.readFileSync('paychecks.json');
let paycheck = JSON.parse(rawData);


const getCryptoValue = async (crypto) => {
    let date = Date.now();
    const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=BTC,ETH&ts=${date}&api_key=7645906737124f583645f33ffcfda9398a5d3cc680d7bbb2bb745245446fb107`)
    return (response.data['USD']['ETH'])
}

const convertPaycheck = async(amount) => {
    const currentEthPrice = await getCryptoValue();
    return currentEthPrice * amount;
}


for(var i =0; i < paycheck.length; i++){
    var price = paycheck[i].amount;
    console.log(`for the paycheck on ${paycheck[i].date} you made ${paycheck[i].amount}`)
    convertPaycheck(price)
    .then((message) => {
        console.log(`You just purchased ${message.toFixed(5)} worth of etherum from that paycheck!!`);
    })
}

