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

export {companiesScreen, companiesScreenArr, searchVariables, pointsArr, petValuesArr, threeSeatSupportArr, placesArr};
export default class search_variables {

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