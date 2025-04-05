<template>
  <div class="market-analysis-view">
    <MarketOverview />
    <MarketSizingFunnel />
    <PricingModel />
  </div>
</template>

<script>
import MarketOverview from '@/components/MarketOverview.vue';
import MarketSizingFunnel from '@/components/MarketSizingFunnel.vue';
import PricingModel from '@/components/PricingModel.vue';

export default {
  components: {
    MarketOverview,
    MarketSizingFunnel,
    PricingModel
  }
};
</script>

<style scoped>
.market-analysis-view {
  max-width: 65%;
  margin: 0 auto;
  padding: 40px 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}
</style>

  