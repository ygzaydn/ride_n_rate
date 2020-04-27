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
  

  async function companyFilter() {
    const configComp = {
      method: "get",
      url: `${url}/api/companies/${companyUUID}`,
    };
    let resCompany = await axios(configComp);
    const dataComp = resCompany.data;
   
    const compNameNoSpace = dataComp.name.replace(/\s+/g, "").toLowerCase();
   

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

  let data = {
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
    }
  }
  
  removeEmpty(data);
  
  removeEmpty(data);
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    url: `${url}/api/review/create`,
    data : data
      
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
  //console.log(result);
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
      //console.log(counterData.driver.count);
      //console.log(counterData.driver.averagePoint);
      const date = el.review.createdAt.split("T")[0];
      const uuid = el.review.uuid;

      if (el.driver) {
        const driverCommentSection = document.getElementById(
          "driver-comment-list"
        );
        let driverLikes = el.driver.content.likes;
        let driverDislikes = el.driver.content.dislikes;
        [ counterData.driver.count, counterData.driver.averagePoint ] = getSubComments(
          driverCommentSection,
          el.driver,
          counterData.driver.count,
          counterData.driver.averagePoint,
          driverLikes,
          driverDislikes,
          el.user.userName,
          date,
          uuid,
          `driver`,
          el.review.canEdit
        );

      }
      if (el.hostess) {
        const hostessCommentSection = document.getElementById(
          "hostess-comment-list"
        );
        let hostessLikes = el.hostess.content.likes;
        let hostessDislikes = el.hostess.content.dislikes;
        [ counterData.hostess.count, counterData.hostess.averagePoint ] = getSubComments(
          hostessCommentSection,
          el.hostess,
          counterData.hostess.count,
          counterData.hostess.averagePoint,
          hostessLikes,
          hostessDislikes,
          el.user.userName,
          date,
          uuid,
          `hostess`,
          el.review.canEdit
        );
      }
      if (el.breaks) {
        let breaksLikes = el.breaks.content.likes;
        let breaksDislikes = el.breaks.content.dislikes;
        const breakCommentSection = document.getElementById(
          "break-comment-list"
        );
        [ counterData.break.count, counterData.break.averagePoint ] = getSubComments(
          breakCommentSection,
          el.breaks,
          counterData.break.count,
          counterData.break.averagePoint,
          breaksLikes,
          breaksDislikes,
          el.user.userName,
          date,
          uuid,
          `break`,
          el.review.canEdit
        );

      }
      if (el.baggage) {
        let baggageLikes = el.baggage.content.likes;
        let baggageDislikes = el.baggage.content.dislikes;
        const baggageCommentSection = document.getElementById(
          "baggage-comment-list"
        );
        [ counterData.baggage.count, counterData.baggage.averagePoint ] = getSubComments(
          baggageCommentSection,
          el.baggage,
          counterData.baggage.count,
          counterData.baggage.averagePoint,
          baggageLikes,
          baggageDislikes,
          el.user.userName,
          date,
          uuid,
          `baggage`,
          el.review.canEdit
        );

        
      }
      if (el.comfort) {
        let comfortLikes = el.comfort.content.likes;
        let comfortDislikes = el.comfort.content.dislikes;
        const comfortCommentSection = document.getElementById(
          "comfort-comment-list"
        );

        [ counterData.comfort.count, counterData.comfort.averagePoint ] = getSubComments(
          comfortCommentSection,
          el.comfort,
          counterData.comfort.count,
          counterData.comfort.averagePoint,
          comfortLikes,
          comfortDislikes,
          el.user.userName,
          date,
          uuid,
          `comfort`,
          el.review.canEdit
        );
        
      }
      if (el.pet) {
        let petLikes = el.pet.content.likes;
        let petDislikes = el.pet.content.dislikes;

        const petCommentSection = document.getElementById("pet-comment-list");
        [ counterData.pet.count, counterData.pet.averagePoint ] = getSubComments(
          petCommentSection,
          el.pet,
          counterData.pet.count,
          counterData.pet.averagePoint,
          petLikes,
          petDislikes,
          el.user.userName,
          date,
          uuid,
          `pet`,
          el.review.canEdit
        );
      }
      if (el.travel) {
        let traveLikes = el.travel.content.likes;
        let travelDislikes = el.travel.content.dislikes;
        const travelCommentSection = document.getElementById(
          "travel-comment-list"
        );
        [ counterData.travel.count, counterData.travel.averagePoint ] = getSubComments(
          travelCommentSection,
          el.travel,
          counterData.travel.count,
          counterData.travel.averagePoint,
          traveLikes,
          travelDislikes,
          el.user.userName,
          date,
          uuid,
          `travel`,
          el.review.canEdit
        );
      }
      if (el.vehicle) {
        let vehicleLikes = el.vehicle.content.likes;
        let vehicleDislikes = el.vehicle.content.dislikes;
        const vehicleCommentSection = document.getElementById(
          "vehicle-comment-list"
        );
        [ counterData.vehicle.count, counterData.vehicle.averagePoint ] = getSubComments(
          vehicleCommentSection,
          el.vehicle,
          counterData.vehicle.count,
          counterData.vehicle.averagePoint,
          vehicleLikes,
          vehicleDislikes,
          el.user.userName,
          date,
          uuid,
          `vehicle`,
          el.review.canEdit
        );
      }
    });

    for (let i = 0; i < counterData.driver.averagePoint/counterData.driver.count; i++) {
      document.querySelector(`.driver-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }
    for (let i = 0; i < counterData.hostess.averagePoint/counterData.hostess.count; i++) {
      document.querySelector(`.hostess-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }
    for (let i = 0; i < counterData.break.averagePoint/counterData.break.count; i++) {
      document.querySelector(`.break-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }
    for (let i = 0; i < counterData.comfort.averagePoint/counterData.comfort.count; i++) {
      document.querySelector(`.comfort-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }
    for (let i = 0; i < counterData.pet.averagePoint/counterData.pet.count; i++) {
      document.querySelector(`.pet-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }
    for (let i = 0; i < counterData.vehicle.averagePoint/counterData.vehicle.count; i++) {
      document.querySelector(`.vehicle-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }
    for (let i = 0; i < counterData.travel.averagePoint/counterData.travel.count; i++) {
      document.querySelector(`.travel-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }
    for (let i = 0; i < counterData.baggage.averagePoint/counterData.baggage.count; i++) {
      document.querySelector(`.baggage-comment-star`).insertAdjacentHTML(
        "afterbegin",
        `
      <span class="icon-star text-warning"></span>
      `
      );
    }



  }

};

const editComments = async (uuid, type, text) => {
  const newUrl = `${url}/api/review/${type}/update`;

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    url: newUrl,
    data: {
      review: {
        uuid: uuid,
        comment: text,
      },
    },
  };
  try {
    const result = await axios(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteComments = async (uuid, type) => {
  const newUrl = `${url}/api/review/${type}/delete`;
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    url: newUrl,
    data: {
      review: {
        uuid: uuid,
      },
    },
  };
  try {
    const result = await axios(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const removeEmpty = (obj) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
    else if (obj[key] === "" || obj[key] === 0 || obj[key] === undefined || obj[key] === null ) delete obj[key];
  });
  function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  clean(obj);
  return obj;
};

window.increaseLike = () => {
  console.log("up");
};
window.decreaseLike = () => {
  console.log("down");
};

const getSubComments = (
  section,
  data,
  count,
  averagepoint,
  like,
  dislike,
  userName,
  date,
  uuid,
  type,
  edit
) => {

  if (data.content.rating != 0) {
    count = count + 1;
    averagepoint += data.content.rating;
  }
  
  let editPar = 'hidden';
  if(edit === true){
    editPar = null;
  }

  if (data.content.comment) {
    section.insertAdjacentHTML(
      "beforeend",
      `

    <div style="width:400px; height:300px">
            <div class="testimonial">
              <figure class="mb-4">
                <img src="src/images/comment_vcard.jpg" alt="Image">
                <h2>${userName}</h2>
                <div class="meta">${date}</div>
              </figure>
              <blockquote>
                <p>&ldquo;${data.content.comment}&rdquo;</p>
              </blockquote>

              <p><a onclick="increaseLike(addLike(this))" class="like">Like</a> 
              <a onclick="decreaseLike(addDislike(this))" class="dislike">Dislike</a></p>
              
              <p><input class="qty" name="qty" type="text" value="${
                like - dislike
              }" /></p>
              
              <p ${editPar}><a onclick="editComment(this)" class="edit">Edit</a> 
              <a onclick="deleteComment(this)" class="delete">Delete</a></p>

              <p hidden>${uuid}</p>
              <p hidden>${type}</p>

            </div>
          </div>
    
    
    `
    );

    document.querySelector(
      `.number-of-review-${type}`
    ).innerHTML = `(${count} Değerlendirme)`;

    //document.querySelector(`.${type}-comment-star`).innerHTML = "";

  }
  
  return [ count, averagepoint ];
};

export {
  travelFilter,
  createComment,
  getComments,
  editComments,
  deleteComments,
};
