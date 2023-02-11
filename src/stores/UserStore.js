import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
state: () => ({        
    id: "",
    email: "",
    timeUnit: "",
    token: ""
}),
actions: {
    setUser(user) {
this.id = user.id;
this.email = user.email;
this.timeUnit = user.timeUnit;
this.token = user.token;
    }
}
});

