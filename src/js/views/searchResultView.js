import { registeredSectionPage } from "../register";
import {
  travelFilter,
  createComment,
  getComments,
  editComments
} from "../models/searchResultModel";
const Swal = require('sweetalert2');


const travelSlotUUID = location.href.split("?")[1];
const companyUUID = location.href.split("?")[2];
const sendButton = document.querySelector(".send-review");
const checkReview = document.querySelector('.check-review');

registeredSectionPage();
travelFilter();

window.editComment = async function(e) {

  const parentElement = e.parentNode.parentElement;
  console.log(parentElement.children[5].innerText);
  console.log(parentElement.children[6].innerText);
 
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputPlaceholder: 'Yorumunuzu buraya girin.',
    inputAttributes: {
      'aria-label': 'Yorumunuzu buraya girin.'
    },
    showCancelButton: true
  })
  
  if (text) {
    Swal.fire(text);
    const uuid = parentElement.children[5].innerText;
    const type = parentElement.children[6].innerText;
    editComments(uuid, type, text);
    document.querySelector('.driver-comment-list').innerHTML = "";
    document.querySelector('.hostess-comment-list').innerHTML = "";
    document.querySelector('.break-comment-list').innerHTML = "";
    document.querySelector('.travel-comment-list').innerHTML = "";
    document.querySelector('.baggage-comment-list').innerHTML = "";
    document.querySelector('.comfort-comment-list').innerHTML = "";
    document.querySelector('.vehicle-comment-list').innerHTML = "";
    document.querySelector('.pet-comment-list').innerHTML = "";
    getComments();

    //parentElement.children[2].innerText = text;
  }

};

window.deleteComment = function(e) {

  const parentElement = e.parentNode.parentNode.parentNode;
  const commentNode = parentElement.parentNode;

  Swal.fire({
    title: 'Yorumu kaldırmak istediğinden emin misin',
    text: "Bu işlem geri alınamaz",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Evet, yorumu kaldır',
    cancelButtonText: 'İşlemi iptal et'
  }).then((result) => {

    if (result.value) {
      Swal.fire(
        'Kaldırıldı',
        'Yorumun başarılı bir şekilde kaldırıldı',
        'success'
      )
      commentNode.removeChild(parentElement);
    }
  })



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