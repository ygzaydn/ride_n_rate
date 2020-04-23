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
getComments();

sendButton.addEventListener("click", () => {
  createComment(companyUUID, travelSlotUUID);
});

checkReview.addEventListener('click', () => {
    document.querySelector('.driver-comment-list').innerHTML = "";
})