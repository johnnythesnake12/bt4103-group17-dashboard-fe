<template>
  <div>
    <div v-if="loading" class="spinner-wrapper">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <canvas v-show="!loading" id="growthChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import axios from 'axios'

Chart.register(...registerables)

export default {
  name: 'AnnualGrowthChart',
  data() {
    return {
      loading: true
    }
  },
  async mounted() {
    const ctx = document.getElementById('growthChart')

    try {
      const res = await axios.get('https://bt4103-group17-dashboard-flask-be.onrender.com/costing_projections')
      const rawData = res.data

      // Sum revenue and cost across all countries
      let initialRevenue = 0
      let initialCost = 0

      for (const item of rawData) {
        initialRevenue += item.revenue || 0
        initialCost += item.total_cost || 0
      }

      // Convert to millions
      initialRevenue = initialRevenue / 1_000_000
      initialCost = initialCost / 1_000_000

      // Generate 5 years of data
      const revenueData = [+(initialRevenue).toFixed(2)]
      const costData = [+(initialCost).toFixed(2)]

      for (let i = 1; i < 5; i++) {
        revenueData.push(+((revenueData[i - 1]) * 1.15).toFixed(2))
        costData.push(+((costData[i - 1]) * 1.15).toFixed(2))
      }

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'],
          datasets: [
            {
              label: 'Annual Revenue',
              data: revenueData,
              borderColor: '#2196F3',
              backgroundColor: '#2196F3',
              tension: 0.4,
              pointRadius: 5,
              fill: false
            },
            {
              label: 'Operational Costs',
              data: costData,
              borderColor: '#F44336',
              backgroundColor: '#F44336',
              tension: 0.4,
              pointRadius: 5,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Global Annual Revenue vs Operational Costs',
              font: { size: 20, weight: 'bold' },
              padding: { top: 10, bottom: 20 }
            },
            legend: {
              position: 'bottom',
              labels: { font: { size: 14 }, boxWidth: 20 }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: $${context.formattedValue}M`
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { font: { size: 13 } },
              grid: { display: false }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($M)',
                font: { size: 14 }
              },
              ticks: {
                font: { size: 12 },
                callback: function (value) {
                  return `$${value}M`
                }
              }
            }
          }
        }
      })

      this.loading = false
    } catch (err) {
      console.error('Failed to load chart data:', err)
      this.loading = false
    }
  }
}
</script>

<style scoped>
canvas {
  max-width: 100%;
}

.spinner-wrapper {
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
