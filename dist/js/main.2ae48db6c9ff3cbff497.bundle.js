/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function transfromTextToHTML(text) {
  var template = document.createElement('template');
  text = text.trim();
  template.innerHTML = text;
  return template.content.firstChild;
}
var selects = document.querySelectorAll('.select');
selects.forEach(function (select) {
  var selectBtn = select.querySelector('.select-btn');
  var selectList = select.querySelector('.select__list');
  var selectInput = select.querySelector('.select-input');
  selectBtn.addEventListener('click', function (event) {
    event.preventDefault();
    selectBtn.classList.toggle('select-btn--focus');
    selectList.classList.toggle('select__list--visible');
  });
  var handleSelectItemClick = function handleSelectItemClick(selectItem) {
    return function (event) {
      event.stopPropagation();
      var btn = select.querySelector('.select-btn__text');
      var selectedList = selectItem.parentElement.querySelector('.selected');
      var selected = transfromTextToHTML("\n        <ul class=\"selected\">\n          <li class=\"selected-item\" data-value=\"".concat(selectItem.dataset.value, "\">\n          <span class=\"select__checkbox selected__checkbox\"></span>\n          <input type=\"checkbox\" class=\"select__input\" />\n          <span class=\"seceted-item__name\">").concat(selectItem.dataset.value, "</span>\n          </li>\n        </ul>\n      "));
      if (!selectedList) {
        selectItem.parentElement.insertBefore(selected, selectItem.parentElement.firstChild);
      } else {
        selectedList.outerHTML = selected.outerHTML;
      }
      btn.innerText = selectItem.dataset.value;
      selectInput.value = selectItem.dataset.value;
      selectList.classList.remove('select__list--visible');
      selectBtn.classList.remove('select-btn--focus');
    };
  };
  var selectItems = select.querySelectorAll('.select__item');
  selectItems.forEach(function (selectItem) {
    selectItem.addEventListener('click', handleSelectItemClick(selectItem));
  });
  document.addEventListener('click', function (e) {
    if (e.target !== selectBtn && selectList) {
      selectBtn.classList.remove('select-btn--focus');
      selectList.classList.remove('select__list--visible');
    }
  });
});
var currentStep = 0;
var sections = document.querySelectorAll('section');
var stepCounter = document.querySelector('.form__step');
var scroller = document.querySelector('.form__scroller');
stepCounter.innerText = "\u0428\u0430\u0433 ".concat(currentStep + 1, "/").concat(sections.length);
var isValid = function isValid(section) {
  var _Array$from$filter, _section$querySelecto;
  var checked = ((_Array$from$filter = Array.from(section.querySelectorAll('[type="radio"]')).filter(function (input) {
    return input.checked;
  })) === null || _Array$from$filter === void 0 ? void 0 : _Array$from$filter.length) > 0;
  var selected = !!((_section$querySelecto = section.querySelector('[type="text"]')) !== null && _section$querySelecto !== void 0 && _section$querySelecto.value);
  return checked || selected;
};
var handleNextStep = function handleNextStep(event) {
  event === null || event === void 0 ? void 0 : event.preventDefault();
  var valid = isValid(sections[currentStep]);
  if (!valid) {
    return;
  }
  currentStep += 1;
  stepCounter.innerText = "\u0428\u0430\u0433 ".concat(currentStep + 1, "/").concat(sections.length);
  scroller.style.transform = "translateX(-".concat(currentStep * (576 + 32), "px)");
};
var handlePrevStep = function handlePrevStep(event) {
  event === null || event === void 0 ? void 0 : event.preventDefault();
  currentStep -= 1;
  stepCounter.innerText = "\u0428\u0430\u0433 ".concat(currentStep + 1, "/").concat(sections.length);
  scroller.style.transform = "translateX(-".concat(currentStep * (576 + 32), "px)");
};
var nextStepButtons = document.querySelectorAll('.btn-next');
nextStepButtons.forEach(function (nextStepButton) {
  nextStepButton.addEventListener('click', handleNextStep);
});
var prevStepButtons = document.querySelectorAll('.btn-prev');
prevStepButtons.forEach(function (prevStepButton) {
  prevStepButton.addEventListener('click', handlePrevStep);
});
var radioBtns = document.querySelectorAll('.form-content__label');
radioBtns.forEach(function (radioBtn) {
  radioBtn.addEventListener('click', function () {
    radioBtns.forEach(function (radio) {
      radio.classList.remove('form-content__label--active');
    });
    handleNextStep();
    radioBtn.classList.add('form-content__label--active');
  });
});
var popup = document.querySelector('.popup');
var submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  popup.style.visibility = 'visible';
  popup.style.transform = 'translateY(0)';
});
popup.addEventListener('click', function () {
  popup.style.transform = 'translateY(-1000px)';
  popup.style.visibility = 'hidden';
});
/******/ })()
;