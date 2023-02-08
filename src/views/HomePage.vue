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

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const form = ref({
      name: "",
      selectedDate: "",
    });
    const savedDates = ref([]);

    function saveDate() {
      axios.post('dates/1', {
        userId: 1,
        name: form.value.name,
        date: form.value.selectedDate
      })
        .then(() => {
          savedDates.value.push({
            name: form.value.name,
            date: form.value.selectedDate
          });
          form.value.name = "";
          form.value.selectedDate = "";
        })
        .catch(error => {
          console.error(error);
        });
    }

    onMounted(() => {
      axios.get('dates/1')
        .then(response => {
          savedDates.value = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    });

    return {
      form,
      savedDates,
      saveDate
    };
  }
};
</script>
