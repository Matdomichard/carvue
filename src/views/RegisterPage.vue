<template>
  <h1>Créer un compte</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p><button @click="register">S'inscrire</button></p>
  <p> <button @click="signInWithGoogle">S'inscrire avec Google</button></p>
</template>

<script lang="ts">
import axios, { AxiosError }from 'axios';
import { useRouter } from 'vue-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      if (this.email.includes('@')) {
        try {
          const response = await axios.post('http://localhost:8080/users', {
            email: this.email,
            password: this.password,
          });
          console.log(response);
          this.$router.push('/');
        } catch (error) {
          console.log(error);
        }
      }
    },
    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(getAuth(), provider);
        console.log(result.user);
        this.$router.push('/feed');
      } catch (error: any) {
        console.log(error.code);
      }
    },
  },
};
</script>