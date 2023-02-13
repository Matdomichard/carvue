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
import { useUserStore } from '@/stores/userStore';
import { User } from '@/models/user.model';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errMsg = ref();
    const router = useRouter();
    const userStore = useUserStore();

    const login = () => {
      if (email.value.includes('@')) {
        axios.post('users/login', {
        email: email.value,
        password: password.value,
        })
        .then((response) => {
          const { id, email, timeUnit, token } = response.data;
          userStore.$state.user = new User(id, email, timeUnit, token);
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

    const response = await axios.post('users/login', {
      email: result.user.email,
      name: result.user.displayName
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
      errMsg,
      login,
      signInWithGoogle
    }
  }
}
</script>
