const axios = require("axios").default;
axios.defaults.withCredentials = true;
import { url } from "../register";

const companyComment = document.querySelectorAll(".form-control");
const companyCommentArr = Array.from(companyComment);

const submit = document.getElementById("post_comment");
const commentList = document.querySelector(".comment-list");
const commentInput = document.getElementById("message");

const companyID = window.location.href.split("?")[1];

const mainLogoDOM = document.querySelector(".inner-page-cover").attributes
  .style; //background-image: url("../images/companies/kamilkoc.png"); background-size: contain; background-position: 50% -25px;

const mainCompanyNameDOM = document.querySelector(".company-name").children[0]
  .firstChild; // Kamilkoç

const lowerMenuCompanyNameDOM = document.querySelector(".offices").children[0]
  .firstChild; // Kamilkoç Turizm Şubeleri

const lowerMenuTextTitle = document.querySelector(".ek-baslik").childNodes[3]; // "Ek başlık"

const lowerMenuTextInfoFirst = document.querySelector(".ek-baslik").children[2]; // "Firma bilgileri -3"
const lowerMenuTextInfoSecond = document.querySelector(".ek-baslik")
  .children[3]; // "Firma bilgileri -4"
const lowerMenuTextInfoThird = document.querySelector(".ek-baslik").children[4]; // "Firma bilgileri -4"

const lowerMenuDestinationsDOM = document.querySelector(".offices")
  .children[2]; /* 
"İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit" */

async function companySearchDetailed() {
  const config = {
    method: "get",
    url: `${url}/api/companies/${companyID}`,
  };
  let result = await axios(config);
  let resultData = result.data;
  let title = resultData.title;
  let parsedTitle = title.substring(7);
  let parsedTitleNoSpace = parsedTitle.replace(/\s+/g, "").toLowerCase();
  console.log(resultData);
  mainLogoDOM.nodeValue = `background-image: url("src/images/companies/${parsedTitleNoSpace}.png"); background-size: contain; background-position: 50% -25px;`; //background-image: url("../images/companies/kamilkoc.png"); background-size: contain; background-position: 50% -25px;
  mainCompanyNameDOM.data = `${result.data.name}`;
  lowerMenuCompanyNameDOM.data = `${result.data.name} Şubeleri`;
  lowerMenuDestinationsDOM.innerText = `Şube isimleri`;
  lowerMenuTextTitle.innerHTML = `Başlık No-1`;
  lowerMenuTextInfoFirst.innerHTML = `Firma Bilgileri -3`;
  lowerMenuTextInfoSecond.innerHTML = `Firma Bilgileri -4`;
  lowerMenuTextInfoThird.innerHTML = `Firma Bilgileri -5`;
}

const cityFilterBuilder = async (uuid) => {
  const config = {
    method: "get",
    url: `${url}/api/companies/cities/${uuid}`,
  };
  const result = await axios(config);
  const resultData = result.data;
  //console.log(resultData);
  lowerMenuDestinationsDOM.innerHTML = ` Kalkış Yerleri : ${resultData.from} <br> İniş yerleri: ${resultData.to} `;
};

const getTime = () => {
  let date = new Date();
  const fullDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return fullDate;
};

const getComments = async (page) => {
  const uuid = location.href.split(".html?")[1];
  const config = {
    url: `${url}/api/companies/comment/all`,
    method: "post",
    data: {
      filters: {
        query : {
          companyUUID: uuid,
        },
        pageNumber : page
      },
    },
  };
  const token = localStorage.getItem("token");
  if (token) config.headers = { Authorization: `Bearer ${token}` };
  

  try {
    const result = await axios(config);
    localStorage.setItem('maxpage',(result.headers['x-max-pages']));

    const resultData = result.data;
    console.log(resultData);
    const section = document.querySelector(".comment-list");

    resultData.forEach((el) => {
      let canEdit = "hidden";
      if (el.canUserEdit === true) {
        canEdit = null;
      }
      section.insertAdjacentHTML(
        "afterbegin",`
        <li class="comment" style="position:static !important" >
        <div class="vcard bio">
        <img src="src/images/comment_vcard.jpg" alt="Image">
        </div>
        <div class="comment-body">
          <h3>${el.user.userName}</h3>
          <p>${el.comment}</p>
          <p ${canEdit}><a onclick="editComment(this)" class="edit">Edit</a> 
          <a onclick="deleteComment(this)" class="delete">Delete</a></p>
          <p hidden>${el.uuid}</p>
        </div>
      </li>
       `
      );
    });
  } catch (err) {
    console.log(err);
  }
  if (document.querySelector('.comment-list').innerText != ""){
    document.getElementById('arrows').style.display = ''
  }
};

const createComment = async (body) => {
  const token = localStorage.getItem("token");
  const uuid = location.href.split(".html?")[1];
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${url}/api/companies/comment/create`,
    method: "post",
    data: {
      companyUUID: uuid,
      commentBody: body,
    },
  };
  try {
    const result = await axios(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const editComment = async (body, uuid) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${url}/api/companies/comment/update`,
    method: "post",
    data: {
      commentBody: body,
      commentUUID: uuid,
    },
  };

  try {
    const result = await axios(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (uuid) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${url}/api/companies/comment/delete`,
    method: "post",
    data: {
      commentUUID: uuid,
    },
  };

  try {
    const result = await axios(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export {
  companyComment,
  companyCommentArr,
  submit,
  commentList,
  commentInput,
  getTime,
  companySearchDetailed,
  cityFilterBuilder,
  companyID,
  getComments,
  createComment,
  editComment,
  deleteComment,
};

export class new_comment {
  constructor(name, email, message, avatar) {
    this.name = name;
    this.email = email;
    this.message = message;
    this.avatar = avatar;
  }

  summarize() {
    console.log(`Name : ${this.name}
        Email : ${this.email}
        Message : ${this.message}`);
  }
}
