import {axios} from './axios'

const signUpScreen = document.querySelectorAll('.form-control');
const signupScreenArr = Array.from(signUpScreen);

axios.get('localhost:9999/ping')
.then(resp => {
    console.log(resp)
})
.catch(err => {
    console.log(err)
})

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

export {signUpScreen, signupScreenArr, signUpVariables, signInVariables}
export class new_User {
    constructor (username, email, password, repassword){
        this.username = username;
        this.email = email;
        this.password = password;
        this.repassword = repassword;
    }
    
    summarize = () => {
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

    summarize = () => {
        console.log(`Email = ${this.email}
        Password = ${this.password}`)
    }
}

 
