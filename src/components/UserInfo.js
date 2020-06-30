import {
    inputProfileJob,
    inputProfileName,
    jobInProfile,
    nameInProfile} from "../utils/constants";

export class UserInfo {
    constructor({ userNameSelector, aboutInfoSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._aboutInfoElement = document.querySelector(aboutInfoSelector);
    }
    // публичный метод, который возвращает объект с данными пользователя
    getUserInfo() {
        this._formValues = {};
        this._formValues[inputProfileName.name] = nameInProfile.textContent;
        this._formValues[inputProfileJob.name] = jobInProfile.textContent;

        return this._formValues;
    }
    // публичный метод, принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(formData) {
        this._userNameElement.textContent = formData.name;
        this._aboutInfoElement.textContent = formData.description;
    }
}
