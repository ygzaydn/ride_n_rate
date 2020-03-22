import {countNumber} from '../models/aboutModel';


countNumber();

const logOutButton = document.getElementById("SignOut");
logOutButton.addEventListener("click",() => {

    window.open(`index.html`)

})