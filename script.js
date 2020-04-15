const btnClose = document.getElementById('btnClose')
const btnEdit = document.getElementById('btnEdit')

let popup = document.querySelector('.popup')
let container = document.querySelector('.popup__container')
let btnSave = document.querySelector('.popup__btn-save')
//let nameInput = document.querySelector('.popup__text_name')       // Если оставить переменные тут, то скрипт ломается и после второго "сохранения" данные стираются.
//let jobInput = document.querySelector('.popup__text_description')
//let nameForm = document.querySelector('.profile__title')
//let jobForm = document.querySelector('.profile__subtitle')


function open() {
  popup.classList.add('popup_opened')
}

function close() {
  popup.classList.remove('popup_opened')
}

btnEdit.addEventListener('click', open)
btnClose.addEventListener('click', close)



function formSubmitHandler (evt) {          // Данная функция выполена по примеру из указаний к задаче, полностью скопирована (как там и сказано сделать)
    evt.preventDefault()

    let nameInput = document.querySelector('.popup__text_name') // создание и вызов переменных по примеру происходит внутри тела функции
    let jobInput = document.querySelector('.popup__text_description') 

    nameInput = nameInput.value
    jobInput = jobInput.value

    let nameForm = document.querySelector('.profile__title') 
    let jobForm = document.querySelector('.profile__subtitle')

    nameForm.textContent = nameInput
    jobForm.textContent = jobInput
}

container.addEventListener('submit', formSubmitHandler);

function save() {
  popup.classList.remove('popup_opened')
}

btnSave.addEventListener('click', save)
