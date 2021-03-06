export const btnEdit = document.querySelector('.profile__btn-edit'); //Открыть редактирование профиля 
export const btnAdd = document.querySelector('.profile__btn-add');//Открыть попап карточек 

export const btnSaveCard = document.querySelector('.popup__btn-save_type_add');
export const btnSaveProfile = document.querySelector('.popup__btn-save_type_edit');
export const btnSaveAvatar = document.querySelector('.popup__btn-save_type_avatar');

export const containerCard = document.querySelector('.popup__container_type_add');// контейнер попапа добавления карточек 
export const containerProfile = document.querySelector('.popup__container_type_edit');// контейнер попапа профиля
export const containerAvatar = document.querySelector('.popup__container_type_avatar');

export const inputProfileName = document.querySelector('.popup__text_type_name'); // имя профиля в попап 
export const inputProfileJob = document.querySelector('.popup__text_type_description'); // описание профиля в попап
export const nameInProfile = document.querySelector('.profile__title');
export const descriptionInProfile = document.querySelector('.profile__subtitle');

export const profileAvatar = document.querySelector('.profile__avatar'); //аватар профиля
export const btnAvatar = document.querySelector('.profile__avatar-btn');

export const cardListSection = '.elements';

export const formConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    buttonSelector: '.popup__btn-save',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active',
    inactiveButtonClass: 'popup__btn-save_disabled',
};

export const baseURL = 'https://mesto.nomoreparties.co/v1/cohort-12';
export const token = '68c8587f-0e28-40be-8981-b4217700d78c';

export const inputListEditForm = Array.from(containerProfile.querySelectorAll('.popup__text'));
export const inputListAddForm = Array.from(containerCard.querySelectorAll('.popup__text'));
export const inputListAvatarForm = Array.from(containerAvatar.querySelectorAll('.popup__text'));

export const bigImage = document.querySelector('.popup__big-image'); // Находим большое изображение
export const popupCaption = document.querySelector('.popup__caption'); // Находим подпись большого изображения
