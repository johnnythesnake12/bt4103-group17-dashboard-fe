<template>
  <div class="home-view">
    <h1>Welcome to the iDMasDR Dashboard</h1>

    <!-- Dashboard section -->
    <div class="dashboard-grid">
      <div class="card-wrapper">
        <div v-if="loadingScreens" class="mini-spinner"></div>
        <DashboardCard
          v-else
          icon="🧪"
          title="Total Screenings done"
          :value="totalScreenings"
        />
      </div>

      <div class="card-wrapper">
        <div v-if="loadingHospitals" class="mini-spinner"></div>
        <DashboardCard
          v-else
          icon="🏥"
          title="Hospitals Partnered"
          :value="hospitalsPartnered"
        />
      </div>

      <DashboardCard icon="💰" title="Total Revenue" value="$3.8M" />

      <div class="card-wrapper">
        <div v-if="loadingPatients" class="mini-spinner"></div>
        <DashboardCard
          v-else
          icon="👨‍⚕️"
          title="Patients Treated"
          :value="patientsScreened"
        />
      </div>
    </div>

    <!-- Highlights -->
    <div class="highlights-box">
      <h2>📌 Recent Highlights</h2>
      <li>📝 Signed 3 new hospitals in Q2</li>
      <li>🚚 Shipped 1,200 kits to Jakarta</li>
      <li>📈 Revenue increased by 8% in March</li>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DashboardCard from '@/components/DashboardCard.vue'

export default {
  name: 'HomeView',
  components: {
    DashboardCard
  },
  data() {
    return {
      hospitalsPartnered: 0,
      patientsScreened: 0,
      totalScreenings: 0,
      loadingHospitals: true,
      loadingPatients: true,
      loadingScreens: true
    }
  },
  methods: {
    async fetchStatistics() {
      // Fetch hospitals
      axios
        .get('https://bt4103-group17-dashboard-flask-be.onrender.com/providers/total_worked_with')
        .then(res => {
          this.hospitalsPartnered = res.data.total_providers_worked_with
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.loadingHospitals = false
        })

      // Fetch patients
      axios
        .get('https://bt4103-group17-dashboard-flask-be.onrender.com/screenings/total_patients_screened')
        .then(res => {
          this.patientsScreened = res.data.unique_patient_count
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.loadingPatients = false
        })

      // Fetch screenings
      axios
        .get('https://bt4103-group17-dashboard-flask-be.onrender.com/screenings/total_screenings')
        .then(res => {
          this.totalScreenings = res.data.total_screenings
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.loadingScreens = false
        })
    }
  },
  mounted() {
    this.fetchStatistics()
  }
}
</script>

<style scoped>
.home-view {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 24px;
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

.card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 130px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  padding: 12px;
  position: relative;
}

.mini-spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #eee;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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

.highlights-box li {
  margin-bottom: 8px;
}
</style>
