<template>
    <div class="adoption-rate-container">
      <h1>Regional Kit Adoption Rates</h1>
      <div class="chart-wrapper">
        <canvas 
          v-if="loaded" 
          ref="chartRef"
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
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Singapore',
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              data: [45, 55, 52, 65, 70, 80]
            },
            {
              label: 'Malaysia',
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
              data: [30, 50, 55, 58, 65, 75]
            },
            {
              label: 'Indonesia',
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
              data: [25, 45, 50, 52, 60, 70]
            },
            {
              label: 'Thailand',
              borderColor: 'rgb(255, 159, 64)',
              tension: 0.1,
              data: [35, 55, 62, 60, 70, 85]
            },
            {
              label: 'Vietnam',
              borderColor: 'rgb(153, 102, 255)',
              tension: 0.1,
              data: [20, 40, 45, 48, 60, 80]
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Regional Kit Adoption Rates (%)'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
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
    padding: 20px;
  }
  
  .chart-wrapper {
    position: relative;
    height: 400px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>