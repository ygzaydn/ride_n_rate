import { companySearch, companyFilter } from "../models/companiesModel";

import { registeredSectionPage } from "../register";

window.page = 1;

registeredSectionPage();
companySearch(page);
document.getElementById("current-page").innerHTML = page;

const resetField = () => {
  document.getElementById("companies").innerHTML = "";
};

/*document.getElementById("list_button").addEventListener("click", () => {
  const userFilter = new search_variables(
    searchVariables.companyName.value,
    searchVariables.departure.value,
    searchVariables.destination.value,
    searchVariables.minimumPoint.textContent.trim(),
    searchVariables.pet.checked,
    searchVariables.threeSeat.checked
  );

  userFilter.summarize();
});*/

document.getElementById("pet_checkbox").addEventListener("click", () => {
  companyFilter(page);
});

document.getElementById("3seat_bus").addEventListener("click", () => {
  companyFilter(page);
});

document.getElementById("reset_button").addEventListener("click", () => {
  let elements = document.querySelectorAll(".lh-content");
  let companies = document.querySelectorAll(".company_names");
  for (let i = 0; i < companies.length; i++) {
    elements[i].style.display = "";
  }

  document.getElementById("pet_checkbox").checked = false;
  document.getElementById("3seat_bus").checked = false;
});

/*window.pointFilter = function () {
  companyFilter(page);
};*/

const companyNameFilter = () => {
  let searchText = document.querySelector("#company_name_text");
  let filter = searchText.value.toUpperCase();
  let companies = document.querySelectorAll(".company_names");
  let elements = document.querySelectorAll(".lh-content");

  for (let i = 0; i < companies.length; i++) {
    let txtValue = companies[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
};

const departureFilter = () => {
  const searchText = document.querySelector("#departure_place_text");
  const filter = searchText.value.toUpperCase();
  const fromCities = document.querySelectorAll(".cities-from");
  let companies = document.querySelectorAll(".company_names");
  let elements = document.querySelectorAll(".lh-content");

  for (let i = 0; i < companies.length; i++) {
    let txtValue = fromCities[i].innerText.toUpperCase();
    if (txtValue.indexOf(filter) > -1) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
};

function destinationFilter() {
  const searchText = document.querySelector("#arrival_place_text");
  const filter = searchText.value.toUpperCase();
  const toCities = document.querySelectorAll(".cities-to");
  let companies = document.querySelectorAll(".company_names");
  let elements = document.querySelectorAll(".lh-content");

  for (let i = 0; i < companies.length; i++) {
    let txtValue = toCities[i].innerText.toUpperCase();
    if (txtValue.indexOf(filter) > -1) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
}

document
  .getElementById("company_name_text")
  .addEventListener("keyup", companyNameFilter);

document
  .getElementById("arrival_place_text")
  .addEventListener("keyup", destinationFilter);

document
  .getElementById("departure_place_text")
  .addEventListener("keyup", departureFilter);

document.getElementById("decrease-page").addEventListener("click", () => {
  if (page > 1) {
    page--;
  }
  resetField();
  companySearch(page);
  setTimeout(() => { document.getElementById("current-page").innerHTML = page; } , 500);
});

document.getElementById("increase-page").addEventListener("click", () => {
  if (page < localStorage.getItem("maxpage")) {
    page++;
  }
  resetField();
  companySearch(page);
  setTimeout(() => { document.getElementById("current-page").innerHTML = page; } , 500);
});
