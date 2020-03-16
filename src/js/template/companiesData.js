const companiesScreen = document.querySelectorAll('.form-group');
const companiesScreenArr = Array.from(companiesScreen);

let searchVariables = {
    companyName : companiesScreenArr[0].getElementsByClassName("form-control")[0], //value
    departure : companiesScreenArr[1].getElementsByClassName("form-control")[0],
    destination : companiesScreenArr[2].getElementsByClassName("form-control")[0],
    minimumPoint : companiesScreenArr[4], //textcontent.trim()
    pet : companiesScreen[6].getElementsByClassName("box1")[0], //checked
    threeSeat : companiesScreen[6].getElementsByClassName("box2")[0]  //checked
}

const points = {
    kamilkoc : 2,
    pamukkale : 2.3,
    efetur : 0.5,
    nilufer : 4,
    metro : 4.2,
    ulusoy : 3.2
}
const pointsArr = Array.from(Object.values(points));

const petValues = {
    kamilkoc : true,
    pamukkale : false,
    efetur : true,
    nilufer : false,
    metro : false,
    ulusoy : true
}

const petValuesArr = Array.from(Object.values(petValues));

const threeSeatSupport = {
    kamilkoc : true,
    pamukkale : false,
    efetur : false,
    nilufer : true,
    metro : false,
    ulusoy : false
}

const threeSeatSupportArr = Array.from(Object.values(threeSeatSupport));

const places = {
    kamilkoc : ["İstanbul","İzmir","Ankara","Antalya","Samsun","İzmit"],
    pamukkale : ["İstanbul","İzmir","Antalya","Samsun","İzmit"],
    ulusoy : ["İstanbul","Ankara",,"Samsun","İzmit"],
    efetur : ["İstanbul","İzmir","Ankara","Antalya","İzmit"],
    nilufer : ["İstanbul","İzmir","Ankara","Antalya","Samsun"],
    metro : ["İzmir","Ankara","Antalya","Samsun","İzmit"]
}
 
const placesArr = Array.from(Object.values(places));

class search_variables {

    constructor (companyName, departure, destination, minimumPoint, pet, threeSeat) {
        this.companyName = companyName;
        this.departure = departure;
        this.destination = destination;
        this.minimumPoint = minimumPoint;
        this.pet = pet;
        this.threeSeat = threeSeat;
    }

    summarize = () => {
        console.log (`Company Name = ${this.companyName}
        Departure = ${this.departure}
        Destination = ${this.destination}
        Minimum Point = ${this.minimumPoint}
        Pet = ${this.pet}
        Three Seat Bus = ${this.threeSeat}`)
    }
}

companyNameFilter = () => {

    let searchText = document.querySelector('#company_name_text');
    let filter = searchText.value.toUpperCase();
    let companies = document.querySelectorAll('.company_names');
    let elements = document.querySelectorAll('.lh-content');
    
    for (i=0; i<companies.length; i++) {
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
    
    for (i=0; i<companies.length; i++) {
        let txtValue = placesArr[i].toString();
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
    
    for (i=0; i<companies.length; i++) {
        let txtValue = placesArr[i].toString();
        if (txtValue.toUpperCase().indexOf(filter) > -1){
            elements[i].style.display = "";
        } else {
            elements[i].style.display = "none";
        }
    }
}

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

document.getElementById("list_button").addEventListener("click", () => {

    const userFilter = new search_variables(searchVariables.companyName.value, searchVariables.departure.value,
        searchVariables.destination.value, searchVariables.minimumPoint.textContent.trim(), searchVariables.pet.checked, searchVariables.threeSeat.checked)
        
    userFilter.summarize();

})

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
    for (i=0; i<companies.length; i++){
        elements[i].style.display = ""
    }
    let destinationText = document.querySelector('#arrival_place_text').value = "";
    let departureText = document.querySelector('#departure_place_text').value = "";

    document.getElementById('pet_checkbox').checked = false;
    document.getElementById('3seat_bus').checked = false;
})
