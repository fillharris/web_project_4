
class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._profileNameElement = document.querySelector(nameSelector);
        this._profileJobElement = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            name: this._profileNameElement.textContent,
            job: this._profileJobElement.textContent
          };
    }

    setUserInfo(inputValues) {
        this._profileNameElement.textContent = inputValues.name;
        this._profileJobElement.textContent = inputValues.description;
    }
}

export default UserInfo;