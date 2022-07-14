export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  getInitialCards() {
    return fetch(this.baseURL + "/cards", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  editUserProfile() {
    return fetch (this.baseURL + "/users/me", {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: job,
        }),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  editAvatar(link) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addNewCard({ title, imageUrl }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link: imageUrl,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  updateLikes(cardId, isLiked) {  
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(
      this.baseUrl + `/cards/likes/${cardId}`,
      {
        method: method,
        headers: this.headers,
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

}
