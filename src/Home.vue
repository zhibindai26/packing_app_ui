<template>
  <div id="app">
    <h1 class="title" style="color: purple">Packing App: Trip Details</h1>
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
                  placeholder="Domestic format: City,State Abbreviation. International: City,2-Letter Abbreviation"
                  v-model="destination"
                />
                <br>
                <a href="https://www.50states.com/abbreviations.htm" target="_blank">US State Abbreviations </a> <br>
                <a href="https://www.iban.com/country-codes" target="_blank">Int'l Country Abbreviations</a>
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
                <label class="label">Traveler</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="ZD" v-model="traveler" /> ZD
                  </label>
                  <label class="radio">
                    <input type="radio" value="KS" v-model="traveler" /> KS
                  </label>
                </div>
              </div>
            </div>
            
            <div class="field">
              <div class="control">
                <label class="label">International?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="international" /> Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="international" /> No
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Laundry?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="laundry" /> Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="laundry" /> No
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Swimming?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="swim" /> Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="swim" /> No
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Nice Clothes?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="niceClothes" /> Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="niceClothes" /> No
                  </label>
                </div>
              </div>
            </div>
            
            <div class="field">
              <div class="control">
                <label class="label">Download Packing List?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="Yes" v-model="downloadList" /> Yes
                  </label>
                  <label class="radio">
                    <input type="radio" value="No" v-model="downloadList" /> No
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
      apiUrl: "https://2su88231ma.execute-api.us-east-2.amazonaws.com/prod/pack",
      apiKey: "",
      traveler: "",
      destination: "",
      international: "",
      duration: "",
      laundry: "",
      swim: "",
      niceClothes: "",
      downloadList: "",
      countryCode: "",
      stateCode: "",
      city: "",
      avgTemp: "",
      avgHigh: "",
      avgLow: ""
    };
  },
  methods: {
    getPackingData: function() {
      const url = `${this.apiUrl}?destination=${this.destination}&laundry=${this.laundry}&duration=${this.duration}
      &international=${this.international}&nice_clothes=${this.niceClothes}&swimming=${this.swim}&traveler=${this.traveler}`;

      fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": this.apiKey
        }
      })
        .then(response => response.json())
        .then(data => {
          this.countryCode = data.country_code;
          this.stateCode = data.state_code;
          this.city = data.city;
          this.avgTemp = data.avg_temp;
          this.avgHigh = data.avg_high;
          this.avgLow = data.avg_low;
          this.jsonToCSV(data.body);
          this.$router.push({
            name: "packingList",
            params: {
              data: data.body,
              traveler: this.traveler,
              destination:
                this.city + " " + this.stateCode + " " + this.countryCode,
              duration: this.duration,
              avgTemp: this.avgTemp,
              avgHigh: this.avgHigh,
              avgLow: this.avgLow
            }
          });
        });
    },

    jsonToCSV: function(apiJson) {
      let today = new Date().toISOString().slice(0, 10);
      let csvName = `${this.traveler}_${this.destination}_${today}_packing_list.csv`;
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

      const download = function(data, filename) {
        const blob = new Blob([data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      const csvData = objToCSV(dataObject);

      if (this.downloadList === "Yes") {
        download(csvData, csvName);
      }
      
    }
  }
};
</script>

<style>
</style>

