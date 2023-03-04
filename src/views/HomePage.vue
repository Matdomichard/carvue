<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold leading-tight my-6 text-center">Enregistrer une nouvelle date</h1>
    <form class="flex flex-col items-start mb-6">
      <label for="name" class="text-lg font-bold mb-2">Nom de la date</label>
      <input type="text" placeholder="Entrez un nom" class="input w-full max-w-xs mb-4" id="name" v-model="form.name" />
      
      <label for="date" class="text-lg font-bold mb-2">Date</label>
      <input class="input w-full max-w-xs mb-4" type="date" id="date" v-model="form.selectedDate" />
      
      <button class="btn btn-primary py-2 px-6" @click.prevent="saveDate">Enregistrer</button>
    </form>
    <h1 class="text-3xl font-bold leading-tight my-6 text-center">Dates enregistrées</h1>
    <template v-if="userStore.$state.user.id">
      <ul class="w-full">
        <li v-for="(date, index) in savedDates" :key="date.id">
          <div class="stats bg-primary text-primary-content">
            <div class="stat">
              <div class="stat-title">{{ date.name }}</div>
              <DateCalculator :date="date.date" />
              <div class="stat-actions">
                <button class="btn btn-sm btn-success" @click="deleteSavedDate(date.id, index)">
                  <i>❌</i>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </template>
    <template v-if="!userStore.$state.user.id" class="flex flex-col justify-center items-center">
      <p class="my-6 text-center">Vous n'êtes pas connecté. Pour enregistrer vos dates, veuillez vous connecter ou créer un compte.</p>
      <router-link to="/sign-in">
        <p><button class="btn btn-primary py-2 px-6 my-2">Se connecter</button></p>
      </router-link>
      <router-link to="/register">
        <p><button class="btn btn-primary py-2 px-6 my-2">Créer un compte</button></p>
      </router-link>
    </template>
  </div>
</template>


<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { DateModel } from '@/models/date.model';
import DateCalculator from '@/components/dateCalculator.vue';


export default defineComponent({
  name: 'HomePage',
  components: {
    DateCalculator
  },
  setup() {
    const userStore = useUserStore();
    const form = ref({
      name: '',
      selectedDate: '',
    });
    const savedDates = ref<DateModel[]>([]);

    const saveDate = () => {
  if (userStore.$state.user.id) {
    const headers = {
      Authorization: `Bearer ${userStore.$state.user.token}`,
    };
        const selectedDate = new Date(form.value.selectedDate);
        axios.post(`dates/${userStore.$state.user.id}`, {
          name: form.value.name,
          date: selectedDate,
        }, { headers })
          .then((response) => {
            const newDate = new DateModel(response.data.id, response.data.name, response.data.date);
            savedDates.value.push(newDate);
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
  if (userStore.$state.user) {
    const headers = {
      Authorization: `Bearer ${userStore.$state.user.token}`,
    };
    axios.get(`dates/user/${userStore.$state.user.id}`, { headers })
      .then((response) => {
        console.log('savedDates dans le fetchsavedates:', response.data);
        savedDates.value = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.error("L'utilisateur n'est pas connecté.");
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
});
</script>
