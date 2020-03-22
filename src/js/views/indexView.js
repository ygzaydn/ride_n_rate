const axios = require('axios').default;
axios.defaults.withCredentials = true;

import {indexScreen, indexScreenArr, searchVariables, search_parameters} from '../models/indexModel';
import {registeredSectionPage} from '../register'

registeredSectionPage();

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



