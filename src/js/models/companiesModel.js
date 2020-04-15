const axios = require("axios").default;
axios.defaults.withCredentials = true;
import { url } from "../register";

const companiesScreen = document.querySelectorAll(".form-group");
const companiesScreenArr = Array.from(companiesScreen);
const companyListDOM = document.querySelector(".company-names");

const companyCitiesBuilder = async (uuid) => {
  const config = {
    method: "get",
    url: `${url}/api/companies/cities/${uuid}`,
  };
  const result = await axios(config);
  const resultData = result.data;
  return { resultData };
};

async function companySearch() {
  const config = {
    method: "post",
    url: `${url}/api/companies/all`,
  };

  let result = await axios(config);
  let resultData = result.data;

  //console.log(resultData);

  resultData.forEach((el) => {
    const starBuilder = () => {
      let output = ``;
      for (let i = 0; i < el.averateRating; i++) {
        output += `<span class="icon-star text-warning"></span>`;
      }
      return output;
    };

    let title = el.title;
    let parsedTitle = title.substring(7);
    let parsedTitleNoSpace = parsedTitle.replace(/\s+/g, "").toLowerCase();
    companyCitiesBuilder(el.uuid).then((data) => {
        console.log(data);
          
        companyListDOM.insertAdjacentHTML(
        "beforeend",
        `
        <div class="d-block d-md-flex listing-horizontal pet threeseat" >
        <a href="#" class="img d-block" style="background-image: url('src/images/companies/${parsedTitleNoSpace}.png')">
        </a>
        <div class="lh-content">
          <h3><a class="company_names" href="companydetail.html?${
            el.uuid
          }">${parsedTitle}</a></h3>
          <p>
            ${starBuilder()}
          </p>
          <span>(${el.reviewCount} Değerlendirme)</span>
          <div class="cities-from" hidden>${data.resultData.from} </div>
          <div class="cities-to" hidden>${data.resultData.to} </div>
        </div>
        </div>
        `
      );
    });
  });
}

async function filterBuilder() {
  const config = {
    method: "post",
    url: `${url}/api/companies/all`,
  };
  const points = [];
  const threeSeatSupport = [];
  const petSupport = [];
  let result = await axios(config);
  let resultData = result.data;

  resultData.forEach((el) => {
    let title = el.title;
    let parsedTitle = title.substring(7);
    points.push(`${parsedTitle}-${el.averateRating}`);
    threeSeatSupport.push(`${parsedTitle}-${el.information.is3Seater}`);
    petSupport.push(`${parsedTitle}-${el.information.petAllowed}`);
  });

  return { points, threeSeatSupport, petSupport, fromCities, toCities };
}

async function companyFilter() {
  const pointsArr = await (await filterBuilder()).points;
  const petValuesArr = await (await filterBuilder()).petSupport;
  const threeSeatSupportArr = await (await filterBuilder()).threeSeatSupport;

  let point = document.getElementById("star_slide").value;
  let filterPet = document.getElementById("pet_checkbox").checked;
  let filterThree = document.getElementById("3seat_bus").checked;
  let length = document.querySelectorAll(".threeseat").length;
  let elements = document.querySelectorAll(".lh-content");
  filterPet = filterPet.toString();
  filterThree = filterThree.toString();

  const companies = [];
  const companyPoint = [];
  const valuePoint = [];
  const companyPet = [];
  const valuePet = [];
  const companyThree = [];
  const valueThree = [];

  for (let i = 0; i < length; i++) {
    companies[i] = elements[i].innerHTML.split('">')[1].split("</")[0];
  }
  for (let i = 0; i < petValuesArr.length; i++) {
    companyPet[i] = petValuesArr[i].split("-")[0];
    valuePet[i] = petValuesArr[i].split("-")[1];
    companyThree[i] = threeSeatSupportArr[i].split("-")[0];
    valueThree[i] = threeSeatSupportArr[i].split("-")[1];
    companyPoint[i] = pointsArr[i].split("-")[0];
    valuePoint[i] = pointsArr[i].split("-")[1];
  }

  //console.log(companies);

  for (let i = 0; i < length; i++) {
    if (
      companies[i] === companyPet[i] &&
      companies[i] === companyThree[i] &&
      companies[i] === companyPoint[i]
    ) {
      if (
        filterPet === valuePet[i] &&
        filterThree === valueThree[i] &&
        valuePoint[i] >= point
      ) {
        elements[i].style.display = "";
      } else {
        elements[i].style.display = "none";
      }
    }
  }
}

let searchVariables = {
  companyName: companiesScreenArr[0].getElementsByClassName("form-control")[0], //value
  departure: companiesScreenArr[1].getElementsByClassName("form-control")[0],
  destination: companiesScreenArr[2].getElementsByClassName("form-control")[0],
  minimumPoint: companiesScreenArr[4], //textcontent.trim()
  pet: companiesScreen[6].getElementsByClassName("box1")[0], //checked
  threeSeat: companiesScreen[6].getElementsByClassName("box2")[0], //checked
};

const places = {
  kamilkoc: ["İstanbul", "İzmir", "Ankara", "Antalya", "Samsun", "İzmit"],
  pamukkale: ["İstanbul", "İzmir", "Antalya", "Samsun", "İzmit"],
  ulusoy: ["İstanbul", "Ankara", , "Samsun", "İzmit"],
  efetur: ["İstanbul", "İzmir", "Ankara", "Antalya", "İzmit"],
  nilufer: ["İstanbul", "İzmir", "Ankara", "Antalya", "Samsun"],
  metro: ["İzmir", "Ankara", "Antalya", "Samsun", "İzmit"],
};

const placesArr = Array.from(Object.values(places));

export {
  companiesScreen,
  companiesScreenArr,
  searchVariables,
  placesArr,
  companySearch,
  companyFilter,
};
export class search_variables {
  constructor(
    companyName,
    departure,
    destination,
    minimumPoint,
    pet,
    threeSeat
  ) {
    this.companyName = companyName;
    this.departure = departure;
    this.destination = destination;
    this.minimumPoint = minimumPoint;
    this.pet = pet;
    this.threeSeat = threeSeat;
  }

  summarize() {
    console.log(`Company Name = ${this.companyName}
        Departure = ${this.departure}
        Destination = ${this.destination}
        Minimum Point = ${this.minimumPoint}
        Pet = ${this.pet}
        Three Seat Bus = ${this.threeSeat}`);
  }
}
