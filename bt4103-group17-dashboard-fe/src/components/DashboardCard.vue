<template>
  <div class="dashboard-card">
    <div class="icon">{{ icon }}</div>
    <div class="value">
      <div v-if="loading" class="mini-spinner"></div>
      <strong v-else>{{ value }}</strong>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    icon: String,
    title: String,
    value: [String, Number],
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dashboard-card {
  background: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.value {
  font-size: 20px;
  min-height: 24px;
  margin-bottom: 4px;
}

.title {
  font-size: 14px;
  color: #777;
}

/* Spinner styling */
.mini-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #eee;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
