const axios = require("axios").default;
axios.defaults.withCredentials = true;
import { url } from "../register";

const driverCommentBox = document.getElementById("message_box_driver");
const hostessCommentBox = document.getElementById("message_box_hostess");
const breakCommentBox = document.getElementById("message_box_break");
const travelCommentBox = document.getElementById("message_box_travel");
const baggageCommentBox = document.getElementById("message_box_baggage");
const comfortCommentBox = document.getElementById("message_box_comfort");
const vehicleCommentBox = document.getElementById("message_box_vehicle");
const petCommentBox = document.getElementById("message_box_pet");

const driverPoint = document.querySelectorAll(".driver");
const hostessPoint = document.querySelectorAll(".hostess");
const breakPoint = document.querySelectorAll(".break");
const travelPoint = document.querySelectorAll(".traveltime");
const baggagePoint = document.querySelectorAll(".baggage");
const comfortPoint = document.querySelectorAll(".comfort");
const vehiclePoint = document.querySelectorAll(".vehicle");
const petPoint = document.querySelectorAll(".pet");

const travelFilter = async () => {
  const travelSlotUUID = location.href.split("?")[1];
  const companyUUID = location.href.split("?")[2];
  const config = {
    method: "get",
    url: `${url}/api/travelslots/${travelSlotUUID}`,
  };
  let res = await axios(config);
  const data = res.data;
  //console.log(data);

  async function companyFilter() {
    const configComp = {
      method: "get",
      url: `${url}/api/companies/${companyUUID}`,
    };
    let resCompany = await axios(configComp);
    const dataComp = resCompany.data;
    //console.log(dataComp);
    const compNameNoSpace = dataComp.name.replace(/\s+/g, "").toLowerCase();
    //console.log(compNameNoSpace)

    document.querySelector(
      ".evalution"
    ).innerHTML = `Firma: ${dataComp.name} <br> Kalkış Yeri : ${data.fromCity} <br> İniş Yeri : ${data.toCity} <br> Sefer Saati : ${data.fromHour}:${data.fromMinute} <br> bilgilerine sahip sefer hakkında detaylı bilgiyi aşağıda bulabilirsin.`;
    document.querySelector(
      ".logo-place"
    ).attributes[1].nodeValue = `background-image: url("src/images/companies/${compNameNoSpace}.png"); background-size: contain; background-position: 50% -25px;`;
  }
  companyFilter();
};

const createComment = async (cUUID, tsUUID) => {
  const driverP = pointExtractor(driverPoint);
  const hostessP = pointExtractor(hostessPoint);
  const breakP = pointExtractor(breakPoint);
  const travelP = pointExtractor(travelPoint);
  const baggageP = pointExtractor(baggagePoint);
  const comfortP = pointExtractor(comfortPoint);
  const vehicleP = pointExtractor(vehiclePoint);
  const petP = pointExtractor(petPoint);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    url: `${url}/api/review/create`,
    data: {
      review: {
        companyUUID: cUUID,
        travelslotUUID: tsUUID,
        driver: {
          comment: driverCommentBox.value,
          rating: driverP,
        },
        hostess: {
          comment: hostessCommentBox.value,
          rating: hostessP,
        },
        breaks: {
          comment: breakCommentBox.value,
          rating: breakP,
        },
        travel: {
          comment: travelCommentBox.value,
          rating: travelP,
        },
        baggage: {
          comment: baggageCommentBox.value,
          rating: baggageP,
        },
        pet: {
        petAllowed: true,
          comment: petCommentBox.value,
          rating: petP,
        },
        comfort: {
          comment: comfortCommentBox.value,
          rating: comfortP,
        },
        vehicle: {
          comment: vehicleCommentBox.value,
          rating: vehicleP,
        },
      },
    },
  };
  try {
    const result = await axios(config);
    console.log(result);
    console.log("Comment send succesfully");
  } catch (err) {
    console.log(err);
  }
};

const pointExtractor = (queryElement) => {
  // pet , vehicle, comfort, baggage, traveltime, break, hostess, driver
  // document.querySelectorAll('.hostess')
  let point = 0;
  if (queryElement[0].checked === true) point = 5;
  else if (queryElement[1].checked === true) point = 4;
  else if (queryElement[2].checked === true) point = 3;
  else if (queryElement[3].checked === true) point = 2;
  else if (queryElement[4].checked === true) point = 1;
  return point;
};

const getComments = async () => {
  const travelSlotUUID = location.href.split("?")[1];
  const companyUUID = location.href.split("?")[2];
  const config = {
    url: `${url}/api/review/all`,
    method: "post",
    data: {
      review: {
        companyUUID: companyUUID,
        travelslotUUID: travelSlotUUID,
      },
    },
  };
  const result = await axios(config);
  console.log(result);
};

export { travelFilter, createComment, getComments };
