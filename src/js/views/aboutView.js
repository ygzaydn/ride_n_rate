import {userCredientals} from '../models/aboutModel'

userCredientals();
const logOutButton = document.getElementById("SignOut");
logOutButton.addEventListener("click",() => {

    window.open(`index.html`)

})