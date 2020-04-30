import {signUpScreen, signupScreenArr, signUpVariables, signInVariables, new_User, registered_User, loginRequest, signInRequest, userCredientals} from '../models/signUpModel'
const Swal = require("sweetalert2");

document.getElementById("SignUp").addEventListener("click", ()=>{

    const newUser = new new_User(signUpVariables.username.value, signUpVariables.email.value, signUpVariables.password.value, signUpVariables.repassword.value);

    const emailIndNum = (parseInt(newUser.email.indexOf('@')));

    if (newUser.password !== newUser.repassword){
        Swal.fire(
            'Kayıt sırasında bir hata oluştu',
            'Lütfen şifrenizi doğru girdiğinizden emin olun.',
            'error'
          )
    }
    else if (emailIndNum <= -1) {
        Swal.fire(
            'Kayıt sırasında bir hata oluştu',
            'Lütfen geçerli bir e-mail adresi girin',
            'error'
          )
    }
    else {
    
    signInRequest(newUser.username, newUser.email, newUser.password);
    newUser.summarize();
    }
})

document.getElementById("SignIn").addEventListener("click", ()=>{
    
    const registeredUser = new registered_User(signInVariables.email.value,signInVariables.password.value);

    registeredUser.summarize();
    if (registeredUser.email !== "" && registeredUser.password !== ""){
        if(registeredUser.email.indexOf("@") > 0){
            loginRequest(registeredUser.email, registeredUser.password)
            .then( setTimeout(() => {userCredientals()}, 3000));
    } else {
        Swal.fire(
            'Giriş yaparken bir hata oluştu',
            'Lütfen doğru e-mail ve şifre girdiğinizden emin olun',
            'error'
          )
    }
    } else {
        Swal.fire(
            'Giriş yaparken bir hata oluştu',
            'Lütfen doğru e-mail ve şifre girdiğinizden emin olun',
            'error'
          )
    }
})
