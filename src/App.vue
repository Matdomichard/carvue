<template>
  <div  :data-theme="theme" class="flex flex-col justify-center items-center h-screen ">
    <div class="absolute inset-0 bg-center  flex flex-col justify-center items-center overflow-auto">
      <div class="container w-full h-full p-10 my-4 px-4 sm:px-6" >
        <!-- Navigation -->
      <header class="text-gray  px-4 py-4 mt-0" style="background-image: url('/background.svg')">
        <div class="flex justify-between items-center">
          <a href="#" class="font-bold text-lg">Zzz tracker</a>
          <nav>
            <router-link to="/" class=" hover:text-white px-3">Accueil</router-link>
            <router-link to="/register" class=" hover:text-white px-3">Inscription</router-link>
            <router-link to="/sign-in" class=" hover:text-white px-3">Connexion</router-link>
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
import { onMounted, onBeforeUnmount, watchEffect, ref } from "vue";
import { Auth, getAuth, signOut } from "firebase/auth";
import firebase from "firebase/app";
import router from "./router";
import { useUserStore } from "./stores/userStore";
import './index.css'
import themeSwitcher from "@/components/themeSwitcher.vue";
import DateCalculator from '@/components/dateCalculator.vue'


export default {
  name: "App",
  components: {
    themeSwitcher,
    DateCalculator
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
      userStore.signOut();
      signOut(auth);
      userStore.setTheme('light')
      router.push("/");
    };
    const theme = ref(userStore.$state.user.theme ?? 'light');

    watchEffect(() => {
  if (typeof userStore.$state.user.theme === 'string') {
    theme.value = userStore.$state.user.theme;
  }
});
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
}
.no-scroll {
  overflow: hidden;
}
</style>
