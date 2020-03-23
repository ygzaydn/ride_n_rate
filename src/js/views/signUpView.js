import {signUpScreen, signupScreenArr, signUpVariables, signInVariables, new_User, registered_User, loginRequest, signInRequest, userCredientals} from '../models/signUpModel'


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
    //alert('Mailinize bir aktivasyon linki gönderdik. Hesabınızı aktif etmek için lütfen mailinize girin.');
    newUser.summarize();

/*     document.cookie = `signUpUsername=${newUser.username}`;
    document.cookie = `signUpPassword = ${newUser.password};`
    document.cookie = `signUpRepassword = ${newUser.repassword};`
    document.cookie = `signUpEmail = ${newUser.email};` */
    }
  /*   console.log(`Cookie ${document.cookie} is sent!`); */
})

document.getElementById("SignIn").addEventListener("click", ()=>{
    
    const registeredUser = new registered_User(signInVariables.email.value,signInVariables.password.value);

    registeredUser.summarize();
    if (registeredUser.email !== "" && registeredUser.password !== ""){
        if(registeredUser.email.indexOf("@") > 0){
            loginRequest(registeredUser.email, registeredUser.password)
            .then(userCredientals());
    } else {
        alert(`Epostanızı kontrol edin.`)
    }
    } else {
        alert(`Bilgilerinizi kontrol edin.`)
    }
})
