<template>
    <div style="margin-top: 60px;">
      <h2>Pricing Model</h2>
  
      <div style="margin-top: 20px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <button
          @click="selectMarket('Equation')"
          :class="['market-tab', { active: selectedMarket === 'Equation' }]"
        >
          Equation
        </button>
        <button
          v-for="(v, market) in inputParams"
          :key="market"
          @click="selectMarket(market)"
          :class="['market-tab', { active: selectedMarket === market }]"
        >
          {{ market }}
        </button>
      </div>
  
      <div v-if="selectedMarket === 'Equation'" style="margin-top: 20px; text-align: center; font-size: 14px;">
        <div><strong>P = (V<sub>op</sub> + V<sub>tx</sub>) × γ</strong></div>
        <p><strong>P</strong>: Final price</p>
        <p><strong>V<sub>op</sub></strong>: Cs × Ts × Rr</p>
        <p><strong>V<sub>tx</sub></strong>: Pd × Pvt × Vt</p>
        <p><strong>γ</strong>: Value capture rate</p>
      </div>
  
      <div v-else-if="inputParams[selectedMarket]" style="margin-top: 30px;">
        <h4 style="margin-bottom: 10px;">Input Variables – {{ selectedMarket }}</h4>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th>Cs</th>
                <th>Ts</th>
                <th>Rr</th>
                <th>Pd</th>
                <th>Pvt</th>
                <th>Vt</th>
                <th>γ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="number" v-model.number="inputParams[selectedMarket].Cs" /></td>
                <td><input type="number" v-model.number="inputParams[selectedMarket].Ts" step="0.01" /></td>
                <td><input type="number" v-model.number="inputParams[selectedMarket].Rr" step="0.01" /></td>
                <td><input type="number" v-model.number="inputParams[selectedMarket].Pd" step="0.01" /></td>
                <td><input type="number" v-model.number="inputParams[selectedMarket].Pvt" step="0.01" /></td>
                <td><input type="number" v-model.number="inputParams[selectedMarket].Vt" /></td>
                <td><input type="number" v-model.number="inputParams[selectedMarket].gamma" step="0.01" /></td>
              </tr>
            </tbody>
          </table>
  
          <div style="margin-top: 20px; text-align: center;">
            <p><strong>V<sub>op</sub>:</strong> {{ calcVop(selectedMarket).toFixed(2) }}</p>
            <p><strong>V<sub>tx</sub>:</strong> {{ calcVtx(selectedMarket).toFixed(2) }}</p>
            <p><strong>Final Price:</strong> <span style="color: red;">{{ calcFinalPrice(selectedMarket).toFixed(2) }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: 'PricingModel',
    data() {
      return {
        selectedMarket: 'Malaysia',
        inputParams: {
        }
      };
    },
    methods: {
      selectMarket(market) {
        this.selectedMarket = market;
      },
      calcVop(country) {
        const { Cs, Ts, Rr } = this.inputParams[country];
        return Cs * Ts * Rr;
      },
      calcVtx(country) {
        const { Pd, Pvt, Vt } = this.inputParams[country];
        return Pd * Pvt * Vt;
      },
      calcFinalPrice(country) {
        const vop = this.calcVop(country);
        const vtx = this.calcVtx(country);
        const gamma = this.inputParams[country].gamma;
        return (vop + vtx) * gamma;
      },
      async fetchInputParams() {
        try {
          const response = await axios.get('https://bt4103-group17-dashboard-flask-be.onrender.com/countries');
          const apiData = response.data;  

          const formatted = {};
          apiData.forEach(row => {
            formatted[row.country] = {
              Cs: row.cost_per_hour_specialist,
              Ts: row.time_taken_per_consult,
              Rr: row.referral_reduction_rate,
              Pd: row.diabetes_mellitus_prevalence_rate,
              Pvt: row.vtdr_prevalence_rate_among_diabetics,
              Vt: row.average_treatment_value_per_vtdr,
              gamma: row.dai
            };
          });
          this.inputParams = formatted;
        } catch (error) {
          console.error("Failed to fetch country parameters:", error);
        }
      }
    },
    mounted() {
      this.fetchInputParams();
    }
  };
  </script>
  
  <style scoped>
  .market-tab {
    padding: 6px 14px;
    background: #eee;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
  }
  .market-tab:hover {
    background: #ddd;
  }
  .market-tab.active {
    background: #2196F3;
    color: white;
  }
  table input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  