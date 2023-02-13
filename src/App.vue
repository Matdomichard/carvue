<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/sign-in">Login</router-link>
    <button @click="handleSignOut" v-if="userStore.$state.user.id">Sign out</button>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { Auth, getAuth, signOut } from "firebase/auth";
import firebase from "firebase/app";
import router from "./router";
import { useUserStore } from "./stores/userStore";
import './index.css'

export default {
  name: "App",
  setup() {
    const userStore = useUserStore();
    let auth: Auth;

    onMounted(() => {
      auth = getAuth();
    });

    const handleSignOut = () => {
    console.log("User signed out");
    userStore.signOut();
    router.push("/");
  };

    return {
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
