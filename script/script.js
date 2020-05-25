const btnEdit = document.querySelector('.profile__btn-edit') //Открыть редактирование профиля
const btnAdd = document.querySelector('.profile__btn-add') //Открыть попап карточек

const btnCloseProfile = document.querySelector('.popup__btn-close_type_edit') //Закрыть попап профиля
const btnCloseCard = document.querySelector('.popup__btn-close_type_add') //Закрыть попап добавления карточек
const btnCloseImg = document.querySelector('.popup__btn-close_type_image') //Закрыть попап изображения

const btnSave = document.querySelector('.popup__btn-save') // кнопкa сохранения профиля
const btnSaveProfile =document.querySelector('.popup__btn-save_type_edit') // кнопкa сохранения профиля
const btnSaveCard =document.querySelector('.popup__btn-save_type_add') // кнопкa сохранения профиля

const popupProfile = document.querySelector('.popup_type_edit')// попап профиля
const popupCard = document.querySelector('.popup_type_add') //попап добавления карточки
const popupImg = document.querySelector('.popup_type_image') // попап изображения

const containerCard = document.querySelector('.popup__container_type_add') // контейнер попапа добавления карточек
const containerProfile = document.querySelector('.popup__container_type_edit') // контейнер попапа профиля

const nameInProfile = document.querySelector('.profile__title') //имя в профиле
const jobInProfile = document.querySelector('.profile__subtitle') // описание в профиле

const inputProfileName = document.querySelector('.popup__text_type_name') // имя профиля в попап
const inputProfileJob = document.querySelector('.popup__text_type_description') // описание профиля в попап

const newCardNameInput = document.querySelector('.popup__text_type_place') // имя карточки в попапе
const newCardLinkInput = document.querySelector('.popup__text_type_link') // ссылка картинки в попапе

const bigImage = document.querySelector('.popup__big-image') // большое изображение
const popupCaption = document.querySelector('.popup__caption') // подпись большого изображения

const cardTemplate = document.querySelector('#card').content // шаблон карточки
const cardsContainer = document.querySelector('.elements') // элемент, куда будем вставлять карточки  


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

const inputListEditForm = Array.from(containerProfile.querySelectorAll('.popup__text'))
const inputListAddForm = Array.from(containerCard.querySelectorAll('.popup__text'))

const setObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  buttonSelector: '.popup__btn-save',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  inactiveButtonClass: 'popup__btn-save_disabled',
}

// Функция отображения / скрытия ошибок валидации при открытии формы
function checkImputBeforFormOpening (inputList, formElement) {
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, setObj)
  })
}

//функция открытия/закрытия попапа
function togglePopup(popup) {
  popup.classList.toggle('popup_opened')
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
    document.addEventListener('click', () => togglePopup(popupElement))
    document.addEventListener('keydown', () => togglePopup(popupElement))
  } else {
    document.removeEventListener('click', () => togglePopup(popupElement))
    document.removeEventListener('keydown', () => togglePopup(popupElement))
  }
}

// открыть попап профиля
function openProfilePopup() {
  inputProfileName.value = nameInProfile.textContent
  inputProfileJob.value = jobInProfile.textContent
  checkImputBeforFormOpening(inputListEditForm, containerProfile)
  toggleButtonState(inputListEditForm, btnSaveProfile, setObj)
  toggleEventListeners(popupProfile)
  togglePopup(popupProfile)
}

//открыть попап добавления карточки
function openNewCardPopup() {
  popupCleanValues()
  checkImputBeforFormOpening(inputListAddForm, containerCard)
  toggleButtonState(inputListAddForm, btnSaveCard, setObj)
  toggleEventListeners(popupCard)
  togglePopup(popupCard)
}

// функция лайка
function switchBtnLike(evt) {
  evt.target.classList.toggle('element__btn-like_active')
  return evt
}

// функция удаления карточки
function deleteCard(evt) {
  const elementCard = evt.target.closest('.element')
  elementCard.querySelector('.element__btn-like').removeEventListener('click', switchBtnLike)
  elementCard.querySelector('.element__btn-delete').removeEventListener('click', deleteCard)
  elementCard.remove()
}

//функция очищения инпутов для создания карточек
function popupCleanValues() {
  newCardNameInput.value = null
  newCardLinkInput.value = null
}

// функция создания карточки
function createNewCard(item) {
  const cardElement = cardTemplate.cloneNode(true) // копирование элементов шаблона
  const elementImage = cardElement.querySelector('.element__image')

  cardElement.querySelector('.element__title').textContent = item.name
  elementImage.src = item.link
  elementImage.alt = item.alt
  cardElement.querySelector('.element__btn-like').addEventListener('click', switchBtnLike)
  cardElement.querySelector('.element__btn-delete').addEventListener('click', deleteCard)

  elementImage.addEventListener('click', function() {
  bigImage.src = item.link
  bigImage.alt = item.link
  popupCaption.textContent = item.name
  togglePopup(popupImg)
  })
  cardsContainer.prepend(cardElement)
}
cards.forEach(createNewCard);

// Обработчик добавления новых карточек.
function formAddSubmitHandler (evt) {
  evt.preventDefault()
  cards.push( {
    name: newCardNameInput.value, 
    link: newCardLinkInput.value 
  })
  createNewCard(cards[cards.length -1])
  togglePopup(popupCard)
  // toggleButtonState(inputListAddForm, btnSaveCard, setObj)
}

// функция отправки формы профиля
function formEditSubmitHandler (evt) { 
  evt.preventDefault()
  nameInProfile.textContent = inputProfileName.value
  jobInProfile.textContent = inputProfileJob.value
  togglePopup(popupProfile)
  // toggleButtonState(inputListEditForm, btnSaveProfile, setObj)
}



btnEdit.addEventListener('click', openProfilePopup)
btnAdd.addEventListener('click', openNewCardPopup)

btnCloseProfile.addEventListener('click', () => togglePopup(popupProfile))
btnCloseCard.addEventListener('click', () => togglePopup(popupCard))
btnCloseImg.addEventListener('click', () => togglePopup(popupImg))

containerProfile.addEventListener('submit', formEditSubmitHandler)
containerCard.addEventListener('submit', formAddSubmitHandler)