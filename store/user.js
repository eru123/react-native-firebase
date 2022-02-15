import { makeObservable, action, observable } from 'mobx';

class User {
  userProvider = Object.create(null);
  userProfile = Object.create(null);
  createMode = false;
  auth = false

  constructor() {
    makeObservable(this, {
      userProvider: observable,
      userProfile: observable,
      createMode: observable,
      auth: observable,
      setUserProvider: action,
      setUserProfile: action,
      setCreateMode: action
    })
  }

  setUserProvider(userProvider) {
    this.userProvider = userProvider;
    this.auth = Boolean(userProvider);
    if (!this.auth) this.userProfile = Object.create(null);
  }

  setUserProfile(userProfile) {
    this.userProfile = userProfile;
  }

  setCreateMode(createMode) {
    this.createMode = createMode;
  }
}

export const userStore = new User();