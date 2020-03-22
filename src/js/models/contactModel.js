const axios = require('axios').default

const contactScreen = document.querySelectorAll(".form-control");
const contactScreenArr = Array.from(contactScreen);

const contactVariables = {
    username : contactScreenArr[0],
    email : contactScreenArr[1],
    topic : contactScreenArr[2],
    message : contactScreenArr[3],
}

const userCredientals = async () => {
    const config = {
        method : 'get',
        url : 'http://127.0.0.1:9999/api/users/profile'
    }
    let res = await axios(config);
    console.log(res.data);
}

export {contactScreen, contactScreenArr, contactVariables, userCredientals}
export class contact_variables {

    constructor(username, email, topic, message) {
        this.username = username;
        this.email = email;
        this.topic = topic;
        this.message = message;
    }

    summarize() {
        console.log(`Username = ${this.username}
        Email = ${this.email}
        Topic = ${this.topic}
        Message = ${this.message}`);
    }
}