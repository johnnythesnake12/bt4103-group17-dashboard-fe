<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Post Product Insights</h1>
      <div class="subtitle">Performance metrics and regional adoption trends</div>
    </div>
    
    <div class="adoption-rate card">
      <div class="chart-header">
        <h2>Regional Kit Adoption Rates</h2>
        <div class="time-filter">
          <span class="active">12M</span>
          <span>6M</span>
          <span>3M</span>
        </div>
      </div>
      <div class="chart-container">
        <canvas v-if="loaded" ref="chartRef"/>
        <div v-else class="loading">
          <div class="spinner"></div>
          <span>Loading data...</span>
        </div>
      </div>
    </div>
    
    <div class="financial-section">
      <h2>Financial Performance</h2>
      <div class="financial-charts-container">
        <div class="chart-wrapper card">
          <h3>Profit Margin Breakdown</h3>
          <canvas id="profitChart"></canvas>
        </div>
        <div class="chart-wrapper card">
          <h3>Revenue vs Costs</h3>
          <canvas id="growthChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, BarController, BarElement, LineController, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js'

ChartJS.register(
  BarController, BarElement, LineController, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement
)

export default {
  name: 'PostLaunchView',
  data() {
    return {
      loaded: false,
      chart: null,
      chartData: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'Singapore',
            borderColor: '#3A86FF',
            backgroundColor: 'rgba(58, 134, 255, 0.1)',
            tension: 0.3,
            data: [20, 35, 45, 55, 65, 70, 75, 80, 78, 85, 88, 90], 
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Malaysia',
            borderColor: '#FF006E',
            backgroundColor: 'rgba(255, 0, 110, 0.1)',
            tension: 0.3,
            data: [15, 19, 32, 29, 35, 45, 50, 55, 52, 58, 62, 65], 
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Indonesia',
            borderColor: '#8338EC',
            backgroundColor: 'rgba(131, 56, 236, 0.1)',
            tension: 0.3,
            data: [10, 20, 25, 30, 35, 40, 45, 50, 48, 59, 55, 62], 
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Thailand',
            borderColor: '#FFBE0B',
            backgroundColor: 'rgba(255, 190, 11, 0.1)',
            tension: 0.3,
            data: [12, 22, 27, 32, 42, 37, 47, 52, 50, 59, 61, 63], 
            pointHoverRadius: 6,
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Vietnam',
            borderColor: '#1DB954',
            backgroundColor: 'rgba(29, 185, 84, 0.1)',
            tension: 0.3,
            data: [8, 18, 25, 28, 33, 38, 43, 39, 45, 52, 57, 60], 
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
            fill: true
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: "'Inter', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: '#2D3748',
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 12
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawTicks: false
            },
            ticks: {
              padding: 10
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              padding: 10
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.loaded = true
      this.$nextTick(() => {
        this.createChart()
        this.createFinancialCharts()
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

      try {
        this.chart = new ChartJS(ctx, {
          type: 'line',
          data: this.chartData,
          options: this.chartOptions
        })
      } catch (error) {
        console.error('Error creating chart:', error)
      }
    },

    createFinancialCharts() {
      // Profit Chart
      const profitCtx = document.getElementById("profitChart").getContext('2d');
      new ChartJS(profitCtx, {
        type: "bar",
        data: {
          labels: ["Singapore", "Malaysia", "Thailand", "Vietnam", "Indonesia"],
          datasets: [
            { 
              label: "Revenue", 
              data: [100, 85, 95, 90, 70], 
              backgroundColor: "#4BB543",
              borderRadius: 6
            },
            { 
              label: "Cost", 
              data: [60, 55, 65, 50, 40], 
              backgroundColor: "#FF2C2C",
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { 
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: '#2D3748',
              padding: 12,
              cornerRadius: 8
            }
          },
          scales: {
            x: { 
              stacked: true,
              grid: {
                display: false
              }
            },
            y: { 
              stacked: true, 
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            }
          }
        }
      });


      const growthCtx = document.getElementById("growthChart").getContext('2d');
      new ChartJS(growthCtx, {
        type: "line",
        data: {
          labels: ["2020", "2021", "2022", "2023", "2024"],
          datasets: [
            { 
              label: "Annual Revenue", 
              data: [120, 150, 170, 190, 220], 
              borderColor: "#4BB543",
              backgroundColor: 'rgba(58, 134, 255, 0.1)',
              tension: 0.3,
              borderWidth: 2,
              fill: true
            },
            { 
              label: "Operational Costs", 
              data: [100, 120, 130, 140, 160], 
              borderColor: "#FF2C2C",
              backgroundColor: 'rgba(255, 0, 110, 0.1)',
              tension: 0.3,
              borderWidth: 2,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { 
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: '#2D3748',
              padding: 12,
              cornerRadius: 8
            }
          },
          scales: {
            y: { 
              beginAtZero: false,
              min: 80,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary: #3A86FF;
  --secondary: #FF006E;
  --accent: #8338EC;
  --warning: #FFBE0B;
  --success: #1DB954;
  --text-primary: #1A202C;
  --text-secondary: #4A5568;
  --bg-light: #F7FAFC;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dashboard-container {
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-light);
  color: var(--text-primary);
}

.header {
  margin-bottom: 32px;
}

.header h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.header .subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 400;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--card-shadow);
  margin-bottom: 24px;
}

.adoption-rate {
  height: 500px;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-header h2 {
  font-size: 18px;
  font-weight: 600;
}

.time-filter {
  display: flex;
  gap: 8px;
}

.time-filter span {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: var(--text-secondary);
  background: rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.time-filter span.active {
  background: var(--primary);
  color: white;
}

.time-filter span:hover {
  background: rgba(0, 0, 0, 0.08);
}

.chart-container {
  flex: 1;
  width: 100%;
  position: relative;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(58, 134, 255, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.financial-section {
  margin-top: 32px;
}


.financial-charts-container {
  display: flex;
  gap: 24px;
  width: 100%;
}

.chart-wrapper {
  flex: 1;
  height: 350px;
}

.chart-wrapper h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .financial-charts-container {
    flex-direction: column;
  }
  
  .adoption-rate {
    height: 400px;
  }
  
  .chart-wrapper {
    height: 300px;
  }
}
</style>