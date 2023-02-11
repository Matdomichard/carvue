<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/sign-in">Login</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
  <router-view />
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase from "firebase/app";
import router from "./router";
import { useUserStore} from './stores/userStore';

export default {
  name: "App",
  setup() {
    const userStore = useUserStore();
    const isLoggedIn = ref<boolean>(false);
    let auth: Auth;

onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
  if (user) {
    userStore.setIsLoggedIn(true);
    isLoggedIn.value = true;
  } else {
    userStore.setIsLoggedIn(false);
    isLoggedIn.value = false;
  }
});
});

    const handleSignOut = () => {
      signOut(auth).then(() => {
        console.log("User signed out");
        router.push("/");
      });
    };

    return {
      isLoggedIn,
      handleSignOut,
      userStore
    };
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>