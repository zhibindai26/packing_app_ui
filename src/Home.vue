<template>
  <div id="app">
    <div class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <form id="input-form" @submit.prevent="getPackingData">
            <div class="field">
              <label class="label">API Key</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="This is the key for this API"
                  v-model="apiKey"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Destination</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="This format for domestic is: City,State Abbreviation. Just city name for international"
                  v-model="destination"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Trip Duration (days)</label>
                <div class="select">
                  <select v-model="duration">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Interational?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="international" />
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="international" />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Traveler</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="ZD" v-model="traveler" />
                    ZD
                  </label>
                  <label class="radio">
                    <input type="radio" value="KS" v-model="traveler" />
                    KS
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Laundry?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="laundry" />
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="laundry" />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Swimming?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="swim" />
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="swim" />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Nice Clothes?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="niceClothes" />
                    Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="niceClothes" />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-info">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      apiUrl:
        "https://2su88231ma.execute-api.us-east-2.amazonaws.com/prod/pack",
      apiKey: "",
      traveler: "",
      destination: "",
      international: "",
      duration: "",
      laundry: "",
      swim: "",
      niceClothes: ""
    };
  },
  methods: {
    getPackingData: function() {
      const url = `${this.apiUrl}?destination=${this.destination}&laundry=${this.laundry}&duration=${this.duration}&international=${this.international}&nice_clothes=${this.niceClothes}&swimming=${this.swim}&traveler=${this.traveler}`;

      fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": this.apiKey
        }
      })
        .then(response => response.json())
        .then(data => {
          this.jsonToCSV(data.body);
        });
    },

    jsonToCSV: function(apiJson) {

      const dataObject = apiJson.map(row => ({
        item: row.item,
        category: row.category,
        count: row.count, 
        checkbox: row.checkbox
      }));

      const objToCSV = function(data) {
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(","));

        for (const row of data) {
          const values = headers.map(header => {
            const escaped = ("" + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
          });
          csvRows.push(values.join(","));
        }
        const output = csvRows.join("\n");
        return output;
      };

      const csvData = objToCSV(dataObject);
      console.log(csvData);
    }
  }
};
</script>

<style>
</style>

