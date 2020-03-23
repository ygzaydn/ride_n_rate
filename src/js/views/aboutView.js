import {countNumber, userInfo, logOut} from '../models/aboutModel';

countNumber();
userInfo();

const logOutButton = document.getElementById("SignOut");
logOutButton.addEventListener("click",() => {

logOut();

})