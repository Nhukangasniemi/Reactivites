import { observable, action, computed, configure, runInAction } from "mobx";
import { IUser, IUserFormValues } from "./../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "./../../index";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      history.push("/activities");
    } catch (err) {
      throw err;
    }
  };

  @action getUser = async () => {
      try {
          const user = await agent.User.current()
          runInAction(() => {
              this.user = user
          })
      } catch (err) {
          console.log(err)
      }
  }
  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/")
  };
}
