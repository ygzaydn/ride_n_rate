
import('../models/signUpModel.js')
.then((module) => { 

document.getElementById("SignUp").addEventListener("click", ()=>{

    const newUser = new module.new_User(module.signUpVariables.username.value, module.signUpVariables.email.value,module.signUpVariables.password.value, module.signUpVariables.repassword.value);

    const emailIndNum = (parseInt(newUser.email.indexOf('@')));

    if (newUser.password !== newUser.repassword){
        alert(`Check your e-mail or password`);
    }
    else if (emailIndNum <= -1) {
        alert(`Check your e-mail or password`);
    }
    else {

    newUser.summarize();

    document.cookie = `signUpUsername=${newUser.username}`;
    document.cookie = `signUpPassword = ${newUser.password};`
    document.cookie = `signUpRepassword = ${newUser.repassword};`
    document.cookie = `signUpEmail = ${newUser.email};`
    }
    console.log(`Cookie ${document.cookie} is sent!`);
})

document.getElementById("SignIn").addEventListener("click", ()=>{
    
    const registeredUser = new module.registered_User(module.signInVariables.email.value,module.signInVariables.password.value);

    registeredUser.summarize();
    if (registeredUser.email !== "" && registeredUser.password !== ""){
        if(registeredUser.email.indexOf("@") > 0){
    window.open(`logged_index.html`);
    } else {
        alert(`Epostanızı kontrol edin.`)
    }
    } else {
        alert(`Bilgilerinizi kontrol edin.`)
    }
})
})