const axios = require('axios').default;
axios.defaults.withCredentials = true;
import {url} from '../register';

async function travelFilter () {
    const config = {
        method: 'post',
        url: `${url}/api/travelslots/all`,
        data: {
            filters : {
                query: {
                    fromHour: 13,
                    fromCity: "Ankara",
                    toCity: "Mersin"
                }
            }
        }
    }
    try {
    let res = await axios(config);
    console.log(res);
    } catch(err) {console.log(err);
    }
}

const companiesScreen = document.querySelectorAll('.form-group');
const companiesScreenArr = Array.from(companiesScreen);

let searchVariables = {
    minimumPoint : companiesScreenArr[1], //textcontent.trim()
    pet : companiesScreen[3].getElementsByClassName("box1")[0], //checked
    threeSeat : companiesScreen[3].getElementsByClassName("box2")[0]  //checked
}

export {searchVariables, companiesScreenArr, companiesScreen, travelFilter}
export class search_variables {

    constructor (minimumPoint, pet, threeSeat) {
        this.minimumPoint = minimumPoint;
        this.pet = pet;
        this.threeSeat = threeSeat;
    }

    summarize() {
        console.log (`Minimum Point = ${this.minimumPoint}
        Pet = ${this.pet}
        Three Seat Bus = ${this.threeSeat}`)
    }
}

/*

<ul id = companies>
<div class="d-block d-md-flex listing-horizontal">
<a href="#" class="img d-block" style="background-image: url('src/images/companies/kamilkoc.png'); object-fit: cover;">
  <!-- <span class="category">Restaurants</span> -->
</a>
<div class="lh-content">
  <!-- <a href="#" class="bookmark"><span class="icon-heart"></span></a> -->
  <h3><a class="company_names" href="search_result.html">Kamil Koç Turizm</a></h3>
  <!-- <p>Don St, Brooklyn, New York</p> -->
  <p>
    <span class="icon-star text-warning"></span>
    <span class="icon-star text-warning"></span>
    <span class="icon-star text-warning"></span>
    <span class="icon-star text-warning"></span>
    <span class="icon-star text-secondary"></span>
    <span>(492 Değerlendirme)</span>
  </p>
  <span>(4 Yorum)<br></span>
  <span>Kalkış: 19:30</span>
</div>
</div>
*/