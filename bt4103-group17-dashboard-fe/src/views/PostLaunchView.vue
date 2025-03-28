<template>
    <div class="dashboard-container">
        <div class="header">
            <h1>Post Product Insights</h1>
        </div>
        <div class="adoption-rate">
            <div class="chart-container">
                <canvas 
                    v-if="loaded" 
                    ref="chartRef"
                    style="height: 400px;"
                />
                <div v-else class="loading-text">Loading...</div>
            </div>
        </div>
            <div class="financial-performance-view">
                <div class = "financial-charts-container">
                    <div class="profitChart">
                        <canvas id="profitChart"></canvas>
                    </div>
                
                    <div class="revenuegrowth">
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
      setTimeout(() => {
        this.loaded = true
        this.$nextTick(() => {
          this.createChart()
          this.createFinancialCharts()
        })
      }, 1000)
    },

    methods: {
    //adoption rate chart 
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
    

        //financial charts
        createFinancialCharts() {
            const profitCtx = document.getElementById("profitChart").getContext('2d');
            new ChartJS(profitCtx, {
                type: "bar",
                data: {
                    labels: ["Singapore", "Malaysia", "Thailand", "Vietnam", "Indonesia"],
                    datasets: [
                        { label: "Revenue", data: [100, 85, 95, 90, 70], backgroundColor: "#4CAF50" },
                        { label: "Cost", data: [60, 55, 65, 50, 40], backgroundColor: "#F44336" }
                    ]
                },

                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: "📊 Profit Margin Breakdown" },
                        legend: { position: "bottom" }
                    },
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true, beginAtZero: true }
                    }
                }
            });

            const growthCtx = document.getElementById("growthChart").getContext('2d');
            new ChartJS(growthCtx, {
                type: "line",
                data: {
                    labels: ["Y1", "Y2", "Y3", "Y4", "Y5"],
                    datasets: [
                        { label: "Annual Revenue", data: [120, 150, 170, 190, 220], borderColor: "#36A2EB", fill: false },
                        { label: "Operational Costs", data: [100, 120, 130, 140, 160], borderColor: "#FF6384", fill: false }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: "📈Annual Revenue vs Operational Costs" },
                        legend: { position: "bottom" }
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

    .header {
        display: flex;
        align-items: flex-start; 
        justify-content: flex-start; 
        padding: 16px;
        margin-top: -40px;
    }

    .header h1 {
        font-size: 20px; 
        font-weight: bold; 
        margin: 0; 
    }


    .adoption-rate-container {
        padding: 20px;
    }

  
    .adoption-rate {
        position: relative;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        margin-top: -10%;

    }

    .chart-container {
        position: relative;
        width: 100%;
        height: 400px; 
      
    }


    
    .loading-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: #888;
        font-weight: bold;
    }



    .financial-performance-view {
        margin-top: 40px;
    }

    .financial-charts-container {
        display: flex; 
        justify-content: space-between;
        gap: 20px; 
        margin-top: -10%; 
        padding: 20px; 
    }


    .financial-charts-container canvas {
        width: 45%; 
        max-width: 400px; 
        height: 250px !important; 
    }



</style>