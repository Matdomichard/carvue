<template>
  <h2 class="text-3xl font-bold leading-tight my-6">Se connecter à son compte</h2>
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
  <p v-if="errMsg" class="text-red-500 my-4">{{ errMsg }}</p>
  <p class="my-4"><button class="btn btn-primary py-2 px-6" @click="login">Se connecter</button></p>
  <p class="my-4"><button class="btn btn-primary py-2 px-6" @click="signInWithGoogle">Se connecter avec Google</button></p>
</template>


<script lang="ts">
import { ref } from 'vue';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { axiosInstance } from '@/plugins/axios';
import { useUserStore } from '@/stores/userStore';
import { User } from '@/models/user.model';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errMsg = ref();
    const router = useRouter();
    const userStore = useUserStore();

    const timeUnit = 'dodos';
    
    const login = () => {
      if (!email.value.includes('@')) {
        errMsg.value = "Email invalide";
      } else {
        axiosInstance.post('api/v1/auth/authenticate', {
          email: email.value,
          password: password.value,
          signInMethod: 'email',
          timeUnit: timeUnit
        })
        .then((response) => {
          const { userId, token, error } = response.data;
          userStore.$state.user = new User(userId, email.value, timeUnit, null, token);
          console.log('response data', response.data)
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
          errMsg.value = "Email ou mot de passe incorrect";
        });
      }
    };

    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(getAuth(), provider);
        const response = await axiosInstance.post('api/v1/auth/authenticate', {
          email: result.user.email,
          password: result.user.uid.substring(0, 9),
          signInMethod: 'google',
          timeUnit: timeUnit
        });
        const { userId, token, error } = response.data;

        userStore.$state.user = new User(userId, email.value, timeUnit, null, token);
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
