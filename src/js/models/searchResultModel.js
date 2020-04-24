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
  const resData = result.data;
  console.log(resData);

  let counterData = {
    driver: {
      count: 0,
      averagePoint: 0,
    },
    hostess: {
      count: 0,
      averagePoint: 0,
    },
    break: {
      count: 0,
      averagePoint: 0,
    },
    baggage: {
      count: 0,
      averagePoint: 0,
    },
    comfort: {
      count: 0,
      averagePoint: 0,
    },
    pet: {
      count: 0,
      averagePoint: 0,
    },
    travel: {
      count: 0,
      averagePoint: 0,
    },
    vehicle: {
      count: 0,
      averagePoint: 0,
    },

  };

  if (resData.length != 0) {
    resData.forEach((el) => {

      const driverCommentSection = document.querySelector(
        ".driver-comment-list"
      );
      if (el.driver.content.rating != 0) {
        counterData.driver.count++;
        counterData.driver.averagePoint += el.driver.content.rating;
      }
      if (el.driver.content.comment) {
        driverCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p id="comment" style="overflow-wrap: break-word;">${el.driver.content.comment}</p>
          <p><a onclick="editComment(this)" class="edit" >Edit</a> <a onclick="deleteComment(this)" class="delete">Delete</a></p>
          <p></p>
        </div>
      </li>
      
      `
        );
      }

      const hostessCommentSection = document.querySelector(
        ".hostess-comment-list"
      );
      if (el.hostess.content.rating != 0) {
        counterData.hostess.count++;
        counterData.hostess.averagePoint += el.hostess.content.rating;
      }
      if (el.hostess.content.comment) {
        hostessCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p style="overflow-wrap: break-word;">${
            el.hostess.content.comment
          }</p>
          <p><a href="#" class="edit" style="padding-right: 10px;">Edit</a> <a href="#"
              class="delete">Delete</a> </p>
          <p></p>
        </div>
      </li>
      
      `
        );
      }

      const breakCommentSection = document.querySelector(
        ".break-comment-list"
      );
      if (el.breaks.content.rating != 0) {
        counterData.break.count++;
        counterData.break.averagePoint += el.breaks.content.rating;
      }
      if (el.breaks.content.comment) {
        breakCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p style="overflow-wrap: break-word;">${
            el.breaks.content.comment
          }</p>
          <p><a href="#" class="edit" style="padding-right: 10px;">Edit</a> <a href="#"
              class="delete">Delete</a> </p>
          <p></p>
        </div>
      </li>
      `
        );
      }

      const baggageCommentSection = document.querySelector(
        ".baggage-comment-list"
      );
      if (el.baggage.content.rating != 0) {
        counterData.baggage.count++;
        counterData.baggage.averagePoint += el.baggage.content.rating;
      }
      if (el.baggage.content.comment) {
        baggageCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p style="overflow-wrap: break-word;">${
            el.baggage.content.comment
          }</p>
          <p><a href="#" class="edit" style="padding-right: 10px;">Edit</a> <a href="#"
              class="delete">Delete</a> </p>
          <p></p>
        </div>
      </li>
      `
        );
      }

      const comfortCommentSection = document.querySelector(
        ".comfort-comment-list"
      );
      if (el.comfort.content.rating != 0) {
        counterData.comfort.count++;
        counterData.comfort.averagePoint += el.comfort.content.rating;
      }
      if (el.comfort.content.comment) {
        comfortCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p style="overflow-wrap: break-word;">${
            el.comfort.content.comment
          }</p>
          <p><a href="#" class="edit" style="padding-right: 10px;">Edit</a> <a href="#"
              class="delete">Delete</a> </p>
          <p></p>
        </div>
      </li>
      `
        );
      }

      const petCommentSection = document.querySelector(
        ".pet-comment-list"
      );
      if (el.pet.content.rating != 0) {
        counterData.pet.count++;
        counterData.pet.averagePoint += el.pet.content.rating;
      }
      if (el.pet.content.comment) {
        petCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p style="overflow-wrap: break-word;">${
            el.pet.content.comment
          }</p>
          <p><a href="#" class="edit" style="padding-right: 10px;">Edit</a> <a href="#"
              class="delete">Delete</a> </p>
          <p></p>
        </div>
      </li>
      `
        );
      }

      const travelCommentSection = document.querySelector(
        ".travel-comment-list"
      );
      if (el.travel.content.rating != 0) {
        counterData.travel.count++;
        counterData.travel.averagePoint += el.travel.content.rating;
      }
      if (el.travel.content.comment) {
        travelCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p style="overflow-wrap: break-word;">${
            el.travel.content.comment
          }</p>
          <p><a href="#" class="edit" style="padding-right: 10px;">Edit</a> <a href="#"
              class="delete">Delete</a> </p>
          <p></p>
        </div>
      </li>
      `
        );
      }

      const vehicleCommentSection = document.querySelector(
        ".vehicle-comment-list"
      );
      if (el.vehicle.content.rating != 0) {
        counterData.vehicle.count++;
        counterData.vehicle.averagePoint += el.vehicle.content.rating;
      }
      if (el.vehicle.content.comment) {
        vehicleCommentSection.insertAdjacentHTML(
          "beforeend",
          `
      <li class="comment">
        <div class="vcard bio">
          <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <div class="meta">${el.createdAt.split("T")[0]}</div>
          <p style="overflow-wrap: break-word;">${
            el.vehicle.content.comment
          }</p>
          <p><a href="#" class="edit" style="padding-right: 10px;">Edit</a> <a href="#"
              class="delete">Delete</a> </p>
          <p></p>
        </div>
      </li>
      `
        );
      }

    });
  }

  document.querySelector(
    ".number-of-review-driver"
  ).innerHTML = `(${counterData.driver.count} Değerlendirme)`;

  document.querySelector(
    ".number-of-review-hostess"
  ).innerHTML = `(${counterData.hostess.count} Değerlendirme)`;

  document.querySelector(
    ".number-of-review-break"
  ).innerHTML = `(${counterData.break.count} Değerlendirme)`;

  document.querySelector(
    ".number-of-review-baggage"
  ).innerHTML = `(${counterData.baggage.count} Değerlendirme)`;

  document.querySelector(
    ".number-of-review-comfort"
  ).innerHTML = `(${counterData.comfort.count} Değerlendirme)`;

  document.querySelector(
    ".number-of-review-pet"
  ).innerHTML = `(${counterData.pet.count} Değerlendirme)`;

  document.querySelector(
    ".number-of-review-travel"
  ).innerHTML = `(${counterData.travel.count} Değerlendirme)`;

  document.querySelector(
    ".number-of-review-vehicle"
  ).innerHTML = `(${counterData.vehicle.count} Değerlendirme)`;

  counterData.vehicle.averagePoint = Math.floor(
    counterData.vehicle.averagePoint / counterData.vehicle.count
  );
  for (let i = 0; i < counterData.vehicle.averagePoint; i++) {
    document.querySelector(".vehicle-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  counterData.travel.averagePoint = Math.floor(
    counterData.travel.averagePoint / counterData.travel.count
  );
  for (let i = 0; i < counterData.travel.averagePoint; i++) {
    document.querySelector(".travel-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  counterData.pet.averagePoint = Math.floor(
    counterData.pet.averagePoint / counterData.pet.count
  );
  for (let i = 0; i < counterData.pet.averagePoint; i++) {
    document.querySelector(".pet-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  counterData.comfort.averagePoint = Math.floor(
    counterData.comfort.averagePoint / counterData.comfort.count
  );
  for (let i = 0; i < counterData.comfort.averagePoint; i++) {
    document.querySelector(".comfort-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  counterData.baggage.averagePoint = Math.floor(
    counterData.baggage.averagePoint / counterData.baggage.count
  );
  for (let i = 0; i < counterData.baggage.averagePoint; i++) {
    document.querySelector(".baggage-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  counterData.break.averagePoint = Math.floor(
    counterData.break.averagePoint / counterData.break.count
  );
  for (let i = 0; i < counterData.break.averagePoint; i++) {
    document.querySelector(".break-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  counterData.driver.averagePoint = Math.floor(
    counterData.driver.averagePoint / counterData.driver.count
  );
  for (let i = 0; i < counterData.driver.averagePoint; i++) {
    document.querySelector(".driver-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  counterData.hostess.averagePoint = Math.floor(
    counterData.hostess.averagePoint / counterData.hostess.count
  );
  for (let i = 0; i < counterData.hostess.averagePoint; i++) {
    document.querySelector(".hostess-comment-star").insertAdjacentHTML(
      "afterbegin",
      `
    <span class="icon-star text-warning"></span>
    `
    );
  }

  // <span class="icon-star text-warning"></span>
  // <span class="icon-star text-secondary"></span>
};

export { travelFilter, createComment, getComments };
