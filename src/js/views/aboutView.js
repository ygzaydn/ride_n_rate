import {countNumber, userInfo} from '../models/aboutModel';


countNumber();

userInfo();

const logOutButton = document.getElementById("SignOut");
logOutButton.addEventListener("click",() => {

    window.open(`index.html`)

})