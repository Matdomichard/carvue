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
import { useRouter } from 'vue-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import UserService from '@/services/UserService';

export default {
  name: 'register',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const register = () => {
      if (!email.value.includes('@')) {
        errorMessage.value = 'Adresse email invalide';
        return;
      }
      if (!password.value) {
        errorMessage.value = 'Mot de passe manquant';
        return;
      }
        
      UserService.createUser(email.value, password.value, 'email', 'dodos', router);
    };

    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(), provider);
  
      UserService.createUser(result.user.email, result.user.uid.substring(0, 9), 'google', 'dodos', router);
    };

    return {
      email,
      password,
      register,
      signInWithGoogle,
      errorMessage,
    };
  }
};
</script>