import  Card  from './Card.js'
import  FormValidator  from './FormValidator.js'

const btnEdit = document.querySelector('.profile__btn-edit'); //Открыть редактирование профиля
const btnAdd = document.querySelector('.profile__btn-add');//Открыть попап карточек

const btnCloseProfile = document.querySelector('.popup__btn-close_type_edit'); //Закрыть попап профиля
const btnCloseCard = document.querySelector('.popup__btn-close_type_add'); //Закрыть попап добавления карточек
const btnCloseImg = document.querySelector('.popup__btn-close_type_image'); //Закрыть попап изображения

const btnSaveProfile =document.querySelector('.popup__btn-save_type_edit'); // кнопкa сохранения профиля
const btnSaveCard = document.querySelector('.popup__btn-save_type_add');

const popupProfile = document.querySelector('.popup_type_edit');// попап профиля
const popupCard = document.querySelector('.popup_type_add');//попап добавления карточки
const popupImg = document.querySelector('.popup_type_image');// попап изображения

const bigImage = document.querySelector('.popup__big-image');
const popupCaption = document.querySelector('.popup__caption');

const containerCard = document.querySelector('.popup__container_type_add');// контейнер попапа добавления карточек
const containerProfile = document.querySelector('.popup__container_type_edit');// контейнер попапа профиля

const nameInProfile = document.querySelector('.profile__title'); //имя в профиле
const jobInProfile = document.querySelector('.profile__subtitle'); // описание в профиле

const inputProfileName = document.querySelector('.popup__text_type_name'); // имя профиля в попап
const inputProfileJob = document.querySelector('.popup__text_type_description'); // описание профиля в попап

const newCardNameInput = document.querySelector('.popup__text_type_place'); // имя карточки в попапе
const newCardLinkInput = document.querySelector('.popup__text_type_link'); // ссылка картинки в попапе

const cardsContainer = document.querySelector('.elements');// элемент, куда будем вставлять карточки

const cards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз'
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1581499242002-4d081930dd25?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        alt: 'Москва'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал'
    }
];

const formConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__btn-save',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  inactiveButtonClass: 'popup__btn-save_disabled',
};

// Для каждой проверяемой формы создаем экземпляр класса и вызываем метод enableValidation
const formEditValid = new FormValidator(formConfig, containerProfile);
formEditValid.enableValidation();
const formAddValid = new FormValidator(formConfig, containerCard);
formAddValid.enableValidation();

// Функция отображения в форме информации из профиля
function showInfoOfProfile () {
    inputProfileName.value = nameInProfile.textContent;
    inputProfileJob.value =jobInProfile.textContent;
}

// Функция определения открытой формы
function whatFormToClose (evt) {
    const openedFormElement = document.querySelector('.popup_opened'); // Находим открытую форму
    eventToClosePopup(evt, openedFormElement);
}

// Функция устанавки / снятия слушатели Esc и Overlay
function toggleEventListeners (popupElement) {
    if (!popupElement.classList.contains('popup_opened')) {
        document.addEventListener('click', whatFormToClose);
        document.addEventListener('keydown', whatFormToClose);
    } else {
        document.removeEventListener('click', whatFormToClose);
        document.removeEventListener('keydown', whatFormToClose);
    }
}

// Функция подготовки формы "редактирования профиля" к открытию
function prepareEditFormToOpened(popupElement) {
    showInfoOfProfile();
    btnSaveProfile.classList.remove(formConfig.inactiveButtonClass);
    togglePopup(popupElement);
}

// Функция подготовки формы "создания карточки" к открытию
function prepareAddFormToOpened(popupElement) {
    containerCard.reset();
    btnSaveCard.classList.add(formConfig.inactiveButtonClass);
    togglePopup(popupElement);
}

// Функция открытия и закрытия pop-up
function togglePopup(popupElement) {
    toggleEventListeners(popupElement);
    popupElement.classList.toggle('popup_opened');
}

// Функция закрытия формы по событию (Esc и Overlay)
function eventToClosePopup (evt, formElement) {
    if ((evt.target.classList.contains('popup')) || (evt.key === 'Escape')) {
        togglePopup(formElement);
    }
}

function formEditSubmitHandler (evt) {
    evt.preventDefault();
    nameInProfile.textContent = inputProfileName.value;
    jobInProfile.textContent = inputProfileJob.value;
    togglePopup(popupProfile);
}

function formAddSubmitHandler (evt) {
    evt.preventDefault();
    const userCard = new Card({ name: newCardNameInput.value, link: newCardLinkInput.value }, '#card');
    const userCardElement = userCard.generateCard();
    cardsContainer.prepend(userCardElement);
    togglePopup(popupCard);
    containerCard.reset();
}

btnEdit.addEventListener('click', () => prepareEditFormToOpened(popupProfile));
btnAdd.addEventListener('click', () => prepareAddFormToOpened(popupCard));

btnCloseProfile.addEventListener('click', () => togglePopup(popupProfile));
btnCloseCard.addEventListener('click', () => togglePopup(popupCard));
btnCloseImg.addEventListener('click', () => togglePopup(popupImg));

containerProfile.addEventListener('submit', formEditSubmitHandler);
containerCard.addEventListener('submit', formAddSubmitHandler);

cards.forEach((item) => {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);

    const cardImageElement = document.querySelector('.element__image');
    cardImageElement.addEventListener('click', function () {
        bigImage.src = item.link;
        bigImage.alt = item.alt;
        popupCaption.textContent = item.name;
        togglePopup(popupImg)
    })

});





