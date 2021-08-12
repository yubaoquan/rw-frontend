import { makeAutoObservable } from 'mobx';
import { User } from 'types';

export default class ArticleStore {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: User) => {
    console.info('setUser', user);
    this.user = user;
  };
}
