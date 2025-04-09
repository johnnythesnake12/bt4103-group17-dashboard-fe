<template>
  <div class="home-view">
    <h1>Welcome to the Home View!</h1>

    <div class="dashboard-grid">
      <DashboardCard icon="🧪" title="Total Kits Sold" value="12,450" />
      <DashboardCard icon="🏥" title="Hospitals Partnered" value="215" />
      <DashboardCard icon="💰" title="Total Revenue" value="$3.8M" />
      <DashboardCard icon="👨‍⚕️" title="Patients Treated" value="18,730" />
    </div>

    <div class="highlights-box">
      <h2>📌 Recent Highlights</h2>

        <li>📝 Signed 3 new hospitals in Q2</li>
        <li>🚚 Shipped 1,200 kits to Jakarta</li>
        <li>📈 Revenue increased by 8% in March</li>

    </div>
  </div>
</template>

<script setup>
  import DashboardCard from '@/components/DashboardCard.vue'
</script>

<style scoped>
  .home-view {

    background-color: #f5f5f5;
    min-height: 100vh;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 32px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
  }

  .highlights-box {
    background-color: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .highlights-box h2 {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .highlights-box ul {
    padding-left: 20px;
  }

  .highlights-box li {
    margin-bottom: 8px;
  }
</style>
