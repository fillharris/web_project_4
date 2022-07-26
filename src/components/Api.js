export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  initialize() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  _handleFetchResponse(path, methodUsed = "GET", bodyContent) {
    return fetch(`${this._baseUrl}${path}`, {
      method: methodUsed,
      headers: this._headers,
      body: bodyContent,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
  getInitialCards() {
    return this._handleFetchResponse("/cards");
  }
  getUserInfo() {
    return this._handleFetchResponse("/users/me");
  }
  editUserProfile(inputValues) {
    const bodyContent = JSON.stringify({
      name: inputValues.name,
      about: inputValues.about,
    });
    return this._handleFetchResponse("/users/me", "PATCH", bodyContent);
  }
  addNewCard(inputValues) {
    const bodyContent = JSON.stringify({
      name: inputValues.name,
      link: inputValues.link,
    });
    return this._handleFetchResponse("/cards", "POST", bodyContent);
  }
  getCardLikeInfo() {
    return this._handleFetchResponse("/cards");
  }
  deleteCard(cardId) {
    return this._handleFetchResponse(`/cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this._handleFetchResponse(`/cards/likes/${cardId}`, "PUT");
  }
  removeLike(cardId) {
    return this._handleFetchResponse(`/cards/likes/${cardId}`, "DELETE");
  }
  editProfilePic(avatarLink) {
    const bodyContent = JSON.stringify({
      avatar: avatarLink.avatar,
    });
    return this._handleFetchResponse("/users/me/avatar", "PATCH", bodyContent);
  }
}
