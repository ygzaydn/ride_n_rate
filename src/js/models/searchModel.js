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

export {threeSeatSupportArr, petValuesArr, pointsArr, searchVariables, companiesScreenArr, companiesScreen}
export class search_variables {

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

