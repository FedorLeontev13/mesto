const btnEdit = document.querySelector('.profile__btn-edit') //Открыть редактирование профиля
const btnAdd = document.querySelector('.profile__btn-add') //Открыть попап карточек

const btnCloseProfile = document.querySelector('.popupProf__btn-close') //Закрыть попап профиля
const btnCloseCard = document.querySelector('.popupCard__btn-close') //Закрыть попап добавления карточек
const btnCloseImg = document.querySelector('.popupImg__btn-close') //Закрыть попап изображения

const btnSaveCard = document.querySelector('.popupCard__btn-save') //Сохранить карточку
const btnSaveProfile = document.querySelector('.popupProf__btn-save') // сохранить изменения профиля

const popupProfile = document.querySelector('.popupProf')// попап профиля
const popupCard = document.querySelector('.popupCard') //попап добавления карточки
const popupImg = document.querySelector('.popupImg') // попап изображения

const containerCard = document.querySelector('.popupCard__container') // контейнер попапа добавления карточек
const containerProfile = document.querySelector('.popupProf__container') // контейнер попапа профиля
const containerImg = document.querySelector('.popupImg__container') // контейнер изображения

const nameProfile = document.querySelector('.profile__title') //имя в профиле
const jobProfile = document.querySelector('.profile__subtitle') // описание в профиле

const nameInput = document.querySelector('.popupProf__text_name') // имя профиля в попап
const jobInput = document.querySelector('.popupProf__text_description') // описание профиля в попап

const namePicInput = document.querySelector('.popupCard__text_place') // имя карточки в попапе
const linkPicInput = document.querySelector('.popupCard__text_link') // ссылка картинки в попапе

const bigImage = document.querySelector('.popupImg__big-image') // большое изображение
const popupCaption = document.querySelector('.popupImg__caption') // подпись большого изображения

const cardTemplate = document.querySelector('#card').content // шаблон карточки
const cardsContainer = document.querySelector('.elements') // элемент, куда будем вставлять карточки  

const card = [{}]
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


// функция открытия и закрытия pop-up
function changePopup(popupElement) {
  
  if (popupElement.classList.contains('profile__btn-edit') || popupElement.classList.contains('popupProf__btn-close') || popupElement.classList.contains('popupProf__container')) {
    nameInput.value = nameProfile.textContent
    jobInput.value = jobProfile.textContent
    nameInput.placeholder = 'Имя'
    nameInput.placeholder = 'Описание'
    btnSaveProfile.textContent = 'Сохранить'
    popupProfile.classList.toggle('popupProf_opened')
  }
  if (popupElement.classList.contains('profile__btn-add') || popupElement.classList.contains('popupCard__btn-close') || popupElement.classList.contains('popupCard__container')) {
    namePicInput.value = ''
    linkPicInput.value = ''
    namePicInput.placeholder = 'Название'
    linkPicInput.placeholder = 'Ссылка на картинку'
    btnSaveCard.textContent = 'Создать'
    popupCard.classList.toggle('popupCard_opened')
  }
  if (popupElement.classList.contains('element__image') || popupElement.classList.contains('popupImg__btn-close')) {
    popupImg.classList.toggle('popupImg_opened')
  }
}

// функция лайка
function changeLike(evt) {
  evt.target.classList.toggle('element__btn-like_active')
  return evt
}

// функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.element').remove()
}

//функция открытия попапа картинки
function openPicPopup(evt) {
  changePopup(evt.target)
  console.log(evt.target.alt)
  bigImage.src = evt.target.src
  bigImage.alt = evt.target.alt
  popupCaption.textContent = evt.target.alt
}

// функция создания новой карточки
function addNewCard(item) {
  const cardElement = cardTemplate.cloneNode(true) // копирование элементов шаблона
  cardElement.querySelector('.element__image').src = item.link
  cardElement.querySelector('.element__title').textContent = item.name
  cardElement.querySelector('.element__image').alt = item.alt
  cardElement.querySelector('.element__btn-like').addEventListener('click', changeLike)
  cardElement.querySelector('.element__btn-delete').addEventListener('click', deleteCard)
  cardElement.querySelector('.element__image').addEventListener('click', openPicPopup)

  return cardElement
}

// функция добавления карточек в разметке
function publicCards(cards) {
  cards.forEach(function (card) {
    cardsContainer.prepend(addNewCard(card))
  })
}

// функция отправки формы профиля
function formEditSubmitHandler (evt) { 
  evt.preventDefault()
  nameProfile.textContent = nameInput.value
  jobProfile.textContent = jobInput.value
  changePopup(evt.target)
}

// функция отправки формы карточек          
function formAddSubmitHandler (evt) { 
  evt.preventDefault()
  card[0].name = namePicInput.value
  card[0].link = linkPicInput.value
  card[0].alt = namePicInput.value
  publicCards(card)
  changePopup(evt.target)
}

btnEdit.addEventListener('click', (evt) => changePopup(evt.target))
btnAdd.addEventListener('click', (evt) => changePopup(evt.target))
btnCloseProfile.addEventListener('click', (evt) => changePopup(evt.target))
btnCloseCard.addEventListener('click', (evt) => changePopup(evt.target))
btnCloseImg.addEventListener('click', (evt) => changePopup(evt.target))

popupImg.removeEventListener('click', openPicPopup)
containerCard.addEventListener('submit', formAddSubmitHandler)
containerProfile.addEventListener('submit', formEditSubmitHandler)

publicCards(cards)