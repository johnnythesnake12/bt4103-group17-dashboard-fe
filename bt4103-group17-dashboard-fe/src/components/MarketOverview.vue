<template>
  <div>
    <h2>📈 Market Analysis: Diabetic Population, GDP per Capita (PPP), Digital Adoption Index</h2>
    <canvas id="marketBubbleChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, ChartDataLabels, annotationPlugin);

export default {
  name: 'MarketOverview',
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
            { label: "Singapore", data: [{ x: 141553, y: 0.87, r: scaleRadius(310000) }], backgroundColor: "#4CAF50" },
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
              padding: { top: 10, bottom: 20 }
            },
            legend: { position: "bottom", labels: { font: { size: 14 }, boxWidth: 20 } },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const { x, y, r } = context.raw;
                  const country = context.dataset.label;
                  const pop = originalPop(r);
                  return `${country}: GDP per capita $${x.toLocaleString()}, DAI ${y}, Diabetic Population: ${pop.toLocaleString()}`;
                }
              }
            },
            datalabels: {
              color: "#ffffff",
              font: { weight: "bold" },
              formatter: function (value) {
                const pop = originalPop(value.r);
                return pop >= 1_000_000 ? `${(pop / 1_000_000).toFixed(1)}M` : `${(pop / 1000).toFixed(0)}K`;
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
                    font: { style: "italic", size: 10 }
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
                    font: { style: "italic", size: 10 }
                  }
                }
              }
            }
          },
          scales: {
            x: {
              min: 0,
              max: 150000,
              title: { display: true, text: "GDP per Capita, PPP (USD)", font: { size: 14 } },
              ticks: { stepSize: 37500, font: { size: 12 } },
              grid: { color: "#eee" }
            },
            y: {
              min: 0.35,
              max: 0.9,
              title: { display: true, text: "Digital Adoption Index (DAI)", font: { size: 14 } },
              ticks: { stepSize: 0.25, font: { size: 12 } },
              grid: { color: "#eee" }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    });
  }
};
</script>

<style scoped>
canvas {
  padding-top: 20px;
  max-width: 100%;
}
</style>