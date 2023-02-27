<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="absolute inset-0 bg-center  flex flex-col justify-center items-center" style="background-image: url('/background.svg')">
      <div class="container w-full rounded-3xl shadow-lg p-10 my-4 bg-white h-full px-4 sm:px-6">
        <!-- Navigation -->
      <header class="text-gray  px-4 py-4 mt-0">
        <div class="flex justify-between items-center">
          <a href="#" class="font-bold text-lg">Zzz tracker</a>
          <nav>
            <router-link to="/" class="text-gray-400 hover:text-white px-3">Accueil</router-link>
            <router-link to="/register" class="text-gray-400 hover:text-white px-3">Inscription</router-link>
            <router-link to="/sign-in" class="text-gray-400 hover:text-white px-3">Connexion</router-link>
            <themeSwitcher></themeSwitcher>
            <button class="btn btn-sm mx-3" @click="handleSignOut" v-if="userStore.$state.user.id">Déconnexion</button>
          </nav>
          
        </div>
      </header>
        <!-- Main content -->
        <div class="px-4 sm:px-6 lg:px-8">
            <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>




<script lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { Auth, getAuth, signOut } from "firebase/auth";
import firebase from "firebase/app";
import router from "./router";
import { useUserStore } from "./stores/userStore";
import './index.css'
import themeSwitcher from "@/components/themeSwitcher.vue";


export default {
  name: "App",
  components: {
    themeSwitcher,
  },
  setup() {
    const userStore = useUserStore();
    let auth: Auth;
    onMounted(() => {
      auth = getAuth();
      document.body.classList.add("no-scroll");
    });
    onBeforeUnmount(() => {
      document.body.classList.remove("no-scroll");
    });
    const handleSignOut = () => {
      console.log("User signed out");
      userStore.signOut();
      signOut(auth);
      router.push("/");
    };
    const theme = ref(userStore.$state.user.theme); 
    ;
    return {
      handleSignOut,
      userStore,
      theme
    };
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.no-scroll {
  overflow: hidden;
}
</style>
