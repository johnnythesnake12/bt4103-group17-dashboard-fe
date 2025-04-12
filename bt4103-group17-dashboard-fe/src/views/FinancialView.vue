<template>
  <div class="financial-performance-view">
    <h2>Profit Margin Breakdown</h2>
    <ProfitMarginChart />

    <h2 style="margin-top: 60px;">Annual Revenue vs Operational Costs</h2>
    <AnnualGrowthChart />
  </div>
</template>

<script>
import ProfitMarginChart from '@/components/ProfitMargin.vue'
import AnnualGrowthChart from '@/components/AnnualGrowth.vue'

export default {
  name: 'FinancialPerformanceView',
  components: {
    ProfitMarginChart,
    AnnualGrowthChart
  }
}
</script>

<style scoped>
.financial-performance-view {
  padding: 40px;
  max-width: 80%;
  margin: auto auto;
  text-align: center;
}
</style>
