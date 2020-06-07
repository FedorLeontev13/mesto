import  Card  from './Card.js'
import  FormValidator  from './FormValidator.js'

const btnEdit = document.querySelector('.profile__btn-edit'); //Открыть редактирование профиля
const btnAdd = document.querySelector('.profile__btn-add');//Открыть попап карточек

const btnCloseProfile = document.querySelector('.popup__btn-close_type_edit'); //Закрыть попап профиля
const btnCloseCard = document.querySelector('.popup__btn-close_type_add'); //Закрыть попап добавления карточек
const btnCloseImg = document.querySelector('.popup__btn-close_type_image'); //Закрыть попап изображения

const btnSaveProfile =document.querySelector('.popup__btn-save_type_edit'); // кнопкa сохранения профиля
const btnSaveCard =document.querySelector('.popup__btn-save_type_add'); // кнопкa сохранения профиля

const popupProfile = document.querySelector('.popup_type_edit');// попап профиля
const popupCard = document.querySelector('.popup_type_add');//попап добавления карточки
export const popupImg = document.querySelector('.popup_type_image');// попап изображения

const containerCard = document.querySelector('.popup__container_type_add');// контейнер попапа добавления карточек
const containerProfile = document.querySelector('.popup__container_type_edit');// контейнер попапа профиля

const nameInProfile = document.querySelector('.profile__title'); //имя в профиле
const jobInProfile = document.querySelector('.profile__subtitle'); // описание в профиле

const inputProfileName = document.querySelector('.popup__text_type_name'); // имя профиля в попап
const inputProfileJob = document.querySelector('.popup__text_type_description'); // описание профиля в попап

const newCardNameInput = document.querySelector('.popup__text_type_place'); // имя карточки в попапе
const newCardLinkInput = document.querySelector('.popup__text_type_link'); // ссылка картинки в попапе

export const bigImage = document.querySelector('.popup__big-image'); // большое изображение
export const popupCaption = document.querySelector('.popup__caption') ;// подпись большого изображения

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

const inputListEditForm = Array.from(containerProfile.querySelectorAll('.popup__text'));
const inputListAddForm = Array.from(containerCard.querySelectorAll('.popup__text'));

const setObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__btn-save',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  inactiveButtonClass: 'popup__btn-save_disabled',
};

//Функция скрытия ошибок валидации при открытии формы
const hideInputError = (formElement, inputElement, obj) => {
     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
     inputElement.classList.remove(obj.inputErrorClass);
     errorElement.classList.remove(obj.errorClass);
     errorElement.textContent = '';
 };
 //Функция отображения / скрытия ошибок валидации при открытии формы
function checkInputBeforeFormOpening (inputList, formElement) {
inputList.forEach((inputElement) => {
hideInputError(formElement, inputElement, setObj)
   })
}

//Функция обходит массив полей для проверки их валидности
const hasInvalidInput = (inputList) => {
return inputList.some((inputElement) => {
     return !inputElement.validity.valid
  })
};

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
         buttonElement.classList.add(obj.inactiveButtonClass)
     } else {
         buttonElement.classList.remove(obj.inactiveButtonClass)
     }
 };

//функция открытия/закрытия попапа
 export function togglePopup(popup) {
   popup.classList.toggle('popup_opened');
   if (popup.classList.contains('popup_opened')) {
     document.addEventListener('keydown', (evt) => escClose(evt, popup)) || document.addEventListener('click', (evt) => closePopupOverlay(evt, popup))
   }
   else {document.removeEventListener('keydown', (evt) => escClose(evt, popup)) || document.removeEventListener('click', (evt) => closePopupOverlay(evt, popup))}
 }

 // Закрытие попапа нажатием Esc
 function escClose(evt, popup) {
  if (evt.keyCode == 27){
   popup.classList.remove('popup_opened');
  }
 }

 // Функция закрытия попап кликом на оверлей
 function closePopupOverlay (evt, formElement) {
   if (evt.target.classList.contains('popup')) {
     togglePopup(formElement)
   }
 }

 // Функция устанавки / снятия слушатели Esc и Overlay
 function toggleEventListeners (popupElement) {
   if (popupElement.classList.contains('popup_opened')) {
     document.addEventListener('click', () => togglePopup(popupElement));
     document.addEventListener('keydown', () => togglePopup(popupElement));
   } else {
     document.removeEventListener('click', () => togglePopup(popupElement));
     document.removeEventListener('keydown', () => togglePopup(popupElement));
   }
 }

cards.forEach((item) => {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(setObj.formSelector));
formList.forEach((formElement) => {
    const formValid = new FormValidator(setObj, formElement);
    formValid.enableValidation();
});

 // открыть попап профиля
 function openProfilePopup() {
  inputProfileName.value = nameInProfile.textContent;
  inputProfileJob.value = jobInProfile.textContent;
   checkInputBeforeFormOpening(inputListEditForm, containerProfile);
   toggleButtonState(inputListEditForm, btnSaveProfile, setObj);
   toggleEventListeners(popupProfile);
   togglePopup(popupProfile);
 }

 function popupCleanValues() {
    newCardNameInput.value = '';
     newCardLinkInput.value = '';
 }

 //открыть попап добавления карточки
 function openNewCardPopup() {
   popupCleanValues();
   checkInputBeforeFormOpening(inputListAddForm, containerCard);
   toggleButtonState(inputListAddForm, btnSaveCard, setObj);
   toggleEventListeners(popupCard);
   togglePopup(popupCard);
 }

 // Обработчик добавления новых карточек.
function formAddSubmitHandler (evt) {
    evt.preventDefault();
    const userCard = new Card({ name: newCardNameInput.value, link: newCardLinkInput.value }, '#card');
    const userCardElement = userCard.generateCard();
    cardsContainer.prepend(userCardElement);
    togglePopup(popupCard);
    containerCard.reset();
}

 // функция отправки формы профиля
 function formEditSubmitHandler (evt) {
   evt.preventDefault();
  nameInProfile.textContent = inputProfileName.value;
  jobInProfile.textContent = inputProfileJob.value;
   togglePopup(popupProfile)
}

btnEdit.addEventListener('click', openProfilePopup);
btnAdd.addEventListener('click', openNewCardPopup);

btnCloseProfile.addEventListener('click', () => togglePopup(popupProfile));
btnCloseCard.addEventListener('click', () => togglePopup(popupCard));
btnCloseImg.addEventListener('click', () => togglePopup(popupImg));

containerProfile.addEventListener('submit', formEditSubmitHandler);
containerCard.addEventListener('submit', formAddSubmitHandler);