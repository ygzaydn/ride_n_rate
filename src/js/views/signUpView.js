const axios = require('axios').default

async function loginRequest () {
    const config = {
        method : 'post',
        url : 'http://127.0.0.1:9999/api/auth/login',
        data: {
            "user": {
                "email": "testmail@test.test",
                "password": "test"
            }
          }
    }
    let res = await axios(config);
    console.log(res);
}

async function signInRequest (username, email, password) {
    const config = {
        method : 'post',
        url : 'http://127.0.0.1:9999/api/auth/signup',
        data: {
            "user": {
                "userName": username,
                "email": email,
                "password": password
            }
          }
    }
    let res = await axios(config);
    console.log(res);
}
import {signUpScreen, signupScreenArr, signUpVariables, signInVariables, new_User, registered_User} from '../models/signUpModel'

document.getElementById("SignUp").addEventListener("click", ()=>{

    const newUser = new new_User(signUpVariables.username.value, signUpVariables.email.value, signUpVariables.password.value, signUpVariables.repassword.value);

    const emailIndNum = (parseInt(newUser.email.indexOf('@')));

    if (newUser.password !== newUser.repassword){
        alert(`Check your e-mail or password`);
    }
    else if (emailIndNum <= -1) {
        alert(`Check your e-mail or password`);
    }
    else {
    
    signInRequest(newUser.username, newUser.email, newUser.password);
    newUser.summarize();

    document.cookie = `signUpUsername=${newUser.username}`;
    document.cookie = `signUpPassword = ${newUser.password};`
    document.cookie = `signUpRepassword = ${newUser.repassword};`
    document.cookie = `signUpEmail = ${newUser.email};`
    }
    console.log(`Cookie ${document.cookie} is sent!`);
})

document.getElementById("SignIn").addEventListener("click", ()=>{
    
    const registeredUser = new registered_User(signInVariables.email.value,signInVariables.password.value);

    registeredUser.summarize();
    if (registeredUser.email !== "" && registeredUser.password !== ""){
        if(registeredUser.email.indexOf("@") > 0){
            loginRequest();
    //window.open(`logged_index.html`);
    } else {
        alert(`Epostanızı kontrol edin.`)
    }
    } else {
        alert(`Bilgilerinizi kontrol edin.`)
    }
})
