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
    newCardLinkInput,
    inputListEditForm,
    inputListAddForm,
    btnSaveCard
}  from '../utils/constants.js';
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo  } from '../components/UserInfo.js';

const formAddPlaceValidation = new FormValidator(formConfig,containerCard);
formAddPlaceValidation.enableValidation();

const formLifestyleValidation = new FormValidator(formConfig, containerProfile);
formLifestyleValidation.enableValidation();

// Функция подготовки к скрытию ошибок валидации при открытии формы
function checkInputBeforeFormOpening (inputList, formElement, formValid) {
    inputList.forEach((inputElement) => {
        formValid.hideInputError(formElement, inputElement, formConfig);
    });
}

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
            cardList.addItem(cardElement);
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
    handleFormSubmit:() => {
        const userCard = new Card({
            data:{ name: newCardNameInput.value,
                link: newCardLinkInput.value,
                alt: newCardNameInput.value},
            cardSelector:'#card',
            handleCardClick:(popupData) => {
                popupImage.openPopup(popupData);
            }});
        const cardElement = userCard.generateCard();
        cardList.addItem(cardElement);
    }
});

const userProfile = new UserInfo({
    userNameSelector:'.profile__title',
    userLifestyleSelector: '.profile__subtitle'});

//форма редактирования профиля
const profileFormEdit = new PopupWithForm({
    popupSelector: '#popupEdit',
    handleFormSubmit:(profileData) => {
        userProfile.setUserInfo({ name: profileData.name, hobby: profileData.description });
    }
});
profileFormEdit.setEventListeners();

//открытие формы "Редактировать профиль"
btnEdit.addEventListener('click', () => {
    const [name, hobby] = userProfile.getUserInfo();
    inputProfileName.value = name;
    inputProfileJob.value = hobby;
    checkInputBeforeFormOpening(inputListEditForm, containerProfile, formLifestyleValidation);
    profileFormEdit.openPopup()
});

//открытие формы "Новое место"
btnAdd.addEventListener('click', () => {
    containerCard.reset();
    checkInputBeforeFormOpening(inputListAddForm, containerCard, formAddPlaceValidation);
    btnSaveCard.classList.add(formConfig.inactiveButtonClass);
    btnSaveCard.disabled = true;
    placeFormAdd.openPopup();
});
