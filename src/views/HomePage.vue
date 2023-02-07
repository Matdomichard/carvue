<template>
  <div>
    <h1>Enregistrer une nouvelle date</h1>
    <form>
      <label for="name">Nom de la date</label>
      <input type="text" id="name" v-model="name" />
      <br />
      <label for="date">Date</label>
      <input type="date" id="date" v-model="selectedDate" />
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
export default {
  data() {
    return {
      name: "",
      selectedDate: "",
      savedDates: []
    };
  },
  methods: {
    saveDate() {
      this.savedDates.push({ name: this.name, date: this.selectedDate });
      this.name = "";
      this.selectedDate = "";
    }
  }
};
</script>
