const axios = require('axios').default;
axios.defaults.withCredentials = true;

async function registeredSectionPage() {
    const config = {
        method : 'get',
        url : 'http://127.0.0.1:9999/api/auth/session'
    }
    try {
        let res = await axios(config);
        if(res.status === 200) {
            const registerSection = document.getElementById('register-section');
            registerSection.innerHTML = '';
            const registerButton = document.querySelector('.site-menu').children[3].children[0];
            registerButton.href = "about.html"
            registerButton.innerHTML = "<span>Bilgilerim</span>";
        }
    } catch (err) {
        console.log(err);
    }
}

export {registeredSectionPage};