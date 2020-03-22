const indexScreen = document.querySelectorAll('.form-control');
const indexScreenArr = Array.from(indexScreen); 

const searchVariables = {
    departure : indexScreenArr[0],
    destination : indexScreenArr[1],
    day : indexScreenArr[2].selectedIndex+1,
    month : indexScreenArr[3].selectedIndex+1
} 

const registeredSectionPage = (x) => {
    if(x) {
    const registerSection = document.getElementById('register-section');
    registerSection.innerHTML = '';
    const registerButton = document.querySelector('.site-menu').children[3].children[0];
    registerButton.href = "about.html"
    registerButton.textContent = "Bilgilerim";
    }
}

export {indexScreen, indexScreenArr, searchVariables, registeredSectionPage}
export class search_parameters {
    
    constructor( departure, destination, day, month){
        this.departure = departure;
        this.destination = destination;
        this.day = day;
        this.month = month;
    }

    summarize() {
        console.log(`Departure = ${this.departure}
        Destination = ${this.destination}
        Day = ${this.day}
        Month = ${this.month}`)
    }
}


