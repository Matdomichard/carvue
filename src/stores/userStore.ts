import {User} from "@/models/user.model";
import { defineStore } from 'pinia';


export const useUserStore = defineStore('UserStore', {
    state: () => ({
      user: new User(null, null, null, null),
      isLoggedIn: false
    }),
    actions: {
      setUser(user: User) {
        this.$state.user = user;
      },
      setIsLoggedIn(value: boolean) {
        this.$state.isLoggedIn = value;
      }
    }
  });
  
