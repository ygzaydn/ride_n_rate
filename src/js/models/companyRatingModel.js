const companyRatingDOM = document.querySelectorAll('.rate');
const companyRatingDOMArr = Array.from(companyRatingDOM);

export {companyRatingDOM, companyRatingDOMArr};
export class company_rating {
    constructor (category1, category2, category3, category4, category5, category6, category7) {
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.category4 = category4;
        this.category5 = category5;
        this.category6 = category6;
        this.category7 = category7;
    }

    summarize() {
        console.log(`Category-1 = ${this.category1}
        Category-2 = ${this.category2}
        Category-3 = ${this.category3}
        Category-4 = ${this.category4}
        Category-5 = ${this.category5}
        Category-6 = ${this.category6}
        Category-7 = ${this.category7}`);
    }

}
