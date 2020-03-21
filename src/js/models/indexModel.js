const indexScreen = document.querySelectorAll('.form-control');
const indexScreenArr = Array.from(indexScreen); 

const searchVariables = {
    departure : indexScreenArr[0],
    destination : indexScreenArr[1],
    day : indexScreenArr[2].selectedIndex+1,
    month : indexScreenArr[3].selectedIndex+1
} 

export {indexScreen, indexScreenArr, searchVariables}
export class search_parameters {
    
    constructor( departure, destination, day, month){
        this.departure = departure;
        this.destination = destination;
        this.day = day;
        this.month = month;
    }

    summarize() {
        console.log(`Departure = ${this.departure}
        Destination = ${this.destination}
        Day = ${this.day}
        Month = ${this.month}`)
    }
}


