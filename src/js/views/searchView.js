import { travelFilter } from "../models/searchModel";
import { registeredSectionPage } from "../register";

window.page = 1;

registeredSectionPage();
travelFilter(page);
document.getElementById("current-page").innerHTML = page;

const resetField = () => {
  document.getElementById("companies").innerHTML = "";
};

document.getElementById("pet_checkbox").addEventListener("click", () => {
  const elements = document.querySelectorAll(".lh-content");
  const petValue = document.querySelectorAll(".pet");
  const threeSeatValue = document.querySelectorAll(".threeSeat");

  let petFilter = document.getElementById("pet_checkbox").checked;
  let threeSeatFilter = document.getElementById("3seat_bus").checked;

  petFilter = petFilter.toString();
  threeSeatFilter = threeSeatFilter.toString();

  for (let i = 0; i < elements.length; i++) {
    if (
      petFilter === petValue[i].innerText &&
      threeSeatFilter === threeSeatValue[i].innerText
    ) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
});

/* pointFilter = () => {

    let point = document.getElementById('star_slide').value;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (i=0; i<companies.length; i++){
        if(pointsArr[i] >= point) {
            elements[i].style.display = ""
        } else {
            elements[i].style.display = "none";
        }
    }
} */

window.urlParser = () => {
  const departure = location.href.split("?")[1].split("%22")[1];
  const destination = location.href.split("?")[1].split("%22")[3];
  const hour = location.href.split("?")[1].split("%22")[5];
  const minute = location.href.split("?")[1].split("%22")[7];

  document.getElementById("results_urlparser").textContent = `
    Kalkış yeri : ${departure},\
    İniş yeri: ${destination}\ Saat : ${hour}:${minute} bilgilerine sahip seferler aşağıda listelenmiştir..
    `;
};

document.getElementById("3seat_bus").addEventListener("click", () => {
  const elements = document.querySelectorAll(".lh-content");
  const petValue = document.querySelectorAll(".pet");
  const threeSeatValue = document.querySelectorAll(".threeSeat");

  let petFilter = document.getElementById("pet_checkbox").checked;
  let threeSeatFilter = document.getElementById("3seat_bus").checked;

  petFilter = petFilter.toString();
  threeSeatFilter = threeSeatFilter.toString();

  elements.forEach((el, ind) => {
    if (
      petFilter === petValue[ind].innerText &&
      threeSeatFilter === threeSeatValue[ind].innerText
    ) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });
});

document.getElementById("reset_button").addEventListener("click", () => {
  let elements = document.querySelectorAll(".lh-content");
  //let companies = document.querySelectorAll('.company_names');
  elements.forEach((el) => {
    el.style.display = "";
  });

  document.getElementById("pet_checkbox").checked = false;
  document.getElementById("3seat_bus").checked = false;
});

document.getElementById("decrease-page").addEventListener("click", () => {
  if (page > 1) {
    page--;
  }
  resetField();
  travelFilter(page);
  setTimeout(() => { document.getElementById("current-page").innerHTML = page; } , 500);
});

document.getElementById("increase-page").addEventListener("click", () => {
    if (page < localStorage.getItem('maxpage')){
        page++;
    }
  
  resetField();
  travelFilter(page);
  setTimeout(() => { document.getElementById("current-page").innerHTML = page; } , 500);
});
