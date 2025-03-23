<template>
  <div class="financial-performance-view">
    <h2>📊 Profit Margin Breakdown</h2>
    <canvas id="profitChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "FinancialPerformanceView",
  mounted() {
    const ctx = document.getElementById("profitChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Singapore", "Malaysia", "Thailand", "Vietnam", "Indonesia"],
        datasets: [
          {
            label: "Revenue",
            data: [100, 85, 95, 90, 70],
            backgroundColor: "#4CAF50", // green
          },
          {
            label: "Cost",
            data: [60, 55, 65, 50, 40],
            backgroundColor: "#F44336", // red
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Revenue vs Cost by Market",
            font: {
              size: 20,
              weight: "bold",
            },
            padding: {
              top: 10,
              bottom: 20,
            },
          },
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 14,
              },
              boxWidth: 20,
            },
          },
          tooltip: {
            backgroundColor: "#333",
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
            cornerRadius: 6,
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              font: { size: 13 },
            },
            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: "Amount ($K)",
              font: {
                size: 14,
              },
            },
            ticks: {
              font: { size: 12 },
            },
            grid: {
              color: "#e0e0e0",
              drawBorder: false,
            },
          },
        },
      },
    });
  },
};
</script>

<style scoped>
.financial-performance-view {
  max-width: 850px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

canvas {
  padding-top: 20px;
}
</style>
