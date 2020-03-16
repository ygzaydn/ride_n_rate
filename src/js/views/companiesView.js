import {searchVariables,petValuesArr,threeSeatSupportArr} from '../models/companiesModel.js';
import  search_variables from '../models/companiesModel.js';


document.getElementById("list_button").addEventListener("click", () => {

    const userFilter = new search_variables(searchVariables.companyName.value, searchVariables.departure.value,
        searchVariables.destination.value, searchVariables.minimumPoint.textContent.trim(), searchVariables.pet.checked, searchVariables.threeSeat.checked)
        
    userFilter.summarize();

})

document.getElementById("pet_checkbox").addEventListener("click", () => {

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
})

document.getElementById("3seat_bus").addEventListener("click", () => {
    
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
})

document.getElementById("reset_button").addEventListener("click", () =>{

    let elements = document.querySelectorAll('.lh-content');
    let companies = document.querySelectorAll('.company_names');
    for (let i=0; i<companies.length; i++){
        elements[i].style.display = ""
    }
    let destinationText = document.querySelector('#arrival_place_text').value = "";
    let departureText = document.querySelector('#departure_place_text').value = "";

    document.getElementById('pet_checkbox').checked = false;
    document.getElementById('3seat_bus').checked = false;
})
