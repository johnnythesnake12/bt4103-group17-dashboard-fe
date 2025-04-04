<template>
    <div style="margin-top: 60px;">
      <h3>💰 Pricing Model</h3>
  
      <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
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
        <h4 style="margin-bottom: 10px;">Input Parameters – {{ selectedMarket }}</h4>
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
  export default {
    name: 'PricingModel',
    data() {
      return {
        selectedMarket: 'Malaysia',
        inputParams: {
          Malaysia: { Cs: 450, Ts: 1 / 3, Rr: 0.2, Pd: 0.156, Pvt: 0.1, Vt: 1500, gamma: 0.5 },
          Indonesia: { Cs: 320, Ts: 1 / 3, Rr: 0.18, Pd: 0.14, Pvt: 0.09, Vt: 1200000, gamma: 0.4 },
          Thailand: { Cs: 400, Ts: 1 / 3, Rr: 0.21, Pd: 0.15, Pvt: 0.11, Vt: 1300, gamma: 0.52 },
          Singapore: { Cs: 600, Ts: 1 / 3, Rr: 0.25, Pd: 0.13, Pvt: 0.1, Vt: 1800, gamma: 0.6 },
          Vietnam: { Cs: 300, Ts: 1 / 3, Rr: 0.19, Pd: 0.16, Pvt: 0.1, Vt: 1000000, gamma: 0.48 }
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
      }
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
  