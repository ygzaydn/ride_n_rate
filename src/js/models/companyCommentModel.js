const companyComment = document.querySelectorAll('.form-control');
const companyCommentArr = Array.from(companyComment);

const submit = document.getElementById('post_comment');
const commentList = document.querySelector('.comment-list');
const commentInput = document.getElementById('message');

const mainLogoDOM = document.querySelector('.inner-page-cover').attributes.style; //background-image: url("../images/companies/kamilkoc.png"); background-size: contain; background-position: 50% -25px;

const mainCompanyNameDOM = document.querySelector('.company-name').children[0].firstChild; // Kamilkoç

const lowerMenuCompanyNameDOM = document.querySelector('.offices').children[0].firstChild; // Kamilkoç Turizm Şubeleri

const lowerMenuTextTitle = document.querySelector('.ek-baslik').childNodes[3]; // "Ek başlık"

const lowerMenuTextInfoFirst = document.querySelector('.ek-baslik').children[2] // "Firma bilgileri -3"
const lowerMenuTextInfoSecond = document.querySelector('.ek-baslik').children[3] // "Firma bilgileri -4"
const lowerMenuTextInfoThird = document.querySelector('.ek-baslik').children[4] // "Firma bilgileri -4"


const lowerMenuDestinationsDOM = document.querySelector('.offices').children[2]; /* 
"İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit
İstanbul İzmir Ankara Antalya Samsun İzmit" */

const companyName = window.location.href.split('?')[1];

function companyPageEdit() {
    console.log(`Company name is = ${companyName}`);
    mainLogoDOM.nodeValue = `background-image: url("../images/companies/${companyName}.png"); background-size: contain; background-position: 50% -25px;` //background-image: url("../images/companies/kamilkoc.png"); background-size: contain; background-position: 50% -25px;
    mainCompanyNameDOM.data = `${companyName}`;
    lowerMenuCompanyNameDOM.data = `${companyName} Şubeleri`
    lowerMenuDestinationsDOM.innerText = `Şube isimleri`
    lowerMenuTextTitle.innerHTML = `Başlık No-1`
    lowerMenuTextInfoFirst.innerHTML = `Firma Bilgileri -3`
    lowerMenuTextInfoSecond.innerHTML = `Firma Bilgileri -4`
    lowerMenuTextInfoThird.innerHTML = `Firma Bilgileri -5`

}

const getTime = () => {
    let date = new Date();
    const fullDate = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    return fullDate
}


export {companyComment, companyCommentArr, submit, commentList, commentInput, getTime, companyPageEdit, companyName}

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