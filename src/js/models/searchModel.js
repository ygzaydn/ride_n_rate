const axios = require("axios").default;
axios.defaults.withCredentials = true;
import { url } from "../register";

async function travelFilter() {
  const config = {
    method: "post",
    url: `${url}/api/travelslots/all`,
    data: {
      filters: {
        query: {
          fromHour: `${location.href.split("?")[1].split("%22")[5]}`,
          fromCity: `${location.href.split("?")[1].split("%22")[1]}`,
          toCity: `${location.href.split("?")[1].split("%22")[3]}`, //location.href.split('?')[1].split('%22')[3]
        },
        pagination: { pageNumber: 1 },
      },
    },
  };
  try {
    let res = await axios(config);
    let resArr = res.data;
    console.log(resArr);

    resArr.forEach((el) => {
      //console.log(el.travelslot.isPetAllowed);
      //console.log(el.travelslot.is3Seater);
      const starBuilder = () => {
        let output = ``;
        for (let i = 0; i < el.travelslot.averageRating; i++) {
          output += `<span class="icon-star text-warning"></span>`;
        }
        return output;
      };
      let companyNameWithoutSpace = el.company.title
        .split(":")[1]
        .replace(/\s+/g, "")
        .toLowerCase();
      const DOM = document.querySelector(".companies");
      DOM.insertAdjacentHTML(
        "beforeend",
        `
        <div class="d-block d-md-flex listing-horizontal">
        <a href="search_result.html?${el.travelslot.uuid}?${
          el.company.uuid
        }" class="img d-block" style="background-image: url('src/images/companies/${companyNameWithoutSpace}.png'); object-fit: cover;">
        </a>
        <div class="lh-content">
  
        <h3><a class="company_names" href="search_result.html?${
          el.travelslot.uuid
        }?${el.company.uuid}"</a></h3>
        <!--  <p>
        <span class="icon-star text-warning"></span>
        <span class="icon-star text-warning"></span>
        <span class="icon-star text-warning"></span>
        <span class="icon-star text-warning"></span>
        <span class="icon-star text-secondary"></span>
        <span>(492 Değerlendirme)</span>
        </p> -->
        <p hidden class="pet">${el.travelslot.isPetAllowed}</p>
        <p hidden class="threeSeat">${el.travelslot.is3Seater}</p>
        <h3>${el.travelslot.fromCity} - ${el.travelslot.toCity}<br></h3>
        <span>(${el.travelslot.reviewCount} Değerlendirme)<br></span>
    
        <span>Kalkış: ${el.travelslot.travelTime}</span>
        <p>
        
            ${starBuilder()}
        </p>
        </div>
        </div>`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

const companiesScreen = document.querySelectorAll(".form-group");
const companiesScreenArr = Array.from(companiesScreen);

let searchVariables = {
  minimumPoint: companiesScreenArr[1], //textcontent.trim()
  pet: companiesScreen[3].getElementsByClassName("box1")[0], //checked
  threeSeat: companiesScreen[3].getElementsByClassName("box2")[0], //checked
};

export { searchVariables, companiesScreenArr, companiesScreen, travelFilter };
export class search_variables {
  constructor(minimumPoint, pet, threeSeat) {
    this.minimumPoint = minimumPoint;
    this.pet = pet;
    this.threeSeat = threeSeat;
  }

  summarize() {
    console.log(`Minimum Point = ${this.minimumPoint}
        Pet = ${this.pet}
        Three Seat Bus = ${this.threeSeat}`);
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
