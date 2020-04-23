const axios = require('axios').default;
axios.defaults.withCredentials = true;
import {url} from '../register';


const signUpScreen = document.querySelectorAll('.form-control');
const signupScreenArr = Array.from(signUpScreen);

window.popUpFunction = function () {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

async function loginRequest (email, password) {
    const config = {
        method : 'post',
        url : `${url}/api/auth/login`,
        data: {
            user: {
                email: email,
                password: password
            }
          }
    }
    try {
        let res = await axios(config);
        console.log(res.data.jwt);
        console.log(res.data.user.username);
        localStorage.setItem('token',res.data.jwt);
        localStorage.setItem('username',res.data.user.username)
        /* console.log(res.data.user);
        console.log(res.status); */
    } catch (e) {
        console.log(e);
    }

}

async function userCredientals() {
    const config = {
        method : 'get',
        url : `${url}/api/users/profile`,
        headers: {'Authorization': `Token ${localStorage.getItem('token')}`}
    }
    try {
    let res = await axios(config);
    console.log(res.status);
    if(res.status === 200){
        window.open(`index.html`,'_self');
    }
    } catch(error) {
        console.log(error);
    }
}

async function signInRequest (username, email, password) {
    const config = {
        method : 'post',
        url : `${url}/api/auth/signup`,
        data: {
            "user": {
                "userName": username,
                "email": email,
                "password": password
            }
          }
    }
    let res = await axios(config);
    if(res.status === 201){
        popUpFunction();
        console.log(res);
    }
}

const signUpVariables = {
    username : signupScreenArr[0],
    email : signupScreenArr[1],
    password : signupScreenArr[2],
    repassword : signupScreenArr[3]

}

const signInVariables = {
    email : signupScreenArr[4],
    password : signupScreenArr[5],
}

export {signInVariables, signUpScreen, signupScreenArr, signUpVariables, loginRequest, signInRequest, userCredientals}

export class new_User {
    constructor (username, email, password, repassword){
        this.username = username;
        this.email = email;
        this.password = password;
        this.repassword = repassword;
    }
    
    summarize() {
        console.log(`Username = ${this.username}
        Email = ${this.email}
        Password = ${this.password}
        Repassword = ${this.repassword}`)
    }    
}

export class registered_User {
    constructor(email,password){
        this.email = email;
        this.password = password;
    }

    summarize() {
        console.log(`Email = ${this.email}
        Password = ${this.password}`)
    }
}

 
