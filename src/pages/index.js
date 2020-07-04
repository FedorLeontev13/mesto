//импортируем стили
import './index.css';

//импортируем модули и константы
import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import {
    cardListSection,
    inputProfileName,
    inputProfileJob,
    cards,
    formConfig,
    containerCard,
    containerProfile,
    btnEdit,
    btnAdd,
    newCardNameInput,
    newCardLinkInput
}  from '../utils/constants.js';
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo  } from '../components/UserInfo.js';

const formAddPlaceValidation = new FormValidator(formConfig,containerCard);
formAddPlaceValidation.enableValidation();

const formLifestyleValidation = new FormValidator(formConfig, containerProfile);
formLifestyleValidation.enableValidation();





//создаем массив начальных карточек
const cardList = new Section ({
        items: cards,
        renderer: (item) => {
            const card = new Card({
                data:item,
                cardSelector:'#card',
                handleCardClick:(popupData)=>{
                    popupImage.openPopup(popupData);
                }});
            const cardElement = card.generateCard();
            cardList.addItem(cardElement, true);
        },
    },
    cardListSection
);
cardList.renderItems();

const popupImage = new PopupWithImage ('#bigImage');
popupImage.setEventListeners();

//форма добавления карточки
const placeFormAdd = new PopupWithForm({
    popupSelector:'#popupAdd',
    handleFormSubmit:()=>{
        const userCard = new Card({
            data:{ name: newCardNameInput.value, link: newCardLinkInput.value, alt: newCardNameInput.value},
            cardSelector:'#card',
            handleCardClick:(popupData)=>{
                popupImage.openPopup(popupData);
            }});
        const cardElement = userCard.generateCard();
        cardList.addItem(cardElement);
        newCardNameInput.value = '';
        newCardLinkInput.value = '';
    }
});
placeFormAdd.setEventListeners();


const userProfile = new UserInfo({
    userNameSelector:'.profile__title',
    userLifestyleSelector: '.profile__subtitle'});

//форма редактирования профиля
const profileFormEdit = new PopupWithForm({
    popupSelector: '#popupEdit',
    handleFormSubmit:(profileData) => {
        userProfile.setUserInfo(profileData);
    }
});
profileFormEdit.setEventListeners();

//открытие формы "Редактировать профиль"
btnEdit.addEventListener('click', () => {
    const formValues  = userProfile.getUserInfo();
    inputProfileName.value =  formValues.name;
    inputProfileJob.value =  formValues.description;
    profileFormEdit.openPopup()
});

//открытие формы "Новое место"
btnAdd.addEventListener('click', () =>{
    placeFormAdd.openPopup();
});
