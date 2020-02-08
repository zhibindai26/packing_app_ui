<template>
  <div id="app">
    <h1 class="title" style="color: purple">Packing List for {{ traveler}} to {{ destination }}</h1>
    <div class="section">
      <p class="subtitle">Duration: {{ duration }} Days
      <br>Average Temp: {{ avgTemp }}ºF
      <br>Average High: {{ avgHigh }}ºF
      <br>Average Low: {{ avgLow }}ºF</p>
    </div>
    <div class="section">
      <div class="column is-half is-offset-one-quarter">
        <vue-good-table
          :columns="columns"
          v-if="data && data.length"
          :rows="data"
          :select-options="{ enabled: true }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  components: {
    VueGoodTable
  },
  name: "PackingList",
  props: {
    data: Array,
    traveler: String,
    destination: String,
    duration: String,
    avgTemp: Number,
    avgHigh: Number,
    avgLow: Number
  },
  data() {
    return {
      columns: [
        {
          label: "ITEM",
          field: "item",
          width: "40%"
        },
        {
          label: "CATEGORY",
          field: "category",
          width: "40%"
        },
        {
          label: "COUNT",
          field: "count",
          type: "number",
          width: "10%"
        }
      ]
    };
  }
};
</script>

<style>
</style>