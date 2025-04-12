<template>
  <div>
    <!-- Spinner while loading -->
    <div v-if="loading" class="spinner-wrapper">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Chart canvas shown only after loading -->
    <canvas v-show="!loading" id="profitChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import axios from 'axios'

Chart.register(...registerables, ChartDataLabels)

export default {
  name: 'ProfitMarginChart',
  data() {
    return {
      loading: true 
    }
  },
  async mounted() {
    const ctx = document.getElementById('profitChart')

    try {
      const [revenueRes, costRes] = await Promise.all([
        axios.get('https://bt4103-group17-dashboard-flask-be.onrender.com/costing_projections'),
        axios.get('https://bt4103-group17-dashboard-flask-be.onrender.com/costing_projections')
      ])

      const revenueDataRaw = revenueRes.data
      const costDataRaw = costRes.data

      const countryOrder = ['Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Indonesia']
      const labels = []
      const revenueData = []
      const costData = []
      const marginData = []

      for (const countryName of countryOrder) {
        const revenueEntry = revenueDataRaw.find(item => item.country === countryName)
        const costEntry = costDataRaw.find(item => item.country === countryName)

        if (!revenueEntry || !costEntry) continue

        const revenue = revenueEntry.revenue / 1000 // convert to $K
        const cost = costEntry.total_cost / 1000     // convert to $K
        const margin = ((revenue - cost) / revenue) * 100

        labels.push(countryName)
        revenueData.push(revenue)
        costData.push(cost)
        marginData.push(+margin.toFixed(2))
      }

      new Chart(ctx, {
        data: {
          labels,
          datasets: [
            {
              type: 'line',
              label: 'Profit Margin (%)',
              data: marginData,
              borderColor: '#4CAF50',
              backgroundColor: '#4CAF50',
              yAxisID: 'y1',
              pointRadius: 5,
              borderWidth: 3,
              clip: false,
              datalabels: {
                display: true,
                align: 'top',
                anchor: 'end',
                color: '#4CAF50',
                font: { weight: 'bold', size: 14 },
                formatter: val => `${val}%`
              }
            },
            {
              type: 'bar',
              label: 'Revenue',
              data: revenueData,
              backgroundColor: '#2196F3',
              yAxisID: 'y',
              barPercentage: 1
            },
            {
              type: 'bar',
              label: 'Cost',
              data: costData,
              backgroundColor: '#F44336',
              yAxisID: 'y',
              barPercentage: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Country-Wise Revenue, Cost, and Profit Margin',
              font: { size: 20, weight: 'bold' },
              padding: { top: 10, bottom: 40 }
            },
            legend: {
              position: 'bottom',
              labels: { font: { size: 14 }, boxWidth: 20 }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label
                  const value = context.formattedValue
                  return label.includes('Margin')
                    ? `${label}: ${value}%`
                    : `${label}: $${value}K`
                }
              },
              backgroundColor: '#222',
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 13 },
              cornerRadius: 6
            },
            datalabels: {
              display: false // default for all, overridden per dataset
            }
          },
          scales: {
            x: {
              stacked: false,
              ticks: { font: { size: 13 } },
              grid: { display: false }
            },
            y: {
              stacked: false,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($K)',
                font: { size: 14 }
              },
              ticks: { font: { size: 12 } },
              grid: { color: '#eee' }
            },
            y1: {
              position: 'right',
              beginAtZero: false,
              title: {
                display: true,
                text: 'Profit Margin (%)',
                font: { size: 14 }
              },
              ticks: {
                font: { size: 12 },
                callback: value => `${value}%`
              },
              grid: {
                drawOnChartArea: false
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