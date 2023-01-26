<template>
  <h1>Créer un compte</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p><button @click="register">Se connecter</button></p>
  <p><button @click="signInWithGoogle">Se connecter avec google</button></p>
</template>

<script lang="ts">
import {ref} from "vue";
import {getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {useRouter} from "vue-router";
const email = ref('')
const password = ref('')
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Utilisateur enregistré", user)
      router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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

</script>