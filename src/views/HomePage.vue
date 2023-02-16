<template>
  <div>
    
    <h1 class="text-2xl font-bold leading-tight">Enregistrer une nouvelle date</h1>
    <form>
      <label for="name">Nom de la date</label>
      <input type="text" placeholder="Type here" class="input w-full max-w-xs" id="name" v-model="form.name" />
      <br />
      <label for="date">Date</label>
      <input class="input w-full max-w-xs" type="date" id="date" v-model="form.selectedDate" />
      <br />
      <button class="btn btn-primary" @click.prevent="saveDate">Enregistrer</button>
    </form>
    <h1>Dates enregistrées</h1>
    <template v-if="userStore.$state.user.id">
      <ul>
        <li v-for="(date, index) in savedDates" :key="date.id">
          <div class="stats bg-primary text-primary-content">
            <div class="stat">
              <div class="stat-title">{{ date.name }}</div>
              <DateCalculator :date="new Date(date.date)" />
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
    <template v-if="!userStore.$state.user.id">
      <p>Vous n'êtes pas connecté. Pour enregistrer vos dates, veuillez vous connecter ou créer un compte.</p>
      <router-link to="/sign-in">
        <p><button class="btn btn-primary">Se connecter</button></p>
      </router-link>
      <router-link to="/register">
        <p><button class="btn btn-primary">Créer un compte</button></p>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import axios from 'axios';
import DateCalculator from '@/components/dateCalculator.vue';
import { useUserStore } from '@/stores/userStore';
import { DateModel } from '@/models/date.model';
import { Props } from '@/components/dateCalculator.vue';

export default defineComponent({
  name: 'HomePage',
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  setup(props: Props) {
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
            const newDate = new DateModel(response.data.id, form.value.name, selectedDate);
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
