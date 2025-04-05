<template>
  <div>
    <h1>Healthcare Providers</h1>
    <v-text-field
      v-model="search"
      label="Search Providers"
      class="mx-4"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="providers"
      class="elevation-1"
      :search="search"
    >
    </v-data-table>
    <h2 class="mt-10 text-center">Onboarding Funnel</h2>
    <div class="chart-container">
      <canvas id="funnelChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';

Chart.register(FunnelController, TrapezoidElement);

export default {
  name: "ProvidersView",
  data() {
    return {
      search: "",
      providers: [],
      headers: [
        { title: "ID", key: "provider_id" },
        { title: "Name", key: "provider_name" },
        { title: "Type", key: "provider_type" },
        { title: "Address", key: "address" },
        { title: "City", key: "city" },
        { title: "State/Region", key: "state_region" },
        { title: "Country", key: "country" },
        { title: "Onboarding Stage", key: "onboarding_stage" },
        { title: "First Login", key: "first_login" },
        { title: "Last Usage", key: "last_active" }
      ]
    };
  },
  mounted() {
    this.fetchProviders();
    this.fetchFunnelSummary();
  },
  methods: {
    async fetchProviders() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/providers");
        this.providers = response.data;
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    },
    async fetchFunnelSummary() {
    try {
      const response = await axios.get("http://127.0.0.1:5000/providers?view=summary");
      const rawData = response.data;

      // Ensure full stage order even if values are missing
      const stageOrder = [
        'not_contacted',
        'contacted',
        'demo_scheduled',
        'demo_done',
        'trial_started',
        'trial_ended',
        'contract_signed'
      ];

      const labelMap = {
        not_contacted: "Not Contacted",
        contacted: "Contacted",
        demo_scheduled: "Demo Scheduled",
        demo_done: "Demo Completed",
        trial_started: "Trial Started",
        trial_ended: "Trial Ended",
        contract_signed: "Contract Signed"
      };

      const colorMap = {
        not_contacted: "#76c7c0",
        contacted: "#f4a261",
        demo_scheduled: "#e76f51",
        demo_done: "#2a9d8f",
        trial_started: "#264653",
        trial_ended: "#8ecae6",
        contract_signed: "#ffb703"
      };

      // Fill missing stages with total = 0
      const filledData = stageOrder.map(stage => {
        const entry = rawData.find(e => e.stage === stage);
        return {
          stage,
          label: labelMap[stage],
          value: entry ? entry.total : 0,
          color: colorMap[stage]
        };
      });

      this.renderFunnelChart(filledData);
    } catch (error) {
      console.error("Error fetching funnel summary:", error);
    }
  },
  renderFunnelChart(funnelData) {
    const ctx = document.getElementById("funnelChart").getContext("2d");

    if (this.funnelChart) {
      this.funnelChart.destroy();
    }

    const baseValue = funnelData[0].value || 1;

    this.funnelChart = new Chart(ctx, {
      type: 'funnel',
      data: {
        labels: funnelData.map(e => e.label),
        datasets: [{
          label: 'Onboarding Funnel',
          data: funnelData.map(e => e.value),
          backgroundColor: funnelData.map(e => e.color)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Provider Onboarding Funnel'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                const percent = ((value / baseValue) * 100).toFixed(1);
                return `${value} providers (${percent}%)`;
              }
            }
          }
        }
      }
    });
}
}
}
</script>
<style scoped>
</style>
