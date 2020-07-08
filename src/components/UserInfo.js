export default class UserInfo {
    constructor({userSelector, jobSelector, avaSelector}) {
        this._userName = document.querySelector(userSelector);
        this._userJob = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avaSelector);
    }


    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent
        };
    }

    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._userJob.textContent = about;
    }

    setUserAvatar(link) {
        this._avatar.src = link;
    }

    setUserId(id) {
        this._userId = id
    }

    getUserId() {
        return this._userId;
    }
}