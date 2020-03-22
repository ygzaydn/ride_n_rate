
import {contactScreen, contactScreenArr, contactVariables, contact_variables, } from '../models/contactModel'

document.getElementById("send_button").addEventListener("click", () => {
    const newMessage = new contact_variables(contactVariables.username.value, contactVariables.email.value, contactVariables.topic.value, contactVariables.message.value);

    newMessage.summarize();

})
