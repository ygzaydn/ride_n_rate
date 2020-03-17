import('../models/companyCommentModel.js')
.then ((module) => 
{
getTime = () => {
  let date = new Date();

  return fullDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  
}

template = (data) => {

  module.commentList.insertAdjacentHTML("afterbegin",`
  <li class="comment">
    <div class="vcard bio">
      <img src="${data.avatar}" alt="Image placeholder">
    </div>
    <div class="comment-body">
      <h3>${data.name}</h3>
      <div class="meta">${getTime()}</div>
      <p>${data.message}</p>
    </div>
  </li>
`);
}

document.getElementById("post_comment").addEventListener("click", (event)=>{

    const newComment = {
        name : module.companyCommentArr[0],
        email : module.companyCommentArr[1],
        message : module.companyCommentArr[2],
        avatar : "/src/images/comment_vcard.jpg"

    }

    const comment = new module.new_comment(newComment.name.value, newComment.email.value, newComment.message.value, newComment.avatar);

    comment.summarize();
    event.preventDefault();
    if (comment.avatar !=="" && comment.email !== "" && comment.message !== "" && comment.name !== ""){
    template(comment);

    // Save the list to localStorage
    localStorage.setItem('commentListing', module.commentList.innerHTML);
    window.open(`${window.location.href}`);
    } else {
      alert (`Bilgilerinizi kontrol edin`);
    }
})


// Get instance of localstorage key/value
const saved = localStorage.getItem('commentListing');

// Check if it exists and if so set HTML to value
if (saved) {
  module.commentList.innerHTML = saved;
}

})