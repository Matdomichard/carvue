<template>
  <h1>Se connecter à son compte</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="login">Se connecter</button></p>
  <p><button @click="signInWithGoogle">Se connecter avec google</button></p>
</template>

<script lang="ts">
import { ref } from 'vue';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errMsg = ref();
    const router = useRouter();

    const login = () => {
      if (email.value.includes('@')) {
        axios.post('users/login', {
        email: email.value,
        password: password.value,
        })
        .then((response) => {
          console.log(response);
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
      }
    };

    const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(getAuth(), provider);
    console.log(result.user);

    const response = await axios.post('users/login', {
      email: result.user.email,
      name: result.user.displayName
    });
    console.log(response);

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

    return {
      email,
      password,
      errMsg,
      login,
      signInWithGoogle
    }
  }
}
</script>
