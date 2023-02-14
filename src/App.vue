<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">
    <div class="absolute inset-0 bg-cover bg-center  flex flex-col justify-center items-center" style="background-image: url('/background.svg')">
      <div class="rounded-3xl shadow-lg p-10 mx-auto my-6 h-full bg-white max-w-screen-xl">
      <!-- Navigation -->
      <header class="text-gray py-4 mt-0">
        <div class="container mx-auto flex justify-between items-center">
          <a href="#" class="font-bold text-lg">Zzz tracker</a>
          <nav>
            <router-link to="/" class="text-gray-400 hover:text-white px-3">Home</router-link>
            <router-link to="/register" class="text-gray-400 hover:text-white px-3">Register</router-link>
            <router-link to="/sign-in" class="text-gray-400 hover:text-white px-3">Login</router-link>
            <button class="btn btn-sm" @click="handleSignOut" v-if="userStore.$state.user.id">Sign out</button>
          </nav>
        </div>
      </header>
      <!-- Main content -->
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <h2 class="text-2xl font-bold leading-tight">Titre de la section principale</h2>
        <p class="my-6">Texte descriptif ou contenu principal ici.</p>
        <p class="my-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel risus eu magna rhoncus scelerisque a a mauris. Fusce dapibus facilisis ipsum, nec ultricies elit egestas ac. Duis eget mauris vel ex auctor fringilla in ac nisi. Fusce suscipit mollis quam non lobortis. Phasellus id libero a ex sagittis blandit. Nam eleifend libero sed bibendum aliquet. Proin finibus erat ac est venenatis, at aliquet urna vehicula. Nulla facilisi. Sed facilisis arcu sed rhoncus ullamcorper. Proin vel ex sit amet odio malesuada faucibus.</p>
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
import ThemeSwitcher from "@/components/themeSwitcher.vue";

export default {
  name: "App",
  components: {
    ThemeSwitcher,
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
  margin-top: 60px;
}
.no-scroll {
  overflow: hidden;
}
</style>
