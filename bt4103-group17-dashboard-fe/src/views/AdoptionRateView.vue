<template>
    <div class="adoption-rate-container">
      <h1>Regional Kit Adoption Rates</h1>
      <div class="chart-wrapper">
        <canvas 
          v-if="loaded" 
          ref="chartRef"
          style="height: 500px"
        />
        <div v-else>Loading...</div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js'
  
  ChartJS.register(
    Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement
  )
  
  export default {
    name: 'AdoptionRateView',
    data() {
      return {
        loaded: false,
        chart: null,
        chartData: {
          labels: [
            '1st', '2nd', '3rd', '4th', '5th', '6th',
            '7th', '8th', '9th', '10th', '11th', '12th'
          ],
          datasets: [
            {
              label: 'Singapore',
              borderColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(75, 192, 192, 1)');
                gradient.addColorStop(1, 'rgba(75, 192, 192, 0.5)');
                return gradient;
              },
              tension: 0.1,
              data: [20, 35, 45, 55, 65, 70, 75, 80, 78, 85, 88, 90], 
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(75, 192, 192, 0.3)');
                gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
                return gradient;
              }
            },
            {
              label: 'Malaysia',
              borderColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(255, 99, 132, 1)');
                gradient.addColorStop(1, 'rgba(255, 99, 132, 0.5)');
                return gradient;
              },
              tension: 0.1,
              data: [15, 19, 32, 29, 35, 45, 50, 55, 52, 58, 62, 65], 
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(255, 99, 132, 0.3)');
                gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');
                return gradient;
              }
            },
            {
              label: 'Indonesia',
              borderColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(54, 162, 235, 1)');
                gradient.addColorStop(1, 'rgba(54, 162, 235, 0.5)');
                return gradient;
              },
              tension: 0.1,
              data: [10, 20, 25, 30, 35, 40, 45, 50, 48, 59, 55, 62], 
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(54, 162, 235, 0.3)');
                gradient.addColorStop(1, 'rgba(54, 162, 235, 0)');
                return gradient;
              }
            },
            {
              label: 'Thailand',
              borderColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(255, 159, 64, 1)');
                gradient.addColorStop(1, 'rgba(255, 159, 64, 0.5)');
                return gradient;
              },
              tension: 0.1,
              data: [12, 22, 27, 32, 42, 37, 47, 52, 50, 59, 61, 63], 
              pointHoverRadius: 6,
              fill: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(255, 159, 64, 0.3)');
                gradient.addColorStop(1, 'rgba(255, 159, 64, 0)');
                return gradient;
              }
            },
            {
              label: 'Vietnam',
              borderColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(153, 102, 255, 1)');
                gradient.addColorStop(1, 'rgba(153, 102, 255, 0.5)');
                return gradient;
              },
              tension: 0.1,
              data: [8, 18, 25, 28, 33, 38, 43, 39, 45, 52, 57, 60], 
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(153, 102, 255, 0.3)');
                gradient.addColorStop(1, 'rgba(153, 102, 255, 0)');
                return gradient;
              }
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 60,
              right: 20,
              bottom: 40,
              left: 20
            }
          },
          plugins: {
            legend: {
              position: 'top',
              padding: 20
            },
            title: {
              display: true,
              text: 'Regional Kit Adoption Rates (%)',
              padding: 20
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
      }
    },
    mounted() {
      // Simulate data loading
      setTimeout(() => {
        this.loaded = true
        // Wait for next tick to ensure canvas is rendered
        this.$nextTick(() => {
          this.createChart()
        })
      }, 1000)
    },
    methods: {
      createChart() {
        const canvas = this.$refs.chartRef
        if (!canvas) {
          console.error('Canvas element not found')
          return
        }
  
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          console.error('Canvas context not available')
          return
        }
  
        // Create chart with error handling
        try {
          this.chart = new ChartJS(ctx, {
            type: 'line',
            data: this.chartData,
            options: this.chartOptions
          })
        } catch (error) {
          console.error('Error creating chart:', error)
        }
      }
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy()
      }
    }
  }
  </script>
  
  <style scoped>
  .adoption-rate-container {
    padding: 40px;
    max-width: 80%;
    margin: auto auto;
    text-align: center;
  }
  
  /* .chart-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  } */
  </style>