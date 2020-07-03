import {
    inputProfileName,
   inputProfileJob,
} from '../utils/constants.js';

export class UserInfo {
    constructor ({userNameSelector, userLifestyleSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userLifestyle = document.querySelector(userLifestyleSelector);

    }

    //публичный метод: возвращает объект с данными пользователя
    getUserInfo() {
        this._formValues = {};
        this._formValues[inputProfileName.name] =  this._userName.textContent;
        this._formValues[inputProfileJob.name] = this._userLifestyle.textContent;
        return this._formValues;
    }

    //публичный метод: принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(popupData) {
        this._userName.textContent = popupData.name;
        this._userLifestyle.textContent = popupData.description;
    }
}
