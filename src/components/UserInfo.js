export class UserInfo {
    constructor ({userNameSelector, userLifestyleSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userLifestyle = document.querySelector(userLifestyleSelector);

    }

    //публичный метод: возвращает объект с данными пользователя
    getUserInfo() {
        const name = this._userName.textContent;
        const hobby = this._userLifestyle.textContent;
        return [name, hobby];
    }

    //публичный метод: принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, hobby }) {
        this._userName.textContent = name || this._userName.textContent;
        this._userLifestyle.textContent = hobby || this._userLifestyle.textContent;
    }
}
