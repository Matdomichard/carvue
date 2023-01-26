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
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";
const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE
const router = useRouter();

const register = () => {
signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Utilisateur connecté", user)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code);
    });
}

const signInWithGoogle = () => {

}
</script>