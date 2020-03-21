const axios = require('axios').default

/* async function ping (query) {
    const res = await axios(`http://127.0.0.1:9999/${query}`);
    console.log(res);
}
ping(ping); */

async function pingRequest () {
    const config = {
        method : 'get',
        url : 'http://127.0.0.1:9999/ping'
    }
    let res = await axios(config)
    console.log(res.data);
}
pingRequest();

/* fetch('http://127.0.0.1:9999/ping')
.then((res)=> {
    console.log(res)
}) */

import {indexScreen, indexScreenArr, searchVariables} from '../models/indexModel.js'
import search_parameter from '../models/indexModel'

document.getElementById("search_button").addEventListener("click",() => {

    const searchParameters = new search_parameters(searchVariables.departure.value, searchVariables.destination.value, searchVariables.day, searchVariables.month);

    searchParameters.summarize();

    if (searchParameters.departure !== "" && searchParameters.destination !== ""){
    window.open(`search.html?filters=departure:${searchParameters.departure};destination:${searchParameters.destination};day:${searchParameters.day};month:${searchParameters.month}`);
    }
    else {
        alert(`Lütfen girdiğiniz bilgileri kontrol edin`);
    }
});



