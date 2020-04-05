const companyComment = document.querySelectorAll('.form-control');
const companyCommentArr = Array.from(companyComment);

const submit = document.getElementById('post_comment');
const commentList = document.querySelector('.comment-list');
const commentInput = document.getElementById('message');

let mainLogoDOM = document.querySelector('.inner-page-cover').attributes.style.nodeValue; //background-image: url("../images/companies/kamilkoc.png"); background-size: contain; background-position: 50% -25px;

let mainCompanyNameDOM = document.querySelector('.company-name').children[0].firstChild.data; // Kamilkoç

let lowerMenuCompanyNameDOM = document.querySelector('.offices').children[0].firstChild.data; // Kamilkoç Turizm Şubeleri

let lowerMenuDestinationsDOM = document.querySelector('.offices').children[2].innerText; /* "İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit" */



function companyPageEdit() {

    const companyName = window.location.href.split('#')[1];
    mainLogoDOM = `background-image: url("../images/companies/${companyName}.png"); background-size: contain; background-position: 50% -25px;` //background-image: url("../images/companies/kamilkoc.png"); background-size: contain; background-position: 50% -25px;
    mainCompanyNameDOM = `${companyName}`;
    lowerMenuCompanyNameDOM = `${companyName} Şubeleri`
    lowerMenuDestinationsDOM = `Şube isimleri`
}

const getTime = () => {
    let date = new Date();
  
    return fullDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

}


export {companyComment, companyCommentArr, submit, commentList, commentInput, getTime, companyPageEdit}

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