import { registeredSectionPage } from "../register";
import {
  travelFilter,
  createComment,
  getComments,
} from "../models/searchResultModel";


const travelSlotUUID = location.href.split("?")[1];
const companyUUID = location.href.split("?")[2];
const sendButton = document.querySelector(".send-review");
const checkReview = document.querySelector('.check-review');

registeredSectionPage();
travelFilter();


sendButton.addEventListener("click", () => {
  createComment(companyUUID, travelSlotUUID);
});

checkReview.addEventListener('click', () => {
    document.querySelector('.driver-comment-list').innerHTML = "";
    document.querySelector('.hostess-comment-list').innerHTML = "";
    document.querySelector('.break-comment-list').innerHTML = "";
    document.querySelector('.travel-comment-list').innerHTML = "";
    document.querySelector('.baggage-comment-list').innerHTML = "";
    document.querySelector('.comfort-comment-list').innerHTML = "";
    document.querySelector('.vehicle-comment-list').innerHTML = "";
    document.querySelector('.pet-comment-list').innerHTML = "";
    getComments();
})