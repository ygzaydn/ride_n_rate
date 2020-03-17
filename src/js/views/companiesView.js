import('../models/companiesModel.js')
.then ((module) => 
{

document.getElementById("list_button").addEventListener("click", () => {

    const userFilter = new module.search_variables(module.searchVariables.companyName.value, module.searchVariables.departure.value,
        module.searchVariables.destination.value, module.searchVariables.minimumPoint.textContent.trim(), module.searchVariables.pet.checked, module.searchVariables.threeSeat.checked)
        
    userFilter.summarize();

})

document.getElementById("pet_checkbox").addEventListener("click", () => {

    let filter = document.getElementById("pet_checkbox").checked;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (let i=0; i<companies.length; i++){
        if(filter === module.petValuesArr[i]){
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
        if(filter === module.threeSeatSupportArr[i]){
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

pointFilter = () => {

    let point = document.getElementById('star_slide').value;
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');

    for (let i=0; i<companies.length; i++){
        if(module.pointsArr[i] >= point) {
            elements[i].style.display = ""
        } else {
            elements[i].style.display = "none";
        }
    }
}

companyNameFilter = () => {

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
}

departureFilter = () => {

    let searchText = document.querySelector('#departure_place_text');
    let filter = searchText.value.toUpperCase();
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');
    
    for (let i=0; i<companies.length; i++) {
        let txtValue = module.placesArr[i].toString();
        if (txtValue.toUpperCase().indexOf(filter) > -1){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
}

destinationFilter = () => {

    let searchText = document.querySelector('#arrival_place_text');
    let filter = searchText.value.toUpperCase();
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');
    
    for (let i=0; i<companies.length; i++) {
        let txtValue = module.placesArr[i].toString();
        if (txtValue.toUpperCase().indexOf(filter) > -1){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
}



})