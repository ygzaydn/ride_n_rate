const axios = require('axios').default;
axios.defaults.withCredentials = true;

const url = 'https://guardianbe.herokuapp.com';

async function registeredSectionPage() {
    const config = {
        method : 'get',
        url : `${url}/api/auth/session`,
        headers: {'Authorization': `Token ${localStorage.getItem('token')}`}
    }
    try {
        let res = await axios(config);
        if(res.status === 200) {
            const registerSection = document.getElementById('register-section');
            registerSection.innerHTML = '';
        
            const registerButtonNew = document.querySelector('.site-menu').children[2].children[0];
            registerButtonNew.href = "about.html"
            registerButtonNew.innerText = "Bilgilerim";

            const registerButton = document.querySelector('.signupelement');
            registerButton.href = "about.html"
            registerButton.innerText = "Bilgilerim";
        }
    } catch (err) {
        console.log(err);
    }
}

export {registeredSectionPage, url};

