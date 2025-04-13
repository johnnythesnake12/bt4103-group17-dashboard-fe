<template>
  <div class="adoption-rate-container">
    <h1 class="section-header">
      Regional Kit Adoption Rates
      <TooltipInfo text="(Number of New Active Users / Total Sign-ups or Total Users) * 100" />
    </h1>

    <div class="year-selector">
      <label for="year"><b>Selected Year</b></label> <div></div> 
      <select v-model="selectedYear" @change="filterDataByYear">
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="chart-wrapper">
      <canvas v-if="loaded" ref="chartRef" style="height: 500px" />
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';
import TooltipInfo from '@/components/TooltipInfo.vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

export default {
  name: 'AdoptionRateView',
  components: { TooltipInfo },
  data() {
    return {
      loaded: false,
      chart: null,
      selectedYear: '',
      availableYears: [],
      rawLabels: [],
      rawDatasets: [],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 60, right: 20, bottom: 40, left: 20 }
        },
        plugins: {
          legend: { position: 'top', padding: 20 },
          title: {
            display: true,
            text: 'Regional Kit Adoption Rates (%)',
            padding: 20
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            suggestedMax: 100,
            title: {
              display: true,
              text: 'Adoption Rate (%)'
            },
            grid: {
              drawTicks: false,
              borderDash: [5, 5]
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            },
            grid: {
              display: false
            }
          }
        }
      }
    };
  },
  mounted() {
    this.fetchAdoptionData();
  },
  methods: {
    async fetchAdoptionData() {
      this.loaded = false;
      try {
        const response = await axios.get(`https://bt4103-group17-dashboard-flask-be.onrender.com/adoption-rates`);
        const { labels, datasets } = response.data;

        this.rawLabels = labels;
        this.rawDatasets = datasets;

        const yearSet = new Set();
        labels.forEach(label => yearSet.add(label.split('-')[0]));
        this.availableYears = Array.from(yearSet).sort();
        if (!this.selectedYear) this.selectedYear = this.availableYears[0];

        this.filterDataByYear();
      } catch (error) {
        console.error('Error fetching adoption rate data:', error);
        this.loaded = false;
      }
    },
    filterDataByYear() {
      const yearLabels = this.rawLabels.filter(l => l.startsWith(this.selectedYear));
      const yearDatasets = this.rawDatasets.map(set => {
        return {
          label: set.label,
          data: this.rawLabels.map((label, i) => {
            return label.startsWith(this.selectedYear)
              ? (set.data[i] === 0 ? null : set.data[i])
              : null;
          }).filter((_, idx) => this.rawLabels[idx].startsWith(this.selectedYear))
        };
      });

      this.chartData = { labels: yearLabels, datasets: yearDatasets };
      this.loaded = true;

      this.$nextTick(() => {
        const canvas = this.$refs.chartRef;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (this.chart) this.chart.destroy();
        this.chart = new ChartJS(ctx, {
          type: 'line',
          data: this.chartData,
          options: this.chartOptions
        });
      });
    }
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  }
};
</script>

<style scoped>
.adoption-rate-container {
  padding: 40px;
  max-width: 80%;
  margin: auto;
  text-align: center;
}

.year-selector {
  margin-bottom: 20px;
  font-size: 16px;
}
</style>
