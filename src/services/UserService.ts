import axios from 'axios';

import { User } from '@/models/user.model';
import { Router } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { axiosInstance } from '@/plugins/axios';


export default {
  async createUser(email: string | null, password: string, signInMethod: string, timeUnit: string, router: Router) {
	 
    const userStore = useUserStore();
    let status;
    
    await axiosInstance.post('/api/users', {
      email: email,
      password: password,
      signInMethod: signInMethod
    }).then((response) => status = response.status).catch((error) => {
      console.error(error.response);
      return "Une erreur s'est produite lors de la création du compte";
    });

    if (status == 201) {
      axiosInstance.post('api/v1/auth/authenticate', {
        email: email,
        password: password,
        signInMethod: signInMethod,
        timeUnit: timeUnit
      }).then((response) => {
        const { userId, token, error } = response.data;
        if(error) {
		  console.error("Erreur lors de la tentative d'authentification: ", error);
		} else {
		  console.log("id", userId)
          userStore.$state.user = new User(userId, email, timeUnit, null, token);
          console.log("store", userStore.$state.user)
          router.push('/');
		}
      }).catch((error) => {
        console.error(error.response);
        return "Une erreur s'est produite lors de l'enregistrement a Spring Security";
      });
    }
  }
}