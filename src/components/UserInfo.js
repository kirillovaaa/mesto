export default class UserInfo {
  constructor(avatarSelector, nameSelector, descriptionSelector) {
    this._avatarElement = document.querySelector(avatarSelector);
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }

  initializeUser(id, avatar, name, about) {
    this._id = id;
    this.setAvatar(avatar);
    this.setUserInfo(name, about);
  }

  setAvatar(imageSrc) {
    this._avatarElement.src = imageSrc;
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }
}
