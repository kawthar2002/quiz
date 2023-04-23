import './styles/index.css';

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function transfromTextToHTML(text) {
  const template = document.createElement('template');
  text = text.trim();
  template.innerHTML = text;
  return template.content.firstChild;
}

const selects = document.querySelectorAll('.select');
selects.forEach((select) => {
  const selectBtn = select.querySelector('.select-btn');
  const selectList = select.querySelector('.select__list');
  const selectInput = select.querySelector('.select-input');

  selectBtn.addEventListener('click', (event) => {
    event.preventDefault();
    selectBtn.classList.toggle('select-btn--focus');
    selectList.classList.toggle('select__list--visible');
  });

  const handleSelectItemClick = (selectItem) => (event) => {
    event.stopPropagation();
    const btn = select.querySelector('.select-btn__text');

    const selectedList = selectItem.parentElement.querySelector('.selected');
    const selected = transfromTextToHTML(`
        <ul class="selected">
          <li class="selected-item" data-value="${selectItem.dataset.value}">
          <span class="select__checkbox selected__checkbox"></span>
          <input type="checkbox" class="select__input" />
          <span class="seceted-item__name">${selectItem.dataset.value}</span>
          </li>
        </ul>
      `);

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

  const selectItems = select.querySelectorAll('.select__item');
  selectItems.forEach((selectItem) => {
    selectItem.addEventListener('click', handleSelectItemClick(selectItem));
  });

  document.addEventListener('click', function (e) {
    if (e.target !== selectBtn && selectList) {
      selectBtn.classList.remove('select-btn--focus');
      selectList.classList.remove('select__list--visible');
    }
  });
});

let currentStep = 0;
const sections = document.querySelectorAll('section');
const stepCounter = document.querySelector('.form__step');
const scroller = document.querySelector('.form__scroller');

stepCounter.innerText = `Шаг ${currentStep + 1}/${sections.length}`;

const isValid = (section) => {
  const checked =
    Array.from(section.querySelectorAll('[type="radio"]')).filter((input) => input.checked)
      ?.length > 0;
  const selected = !!section.querySelector('[type="text"]')?.value;

  return checked || selected;
};

const handleNextStep = (event) => {
  event?.preventDefault();
  const valid = isValid(sections[currentStep]);
  if (!valid) {
    return;
  }
  currentStep += 1;
  stepCounter.innerText = `Шаг ${currentStep + 1}/${sections.length}`;
  scroller.style.transform = `translateX(-${currentStep * (576 + 32)}px)`;
};

const handlePrevStep = (event) => {
  event?.preventDefault();
  currentStep -= 1;
  stepCounter.innerText = `Шаг ${currentStep + 1}/${sections.length}`;
  scroller.style.transform = `translateX(-${currentStep * (576 + 32)}px)`;
};

const nextStepButtons = document.querySelectorAll('.btn-next');
nextStepButtons.forEach((nextStepButton) => {
  nextStepButton.addEventListener('click', handleNextStep);
});

const prevStepButtons = document.querySelectorAll('.btn-prev');
prevStepButtons.forEach((prevStepButton) => {
  prevStepButton.addEventListener('click', handlePrevStep);
});

const radioBtns = document.querySelectorAll('.form-content__label');
radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener('click', () => {
    radioBtns.forEach((radio) => {
      radio.classList.remove('form-content__label--active');
    });
    handleNextStep();
    radioBtn.classList.add('form-content__label--active');
  });
});

const popup = document.querySelector('.popup');
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  popup.style.visibility = 'visible';
  popup.style.transform = 'translateY(0)';
});

popup.addEventListener('click', () => {
  popup.style.transform = 'translateY(-1000px)';
  popup.style.visibility = 'hidden';
});
