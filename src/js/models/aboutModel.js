const axios = require('axios').default;
axios.defaults.withCredentials = true;

const DOM = document.getElementById('checklist');

async function countNumber() {
    const config = {
        method : 'get',
        url : 'http://127.0.0.1:9999/api/stats/review/count'
    }
    try {
        let res = await axios(config);
        let countNum = res.data.count;
        DOM.children[2].innerHTML = `Yorum sayısı: ${countNum}`
        
    } catch (err) {
        console.log(err);
    }
}

async function userInfo() {
    const config = {
        method : 'get',
        url: 'http://127.0.0.1:9999/api/users/profile'
    }
    try {
    let res = await axios(config);
    let username = res.data.data.userName;
    let email = res.data.data.email;
    let date = res.data.data.createdAt;
    date = date.split("T");

    DOM.children[0].innerHTML= `Kullanıcı adı: ${username}`;
    DOM.children[1].innerHTML= `Email: ${email}`;
    DOM.children[3].innerHTML= `Kayıt tarihi: ${date[0]} - ${date[1]}`;

    } catch(err) {
        console.log(err);
    }
}

export {countNumber, userInfo};