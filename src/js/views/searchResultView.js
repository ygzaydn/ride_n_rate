import { registeredSectionPage } from "../register";
import {
  travelFilter,
  createComment,
  getComments,
  editComments,
  deleteComments
} from "../models/searchResultModel";
const Swal = require("sweetalert2");

const resetFields = () => {
  document.getElementById("driver-comment-list").innerHTML = "";
  document.getElementById("hostess-comment-list").innerHTML = "";
  document.getElementById("break-comment-list").innerHTML = "";
  document.getElementById("travel-comment-list").innerHTML = "";
  document.getElementById("baggage-comment-list").innerHTML = "";
  document.getElementById("comfort-comment-list").innerHTML = "";
  document.getElementById("vehicle-comment-list").innerHTML = "";
  document.getElementById("pet-comment-list").innerHTML = "";
};

const travelSlotUUID = location.href.split("?")[1];
const companyUUID = location.href.split("?")[2];
const sendButton = document.querySelector(".send-review");
const checkReview = document.querySelector(".check-review");

registeredSectionPage();
travelFilter();

window.editComment = async function (e) {
  const parentElement = e.parentNode.parentElement;
  console.log(parentElement.children[5].innerText);
  console.log(parentElement.children[6].innerText);

  const { value: text } = await Swal.fire({
    input: "textarea",
    inputPlaceholder: "Yorumunuzu buraya girin.",
    inputAttributes: {
      "aria-label": "Yorumunuzu buraya girin.",
    },
    showCancelButton: true,
  });

  if (text) {
    Swal.fire(text);
    const uuid = parentElement.children[5].innerText;
    const type = parentElement.children[6].innerText;
    editComments(uuid, type, text);
    resetFields();
    getComments();

    //parentElement.children[2].innerText = text;
  }
};

window.deleteComment = function (e) {

  const parentElement = e.parentNode.parentElement;
  console.log(parentElement.children[5].innerText);
  console.log(parentElement.children[6].innerText);
  const uuid = parentElement.children[5].innerText;
  const type = parentElement.children[6].innerText;

  Swal.fire({
    title: "Yorumu kaldırmak istediğinden emin misin",
    text: "Bu işlem geri alınamaz",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Evet, yorumu kaldır",
    cancelButtonText: "İşlemi iptal et",
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        "Kaldırıldı",
        "Yorumun başarılı bir şekilde kaldırıldı",
        "success"
      );
      deleteComments(uuid,type);
      setTimeout(function(){ resetFields(); }, 1000);
      getComments();
    }
  });
};

window.addLike = (e) => {
  const parentElement = e.parentNode;
  let value = parseInt(parentElement.children[2].value);
  value++;
  parentElement.children[2].value = value;
};

window.addDislike = (e) => {
  const parentElement = e.parentNode;
  let value = parseInt(parentElement.children[2].value);
  value--;
  parentElement.children[2].value = value;
};

sendButton.addEventListener("click", () => {
  createComment(companyUUID, travelSlotUUID);
});

checkReview.addEventListener("click", () => {
  resetFields();
  getComments();
});
