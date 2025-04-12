<template>
  <div style="margin-top: 60px;">
    <h2 class="funnel-title">Market Sizing Funnel – {{ selectedFunnelMarket }}</h2>

    <!-- Show spinner while loading -->
    <div v-if="loading" class="funnel-loading">
      <div class="spinner"></div>
      <p>Loading funnel data...</p>
    </div>

    <!-- Show actual chart content once loaded -->
    <div v-else>
      <div class="funnel-header-top-left">
        <div class="dropdown-wrapper inline">
          <label for="market-select">Market:</label>
          <select id="market-select" v-model="selectedFunnelMarket" class="dropdown">
            <option v-for="market in funnelMarkets" :key="market" :value="market">
              {{ market }}
            </option>
          </select>
        </div>
      </div>

      <apexchart
        type="bar"
        height="400"
        :options="funnelOptions"
        :series="funnelSeries"
      />

      <div class="revenue-connector">
        <div class="line"></div>
        <svg height="30" width="30" viewBox="0 0 24 24" fill="#2196F3">
          <path d="M12 2v14.17l-4.59-4.58L6 13l6 6 6-6-1.41-1.41L12 16.17V2z" />
        </svg>
      </div>
      <div class="revenue-annotation">
        <div class="revenue-text">
          <strong>Revenue Potential: $</strong>
          {{ formattedRevenue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexChart from 'vue3-apexcharts';
import axios from "axios";

export default {
  name: 'MarketSizingFunnel',
  components: { apexchart: ApexChart },
  data() {
    return {
      selectedFunnelMarket: '',
      funnelMarkets: [],
      funnelDataMap: {},
      revenueText: {},
      funnelSeries: [],
      loading: true, // ✅ loading flag added
      funnelOptions: {
        chart: {
          type: 'bar',
          height: 400
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            barHeight: '70%',
            isFunnel: true
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opt) {
            const stage = opt.w.globals.labels[opt.dataPointIndex];
            const data = opt.w.config.series[0].data;
            const top = data[0];
            const percentage = ((val / top) * 100).toFixed(1);
            const formattedVal = val >= 1e6
              ? (val / 1e6).toFixed(1) + 'M'
              : val >= 1e3
                ? (val / 1e3).toFixed(1) + 'K'
                : val.toLocaleString();
            return `${stage}: ${percentage}% (${formattedVal})`;
          },
          style: {
            fontSize: '14px',
            fontWeight: '600',
            colors: ['#000']
          },
          offsetX: 0,
          textAnchor: 'middle',
          distributed: true,
          background: {
            enabled: false
          }
        },
        xaxis: {
          categories: [
            'Total Population',
            'Diabetic Population',
            'VTDR Cases',
            'Target Population (Customers)'
          ],
          labels: {
            formatter: (val) => (val >= 1e6
              ? (val / 1e6).toFixed(1) + 'M'
              : val >= 1e3
                ? (val / 1e3).toFixed(1) + 'K'
                : val.toLocaleString())
          }
        },
        fill: {
          colors: ['#2196F3', '#42A5F5', '#64B5F6', '#90CAF9']
        },
        title: {
          text: '',
          align: 'center'
        },
        legend: {
          show: false
        }
      }
    };
  },
  computed: {
    formattedRevenue() {
      const raw = this.revenueText[this.selectedFunnelMarket];
      if (!raw || isNaN(raw)) return '-';
      return raw >= 1e6
        ? (raw / 1e6).toFixed(1) + 'M'
        : raw >= 1e3
          ? (raw / 1e3).toFixed(1) + 'K'
          : raw.toLocaleString();
    }
  }, 
  watch: {
    selectedFunnelMarket(newMarket) {
      this.updateChartData(newMarket);
    }
  },
  methods: {
    async fetchCountryData() {
      this.loading = true; 
      try {
        const response = await axios.get('https://bt4103-group17-dashboard-flask-be.onrender.com/countries');
        const data = response.data;
        const map = {};
        const markets = [];

        data.forEach(country => {
          map[country.country] = [
            country.total_population,
            country.total_population * country.diabetes_mellitus_prevalence_rate,
            country.diabetic_metillus_population * country.vtdr_prevalence_rate_among_diabetics,
            country.diabetic_metillus_population * country.vtdr_prevalence_rate_among_diabetics * 0.8
          ];
          markets.push(country.country);
          this.revenueText[country.country] = country.revenue;
        });

        this.funnelDataMap = map;
        this.funnelMarkets = markets;

        if (!this.funnelMarkets.includes(this.selectedFunnelMarket)) {
          this.selectedFunnelMarket = this.funnelMarkets[0];
        }

        this.updateChartData(this.selectedFunnelMarket);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        this.loading = false;
      }
    },
    updateChartData(market) {
      if (this.funnelDataMap[market]) {
        this.funnelSeries = [
          {
            name: `Market Sizing (${market})`,
            data: this.funnelDataMap[market]
          }
        ];
      }
    }
  },
  mounted() {
    this.fetchCountryData();
  }
};
</script>

<style scoped>
.funnel-header-top-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}
.dropdown-wrapper.inline {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dropdown {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}
.funnel-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px;
}
.revenue-annotation {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 500;
}

/* ✅ Loading spinner */
.funnel-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background-color: #ffffffcc;
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #eee;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
