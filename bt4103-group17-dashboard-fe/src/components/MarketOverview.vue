<template>
  <div>
    <h2>Country-Wise Market Analysis: Diabetic Population, GDP per Capita (PPP), Digital Adoption Index</h2>
    <canvas id="marketBubbleChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import axios from 'axios';

Chart.register(...registerables, ChartDataLabels, annotationPlugin);

export default {
  name: 'MarketOverview',
  data() {
    return {
      chart: null,
      colorMap: {
        Singapore: '#4CAF50',
        Malaysia: '#2196F3',
        Vietnam: '#FFC107',
        Thailand: '#9C27B0',
        Indonesia: '#F44336'
      }
    };
  },
  methods: {
    scaleRadius(pop) {
      return Math.sqrt(pop) / 60;
    },
    originalPop(scale) {
      return Math.round((scale * 60) ** 2);
    },
    async drawChart() {
      try {
        const response = await axios.get('https://bt4103-group17-dashboard-flask-be.onrender.com/countries');
        const data = response.data;

        const ctx = document.getElementById("marketBubbleChart");
        if (!ctx) return;

        // Reorder countries to bring Vietnam to the front (last in array)
        const countryOrder = ['Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'Vietnam'];

        const datasets = countryOrder.map((countryName) => {
          const country = data.find(c => c.country === countryName);
          if (!country) return null;

          const diabeticPop = country.diabetic_metillus_population;

          return {
            label: country.country,
            data: [{
              x: country.ppp,
              y: country.dai,
              r: Math.max(this.scaleRadius(diabeticPop), 5)
            }],
            backgroundColor: this.colorMap[country.country] || '#90A4AE',
            datalabels: {
              color: country.country === 'Singapore' ? '#000000' : '#ffffff',
              font: { size: 16, weight: "bold" }
            }
          };
        }).filter(Boolean);

        this.chart = new Chart(ctx, {
          type: "bubble",
          data: { datasets },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Key Market Information by Country",
                font: { size: 20, weight: "bold" },
              },
              legend: {
                position: "bottom",
                labels: { font: { size: 16 }, boxWidth: 20 }
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const { x, y, r } = context.raw;
                    const country = context.dataset.label;
                    const pop = this.originalPop(r);
                    return `${country}: GDP per capita $${x.toLocaleString()}, DAI ${y}, Diabetic Population: ${pop.toLocaleString()}`;
                  }
                }
              },
              datalabels: {
                formatter: (value) => {
                  const pop = this.originalPop(value.r);
                  return pop >= 1_000_000
                    ? `${(pop / 1_000_000).toFixed(1)}M`
                    : `${(pop / 1000).toFixed(0)}K`;
                }
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
                      font: { style: "italic", size: 14 }
                    }
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
                      font: { style: "italic", size: 14 }
                    }
                  }
                }
              }
            },
            scales: {
              x: {
                min: 0,
                max: 150000,
                title: {
                  display: true,
                  text: "GDP per Capita, PPP (USD)",
                  font: { size: 18 }
                },
                ticks: { stepSize: 37500, font: { size: 12 } },
                grid: { color: "#eee" }
              },
              y: {
                min: 0.35,
                max: 0.9,
                title: {
                  display: true,
                  text: "Digital Adoption Index (DAI)",
                  font: { size: 18 }
                },
                ticks: { stepSize: 0.25, font: { size: 12 } },
                grid: { color: "#eee" }
              }
            }
          },
          plugins: [ChartDataLabels]
        });

      } catch (error) {
        console.error("Failed to load chart data:", error);
      }
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
