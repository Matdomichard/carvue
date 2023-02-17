<template>
  <h2 class="text-3xl font-bold leading-tight my-6">Créer un compte</h2>
  <div class="flex flex-col justify-center items-center">
    <div class="flex flex-col items-start">
      <label class="input-group flex mb-4">
        <span class="mr-2 font-bold">Email</span>
        <input v-model="email" id="email" type="email" placeholder="votre-email@example.com" class="input input-bordered" />
      </label>
      <label class="input-group flex mb-6">
        <span class="mr-2 font-bold">Mot de passe</span>
        <input v-model="password" id="password" type="password" placeholder="votre mot de passe" class="input input-bordered" />
      </label>
    </div>
  </div>
  <p v-if="errorMessage" class="text-red-500 my-4">{{ errorMessage }}</p>
  <p class="my-4"><button class="btn btn-primary py-2 px-6" @click="register">S'inscrire</button></p>
  <p class="my-4"><button class="btn btn-primary py-2 px-6" @click="signInWithGoogle">S'inscrire avec Google</button></p>
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
          const { id, email, timeUnit,theme, token } = response.data;
          userStore.$state.user = new User(id, email, timeUnit, theme, token);
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
        const { id, email, timeUnit, theme, token } = response.data;
          userStore.$state.user = new User(id, email, timeUnit, theme, token);
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