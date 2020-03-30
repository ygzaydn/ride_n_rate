import {countNumber, userInfo, logOut} from '../models/aboutModel';
import {registeredSectionPage} from '../register';


registeredSectionPage();
countNumber();
userInfo();

const logOutButton = document.getElementById("SignOut");
logOutButton.addEventListener("click",() => {

logOut();

})