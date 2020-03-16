const indexScreen = document.querySelectorAll('.form-control');
const indexScreenArr = Array.from(indexScreen); 

const searchVariables = {
    departure : indexScreenArr[0],
    destination : indexScreenArr[1],
    day : indexScreenArr[2].selectedIndex+1,
    month : indexScreenArr[3].selectedIndex+1
} 

class search_parameters {
    
    constructor( departure, destination, day, month){
        this.departure = departure;
        this.destination = destination;
        this.day = day;
        this.month = month;
    }

    summarize = () => {
        console.log(`Departure = ${this.departure}
        Destination = ${this.destination}
        Day = ${this.day}
        Month = ${this.month}`)
    }
}

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

