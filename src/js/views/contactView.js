import ('../models/contactModel.js')
.then((module) => {
    document.getElementById("send_button").addEventListener("click", () => {
        const newMessage = new module.contact_variables(module.contactVariables.username.value, module.contactVariables.email.value, module.contactVariables.topic.value, module.contactVariables.message.value);
    
        newMessage.summarize();
    
    })

})