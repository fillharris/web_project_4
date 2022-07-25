export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSlot = document.querySelector(nameSelector);
    this._jobSlot = document.querySelector(jobSelector);
    this._avatarSlot = document.querySelector(avatarSelector);
  }
  // to populate form fields after popup open
  getUserInfo() {
    return {
      name: this._nameSlot.textContent,
      about: this._jobSlot.textContent,
      avatar: this._avatarSlot.src,
    };
  }
  // upon form submission
  setUserInfo(data) {
    this._nameSlot.textContent = data.name;
    this._jobSlot.textContent = data.about;
    this._avatarSlot.alt = `${data.name}`;
    this._avatarSlot.src = data.avatar;
  }
  setUserAvatar(data) {
    this._avatarSlot.src = data.avatar;
  }
}
