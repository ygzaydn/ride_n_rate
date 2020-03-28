import {threeSeatSupportArr, petValuesArr, pointsArr, searchVariables, companiesScreenArr, companiesScreen, search_variables} from '../models/searchModel'

import {registeredSectionPage} from '../register'

registeredSectionPage();

pointFilter = () => {

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
}

urlParser = () => {

    const url = window.location.href.split("=")[1];
    const departure = url.split(";")[0].split(":")[1];
    const destination = url.split(";")[1].split(":")[1];

    document.getElementById('results_urlparser').textContent = `
    Kalkış yeri : ${departure},\
    İniş yeri: ${destination}\ olan aramanın sonuçları aşağıda listelenmiştir.
    `
}

document.getElementById("pet_checkbox").addEventListener("click", () => {

    let filter = document.getElementById("pet_checkbox").checked;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (i=0; i<companies.length; i++){
        if(filter === petValuesArr[i]){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
})

document.getElementById("3seat_bus").addEventListener("click", () => {
    
    let filter = document.getElementById("3seat_bus").checked;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (i=0; i<companies.length; i++){
        if(filter === modu.threeSeatSupportArr[i]){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
})

document.getElementById("reset_button").addEventListener("click", () =>{

    let elements = document.querySelectorAll('.lh-content');
    let companies = document.querySelectorAll('.company_names');
    for (let i=0; i<companies.length; i++){
        elements[i].style.display = ""
    }

    document.getElementById('pet_checkbox').checked = false;
    document.getElementById('3seat_bus').checked = false;
})
