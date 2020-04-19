import {pingRequest, cityLister} from '../models/indexModel';
import {registeredSectionPage} from '../register'

pingRequest();
registeredSectionPage();
cityLister();


document.getElementById("search_button").addEventListener("click",() => {

    const searchVariables = {
        departure : document.querySelector('.form-control').form[0].value,
        destination : document.querySelector('.form-control').form[1].value,
        hour : document.querySelector('.form-control').form[2].value,
        minute : document.querySelector('.form-control').form[3].value
    }
    
    class search_parameters {
    
        constructor( departure, destination, hour, minute){
            this.departure = departure;
            this.destination = destination;
            this.hour = hour;
            this.minute = minute;
        }
        
        summarize() {
            console.log(`Departure = ${this.departure}
            Destination = ${this.destination}
            Hour = ${this.hour}
            Minute = ${this.minute}
            ${JSON.stringify(searchVariables)}`)
        }
    }
    
    
    const searchParameters = new search_parameters(searchVariables.departure, searchVariables.destination, searchVariables.hour, searchVariables.minute);

    searchParameters.summarize();

    if (searchParameters.departure !== "" && searchParameters.destination !== ""){
    window.open(`search.html?filters=_fromCity:"${searchParameters.departure}"_toCity:"${searchParameters.destination}"_fromHour:"${searchParameters.hour}"_fromMinute:"${searchParameters.minute}"`);
    }
    else {
        alert(`Lütfen girdiğiniz bilgileri kontrol edin`);
    }
});



