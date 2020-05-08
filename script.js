const btnEdit = document.querySelector('.profile__btn-edit') //Открыть редактирование профиля
const btnAdd = document.querySelector('.profile__btn-add') //Открыть попап карточек

const btnCloseProfile = document.querySelector('.popup__btn-close_type_edit') //Закрыть попап профиля
const btnCloseCard = document.querySelector('.popup__btn-close_type_add') //Закрыть попап добавления карточек
const btnCloseImg = document.querySelector('.popup__btn-close_type_image') //Закрыть попап изображения

const btnSaveCard = document.querySelector('.popup__btn-save_type_add') //Сохранить карточку
const btnSaveProfile = document.querySelector('.popup__btn-save_type_edit') // сохранить изменения профиля

const popupProfile = document.querySelector('.popup_type_edit')// попап профиля
const popupCard = document.querySelector('.popup_type_add') //попап добавления карточки
const popupImg = document.querySelector('.popup_type_image') // попап изображения

const containerCard = document.querySelector('.popup__container_type_add') // контейнер попапа добавления карточек
const containerProfile = document.querySelector('.popup__container_type_edit') // контейнер попапа профиля
const containerImg = document.querySelector('.popup__image-container') // контейнер изображения

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

// открыть попап профиля
function openProfilePopup() {
  inputProfileName.value = nameInProfile.textContent
  inputProfileJob.value = jobInProfile.textContent

  popupProfile.classList.add('popup_opened')
}

//открыть попап добавления карточки
function openNewCardPopup() {
  popupCleanValues()
  popupCard.classList.add('popup_opened')
}

//закрытие попапа
function closePopup() {
  popupProfile.classList.remove('popup_opened')
  popupCard.classList.remove('popup_opened')
  popupImg.classList.remove('popup_opened')
}

// функция лайка
function switchBtnLike(evt) {
  evt.target.classList.toggle('element__btn-like_active')
  return evt
}

// функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.element').remove()
}

//функция очищения инпутов для создания карточек
function popupCleanValues() {
  newCardNameInput.value = null;
  newCardLinkInput.value = null;
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
  popupImg.classList.toggle('popup_opened')

  })

  cardsContainer.prepend(cardElement);
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
  closePopup()
}

// функция отправки формы профиля
function formEditSubmitHandler (evt) { 
  evt.preventDefault()
  nameInProfile.textContent = inputProfileName.value
  jobInProfile.textContent = inputProfileJob.value
  closePopup()
}

btnEdit.addEventListener('click', openProfilePopup)
btnAdd.addEventListener('click', openNewCardPopup)

btnCloseProfile.addEventListener('click', closePopup)
btnCloseCard.addEventListener('click', closePopup)
btnCloseImg.addEventListener('click', closePopup)

containerProfile.addEventListener('submit', formEditSubmitHandler)
containerCard.addEventListener('submit', formAddSubmitHandler)
