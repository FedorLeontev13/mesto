import './index.css';
import {
    btnEdit,
    btnAdd,
    btnSaveCard,
    btnSaveProfile,
    containerCard,
    containerProfile,
    inputProfileName,
    inputProfileJob,
    cardListSection,
    formConfig,
    cards,
} from '../utils/constants.js';

import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';

// Для каждой проверяемой формы создаем экземпляр класса и вызываем метод enableValidation
const formEditValid = new FormValidator(formConfig, containerProfile);
formEditValid.enableValidation();
const formAddValid = new FormValidator(formConfig, containerCard);
formAddValid.enableValidation();

const cardsList = new Section({
        data: cards,
        renderer: (item) => {
            const card = new Card({
                item: item,
                cardSelector: '#card',
                handleCardClick: (cardData) => {
                    popupImage.open(cardData);
                }
            });
            const cardElement = card.generateCard();
            cardsList.setItem(cardElement);
        },
    },
    cardListSection
);
cardsList.renderItems();

const newUserInfo = new UserInfo({
    userNameSelector: '.profile__title',
    aboutInfoSelector: '.profile__subtitle'
});

const popupEdit = new PopupWithForm({
    formSelector: '.popup_type_edit',
    handleFormSubmit: (formData) => {
        newUserInfo.setUserInfo(formData);
    }
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
    formSelector: '.popup_type_add',
    handleFormSubmit: (formData) => {
        cardsList.renderItems([{ name: formData.place, link: formData.url }]);
    }
});
popupAdd.setEventListeners();

export const popupImage = new PopupWithImage({
    formSelector: '.popup_type_image',
});
popupImage.setEventListeners();

// Функция подготовки формы "редактирования профиля" к открытию
function prepareEditFormToOpened() {
    const formValues = newUserInfo.getUserInfo();
    inputProfileName.value = formValues.name;
    inputProfileJob.value = formValues.description;
    btnSaveProfile.classList.remove(formConfig.inactiveButtonClass);
    popupEdit.open();
}

// Функция подготовки формы "создания карточки" к открытию
function prepareAddFormToOpened() {
    containerCard.reset();
    btnSaveCard.classList.add(formConfig.inactiveButtonClass);
    btnSaveCard.disabled = true;
    popupAdd.open();
}

btnEdit.addEventListener('click', prepareEditFormToOpened);
btnAdd.addEventListener('click', prepareAddFormToOpened);
