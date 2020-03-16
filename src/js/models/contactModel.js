const contactScreen = document.querySelectorAll(".form-control");
const contactScreenArr = Array.from(contactScreen);

const contactVariables = {
    username : contactScreenArr[0],
    email : contactScreenArr[1],
    topic : contactScreenArr[2],
    message : contactScreenArr[3],
}

class contact_variables {

    constructor(username, email, topic, message) {
        this.username = username;
        this.email = email;
        this.topic = topic;
        this.message = message;
    }

    summarize = () => {
        console.log(`Username = ${this.username}
        Email = ${this.email}
        Topic = ${this.topic}
        Message = ${this.message}`);
    }
}

document.getElementById("send_button").addEventListener("click", () => {
    const newMessage = new contact_variables(contactVariables.username.value, contactVariables.email.value, contactVariables.topic.value, contactVariables.message.value);

    newMessage.summarize();

})