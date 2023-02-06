<template>
  <h1>Créer un compte</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p><button @click="register">S'inscrire</button></p>
  <p> <button @click="signInWithGoogle">S'inscrire avec Google</button></p>
</template>

<script lang="ts">
import { ref } from 'vue';
import axios, { AxiosError }from 'axios';
import { useRouter } from 'vue-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import router from "../router";

interface RegisterData {
  email: string;
  password: string;
}

export default {
  name: 'register',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const register = async () => {
      if (email.value.includes('@')) {
        try {
          const response = await axios.post('http://localhost:8080/users', {
            email: email.value,
            password: password.value,
          });
          console.log(response);
          router.push('/');
        } catch (error) {
          console.error(error);
        }
      }
    };

    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(getAuth(), provider);
        console.log(result.user);
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
    };
  },
};
</script>