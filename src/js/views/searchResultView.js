import { registeredSectionPage } from "../register";
import { travelFilter, createComment, pointExtractor } from "../models/searchResultModel";

const travelSlotUUID = location.href.split("?")[1];
const companyUUID = location.href.split("?")[2];
const sendButton = document.querySelector(".send-review");

const driverPoint = document.querySelectorAll(".driver");
const hostessPoint = document.querySelectorAll(".hostess");
const breakPoint = document.querySelectorAll(".break");
const travelPoint = document.querySelectorAll(".traveltime");
const baggagePoint = document.querySelectorAll(".baggage");
const comfortPoint = document.querySelectorAll(".comfort");
const vehiclePoint = document.querySelectorAll(".vehicle");
const petPoint = document.querySelectorAll(".pet");

registeredSectionPage();
travelFilter();

sendButton.addEventListener("click", () => {

const driverP = pointExtractor(driverPoint);
const hostessP = pointExtractor(hostessPoint);
const breakP = pointExtractor(breakPoint);
const travelP = pointExtractor(travelPoint);
const baggageP = pointExtractor(baggagePoint);
const comfortP = pointExtractor(comfortPoint);
const vehicleP = pointExtractor(vehiclePoint);
const petP = pointExtractor(petPoint);

  createComment(companyUUID, travelSlotUUID, driverP, hostessP, breakP, travelP, baggageP, comfortP, vehicleP, petP);
});
