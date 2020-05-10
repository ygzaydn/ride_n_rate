import {
  getTime,
  companyCommentArr,
  commentList,
  companySearchDetailed,
  new_comment,
  cityFilterBuilder,
  companyID,
  getComments,
  createComment,
  editComment,
  deleteComment,
} from "../models/companyCommentModel";
import { registeredSectionPage } from "../register";

import Swal from "sweetalert2";

registeredSectionPage();
getTime();
companySearchDetailed();
cityFilterBuilder(companyID);
getComments();

const resetField = () => {
  document.querySelector(".comment-list").innerHTML = "";
};

window.editComment = async function (e) {
  const parentElement = e.parentNode.parentElement;
  const uuid = parentElement.children[3].innerHTML;

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

    editComment(text, uuid);
    resetField();
    setTimeout(() => {
      getComments();
    }, 500);
  }
};

window.deleteComment = async function (e) {
  const parentElement = e.parentNode.parentElement;
  const uuid = parentElement.children[3].innerHTML;

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
      deleteComment(uuid)
      resetField();
      setTimeout(function(){ getComments(); }, 500);
      
    }
  });



}

document.getElementById("post_comment").addEventListener("click", () => {
  const comment = document.getElementById("message").value;
  createComment(comment);
  resetField();
  setTimeout(() => {
    getComments();
  }, 500);
});

// Get instance of localstorage key/value
const saved = localStorage.getItem("commentListing");

// Check if it exists and if so set HTML to value
if (saved) {
  commentList.innerHTML = saved;
}
