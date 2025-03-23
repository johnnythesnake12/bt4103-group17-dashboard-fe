<template>
  <div class="financial-performance-view">
    <h2>📊 Profit Margin Breakdown</h2>
    <canvas id="profitChart"></canvas>

    <h2 style="margin-top: 60px;">📈 Annual Revenue vs Operational Costs</h2>
    <canvas id="growthChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "FinancialPerformanceView",
  mounted() {
    // Profit Margin Breakdown
    const ctx = document.getElementById("profitChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Singapore", "Malaysia", "Thailand", "Vietnam", "Indonesia"],
        datasets: [
          {
            label: "Revenue",
            data: [100, 85, 95, 90, 70],
            backgroundColor: "#4CAF50",
          },
          {
            label: "Cost",
            data: [60, 55, 65, 50, 40],
            backgroundColor: "#F44336",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Revenue vs Cost by Market",
            font: { size: 20, weight: "bold" },
            padding: { top: 10, bottom: 20 },
          },
          legend: {
            position: "bottom",
            labels: { font: { size: 14 }, boxWidth: 20 },
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
            ticks: { font: { size: 13 } },
            grid: { display: false },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: "Amount ($K)",
              font: { size: 14 },
            },
            ticks: { font: { size: 12 } },
            grid: {
              color: "#e0e0e0",
              drawBorder: false,
            },
          },
        },
      },
    });

    // Annual Revenue vs Operational Costs
    const growthCtx = document.getElementById("growthChart");
    new Chart(growthCtx, {
      type: "line",
      data: {
        labels: ["Y1", "Y2", "Y3", "Y4", "Y5"],
        datasets: [
          {
            label: "Annual Revenue",
            data: [1.76, 2.11, 2.41, 2.71, 3.02], // in USD Millions
            borderColor: "#2196F3",
            backgroundColor: "#2196F3",
            tension: 0.4,
            pointRadius: 5,
            fill: false,
          },
          {
            label: "Operational Costs",
            data: [0.73, 0.88, 1.03, 1.15, 1.28], // in USD Millions
            borderColor: "#FF9800",
            backgroundColor: "#FF9800",
            tension: 0.4,
            pointRadius: 5,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Annual Revenue vs Operational Costs (Global)",
            font: { size: 20, weight: "bold" },
            padding: { top: 10, bottom: 20 },
          },
          legend: {
            position: "bottom",
            labels: { font: { size: 14 }, boxWidth: 20 },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: $${context.formattedValue}M`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: { font: { size: 13 } },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Amount ($M)",
              font: { size: 14 },
            },
            ticks: {
              font: { size: 12 },
              callback: function (value) {
                return `$${value}M`;
              },
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
  max-width: 100%;
}
</style>
