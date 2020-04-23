const axios = require("axios").default;
axios.defaults.withCredentials = true;

const url = "https://guardianbe.herokuapp.com";

async function registeredSectionPage() {
  const config = {
    method: "get",
    url: `${url}/api/auth/session`,
    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
  };
  try {
    let res = await axios(config);
    if (res.status === 200) {
      
      const registerSection = document.getElementById("register-section");
      const registerButtonNew = document.querySelector(".site-menu").children[2]
        .children[0];
      const registerButton = document.querySelector(".signupelement");
      const evaluateTravel = document.querySelector(".seferi-degerlendir");

      if (registerSection) {
        registerSection.innerHTML = "";
      }

      if (registerButtonNew) {
        registerButtonNew.href = "about.html";
        registerButtonNew.innerText = "Bilgilerim";
      }

      if (registerButton) {
        registerButton.href = "about.html";
        registerButton.innerText = "Bilgilerim";
      }

      if (evaluateTravel) {
        evaluateTravel.style.display = "";
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export { registeredSectionPage, url };
