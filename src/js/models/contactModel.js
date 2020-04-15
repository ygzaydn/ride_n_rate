const axios = require("axios").default;
axios.defaults.withCredentials = true;
import { url } from "../register";

const contactScreen = document.querySelectorAll(".form-control");
const contactScreenArr = Array.from(contactScreen);

const contactVariables = {
  username: contactScreenArr[0],
  email: contactScreenArr[1],
  topic: contactScreenArr[2],
  message: contactScreenArr[3],
};

const submitAnonymousMessage = async (username, email, text) => {
  const config = {
    method: 'post',
    url: `${url}/support/contact`,
    data: {
      contactUs: {
        username: username,
        email: email,
        text: text,
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
