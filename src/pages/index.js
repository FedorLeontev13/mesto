import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from "../components/PopupDeleteCard";
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
    baseURL,
    token,
    containerProfile,
    containerCard,
    containerAvatar,
    btnEdit,
    btnAdd,
    inputProfileName,
    inputProfileJob,
    formConfig,
    btnAvatar
} from '../utils/constants.js'

const api = new Api(baseURL, token);

const editFormValidation = new FormValidator(formConfig, containerProfile);
const placeFormValidation = new FormValidator(formConfig, containerCard);
const avatarFormValidation = new FormValidator(formConfig, containerAvatar);

const userInfo = new UserInfo({
    userSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    avaSelector: '.profile__avatar'
});

const generateCard = data => new Card(
    data,
    userInfo.getUserId(),
    '#card',
    ({name, link}) => popupImg.open(name, link),
    (id, delConfirm) => confirmDeletePopup.open(id, delConfirm),
    (id, liked) => api.likeCard(id, liked)
).generateCard();


const profilePopup = new PopupWithForm(
    '.popup_type_edit',
    dataForm => {
        api.updUserInfo({
            name: dataForm.name,
            about: dataForm.description
        })
            .then(res => {
                userInfo.setUserInfo(res.name, res.about);
                profilePopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => document.querySelector('.popup__btn-save').textContent = 'Сохранить');
    },
    editFormValidation,
    () => {
        const {userName, userJob} = userInfo.getUserInfo();
        inputProfileName.value = userName;
        inputProfileJob.value = userJob;
        const event = new Event('input');
        inputProfileName.dispatchEvent(event);
        inputProfileJob.dispatchEvent(event);
    }
);

// новое место
const placePopup = new PopupWithForm (
    '.popup_type_add',
    dataForm => {
        api.uploadCard(dataForm)
            .then(res => {
                cardList.prependItem(generateCard(res));
                placePopup.close()
            })
            .catch(err => console.log(err))
            .finally(() => document.querySelector('.popup__btn-save_type_add').textContent = 'Создать');
    },
    placeFormValidation
);

const confirmDeletePopup = new PopupDeleteCard(
    '.popup_type_del',
    (id, delCard) => {
        api.deleteCard(id)
            .then(() => {
                delCard();
                confirmDeletePopup.close();
            })
            .catch(err => console.log(err));
    }
);

// изменить аватар
const changeAvatarPopup = new PopupWithForm(
    '.popup_type_avatar',
    ({link}) => {
        api.changeAvatar(link)
            .then(result => {
                userInfo.setUserAvatar(result.avatar);
                changeAvatarPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => document.querySelector('.popup__btn-save_type_avatar').textContent = 'Сохранить');
    },
    avatarFormValidation
);
let cardList;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([{name, about, avatar, _id}, initialCards]) => {
        userInfo.setUserInfo(name, about);
        userInfo.setUserAvatar(avatar);
        userInfo.setUserId(_id);
        cardList = new Section({
            items: initialCards,
            renderer: item => cardList.appendItem(generateCard(item))
        }, '.elements');
        cardList.renderItems();
    })
    .catch(err => console.log(err));


const popupImg = new PopupWithImage('.popup_type_image');

btnEdit.addEventListener('click', () => {
    profilePopup.open();
});
btnAdd.addEventListener('click', () => {
    placePopup.open()
});
btnAvatar.addEventListener('click', () => {
    changeAvatarPopup.open()
});

editFormValidation.enableValidation();
placeFormValidation.enableValidation();
avatarFormValidation.enableValidation();