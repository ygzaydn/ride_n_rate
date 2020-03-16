const companyRatingDOM = document.querySelectorAll('.rate');
const companyRatingDOMArr = Array.from(companyRatingDOM);


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


class company_rating {
    constructor (category1, category2, category3, category4, category5, category6, category7) {
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.category4 = category4;
        this.category5 = category5;
        this.category6 = category6;
        this.category7 = category7;
    }

    summarize = () => {
        console.log(`Category-1 = ${this.category1}
        Category-2 = ${this.category2}
        Category-3 = ${this.category3}
        Category-4 = ${this.category4}
        Category-5 = ${this.category5}
        Category-6 = ${this.category6}
        Category-7 = ${this.category7}`);
    }

}

document.getElementById("rate_button").addEventListener("click", ()=>{

    const companyRatings = {
    
        category1 : getRating(0, 1, companyRatingDOMArr[0]),
        category2 : getRating(0, 2, companyRatingDOMArr[1]),
        category3 : getRating(0, 3, companyRatingDOMArr[2]),
        category4 : getRating(0, 4, companyRatingDOMArr[3]),
        category5 : getRating(0, 5, companyRatingDOMArr[4]),
        category6 : getRating(0, 6, companyRatingDOMArr[5]),
        category7 : getRating(0, 7, companyRatingDOMArr[6]),

    } 

    const newRating = new company_rating(companyRatings.category1, companyRatings.category2, companyRatings.category3, companyRatings.category4, companyRatings.category5, companyRatings.category6, companyRatings.category7);

    newRating.summarize();
    
})

fetch("http://127.0.0.1:9999/ping")
.then ((res) => {
    console.log(res);
    return res.json();
})
.then((data)=> {
    console.log(data);
})
.catch (err => console.log(err))