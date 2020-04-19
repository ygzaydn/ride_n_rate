const axios = require("axios").default;
axios.defaults.withCredentials = true;
import { url } from "../register";

const contactScreen = document.querySelectorAll(".form-control");
const contactScreenArr = Array.from(contactScreen);

const contactVariables = {
  username: contactScreenArr[0],
  email: contactScreenArr[1],
  subject: contactScreenArr[2],
  message: contactScreenArr[3],
};

const submitAnonymousMessage = async (username, email, subject, text ) => {
  const config = {
    method: 'post',
    url: `${url}/api/support/contact`,
    data: {
      contactUs: {
        username : username,
        email : email,
        subject : subject,
        text : text

      },
    },
  };
  try {
    const res = await axios(config);
    console.log(res);
    alert('Mesajını aldık, teşekkürler.')
  } catch (err) {
    alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.')
    console.log(err);
  }
};

export { contactVariables, submitAnonymousMessage };

export class contact_variables {
  constructor(username, email, subject, message) {
    this.username = username;
    this.email = email;
    this.subject = subject;
    this.message = message;
  }

  summarize() {
    console.log(`Username = ${this.username}
        Email = ${this.email}
        subject = ${this.subject}
        Message = ${this.message}`);
  }
}
