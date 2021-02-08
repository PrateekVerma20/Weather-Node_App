const requestPromise = require("request-promise");

const fetchBitCoin = async ()=>{

    try{
        //
    const res = await requestPromise('https://api.cryptonator.com/api/ticker/btc-usd');
   // console.log("fetch promise is done!!!!!!");
    const data  = await res.json();
    //console.log("Json is done!!!!!!");
    //console.log("*********************");
    console.log(data);
    }
    catch(e){
    console.log("Something went wrong!!!!!!!!!!!!!",e);
    }
}

fetchBitCoin();