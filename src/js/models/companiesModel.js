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

async function companySearch(page) {
  const config = {
    method: "post",
    url: `${url}/api/companies/all`,
    data: {
      filters: {
        pageNumber: page,
      },
    },
  };

  let result = await axios(config);
  let resultData = result.data;
  localStorage.setItem('maxpage',(result.headers['x-max-pages']));

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
      //console.log(data);

      companyListDOM.insertAdjacentHTML(
        "beforeend",
        `
        <div class="d-block d-md-flex listing-horizontal pet threeseat" >
        <a href="companydetail.html?${
          el.uuid
        }" class="img d-block" style="background-image: url('src/images/companies/${parsedTitleNoSpace}.png')">
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

async function filterBuilder(page) {
  const config = {
    method: "post",
    url: `${url}/api/companies/all`,
    data: {
      filters: {
        pageNumber: page,
      },
    },
  };

  const threeSeatSupport = [];
  const petSupport = [];
  let result = await axios(config);
  let resultData = result.data;
  //console.log(resultData);

  resultData.forEach((el) => {
    let title = el.title;
    let parsedTitle = title.substring(7);

    threeSeatSupport.push(`${parsedTitle}-${el.information.is3Seater}`);
    petSupport.push(`${parsedTitle}-${el.information.petAllowed}`);
  });

  return { threeSeatSupport, petSupport };
}

async function companyFilter(page) {
  const petValuesArr = await (await filterBuilder(page)).petSupport;
  const threeSeatSupportArr = await (await filterBuilder(page))
    .threeSeatSupport;

  let filterPet = document.getElementById("pet_checkbox").checked;
  let filterThree = document.getElementById("3seat_bus").checked;
  let elements = document.querySelectorAll(".lh-content");
  filterPet = filterPet.toString();
  filterThree = filterThree.toString();

  const valuePet = [];
  const valueThree = [];

  petValuesArr.forEach((el, ind) => {
    valuePet[ind] = el.split("-")[1];
  });

  threeSeatSupportArr.forEach((el, ind) => {
    valueThree[ind] = el.split("-")[1];
  });

  elements.forEach((el, ind) => {
    if (filterPet === valuePet[ind] && filterThree === valueThree[ind]) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });
}

export { companiesScreen, companiesScreenArr, companySearch, companyFilter };
