(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var companyRatingDOM = document.querySelectorAll('.rate');
var companyRatingDOMArr = Array.from(companyRatingDOM);

exports.companyRatingDOMArr = companyRatingDOMArr;

var company_rating = exports.company_rating = function () {
    function company_rating(category1, category2, category3, category4, category5, category6, category7) {
        _classCallCheck(this, company_rating);

        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.category4 = category4;
        this.category5 = category5;
        this.category6 = category6;
        this.category7 = category7;
    }

    _createClass(company_rating, [{
        key: 'summarize',
        value: function summarize() {
            console.log('Category-1 = ' + this.category1 + '\n        Category-2 = ' + this.category2 + '\n        Category-3 = ' + this.category3 + '\n        Category-4 = ' + this.category4 + '\n        Category-5 = ' + this.category5 + '\n        Category-6 = ' + this.category6 + '\n        Category-7 = ' + this.category7);
        }
    }]);

    return company_rating;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _companyRatingModel = require("../models/companyRatingModel");

function getRating(indEl, el) {
    var rating = 0;

    for (var _len = arguments.length, ind = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        ind[_key - 2] = arguments[_key];
    }

    var arr = eval(ind[indEl]);

    if (eval("arr.getElementsByClassName('5star').rate" + el + ".checked") === true) {
        rating = 5;
        return rating;
    } else if (eval("arr.getElementsByClassName('4star').rate" + el + ".checked") === true) {
        rating = 4;
        return rating;
    } else if (eval("arr.getElementsByClassName('3star').rate" + el + ".checked") === true) {
        rating = 3;
        return rating;
    } else if (eval("arr.getElementsByClassName('2star').rate" + el + ".checked") === true) {
        rating = 2;
        return rating;
    } else if (eval("arr.getElementsByClassName('1star').rate" + el + ".checked") === true) {
        rating = 1;
        return rating;
    } else {
        return false;
    }
};

document.getElementById("rate_button").addEventListener("click", function () {

    var companyRatings = {

        category1: getRating(0, 1, _companyRatingModel.companyRatingDOMArr[0]),
        category2: getRating(0, 2, _companyRatingModel.companyRatingDOMArr[1]),
        category3: getRating(0, 3, _companyRatingModel.companyRatingDOMArr[2]),
        category4: getRating(0, 4, _companyRatingModel.companyRatingDOMArr[3]),
        category5: getRating(0, 5, _companyRatingModel.companyRatingDOMArr[4]),
        category6: getRating(0, 6, _companyRatingModel.companyRatingDOMArr[5]),
        category7: getRating(0, 7, _companyRatingModel.companyRatingDOMArr[6])

    };

    var newRating = new _companyRatingModel.company_rating(companyRatings.category1, companyRatings.category2, companyRatings.category3, companyRatings.category4, companyRatings.category5, companyRatings.category6, companyRatings.category7);

    newRating.summarize();
});

},{"../models/companyRatingModel":1}]},{},[2]);
