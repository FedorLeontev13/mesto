import  PopupDeleteCard  from '../components/PopupDeleteCard.js';
import  PopupWithImage  from '../components/PopupWithImage.js';
import  PopupWithForm  from '../components/PopupWithForm.js';
import  Section  from '../components/Section.js';
import  Card  from '../components/Card.js';
import  FormValidator  from '../components/FormValidator.js';
import  UserInfo  from '../components/UserInfo.js';
import  Api  from '../components/Api.js';
import './index.css';

import {
    btnEdit,
    btnAdd,
    btnSaveProfile,
    btnSaveCard,
    nameInProfile,
    descriptionInProfile,
    profileAvatar,
    btnAvatar,
    btnSaveAvatar,
    containerProfile,
    containerCard,
    containerAvatar,
    inputProfileName,
    inputProfileJob,
    cardListSection,
    inputListEditForm,
    inputListAddForm,
    inputListAvatarForm,
    formConfig,
    bigImage,
    popupCaption,
} from '../utils/constants.js';

const newUserInfo = new UserInfo({
    userNameSelector: '.profile__title',
    aboutInfoSelector: '.profile__subtitle',
    popupTextTypeName: inputProfileName,
    popupTextTypeAbout: inputProfileJob,
    profileTitle: nameInProfile,
    profileSubtitle: descriptionInProfile,
    profileAvatar: profileAvatar,
});

function addCards(cards, userId) {
    const cardsList = new Section({
            data: cards,
            renderer: (item, userId) => {
                const card = new Card({
                    item: item,
                    cardSelector: '#card',
                    handleCardClick: (cardData) => {
                        popupImage.open(cardData);
                    },
                    handleTrashBtnClick: (cardElement, cardId) => {
                        popupImgDelete.open(cardElement, cardId);
                    }
                });
                const cardElement = card.generateCard(userId);
                if (cards.length != 1) {
                    cardsList.addItem(cardElement);
                } else {
                    cardsList.setItem(cardElement);
                }
            },
            userId: userId,
        },
        cardListSection
    );
    cardsList.renderItems();
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: '68c8587f-0e28-40be-8981-b4217700d78c',
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, cards]) => {
        newUserInfo.setUserInfo(userInfo);
        addCards(cards, userInfo._id);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    });

const formEditValid = new FormValidator(
    formConfig,
    containerProfile,
    inputListEditForm,
    btnSaveProfile
);
formEditValid.enableValidation();

const formAddValid = new FormValidator(
    formConfig,
    containerCard,
    inputListAddForm,
    btnSaveCard
);
formAddValid.enableValidation();

const formAvatarValid = new FormValidator(
    formConfig,
    containerAvatar,
    inputListAvatarForm,
    btnSaveAvatar
);
formAvatarValid.enableValidation();

const popupEdit = new PopupWithForm({
    formSelector: '.popup_type_edit',
    handleFormSubmit: (formData) => {
        popupEdit.setBtnStartLoading();
        api.patchUserInfo(formData)
            .then((data) => {
                newUserInfo.setUserInfo(data);
                popupEdit.close();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
            .finally(() => {
                popupEdit.setBtnEndLoading();
            });
    },
    submitButton: btnSaveProfile
});

const popupAdd = new PopupWithForm({
    formSelector: '.popup_type_add',
    handleFormSubmit: (formData) => {
        popupAdd.setBtnStartLoading();
        api.postNewCard(formData)
            .then((data) => {
                addCards([data], data.owner._id);
                popupAdd.close();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
            .finally(() => {
                popupAdd.setBtnEndLoading();
            });
    },
    submitButton: btnSaveCard
});

const popupPatchAvatar = new PopupWithForm({
    formSelector: '.popup_type_avatar',
    handleFormSubmit: (formData) => {
        popupPatchAvatar.setBtnStartLoading();
        api.patchAvatar(formData.url)
            .then((data) => {
                newUserInfo.setNewAvatar(data.avatar);
                console.log('Успешно: ', data.avatar);
                popupPatchAvatar.close();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
            .finally(() => {
                popupPatchAvatar.setBtnEndLoading();
            });
    },
    submitButton: btnSaveAvatar
});

export const popupImage = new PopupWithImage({
    formSelector: '.popup_type_image',
    popupBigImage: bigImage,
    popupFigcaption: popupCaption,
});

export const popupImgDelete = new PopupDeleteCard({
    formSelector: '.popup_type_del',
    handleFormSubmit: (cardId, cardElement) => {
        api.deleteMyCard(cardId)
            .then((data) => {
                console.log(data);
                cardElement.querySelector('.element__btn-delete').closest('.element').remove();
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            });
    }
});

function prepareEditFormToOpened() {
    const formValues = newUserInfo.getUserInfo();
    inputProfileName.value = formValues.name;
    inputProfileJob.value = formValues.about;
    formEditValid.clearErrors();
    formEditValid.submitButtonState();
    popupEdit.open();
}

function prepareAddFormToOpened() {
    containerCard.reset();
    formAddValid.clearErrors();
    formAddValid.submitButtonState();
    popupAdd.open();
    inputListAddForm.forEach((inputElement) => {
        inputElement.classList.remove(formConfig.inputErrorClass);
    });
}

function preparePatchFormToOpened() {
    containerAvatar.reset();
    formAvatarValid.clearErrors();
    formAvatarValid.submitButtonState();
    popupPatchAvatar.open();
}

btnEdit.addEventListener('click', prepareEditFormToOpened);
btnAdd.addEventListener('click', prepareAddFormToOpened);
btnAvatar.addEventListener('click', preparePatchFormToOpened);
