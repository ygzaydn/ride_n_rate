import('../models/indexModel.js')
.then((module) => {

    document.getElementById("search_button").addEventListener("click",() => {

        const searchParameters = new module.search_parameters(module.searchVariables.departure.value, module.searchVariables.destination.value, module.searchVariables.day, module.searchVariables.month);
    
        searchParameters.summarize();

        if (searchParameters.departure !== "" && searchParameters.destination !== ""){
        window.open(`search.html?filters=departure:${searchParameters.departure};destination:${searchParameters.destination};day:${searchParameters.day};month:${searchParameters.month}`);
        }
        else {
            alert(`Lütfen girdiğiniz bilgileri kontrol edin`);
        }
    });


})



