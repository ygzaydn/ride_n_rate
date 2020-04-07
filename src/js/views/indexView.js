import {searchVariables, search_parameters, pingRequest} from '../models/indexModel';
import {registeredSectionPage} from '../register'

pingRequest();
registeredSectionPage();


document.getElementById("search_button").addEventListener("click",() => {

    const searchParameters = new search_parameters(searchVariables.departure.value, searchVariables.destination.value, searchVariables.day, searchVariables.month);

    searchParameters.summarize();

    if (searchParameters.departure !== "" && searchParameters.destination !== ""){
    window.open(`search.html?filters=_fromCity:"${searchParameters.departure}"_toCity:"${searchParameters.destination}"_fromHour:${searchParameters.day}_fromMinute:${searchParameters.month}`);
    }
    else {
        alert(`Lütfen girdiğiniz bilgileri kontrol edin`);
    }
});



