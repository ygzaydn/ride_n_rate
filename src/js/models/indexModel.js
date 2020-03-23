const axios = require('axios').default;
axios.defaults.withCredentials = true;
import {url} from '../register';

const indexScreen = document.querySelectorAll('.form-control');
const indexScreenArr = Array.from(indexScreen); 

const searchVariables = {
    departure : indexScreenArr[0],
    destination : indexScreenArr[1],
    day : indexScreenArr[2].selectedIndex+1,
    month : indexScreenArr[3].selectedIndex+1
} 

async function pingRequest() {
    const config = {
        method : 'get',
        url : `${url}/ping`
    }
    let res = await axios(config);
    let data = JSON.parse(JSON.stringify(res));
    
    console.log(data.data);
}

export {indexScreen, indexScreenArr, searchVariables, pingRequest}
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


