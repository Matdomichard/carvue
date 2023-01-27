<template>
  <h1>Se connecter à son compte</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="register">Se connecter</button></p>
  <p><button @click="signInWithGoogle">Se connecter avec google</button></p>
</template>

<script lang="ts">
import {ref} from "vue";
import {getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {useRouter} from "vue-router";
const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE
const router = useRouter();
import axios from "axios";

const register = () => {
  if(email.value.includes("@")) {
    axios.post('http://localhost:8080/user', {
      email: email.value,
      password: password.value
    })
    .then(function (response: any) {
      console.log(response);
      router.push('/')
    })
    .catch(function (error: any) {
      console.log(error);
    });
  }
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
  .then((result) => {
    console.log(result.user);
    router.push("/feed")
  }).catch((error) => {
    console.log(error.code);
  });
}

export default {
  email,
  password,
  register,
  signInWithGoogle
}

</script>