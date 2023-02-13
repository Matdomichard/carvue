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
    <template v-if="userStore.$state.user.id">
      <ul>
        <li v-for="(date, index) in savedDates" :key="date.name" class="flex">
          <div>{{ date.name }}
            <DateCalculator :date="date.date" />
          </div>
          <div>
            <i @click="deleteSavedDate(date.id, index)">❌</i>
          </div>
        </li>
      </ul>
    </template>
    <template v-if="!userStore.$state.user.id">
      <p>Vous n'êtes pas connecté. Pour enregistrer vos dates, veuillez vous connecter ou créer un compte.</p>
      <router-link to="/sign-in">
        <p> <button>Se connecter</button></p>
      </router-link>
      <router-link to="/register">
      <p> <button>Créer un compte</button></p>
      </router-link>
    </template>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';
import DateCalculator from '@/components/dateCalculator.vue';
import { useUserStore } from '@/stores/userStore';

export default {
  components: {
    DateCalculator,
  },
  setup() {
    const userStore = useUserStore();
    const form = ref({
      name: '',
      selectedDate: '',
    });
    const savedDates = ref<{ name: string, date: string, id: number }[]>([]);

    const saveDate = () => {
      if (userStore.$state.user.id) {
        const headers = {
          Authorization: `Bearer ${userStore.$state.user.token}`,
        };
        axios.post(`dates/${userStore.$state.user.id}`, {
          name: form.value.name,
          date: form.value.selectedDate,
        }, { headers })
          .then((response) => {
            savedDates.value.push({
              name: form.value.name,
              date: form.value.selectedDate,
              id: response.data.id,
            });
            form.value.name = '';
            form.value.selectedDate = '';
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("L'ID de l'utilisateur est manquant.");
      }
    };

    const deleteSavedDate = (dateId: number, index: number) => {
      if (userStore.$state.user.id) {
        const headers = {
          Authorization: `Bearer ${userStore.$state.user.token}`,
        };
        axios.delete(`dates/${userStore.$state.user.id}/${dateId}`, { headers })
          .then(() => {
            savedDates.value.splice(index, 1);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("L'ID de l'utilisateur est manquant.");
      }
    };

    const fetchSavedDates = () => {
      console.log('userId',userStore.$state.user.id);
      if (userStore.$state.user.id) {
        const headers = {
          Authorization: `Bearer ${userStore.$state.user.token}`,
        };
        axios.get(`dates/user/${userStore.$state.user.id}`, { headers })
          .then((response) => {
            savedDates.value = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("L'ID de l'utilisateur est manquant.");
      }
    };

    onMounted(() => {
      fetchSavedDates();
    });

    return {
      form,
      userStore,
      savedDates,
      saveDate,
      deleteSavedDate,
    };
  },
};
</script>