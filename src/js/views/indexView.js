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
    let res = await axios(config);
    let data = JSON.parse(JSON.stringify(res));
    
    console.log(data.data);
}
pingRequest();

/* fetch('http://127.0.0.1:9999/ping')
.then((res)=> {
    console.log(res)
}) */


import {indexScreen, indexScreenArr, searchVariables, search_parameters, registeredSectionPage} from '../models/indexModel';

registeredSectionPage(true);

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



