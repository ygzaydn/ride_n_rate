
const companyComment = document.querySelectorAll('.form-control');
const companyCommentArr = Array.from(companyComment);

const submit = document.getElementById('post_comment');
const commentList = document.querySelector('.comment-list');
const commentInput = document.getElementById('message');

export {companyComment, companyCommentArr, submit, commentList, commentInput}
export class new_comment {

    constructor(name, email, message, avatar){
        this.name = name;
        this.email = email;
        this.message = message;
        this.avatar = avatar;
    }

    summarize() {
        console.log(`Name : ${this.name}
        Email : ${this.email}
        Message : ${this.message}`)
    }
}