const { request } = require("express");
const requestPromise = require("request-promise");

const fetchBitCoin = async ()=>{

    try{
        //***`https://api.openweathermap.org/data/2.5/weather?q=Bilaspur&appid=0c7b5085f73e81688a753c72b9153714`'
    const res = await requestPromise('https://api.cryptonator.com/api/ticker/btc-usd');
   // console.log("fetch promise is done!!!!!!");
    //const data  = await res.json();
    //console.log("Json is done!!!!!!");
    //console.log("*********************");
    console.log(res ,"\n", typeof(res));
    }
    catch(e){
    console.log("Something went wrong!!!!!!!!!!!!!",e);
    }
}

fetchBitCoin();