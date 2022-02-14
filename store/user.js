import {makeObservable, computed, action, observable} from 'mobx';

class User {
  user = null
  auth = null

  contructor() {
    makeObservable(this, {
      user: observable,
      auth: observable,
      setUser: action,
      auth: computed,
      user: computed
    })
  }

  get getAuth() {
    return this.auth
  }

  get getUser() {
    return this.user
  }

  setUser(user) {
    this.user = user
    this.auth = Boolean(user)
  }
}

export default new User();