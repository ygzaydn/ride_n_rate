import ('../models/companyRatingModel.js')
.then ((module) => 
{

getRating = (indEl, el, ...ind) => {
    let rating = 0;
    let arr = eval(ind[indEl]);
    
    if (eval(`arr.getElementsByClassName('5star').rate${el}.checked`)  === true) {
        rating = 5;
        return rating;
    }
    else if (eval(`arr.getElementsByClassName('4star').rate${el}.checked`)  === true) {
        rating = 4;
        return rating;
    }
    else if (eval(`arr.getElementsByClassName('3star').rate${el}.checked`)  === true) {
        rating = 3;
        return rating;
    }
    else if (eval(`arr.getElementsByClassName('2star').rate${el}.checked`)  === true) {
        rating = 2;
        return rating;
    }
    else if (eval(`arr.getElementsByClassName('1star').rate${el}.checked`)  === true) {
        rating = 1;
        return rating;
    }
    else {
        return false;
    }
};

document.getElementById("rate_button").addEventListener("click", ()=>{

    const companyRatings = {
    
        category1 : getRating(0, 1, module.companyRatingDOMArr[0]),
        category2 : getRating(0, 2, module.companyRatingDOMArr[1]),
        category3 : getRating(0, 3, module.companyRatingDOMArr[2]),
        category4 : getRating(0, 4, module.companyRatingDOMArr[3]),
        category5 : getRating(0, 5, module.companyRatingDOMArr[4]),
        category6 : getRating(0, 6, module.companyRatingDOMArr[5]),
        category7 : getRating(0, 7, module.companyRatingDOMArr[6]),

    } 

    const newRating = new module.company_rating(companyRatings.category1, companyRatings.category2, companyRatings.category3, companyRatings.category4, companyRatings.category5, companyRatings.category6, companyRatings.category7);

    newRating.summarize();
    
})

})