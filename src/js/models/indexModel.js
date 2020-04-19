const axios = require('axios').default;
axios.defaults.withCredentials = true;
import {url} from '../register';

const indexScreen = document.querySelectorAll('.form-control');
const indexScreenArr = Array.from(indexScreen); 

async function cityLister() {
    const config = {
        method: 'get',
        url: `${url}/api/travelslots/cities`
    }
    let res = await axios(config);
    let fromArr = res.data.from;
    let toArr = res.data.to;
    fromArr.forEach(el => {
        const fromDOM = document.querySelector('.from-city');
        fromDOM.insertAdjacentHTML('beforeend',`
        <option value="${el}">${el}</option>`)
    })
    toArr.forEach(el => {
        const toDOM = document.querySelector('.to-city');
        toDOM.insertAdjacentHTML('beforeend',`
        <option value="${el}">${el}</option>`)
    })
    console.log(res);
}


const searchVariables = {
    departure : document.querySelector('.form-control').form[0].value,
    destination : document.querySelector('.form-control').form[1].value,
    hour : document.querySelector('.form-control').form[2].value,
    minute : document.querySelector('.form-control').form[3].value
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

 

export {indexScreen, indexScreenArr, searchVariables, pingRequest, cityLister}
/* export class search_parameters {
    
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
} */


