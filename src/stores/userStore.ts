import {User} from "@/models/user.model";
import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: new User(null, null, null, null),
  }),
  actions: {
    setUser(user: User) {
      this.$state.user = user;
    },
    signOut() {
      this.$state.user = new User(null, null, null, null);
    }
  }
});


  
