
const companyComment = document.querySelectorAll('.form-control');
const companyCommentArr = Array.from(companyComment);

const submit = document.getElementById('post_comment');
const commentList = document.querySelector('.comment-list');
const commentInput = document.getElementById('message');


class new_comment {

    constructor(name, email, message, avatar){
        this.name = name;
        this.email = email;
        this.message = message;
        this.avatar = avatar;
    }

    summarize = () => {
        console.log(`Name : ${this.name}
        Email : ${this.email}
        Message : ${this.message}`)
    }
}

getTime = () => {
  let date = new Date();

  return fullDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  
}

template = (data) => {

  commentList.insertAdjacentHTML("afterbegin",`
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
        name : companyCommentArr[0],
        email : companyCommentArr[1],
        message : companyCommentArr[2],
        avatar : "images/comment_vcard.jpg",

    }

    const comment = new new_comment(newComment.name.value, newComment.email.value, newComment.message.value, newComment.avatar);

    comment.summarize();
    event.preventDefault();
    if (comment.avatar !=="" && comment.email !== "" && comment.message !== "" && comment.name !== ""){
    template(comment);

    // Save the list to localStorage
    localStorage.setItem('commentListing', commentList.innerHTML);
    window.open(`${window.location.href}`);
    } else {
      alert (`Bilgilerinizi kontrol edin`);
    }
    //let commentPlace = document.querySelector('.comment-list');
    //commentPlace.insertAdjacentHTML('beforeend','<li class="comment"><div class="vcard bio"><img src="images/comment_vcard.jpg" alt="Image placeholder"></div><div class="comment-body"><h3>User 3</h3><div class="meta">January 9, 2018 at 2:21pm</div><p>Yorum 3</p></div></li>');
})


// Get instance of localstorage key/value
const saved = localStorage.getItem('commentListing');

// Check if it exists and if so set HTML to value
if (saved) {
  commentList.innerHTML = saved;
}
