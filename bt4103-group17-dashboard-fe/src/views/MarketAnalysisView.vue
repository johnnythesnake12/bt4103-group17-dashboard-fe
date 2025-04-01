<template>
    <div class="market-analysis-view">
      <h2>📈 Market Analysis: Diabetic Population, GDP per Capita (PPP), Digital Adoption Index</h2>
      <canvas id="marketBubbleChart"></canvas>
  
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
            v-for="(v, market) in pricingData"
            :key="market"
            @click="selectMarket(market)"
            :class="['market-tab', { active: selectedMarket === market }]"
          >
            {{ market }}
          </button>
        </div>
  
        <div v-if="selectedMarket === 'Equation'" style="margin-top: 20px; text-align: center; line-height: 1.8em; font-size: 14px;">
          <div><strong>P = (V<sub>op</sub> + V<sub>tx</sub>) × γ</strong></div>  
          <p><strong>P</strong> = Final price</p>
          <p><strong>V<sub>op</sub></strong> = Operational efficiency value</p>
          <p><strong>V<sub>tx</sub></strong> = Treatment-linked value</p>
          <p>V<sub>op</sub> = C<sub>s</sub> × T<sub>s</sub> × R<sub>r</sub><br />
              → <strong>C<sub>s</sub></strong>: Cost per hour of specialist time (e.g. RM450/hr)<br />
              → <strong>T<sub>s</sub></strong>: Time for ophthalmology consult (e.g. 20 mins = 1/3 hr)<br />
              → <strong>R<sub>r</sub></strong>: Referral reduction rate (e.g. 0.2 = 20%)</p>
          <p>V<sub>tx</sub> = P<sub>d</sub> × P<sub>vt</sub> × V<sub>t</sub><br />
              → <strong>P<sub>d</sub></strong>: Diabetes mellitus prevalence rate<br />
              → <strong>P<sub>vt</sub></strong>: VTDR prevalence rate among diabetics<br />
              → <strong>V<sub>t</sub></strong>: Average treatment cost per VTDR case (e.g. RM1500)</p>
          <p><strong>γ</strong> = Value capture rate (e.g. 0.5 = 50%)</p>
        </div>
  
        <div v-else style="margin-top: 30px; font-size: 14px; font-weight: 500; line-height: 1.7em;">
          <div><strong>{{ selectedMarket }} Price Breakdown</strong></div>
          <div>
            <div><strong>P = (V<sub>op</sub> + V<sub>tx</sub>) × γ</strong></div>  
            V<sub>op</sub> = C<sub>s</sub> × T<sub>s</sub> × R<sub>r</sub> =
            <strong>
              {{ marketFormula[selectedMarket].Cs }} ×
              {{ marketFormula[selectedMarket].Ts }} ×
              {{ marketFormula[selectedMarket].Rr }} =
              {{ marketFormula[selectedMarket].VopCurrency }}
            </strong>
          </div>
          <div>
            V<sub>tx</sub> = P<sub>d</sub> × P<sub>vt</sub> × V<sub>t</sub> =
            <strong>
              {{ marketFormula[selectedMarket].Pd }} ×
              {{ marketFormula[selectedMarket].Pvt }} ×
              {{ marketFormula[selectedMarket].Vt }} =
              {{ marketFormula[selectedMarket].VtxCurrency }}
            </strong>
          </div>
          <div>
            Final Price P = ({{ marketFormula[selectedMarket].VopCurrency }} +
            {{ marketFormula[selectedMarket].VtxCurrency }}) × {{ marketFormula[selectedMarket].gamma }} =
            <span style="color: #f44336; font-weight: bold;">{{ marketFormula[selectedMarket].finalPrice }}</span>
          </div>
        </div>
  
        <div style="margin-top: 30px; overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; border: 1px solid #ddd;">Country</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Vop (USD)</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Vtx (USD)</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Value Capture Rate (%)</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Final Price (USD)</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Guideline Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(entry, country) in pricingData" :key="country">
                <td style="padding: 10px; border: 1px solid #ddd;">{{ country }}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${{ (marketCurrencyMap[country].vop / exchangeRates[country]).toFixed(2) }}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${{ (marketCurrencyMap[country].vtx / exchangeRates[country]).toFixed(2) }}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">50</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${{ ((marketCurrencyMap[country].vop + marketCurrencyMap[country].vtx) * marketCurrencyMap[country].gamma / exchangeRates[country]).toFixed(2) }}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${{ entry.guideline.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import annotationPlugin from 'chartjs-plugin-annotation';
  
  Chart.register(...registerables, ChartDataLabels, annotationPlugin);
  
  export default {
    data() {
      return {
        selectedMarket: 'Malaysia',
        exchangeRates: {
          Malaysia: 4.44,
          Indonesia: 16560,
          Thailand: 33.91,
          Singapore: 1.34,
          Vietnam: 25575
        },
        marketCurrencyMap: {
          Malaysia: { vop: 30, vtx: 23.4, gamma: 0.5 },
          Indonesia: { vop: 19200, vtx: 15100, gamma: 0.4 },
          Thailand: { vop: 28, vtx: 21.45, gamma: 0.52 },
          Singapore: { vop: 50, vtx: 23.4, gamma: 0.6 },
          Vietnam: { vop: 19000, vtx: 16000, gamma: 0.48 }
        },
        pricingData: {
          Malaysia: { Vop: 30, Vtx: 23.4, gamma: 0.5, guideline: 8 },
          Indonesia: { Vop: 20, Vtx: 16, gamma: 0.4, guideline: 6 },
          Thailand: { Vop: 28, Vtx: 25, gamma: 0.52, guideline: 8 },
          Singapore: { Vop: 38, Vtx: 31, gamma: 0.6, guideline: 16 },
          Vietnam: { Vop: 26, Vtx: 20, gamma: 0.48, guideline: 6 },
        },
        marketFormula: {
          Malaysia: { Cs: 450, Ts: '1/3', Rr: 0.2, VopCurrency: 'RM30', Pd: 0.156, Pvt: 0.1, Vt: 1500, VtxCurrency: 'RM23.40', gamma: 0.5, finalPrice: 'RM26.70' },
          Indonesia: { Cs: 320, Ts: '1/3', Rr: 0.18, VopCurrency: 'IDR19.2K', Pd: 0.14, Pvt: 0.09, Vt: 1200000, VtxCurrency: 'IDR15.1K', gamma: 0.4, finalPrice: 'IDR13.7K' },
          Thailand: { Cs: 400, Ts: '1/3', Rr: 0.21, VopCurrency: 'THB28', Pd: 0.15, Pvt: 0.11, Vt: 1300, VtxCurrency: 'THB21.45', gamma: 0.52, finalPrice: 'THB25.75' },
          Singapore: { Cs: 600, Ts: '1/3', Rr: 0.25, VopCurrency: 'SGD50', Pd: 0.13, Pvt: 0.1, Vt: 1800, VtxCurrency: 'SGD23.4', gamma: 0.6, finalPrice: 'SGD44.04' },
          Vietnam: { Cs: 300, Ts: '1/3', Rr: 0.19, VopCurrency: 'VND19K', Pd: 0.16, Pvt: 0.1, Vt: 1000000, VtxCurrency: 'VND16K', gamma: 0.48, finalPrice: 'VND16.8K' },
        },
      };
    },
    methods: {
      selectMarket(market) {
        this.selectedMarket = market;
      },
    },
    mounted() {
      this.$nextTick(() => {
        const scaleRadius = (pop) => Math.sqrt(pop) / 60;
        const originalPop = (scale) => Math.round((scale * 60) ** 2);
        const ctx = document.getElementById("marketBubbleChart");
        if (!ctx) return;
  
        new Chart(ctx, {
          type: "bubble",
          data: {
            datasets: [
              { label: "Singapore", data: [{ x: 141553, y: 0.87, r: scaleRadius(310000) }], backgroundColor: "#4CAF50", datalabels: { anchor: "end", align: "bottom", offset: 16, color: "#333" } },
              { label: "Malaysia", data: [{ x: 43100, y: 0.72, r: scaleRadius(3730000) }], backgroundColor: "#2196F3" },
              { label: "Vietnam", data: [{ x: 13492, y: 0.57, r: scaleRadius(4330000) }], backgroundColor: "#FFC107" },
              { label: "Thailand", data: [{ x: 26416, y: 0.67, r: scaleRadius(6280000) }], backgroundColor: "#9C27B0" },
              { label: "Indonesia", data: [{ x: 14073, y: 0.49, r: scaleRadius(20030000) }], backgroundColor: "#F44336" }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Key Market Information by Country",
                font: { size: 18, weight: "bold" },
                padding: { top: 10, bottom: 20 },
              },
              legend: { position: "bottom", labels: { font: { size: 14 }, boxWidth: 20 } },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const { x, y, r } = context.raw;
                    const country = context.dataset.label;
                    const pop = originalPop(r);
                    return `${country}: GDP per capita $${x.toLocaleString()}, DAI ${y}, Diabetic Population: ${pop.toLocaleString()}`;
                  },
                },
              },
              datalabels: {
                color: "#ffffff",
                font: { weight: "bold" },
                formatter: function (value) {
                  const pop = originalPop(value.r);
                  return pop >= 1_000_000 ? `${(pop / 1_000_000).toFixed(1)}M` : `${(pop / 1000).toFixed(0)}K`;
                },
              },
              annotation: {
                annotations: {
                  incomeThreshold: {
                    type: "line",
                    scaleID: "x",
                    value: 47727,
                    borderColor: "gray",
                    borderDash: [6, 6],
                    borderWidth: 1,
                    label: {
                      display: true,
                      content: "Average GDP per capita: $47,727",
                      position: "start",
                      font: { style: "italic", size: 10 },
                    },
                  },
                  daiThreshold: {
                    type: "line",
                    scaleID: "y",
                    value: 0.66,
                    borderColor: "gray",
                    borderDash: [6, 6],
                    borderWidth: 1,
                    label: {
                      display: true,
                      content: "Average DAI: 0.66",
                      position: "end",
                      font: { style: "italic", size: 10 },
                    },
                  },
                },
              },
            },
            scales: {
              x: {
                min: 0,
                max: 150000,
                title: { display: true, text: "GDP per Capita, PPP (USD)", font: { size: 14 } },
                ticks: { stepSize: 37500, font: { size: 12 } },
                grid: { color: "#eee" },
              },
              y: {
                min: 0.35,
                max: 0.9,
                title: { display: true, text: "Digital Adoption Index (DAI)", font: { size: 14 } },
                ticks: { stepSize: 0.25, font: { size: 12 } },
                grid: { color: "#eee" },
              },
            },
          },
          plugins: [ChartDataLabels],
        });
      });
    }
  };
  </script>
  
  <style scoped>
  .market-analysis-view {
    max-width: 65%;
    margin: 0 auto;
    padding: 40px 20px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    text-align: center;
  }
  canvas {
    padding-top: 20px;
    max-width: 100%;
  }
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
  </style>
  