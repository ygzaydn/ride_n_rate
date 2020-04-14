import {searchVariables, placesArr, search_variables, companySearch, companyFilter} from '../models/companiesModel'

import {registeredSectionPage} from '../register'

registeredSectionPage();
companySearch();


document.getElementById("list_button").addEventListener("click", () => {

    const userFilter = new search_variables(searchVariables.companyName.value, searchVariables.departure.value,
        searchVariables.destination.value, searchVariables.minimumPoint.textContent.trim(), searchVariables.pet.checked, searchVariables.threeSeat.checked)
        
    userFilter.summarize();

})

document.getElementById("pet_checkbox").addEventListener("click", () => {
    companyFilter();
})

document.getElementById("3seat_bus").addEventListener("click", () => {
    companyFilter();
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

window.pointFilter = function() {
    companyFilter();
}

function companyNameFilter() {

    let searchText = document.querySelector('#company_name_text');
    let filter = searchText.value.toUpperCase();
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');
    
    for (let i=0; i<companies.length; i++) {
        let txtValue = companies[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
};

function departureFilter() {

};

function destinationFilter() {

    let searchText = document.querySelector('#arrival_place_text');
    let filter = searchText.value.toUpperCase();
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');
    
    for (let i=0; i<companies.length; i++) {
        let txtValue = placesArr[i].toString();
        if (txtValue.toUpperCase().indexOf(filter) > -1){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
};

document.getElementById("company_name_text").addEventListener('keyup', companyNameFilter);
document.getElementById("arrival_place_text").addEventListener('keyup', destinationFilter);
/* document.getElementById("star_slide_main").addEventListener('keyup', () => {
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
}); */
document.getElementById("departure_place_text").addEventListener('keyup', departureFilter);


