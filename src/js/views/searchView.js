const companiesScreen = document.querySelectorAll('.form-group');
const companiesScreenArr = Array.from(companiesScreen);

let searchVariables = {
    minimumPoint : companiesScreenArr[1], //textcontent.trim()
    pet : companiesScreen[3].getElementsByClassName("box1")[0], //checked
    threeSeat : companiesScreen[3].getElementsByClassName("box2")[0]  //checked
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

class search_variables {

    constructor (minimumPoint, pet, threeSeat) {
        this.minimumPoint = minimumPoint;
        this.pet = pet;
        this.threeSeat = threeSeat;
    }

    summarize = () => {
        console.log (`Minimum Point = ${this.minimumPoint}
        Pet = ${this.pet}
        Three Seat Bus = ${this.threeSeat}`)
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