
class UserInfo {
    constructor(
      { userName, userJob } 
    ) 
    {
      this.userNameElement = document.querySelector(userName);
      this.userJobElement = document.querySelector(userJob);
    }
    setUserInfo({ newName, newJob }) {
      this.userNameElement.textContent = newName;
      this.userJobElement.textContent = newJob;
    }
    getUserInfo() {
      const newObject = {
        username: this.userNameElement.textContent,
        userinfo: this.userJobElement.textContent,
      };
      return newObject;
    }
    }
  
  export { UserInfo };;