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
  padding: 40px;
  max-width: 80%;
  margin: auto auto;
  text-align: center;
}
</style>

  