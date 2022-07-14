
class UserInfo {
    constructor(
      { userName, userJob, userAvatar } 
    ) 
    {
      this.userNameElement = document.querySelector(userName);
      this.userJobElement = document.querySelector(userJob);
      this.userAvatarElement = document.querySelector(userAvatar);
    }
    setUserInfo({ newName, newJob, newAvatar }) {
      this.userNameElement.textContent = newName;
      this.userJobElement.textContent = newJob;
      this.userAvatarElement.src = newAvatar;
    }
    getUserInfo() {
      const newObject = {
        username: this.userNameElement.textContent,
        userinfo: this.userJobElement.textContent,
        userAvatar: this.userAvatarElement.src,
      };
      return newObject;
    }
    }
  
  export { UserInfo };;