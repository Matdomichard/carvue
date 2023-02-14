<template>
  <input type="checkbox" class="toggle toggle-primary" v-model="isNight" @change="toggleTheme"/>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import * as daisyui from 'daisyui';
import { useUserStore } from '@/stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    const isNight = ref(false);
    const theme = ref(userStore.$state.user.theme ?? 'light'); // Initialise le thème actuel de l'utilisateur s'il en a déjà choisi un

    const { setTheme } = daisyui.useDaisy();

    onMounted(() => {
      setTheme(theme.value);
      isNight.value = theme.value === 'night';
    });

    const toggleTheme = () => {
      const newTheme = isNight.value ? 'light' : 'night';
      theme.value = newTheme;
      setTheme(newTheme);
      userStore.setTheme(newTheme); 
    }

    return {
      isNight,
      toggleTheme,
    };
  },
};
</script>
