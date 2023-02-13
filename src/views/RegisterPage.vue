<template>
  <h1>Créer un compte</h1>
  <p v-if="errorMessage">{{ errorMessage }}</p>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p><button @click="register">S'inscrire</button></p>
  <p> <button @click="signInWithGoogle">S'inscrire avec Google</button></p>
</template>
<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useUserStore } from '@/stores/userStore';
import { User } from '@/models/user.model';


export default {
  name: 'register',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();
    const userStore = useUserStore();

    const register = () => {
      if (!email.value.includes('@')) {
        errorMessage.value = 'Adresse email invalide';
        return;
      }
      if (!password.value) {
        errorMessage.value = 'Mot de passe manquant';
        return;
      }
      axios.post('users/createUser', {
        email: email.value,
        password: password.value,
        signInMethod: 'email'
      })
        .then((response) => {
          const { id, email, timeUnit, token } = response.data;
          userStore.$state.user = new User(id, email, timeUnit, token);
          router.push('/');
        })
        .catch((error) => {
          console.log(error.response);
          errorMessage.value = "Une erreur s'est produite lors de la création du compte";
        });
    };

    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(getAuth(), provider);
        console.log(result.user);

        const response = await axios.post('users/createUser', {
          email: result.user.email,
          password: result.user.uid,
          signInMethod: "google"
        });
        const { id, email, timeUnit, token } = response.data;
          userStore.$state.user = new User(id, email, timeUnit, token);
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

  return {
    email,
    password,
    register,
    signInWithGoogle,
    errorMessage,
  };
  },
};
</script>