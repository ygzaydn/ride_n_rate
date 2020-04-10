const axios = require('axios').default;
axios.defaults.withCredentials = true;
import {url} from '../register';


const companiesScreen = document.querySelectorAll('.form-group');
const companiesScreenArr = Array.from(companiesScreen);
const companyListDOM = document.querySelector('.company-names');

async function companySearch () {
    const config = {
        method : 'post',
        url : `${url}/api/companies/all`,
    }
    const points = [];
    const threeSeatSupport = [];
    const petSupport = [];
    let result = await axios(config);
    let resultData = result.data;

    resultData.forEach( el => {
     
    const starBuilder = () => {
        let output = ``
            for(let i=0;i<el.averateRating;i++){
                output+=`<span class="icon-star text-warning"></span>`
            }
        return output;
    }    
    let title = el.title;
    let parsedTitle = title.substring(7);
    let parsedTitleNoSpace = parsedTitle.replace(/\s+/g, '').toLowerCase();
    points.push(el.averateRating);
    threeSeatSupport.push(el.information.is3seater);
    petSupport.push(el.information.petAllowed);
    
    companyListDOM.insertAdjacentHTML('afterbegin',`
    <div class="d-block d-md-flex listing-horizontal">
    <a href="#" class="img d-block" style="background-image: url('src/images/companies/${parsedTitleNoSpace}.png')">
    </a>
    <div class="lh-content">
      <h3><a class="company_names" href="companydetail.html?${el.uuid}">${parsedTitle}</a></h3>
      <p>
        ${starBuilder()}
      </p>
      <span>(${el.reviewCount} Değerlendirme)</span>
    </div>
    </div>
    `);
    
    });
    return {points,threeSeatSupport,petSupport};
    
}

async function companyPointFilter () {
    const pointsArr = await (await companySearch()).points;
    console.log(pointsArr);
    
    let point = document.getElementById('star_slide').value;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (let i=0; i<companies.length; i++){
        if(pointsArr[i] >= point) {
            elements[i].style.display = ""
        } else {
            elements[i].style.display = "none";
        }
    }
}

async function companyPetFilter() {
    const petValuesArr = await (await companySearch()).petSupport;

    let filter = document.getElementById("pet_checkbox").checked;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (let i=0; i<companies.length; i++){
        if(filter === petValuesArr[i]){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
}

async function companyThreeSeatFilter() {
    const threeSeatSupportArr = await (await companySearch()).petSupport;

    let filter = document.getElementById("3seat_bus").checked;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (let i=0; i<companies.length; i++){
        if(filter === threeSeatSupportArr[i]){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
}


let searchVariables = {
    companyName : companiesScreenArr[0].getElementsByClassName("form-control")[0], //value
    departure : companiesScreenArr[1].getElementsByClassName("form-control")[0],
    destination : companiesScreenArr[2].getElementsByClassName("form-control")[0],
    minimumPoint : companiesScreenArr[4], //textcontent.trim()
    pet : companiesScreen[6].getElementsByClassName("box1")[0], //checked
    threeSeat : companiesScreen[6].getElementsByClassName("box2")[0]  //checked
}

const points = {
    kamilkoc : 2,
    pamukkale : 2.3,
    efetur : 0.5,
    nilufer : 4,
    metro : 4.2,
    ulusoy : 3.2
}
const pointsArr = Array.from(Object.values(points));

const threeSeatSupport = {
    kamilkoc : true,
    pamukkale : false,
    efetur : false,
    nilufer : true,
    metro : false,
    ulusoy : false
}

const threeSeatSupportArr = Array.from(Object.values(threeSeatSupport));

const places = {
    kamilkoc : ["İstanbul","İzmir","Ankara","Antalya","Samsun","İzmit"],
    pamukkale : ["İstanbul","İzmir","Antalya","Samsun","İzmit"],
    ulusoy : ["İstanbul","Ankara",,"Samsun","İzmit"],
    efetur : ["İstanbul","İzmir","Ankara","Antalya","İzmit"],
    nilufer : ["İstanbul","İzmir","Ankara","Antalya","Samsun"],
    metro : ["İzmir","Ankara","Antalya","Samsun","İzmit"]
}
 
const placesArr = Array.from(Object.values(places));

export {companiesScreen, companiesScreenArr, searchVariables, pointsArr, threeSeatSupportArr, placesArr, companySearch, companyPointFilter, companyPetFilter, companyThreeSeatFilter};
export class search_variables {

    constructor (companyName, departure, destination, minimumPoint, pet, threeSeat) {
        this.companyName = companyName;
        this.departure = departure;
        this.destination = destination;
        this.minimumPoint = minimumPoint;
        this.pet = pet;
        this.threeSeat = threeSeat;
    }

    summarize() {
        console.log (`Company Name = ${this.companyName}
        Departure = ${this.departure}
        Destination = ${this.destination}
        Minimum Point = ${this.minimumPoint}
        Pet = ${this.pet}
        Three Seat Bus = ${this.threeSeat}`)
    }
}
