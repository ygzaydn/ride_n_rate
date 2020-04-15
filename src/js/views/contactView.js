import {
  contactVariables,
  contact_variables,
  submitAnonymousMessage,
} from "../models/contactModel";

import { registeredSectionPage } from "../register";

registeredSectionPage();

document.getElementById("send_button").addEventListener("click", () => {
  const newMessage = new contact_variables(
    contactVariables.username.value,
    contactVariables.email.value,
    contactVariables.topic.value,
    contactVariables.message.value
  );
  if (contactVariables.email.value.indexOf("@") > -1) {
    newMessage.summarize();
    submitAnonymousMessage(
      newMessage.username,
      newMessage.email,
      newMessage.message.value
    );
  } else {
      alert('Lütfen bilgileri doğru girdiğinden emin ol.')
  }
});
