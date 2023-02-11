<template>
  <div>
    <h1>Enregistrer une nouvelle date</h1>
    <form>
      <label for="name">Nom de la date</label>
      <input type="text" id="name" v-model="form.name" />
      <br />
      <label for="date">Date</label>
      <input type="date" id="date" v-model="form.selectedDate" />
      <br />
      <button @click.prevent="saveDate">Enregistrer</button>
    </form>
    <h1>Dates enregistrées</h1>
    <ul>
      <li v-for="date in savedDates" :key="date.name">
        {{ date.name }} - {{ date.date }}
      </li>
    </ul>
  </div>
</template>
<script lang='ts'>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    const form = ref({
      name: '',
      selectedDate: '',
    });
    const savedDates = ref([]);

    const saveDate = () => {
      const headers = {
        Authorization: `Bearer ${userStore.$state.user.token}`,
      };
      axios.post(`dates/${userStore.$state.user.id}`, {
        name: form.value.name,
        date: form.value.selectedDate,
      }, { headers })
        .then(() => {
          savedDates.value.push({
            name: form.value.name,
            date: form.value.selectedDate,
          });
          form.value.name = '';
          form.value.selectedDate = '';
        })
        .catch((error) => {
          console.error(error);
        });
    };

    onMounted(() => {
      if (userStore.$state.user.id) {
        const headers = {
          Authorization: `Bearer ${userStore.$state.user.token}`,
        };
        axios.get(`dates/${userStore.$state.user.id}`, { headers })
          .then((response) => {
            savedDates.value = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("L'ID de l'utilisateur est manquant.");
      }
    });

    return {
      form,
      savedDates,
      saveDate,
    };
  },
};
</script>